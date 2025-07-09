import express from "express";
import foodItemController from "../../../admin/controllers/foodItem.js";

import { Router } from "express";

const router = Router();

router.get("/food-items", foodItemController.getAllFoodItems);
router.get("/food-item/:foodId", foodItemController.getFoodItemByFoodId);




export default router;
