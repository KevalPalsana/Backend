import  express from 'express';
import  foodController from '../../../admin/controllers/bulkOrderCategory.js';
import { Router } from "express";

const router = Router();

router.get('/foods', foodController.getBulkOrderCategory);


export default router;
