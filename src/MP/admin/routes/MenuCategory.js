import multer from 'multer';
import menuCategoryController from '../controllers/MenuCategory.js';
import { Router } from "express";

const upload = multer({ dest: 'uploads/' });

const router = Router();


router.post('/category', menuCategoryController.createCategory);
router.get('/categories', menuCategoryController.getCategory);
router.get('/category/:id', menuCategoryController.getCategoryById);
router.put('/category/:id', menuCategoryController.updateCategory);
router.delete('/category/:id', menuCategoryController.deleteCategory);
router.post('/category/excel', upload.single('file'), menuCategoryController.uploadExcel);



export default router;
