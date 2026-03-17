import { Request, Response } from 'express';
import { Application } from '../models/Application';
import { University } from '../models/University';

export const getUniversityApplications = async (req: Request, res: Response) => {
    try {
        const { universityId } = req.params;
        const applications = await Application.find({ universityId })
            .populate('studentId', 'name email avatarUrl phone')
            .populate('programId', 'title category')
            .sort({ appliedAt: -1 });

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

export const getUniversityAnalytics = async (req: Request, res: Response) => {
    try {
        const { universityId } = req.params;

        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        // Aggregate applications by status
        const appStats = await Application.aggregate([
            { $match: { universityId: university._id } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const statusDistribution = appStats.reduce((acc: any, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {
            'Pending': 0,
            'Under Review': 0,
            'Accepted': 0,
            'Waitlisted': 0,
            'Rejected': 0
        });

        res.status(200).json({
            visitCount: university.visitCount || 0,
            visitHistory: university.visitHistory || [],
            applicationsCount: appStats.reduce((sum, item) => sum + item.count, 0),
            statusDistribution
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
    try {
        const { applicationId } = req.params;
        const { status, notes } = req.body;

        const application = await Application.findByIdAndUpdate(
            applicationId,
            { status, notes },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.status(200).json({ application });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update application' });
    }
};
