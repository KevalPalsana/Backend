import express from "express";
import foodItemController from "../../../admin/controllers/bulkOrderItem.js";
import { Router } from "express";

const router = Router();

router.get("/food-items", foodItemController.getAllBulkOrderItem);
router.get("/food-item/:foodId", foodItemController.getbulkOrderItemsByFoodId);




export default router;
