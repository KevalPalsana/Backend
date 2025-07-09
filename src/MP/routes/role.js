import express from 'express';
import { Router } from 'express';
import roleController from '../controllers/role.js';

const router = Router() ;

// Route for creating feedback
router.post('/create-role', roleController.createRole);

// Route for getting all feedback entries
router.get('/roles', roleController.getRole);

export default router;