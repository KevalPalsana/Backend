import multer from 'multer';
import { createServingMethod, getAllServingMethods, getServingMethodByCategoryId, updateServingMethod, deleteServingMethod, uploadExcel } from '../controllers/servingMethod.js';
import { Router } from "express";

const router = Router();
const upload = multer({ dest: 'uploads/' });


router.post('/serving-method', createServingMethod);
router.get('/serving-methods', getAllServingMethods);
router.get('/serving-method/:categoryId', getServingMethodByCategoryId);
router.put('/serving-methods/:id', updateServingMethod);
router.delete('/serving-methods/:id', deleteServingMethod);
router.post('/upload/serving-methods', upload.single('file'), uploadExcel);


export default router;
