import multer from 'multer';
import servingCategoryConteroller from '../controllers/servingCategory.js';
import { Router } from "express";

const router = Router();
const upload = multer({ dest: 'uploads/' });



router.post('/servingCategory', servingCategoryConteroller.createServingCategory);
router.get('/servingCategories', servingCategoryConteroller.getServingCategories);
router.get('/servingCategory/:id', servingCategoryConteroller.getServingCategoryById);
router.put('/servingCategory/:id', servingCategoryConteroller.updateServingCategory);
router.delete('/servingCategory/:id', servingCategoryConteroller.deleteServingCategory);
router.post('/upload/servingCategory', upload.single('file'), servingCategoryConteroller.uploadExcel);

export default router;
