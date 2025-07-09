import express from "express";
import orderRecieptController from "../controllers/orderReciept.js";
import { Router } from "express";

const router = Router();

router.post("/create-reciept", orderRecieptController.createOrderReciept);

router.get("/get-reciept/:userId", orderRecieptController.getOrderReciept);

router.put("/order-receipt/:id", orderRecieptController.updateOrderRecieptToPaid);

router.get("/order-receipts/paid/:userId", orderRecieptController.getPaidOrderById);

router.get("/order-receipts/unpaid/:userId", orderRecieptController.getUnpaidOrderById);

router.get("/order-list/:id", orderRecieptController.getOrderById);

router.get("/order-receipt/:orderId", orderRecieptController.getReceiptById);

router.put("/order-receipt/cancel/:id", orderRecieptController.updateOrderRecieptToCancel);

export default router;
