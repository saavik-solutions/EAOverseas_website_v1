import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Post } from './models/Post';
import { University } from './models/University';

dotenv.config();

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('--- Database Audit ---');

        const uniCount = await University.countDocuments();
        const postCount = await Post.countDocuments();

        console.log(`Total Universities: ${uniCount}`);
        console.log(`Total Posts: ${postCount}`);

        const categories = await Post.distinct('category');
        console.log('\nPosts by Category:');
        for (const cat of categories) {
            const count = await Post.countDocuments({ category: cat });
            console.log(`- ${cat}: ${count}`);
        }

        const linkedPosts = await Post.countDocuments({ universityId: { $exists: true, $ne: null } });
        console.log(`\nLinked to University: ${linkedPosts}`);

        const sample = await Post.findOne({ universityName: { $exists: true } });
        if (sample) {
            console.log('\nSample Linked Post:');
            console.log(`- Title: ${sample.title}`);
            console.log(`- University: ${sample.universityName}`);
            console.log(`- Logo present: ${!!sample.universityLogo}`);
        }

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

verify();
