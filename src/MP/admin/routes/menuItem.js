import multer from "multer";
import menuitemController from "../controllers/menuItem.js";
import { Router } from "express";

const upload = multer({ dest: 'uploads/' });

const router = Router();


router.get("/items", menuitemController.getAllItems);
router.get("/item/:foodId", menuitemController.getItemById);

router.put("/item/:id", menuitemController.updateItem);
router.post("/item", menuitemController.createItem);
router.delete("/item/:id", menuitemController.deleteFoodItem);
router.post('/item/excel', upload.single('file'), menuitemController.uploadExcel);

export default router;
