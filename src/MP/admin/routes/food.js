import multer from 'multer';
import foodController from '../controllers/food.js';
import { Router } from "express";

const upload = multer({ dest: 'uploads/' });


const router = Router();

router.post('/food', foodController.createFood);
router.get('/foods', foodController.getFoods);
router.get('/food/:id', foodController.getFoodById);
router.put('/food/:id', foodController.updateFood);
router.delete('/food/:id', foodController.deleteFood);
router.post('/upload/food', upload.single('file'), foodController.uploadExcel);


export default router;
