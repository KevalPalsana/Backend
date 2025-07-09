
import express from 'express';
import { createServingMethod, getAllServingMethods, getServingMethodByCategoryId, updateServingMethod, deleteServingMethod } from '../../../admin/controllers/servingMethod.js';
import { Router } from "express";

const router = Router();

router.get('/serving-methods', getAllServingMethods);
router.get('/serving-method/:categoryId', getServingMethodByCategoryId);


export default router;
