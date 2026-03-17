import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from './models/University';
import { User } from './models/User';
import { Post } from './models/Post';
import { Application } from './models/Application';

dotenv.config();

const seedHubData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Connected to MongoDB for Hub Seeding...');

        const universities = await University.find();
        const students = await User.find({ role: 'student' }).limit(10);
        let programs = await Post.find({ category: 'Program' });

        if (universities.length === 0) {
            console.error('No universities found. Please seed universities first.');
            process.exit(1);
        }

        console.log(`Seeding analytics and programs for ${universities.length} universities...`);

        const systemUser = await User.findOne({ role: 'admin' }) || await User.findOne();

        for (const uni of universities) {
            // 0. Ensure some Programs exist for this university
            const existingPrograms = await Post.find({ universityId: uni._id, category: 'Program' });
            if (existingPrograms.length < 2) {
                console.log(`Adding sample programs for ${uni.name}...`);
                const sampleProgs = [
                    {
                        title: `B.Sc. ${uni.name} Computer Science`,
                        content: `A leading world-class degree in computing and software engineering at ${uni.name}.`,
                        tuitionFee: '$28,500',
                        programDuration: '4 Years',
                        intakes: 'Fall, Spring',
                        academicLevel: 'Undergraduate'
                    },
                    {
                        title: `Master of Business Administration (MBA)`,
                        content: `Accelerate your career with our globally recognized MBA program.`,
                        tuitionFee: '$45,000',
                        programDuration: '2 Years',
                        intakes: 'Fall only',
                        academicLevel: 'Postgraduate'
                    }
                ];

                for (const p of sampleProgs) {
                    await Post.create({
                        ...p,
                        authorId: systemUser?._id,
                        category: 'Program',
                        universityId: uni._id,
                        universityName: uni.name,
                        universityLogo: uni.logoUrl,
                        location: uni.country,
                        tags: ['Academic', 'TopRanking', 'Career'],
                        score: 100
                    });
                }
            }

            // 0.1. Ensure some Scholarships exist for this university
            const existingScholarships = await Post.find({ universityId: uni._id, category: 'Scholarship' });
            if (existingScholarships.length < 1) {
                console.log(`Adding sample scholarships for ${uni.name}...`);
                const sampleSchols = [
                    {
                        title: `Global Excellence Scholarship`,
                        content: `Merit-based scholarship for high-achieving international students joining ${uni.name}.`,
                        funding: 'Full Tuition',
                        expiry: 'Aug 2026',
                        academicLevel: 'All Levels'
                    },
                    {
                        title: `International Diversity Grant`,
                        content: `Financial support aimed at increasing institutional diversity at ${uni.name}.`,
                        funding: '$10,000 / Year',
                        expiry: 'Sept 2026',
                        academicLevel: 'Undergraduate'
                    }
                ];

                for (const s of sampleSchols) {
                    await Post.create({
                        ...s,
                        authorId: systemUser?._id,
                        category: 'Scholarship',
                        universityId: uni._id,
                        universityName: uni.name,
                        universityLogo: uni.logoUrl,
                        location: uni.country,
                        tags: ['FinancialAid', 'Scholarship', 'Education'],
                        score: 150
                    });
                }
            }

            // 0.2. Initialize Social Links
            await University.findByIdAndUpdate(uni._id, {
                socialLinks: {
                    linkedin: `https://linkedin.com/school/${uni.name.toLowerCase().replace(/ /g, '-')}`,
                    twitter: `https://twitter.com/${uni.name.toLowerCase().replace(/ /g, '')}`,
                    facebook: `https://facebook.com/${uni.name.toLowerCase().replace(/ /g, '')}`,
                    instagram: `https://instagram.com/${uni.name.toLowerCase().replace(/ /g, '')}`
                }
            });

            // Refresh programs list locally for this uni
            const uniPrograms = await Post.find({ universityId: uni._id, category: 'Program' });
            // Also update global programs list for application seeding fallback
            const allPrograms = await Post.find({ category: 'Program' });

            // 1. Seed Analytics History
            const visitHistory = [];
            let totalVisits = 0;
            const now = new Date();

            for (let i = 6; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(now.getDate() - i);
                const count = Math.floor(Math.random() * 50) + 10;
                visitHistory.push({
                    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    count
                });
                totalVisits += count;
            }

            await University.findByIdAndUpdate(uni._id, {
                visitCount: totalVisits,
                visitHistory
            });

            // 2. Seed Applications
            // Delete existing applications for this uni to avoid bloat during re-runs
            await Application.deleteMany({ universityId: uni._id });

            if (students.length > 0 && uniPrograms.length > 0) {
                const appCount = Math.floor(Math.random() * 5) + 3;
                for (let i = 0; i < appCount; i++) {
                    const student = students[Math.floor(Math.random() * students.length)];
                    const program = uniPrograms[Math.floor(Math.random() * uniPrograms.length)];

                    const statuses = ['Pending', 'Under Review', 'Accepted', 'Waitlisted', 'Rejected'];

                    await Application.create({
                        studentId: student._id,
                        universityId: uni._id,
                        programId: program._id,
                        status: statuses[Math.floor(Math.random() * statuses.length)],
                        appliedAt: new Date(now.getTime() - Math.random() * 1000000000),
                        notes: `Application for ${program.title} at ${uni.name}`
                    });
                }
            }
        }

        console.log('Hub Data Seeding Completed Successfully!');
        await mongoose.connection.close();
    } catch (err) {
        console.error('Seeding Error:', err);
    }
};

seedHubData();
