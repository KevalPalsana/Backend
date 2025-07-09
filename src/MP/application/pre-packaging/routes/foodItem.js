import express from 'express';
import prePackageController from '../../../admin/controllers/prePackageItem.js';
import { Router } from "express";

const router = Router();


router.get('/food-items', prePackageController.getAllPrePackageFoodItems);
router.get('/food-item/:foodId', prePackageController.getPrePackageFoodItemByFoodId);


export default router;
