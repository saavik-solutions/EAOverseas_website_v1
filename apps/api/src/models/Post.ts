import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    authorId: mongoose.Schema.Types.ObjectId;
    title: string;
    content: string;
    category: string; // Article, Scholarship, Announcement, Event, Guide, Program
    universityId?: mongoose.Schema.Types.ObjectId;
    universityName?: string;
    universityLogo?: string;
    location?: string;
    mediaUrls: string[];
    upvotes: mongoose.Schema.Types.ObjectId[];
    downvotes: mongoose.Schema.Types.ObjectId[];
    score: number;
    viewCount: number;
    commentCount: number;
    tags: string[];
    semanticEmbedding?: number[];
    isFlagged: boolean;
    tldrSummary?: string;
    // Program Specifics
    tuitionFee?: string;
    programDuration?: string;
    intakes?: string;
    academicLevel?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema(
    {
        authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, default: 'Article' },
        universityId: { type: Schema.Types.ObjectId, ref: 'University' },
        universityName: { type: String },
        universityLogo: { type: String },
        location: { type: String, default: 'Global' },
        mediaUrls: [{ type: String }],
        upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        score: { type: Number, default: 0 },
        viewCount: { type: Number, default: 0 },
        commentCount: { type: Number, default: 0 },
        tags: [{ type: String }],
        semanticEmbedding: [{ type: Number }], // For vector index
        isFlagged: { type: Boolean, default: false },
        tldrSummary: { type: String },
        // Program Specifics
        tuitionFee: { type: String },
        programDuration: { type: String },
        intakes: { type: String },
        academicLevel: { type: String },
    },
    { timestamps: true }
);

// Indexes for algorithmic sorting and search
PostSchema.index({ score: -1, createdAt: -1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ '$**': 'text' }); // Basic text search fallback

export const Post = mongoose.model<IPost>('Post', PostSchema);
