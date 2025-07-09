import express, { Router } from 'express';
import foodController from '../../../admin/controllers/MenuCategory.js';

const router = Router();

router.get('/foods', foodController.getCategory);


export default router;