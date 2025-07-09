import multer from 'multer';
import foodItemController from "../controllers/foodItem.js";
import { Router } from "express";
const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get("/food-items", foodItemController.getAllFoodItems);
router.get("/food-item/:foodId", foodItemController.getFoodItemByFoodId);

router.post("/food-item/:id", foodItemController.updateFoodItem);
router.post("/food-item", foodItemController.createFoodItem);
router.delete("/food-item/:id", foodItemController.deleteFoodItem);
router.post('/food-items/excel', upload.single('file'), foodItemController.uploadExcel);



export default router;
