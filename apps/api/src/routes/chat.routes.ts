import express from 'express';
import { getConversations, getMessages, getOrCreateConversation } from '../controllers/chat.controller';
import { askAI } from '../controllers/aiChat.controller';

const router = express.Router();

router.get('/conversations/:userId', getConversations);
router.get('/messages/:conversationId', getMessages);
router.post('/conversation', getOrCreateConversation);
router.post('/ask', askAI);

export default router;
