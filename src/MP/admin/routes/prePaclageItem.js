import multer from 'multer';
import prePackageFoodItemController from "../controllers/prePackageItem.js";
import { Router } from "express";

const router = Router();
const upload = multer({ dest: 'uploads/' });


router.get("/pre_package_food_items", prePackageFoodItemController.getAllPrePackageFoodItems);
router.get("/pre_package_food_item/:foodId", prePackageFoodItemController.getPrePackageFoodItemByFoodId);

router.post("/pre_package_food_item/:id", prePackageFoodItemController.updatePrePackageFoodItem);
router.post("/pre_package_food_item", prePackageFoodItemController.createPrePackageFoodItem);
router.delete("/pre_package_food_item/:id", prePackageFoodItemController.deletePrePackageFoodItem);
router.post('/pre_package_food-items/excel', upload.single('file'), prePackageFoodItemController.uploadExcel);


export default router;
