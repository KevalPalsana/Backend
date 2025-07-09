import multer from 'multer';
import bulkOrderItemController from '../controllers/bulkOrderItem.js';
import { Router } from "express";

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.post('/bulkOrderItem', bulkOrderItemController.createBulkOrderItem);
router.get('/bulkOrderItems', bulkOrderItemController.getAllBulkOrderItem);
router.get('/bulkOrderItem/:id', bulkOrderItemController.getbulkOrderItemsByFoodId);
router.put('/bulkOrderItem/:id', bulkOrderItemController.updateBulkOrderItem);
router.delete('/bulkOrderItem/:id', bulkOrderItemController.deleteBulkOrderItem);
router.post('/bulkOrderItem/excel', upload.single('file'), bulkOrderItemController.uploadExcel);

export default router;
