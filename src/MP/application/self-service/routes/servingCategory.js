
import  express from 'express';
import  servingCategoryConteroller from '../../../admin/controllers/servingCategory.js';
import { Router } from "express";

const router = Router();

router.get('/servingCategories', servingCategoryConteroller.getServingCategories);



export default router;
