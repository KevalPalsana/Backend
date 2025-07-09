import  express from 'express';
import  createUserController from '../controller/pickupDate.js';
import { Router } from "express";

const router = Router();

router.post('/date', createUserController.createDate);
router.get('/dates', createUserController.getAllDates);
router.get('/date/:id', createUserController.getDateById);
router.put('/date/:id', createUserController.updateDateById);
router.delete('/date/:id', createUserController.deleteDateById);

export default router;
