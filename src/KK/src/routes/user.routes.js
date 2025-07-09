import { Router } from 'express';
import userController from '../controllers/user.controller.js';


const router = Router();


router.get('/products', userController.getProducts);
router.get('/product/:ID', userController.getProductsBySubCategoryId);
router.get('/categories', userController.getCategories);
router.get('/sub-categories', userController.getSubCategories);
router.get('/sub-categories/:id', userController.getSubCategoryByCategoryId);
router.get('/product-images', userController.getProductImages);
router.get('/product-images/:id', userController.getProductImagesByProdcutId);
router.get('/user/:userId', userController.getUserById);


export default router;