import { Request, Response } from 'express';
import { University } from '../models/University';
import logger from '../config/logger';

// 1. Get All Universities
export const getAllUniversities = async (req: Request, res: Response) => {
    try {
        const { country, search } = req.query;
        const query: any = {};

        if (country && country !== 'All') {
            query.country = country;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const universities = await University.find(query).sort({ name: 1 });
        res.status(200).json({ universities });
    } catch (error: any) {
        logger.error('Failed to fetch universities', { error: error.message });
        res.status(500).json({ error: 'Failed to fetch universities' });
    }
};

// 2. Get University by ID
export const getUniversityById = async (req: Request, res: Response) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }
        res.status(200).json({ university });
    } catch (error: any) {
        logger.error('Failed to fetch university details', { error: error.message, id: req.params.id });
        res.status(500).json({ error: 'Failed to fetch university details' });
    }
};

// 3. Create University
export const createUniversity = async (req: Request, res: Response) => {
    try {
        const {
            name, website, country, city, logoUrl, ranking, language,
            description, universityType, establishedYear, totalStudents, campusSize, globalRanking,
            socialLinks
        } = req.body;

        // Simple validation
        if (!name || !website || !country) {
            return res.status(400).json({ error: 'Name, website, and country are required.' });
        }

        // Generate university_id if not provided (simple hash or slug)
        const university_id = req.body.university_id || `uni-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const university = new University({
            university_id,
            name,
            website,
            country,
            city,
            logoUrl,
            ranking,
            language,
            description,
            universityType,
            establishedYear,
            totalStudents,
            campusSize,
            globalRanking,
            socialLinks,
            scraped_at: new Date()
        });

        await university.save();
        logger.info('University created', { id: university._id, name });

        res.status(201).json({ message: 'University created successfully', university });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'A university with this ID or website already exists.' });
        }
        logger.error('Failed to create university', { error: error.message });
        res.status(500).json({ error: 'Failed to create university' });
    }
};

// 4. Update University
export const updateUniversity = async (req: Request, res: Response) => {
    try {
        const university = await University.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        logger.info('University updated', { id: university._id });
        res.status(200).json({ message: 'University updated successfully', university });
    } catch (error: any) {
        logger.error('Failed to update university', { error: error.message, id: req.params.id });
        res.status(500).json({ error: 'Failed to update university' });
    }
};

// 5. Delete University
export const deleteUniversity = async (req: Request, res: Response) => {
    try {
        const university = await University.findByIdAndDelete(req.params.id);
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        logger.info('University deleted', { id: req.params.id });
        res.status(200).json({ message: 'University deleted successfully' });
    } catch (error: any) {
        logger.error('Failed to delete university', { error: error.message, id: req.params.id });
        res.status(500).json({ error: 'Failed to delete university' });
    }
};
