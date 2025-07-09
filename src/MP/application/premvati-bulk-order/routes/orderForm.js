import express from 'express';
import OrderFormController from '../controller/orderForm.js';
import { Router } from "express";

const router = Router();

router.post('/create-form', OrderFormController.createOrder);
router.get('/get-form', OrderFormController.getAllOrders);
router.get('/get-form/:id', OrderFormController.getOrderById);

export default router;
