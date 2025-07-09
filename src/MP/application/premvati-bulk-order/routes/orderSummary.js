import  express from 'express';
import  orderSummaryController from '../controller/orderSummary.js';
import { Router } from "express";

const router = Router();

router.post('/create_order', orderSummaryController.createOrder);
router.get('/get_order/:userId', orderSummaryController.getOrderByUserId);
router.get('/order_summary/:id', orderSummaryController.getOrderSummaryById);
router.delete('/order_summary/delete-item', orderSummaryController.deleteFoodItemFromOrderSummary);
router.put('/order_summary/update', orderSummaryController.updateOrderSummary);

export default router;
