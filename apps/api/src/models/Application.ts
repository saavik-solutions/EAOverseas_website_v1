import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
    studentId: mongoose.Types.ObjectId;
    universityId: mongoose.Types.ObjectId;
    programId: mongoose.Types.ObjectId;
    status: 'Pending' | 'Under Review' | 'Accepted' | 'Waitlisted' | 'Rejected';
    notes?: string;
    appliedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ApplicationSchema: Schema = new Schema(
    {
        studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
        programId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
        status: {
            type: String,
            enum: ['Pending', 'Under Review', 'Accepted', 'Waitlisted', 'Rejected'],
            default: 'Pending'
        },
        notes: { type: String },
        appliedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Indexes for common queries
ApplicationSchema.index({ universityId: 1 });
ApplicationSchema.index({ studentId: 1 });
ApplicationSchema.index({ status: 1 });

export const Application = mongoose.model<IApplication>('Application', ApplicationSchema);
