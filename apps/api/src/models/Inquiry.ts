import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'pending' | 'resolved' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}

const InquirySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        status: { type: String, enum: ['pending', 'resolved', 'archived'], default: 'pending' },
    },
    { timestamps: true }
);

export const Inquiry = mongoose.model<IInquiry>('Inquiry', InquirySchema);
