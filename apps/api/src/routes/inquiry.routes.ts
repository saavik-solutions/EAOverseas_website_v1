import { Router } from 'express';
import { createInquiry, getInquiries, updateInquiryStatus } from '../controllers/inquiry.controller';
import { verifyJWT, requireRole } from '../middleware/verifyJWT';

const router = Router();

// Public route for form submission
router.post('/', createInquiry);

// Protected routes for SuperAdmin
router.get('/', verifyJWT, requireRole('admin'), getInquiries);
router.patch('/:id/status', verifyJWT, requireRole('admin'), updateInquiryStatus);

export default router;
