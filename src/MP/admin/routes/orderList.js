import express from "express";
import orderListController from "../controllers/orderList.js";
import { Router } from "express";

const router = Router();


// router.post("/create-orderList", orderListController.createOrderList);

// router.get("/get-order/:orderId", orderListController.getOrderById);

router.get("/get-order/unpaid", orderListController.getAllUnpaidSelfOrders);

router.get("/get-order/paid", orderListController.getAllPaidSelfOrders);


router.get("/get-pre-package-order/unpaid", orderListController.getAllUnpaidPreOrders);

router.get("/get-pre-package-order/paid", orderListController.getAllPaidPreOrders);

router.get("/get-bulk-order/paid", orderListController.getAllPaidBulkOrders);

router.get("/get-bulk-order/unpaid", orderListController.getAllUnpaidBulkOrders);

router.get("/get-all-orders/paid", orderListController.getAllPaidOrders);

router.get("/get-all-orders/cancel", orderListController.getAllCanceledOrders);


export default router;
