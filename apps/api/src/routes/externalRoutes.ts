import { Router } from 'express';
import { Blog } from '../models/Blog';
import { Lead } from '../models/Lead';
import logger from '../config/logger';
import { generateBlogContent } from '../services/aiBlogService';

const router = Router();

// ── Lead Recording ───────────────────────────────────────────────────────────

router.post('/leads', async (req, res) => {
    try {
        const { source, data } = req.body;
        if (!source || !data) {
            return res.status(400).json({ success: false, message: 'Source and data are required.' });
        }

        const newLead = new Lead({
            source,
            name: data.name || data.firstName || 'Anonymous',
            email: data.email || 'no-email@provided.com',
            phone: data.phone || data.phoneNumber,
            interest: data.interest || data.subject,
            message: data.message,
            status: 'New'
        });

        await newLead.save();
        logger.info(`Lead captured successfully from ${source}`, { leadId: newLead._id });
        
        res.status(201).json({ success: true, message: 'Lead synchronized with Institutional Vault.', leadId: newLead._id });
    } catch (error: any) {
        logger.error('Lead collection failed', { error: error.message });
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Admin Lead Retrieval
router.get('/admin/leads', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json({ success: true, leads });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Admin Stats Endpoint — Real counts from DB
router.get('/admin/stats', async (req, res) => {
    try {
        const [totalLeads, totalBlogs, newLeads, recentLeads] = await Promise.all([
            Lead.countDocuments(),
            Blog.countDocuments({ isPublished: true }),
            Lead.countDocuments({ status: 'New' }),
            Lead.find().sort({ createdAt: -1 }).limit(5).select('name email source createdAt status'),
        ]);
        res.json({
            success: true,
            stats: { totalLeads, totalBlogs, newLeads },
            recentLeads,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ── Dynamic Blog Management (v1) ─────────────────────────────────────────────

router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
        res.json({ success: true, count: blogs.length, blogs });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/blogs/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        
        // Atomic view increment
        blog.views += 1;
        await blog.save();

        res.json({ success: true, blog });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Blog CRUD (Admin)
router.post('/admin/blogs', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json({ success: true, blog });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/admin/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, blog });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/admin/blogs/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Blog deleted' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// AI Blog Generation
router.post('/admin/blogs/generate', async (req, res) => {
    try {
        const { category, mode, keywords } = req.body;
        if (!category || !mode) {
            return res.status(400).json({ success: false, message: 'Category and mode are required.' });
        }

        const blog = await generateBlogContent(category, mode, keywords);
        if (!blog) {
            return res.status(500).json({ success: false, message: 'AI failed to generate content.' });
        }

        res.json({ success: true, blog });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Admin All Blogs (including drafts)
router.get('/admin/blogs/all', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json({ success: true, count: blogs.length, blogs });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Engagement Actions
router.post('/blogs/:slug/like', async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { slug: req.params.slug },
            { $inc: { likes: 1 } },
            { new: true }
        );
        res.json({ success: true, likes: blog?.likes || 0 });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
