import { Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry';
import logger from '../config/logger';

export const createInquiry = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        const newInquiry = new Inquiry({
            name,
            email,
            subject,
            message
        });

        await newInquiry.save();

        logger.info(`New inquiry created from ${email}`);
        res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: newInquiry });
    } catch (error: any) {
        logger.error('Error creating inquiry', { error: error.message });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const getInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
    } catch (error: any) {
        logger.error('Error fetching inquiries', { error: error.message });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'resolved', 'archived'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });

        if (!inquiry) {
            return res.status(404).json({ success: false, error: 'Inquiry not found' });
        }

        res.status(200).json({ success: true, data: inquiry });
    } catch (error: any) {
        logger.error('Error updating inquiry status', { error: error.message });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
