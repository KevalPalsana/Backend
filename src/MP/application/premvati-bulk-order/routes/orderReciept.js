import  express from "express";
import  orderRecieptController from "../controller/orderReciept.js";
import { Router } from "express";

const router = Router();

router.post("/create-reciept", orderRecieptController.createOrderReciept);

router.get("/get-reciept/:userId", orderRecieptController.getOrderReciept);

router.put("/order-receipt/:id", orderRecieptController.updateOrderRecieptToPaid);

router.put("/order-receipt/accept/:id", orderRecieptController.updateOrderRecieptToAccept);

router.get("/order-receipts/paid/:userId", orderRecieptController.getPaidOrderById);

router.get("/order-receipts/cancel/:userId", orderRecieptController.getCancelOrderById);


router.get("/order-receipts/unpaid/:userId", orderRecieptController.getUnpaidOrderById);

router.get("/order-list/:id", orderRecieptController.getOrderById);

router.get("/order-receipt/:orderId", orderRecieptController.getReceiptById);

router.put("/order-receipt/cancel/:id", orderRecieptController.updateOrderRecieptToCancel);

export default router;
