import  express from 'express';
import  foodController from '../../../admin/controllers/food.js';
import { Router } from "express";

const router = Router();

router.get('/foods', foodController.getFoods);


export default router;
