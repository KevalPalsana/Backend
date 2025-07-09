import express from 'express';
import prePackageCategoryController from '../../../admin/controllers/prePackageCategory.js';
import { Router } from "express";

const router = Router();

router.get('/foods', prePackageCategoryController.getPrePackageFoods);


export default router;
