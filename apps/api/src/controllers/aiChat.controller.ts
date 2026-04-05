import { Request, Response } from 'express';
import OpenAI from 'openai';
import logger from '../config/logger';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Handle AI Chat requests
 * Proxies the request to OpenAI and returns the content
 */
export const askAI = async (req: Request, res: Response) => {
    try {
        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        if (!process.env.OPENAI_API_KEY) {
            logger.error('OPENAI_API_KEY is missing in backend environment');
            return res.status(500).json({ success: false, error: 'AI Service configuration error' });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: context || "You are a helpful assistant." },
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        const answer = response.choices[0].message.content;

        res.status(200).json({
            success: true,
            answer
        });

    } catch (error: any) {
        logger.error('AI Chat Controller Error:', error.message || error);
        res.status(500).json({
            success: false,
            error: 'Failed to get AI response',
            details: error.message
        });
    }
};
