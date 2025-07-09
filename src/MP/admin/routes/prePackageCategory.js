import multer from 'multer';
import prePackageFoodCategoryController from '../controllers/prePackageCategory.js';
import { Router } from "express";
const upload = multer({ dest: 'uploads/' });


const router = Router();

router.post('/prePackageFood', prePackageFoodCategoryController.createPrePackageFood);
router.get('/prePackageFoods', prePackageFoodCategoryController.getPrePackageFoods);
router.get('/prePackageFood/:id', prePackageFoodCategoryController.getPrePackageFoodById);
router.put('/prePackageFood/:id', prePackageFoodCategoryController.updatePrePackageFood);
router.delete('/prePackageFood/:id', prePackageFoodCategoryController.deletePrePackageFood);
router.post('/upload/prePackageFood', upload.single('file'), prePackageFoodCategoryController.uploadExcel);

export default router;
