import multer from 'multer';
import bulkOrderCategoryController from '../controllers/bulkOrderCategory.js';
import { Router } from "express";

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.post('/bulkOrderCategory', bulkOrderCategoryController.createBulOrderCategory);
router.get('/bulkOrderCategories', bulkOrderCategoryController.getBulkOrderCategory);
router.get('/bulkOrderCategory/:id', bulkOrderCategoryController.getBulkOrderCategoryById);
router.put('/bulkOrderCategory/:id', bulkOrderCategoryController.updateBulkOrderCategory);
router.delete('/bulkOrderCategory/:id', bulkOrderCategoryController.deleteBulkOrderCategory);
router.post('/bulkOrderCategory/excel', upload.single('file'), bulkOrderCategoryController.uploadExcel);


export default router;
