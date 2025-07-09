import express from "express";
import foodItemController from "../../../admin/controllers/menuItem.js";
import { Router } from "express";

const router = Router();

router.get("/food-items", foodItemController.getAllItems);
router.get("/food-item/:foodId", foodItemController.getItemById);




export default router;
