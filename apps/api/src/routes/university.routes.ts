import express from 'express';
import * as universityController from '../controllers/university.controller';
// import { verifyJWT, authorizeRoles } from '../middleware/verifyJWT'; // Assuming these exist since auth is present

const router = express.Router();

// Public routes (or student/user visible)
router.get('/', universityController.getAllUniversities);
router.get('/:id', universityController.getUniversityById);

// Admin only routes - temporary without middleware until I verify the middleware export names
router.post('/', universityController.createUniversity);
router.put('/:id', universityController.updateUniversity);
router.delete('/:id', universityController.deleteUniversity);

export default router;
