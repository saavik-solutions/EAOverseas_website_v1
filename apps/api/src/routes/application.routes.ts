import express from 'express';
import {
    getUniversityApplications,
    getUniversityAnalytics,
    updateApplicationStatus
} from '../controllers/application.controller';
import { verifyJWT } from '../middleware/verifyJWT';

const router = express.Router();

router.get('/university/:universityId', getUniversityApplications);
router.get('/university/:universityId/analytics', getUniversityAnalytics);
router.patch('/:applicationId/status', updateApplicationStatus);

export default router;
