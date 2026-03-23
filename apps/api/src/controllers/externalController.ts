import { Request, Response } from 'express';
import { ApiKey } from '../models/ApiKey';
import { Lead } from '../models/Lead';

export const collectLead = async (req: Request, res: Response): Promise<void> => {
    try {
        // Bypass API key requirement for the new Institutional /v1/leads route 
        // OR check for it if needed. The guide didn't mention an API key for leads.
        const isV1 = req.originalUrl.includes('/v1/leads');
        
        if (!isV1) {
            const apiKeyHeader = req.headers['x-api-key'];
            if (!apiKeyHeader || typeof apiKeyHeader !== 'string') {
                res.status(401).json({ success: false, message: 'Missing or invalid API key' });
                return;
            }
            const validKey = await ApiKey.findOne({ key: apiKeyHeader });
            if (!validKey) {
                res.status(403).json({ success: false, message: 'Forbidden: Invalid API key' });
                return;
            }
        }

        const { source, data, name, email, phone, interest, message } = req.body;
        
        // Unpack nested data if it exists (Institutional structure)
        const finalName = data?.name || name || data?.fullName;
        const finalEmail = data?.email || email;
        const finalPhone = data?.phone || phone || data?.mobile;
        const finalInterest = data?.interest || interest;
        const finalMessage = data?.message || message || JSON.stringify(data);

        if (!source || !finalName || !finalEmail) {
            res.status(400).json({ success: false, message: 'Missing required fields: source, name, email' });
            return;
        }

        const newLead = new Lead({
            source: source,
            name: finalName,
            email: finalEmail,
            phone: finalPhone,
            interest: finalInterest,
            message: finalMessage,
            status: 'New'
        });

        await newLead.save();

        res.status(201).json({ success: true, leadId: newLead._id, message: 'Lead collected successfully' });
    } catch (error) {
        console.error('Error in collectLead:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
