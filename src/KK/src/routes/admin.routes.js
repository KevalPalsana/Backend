import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import  {validate}  from '../middlewares/validation.middlewares.js';
import productValidation from '../validations/product.validation.js';
import multer from 'multer';

const router = Router() ;
const upload = multer({ dest: 'uploads/' });

router.get('/categories', adminController.getCategories);
router.get('/products', adminController.getProducts);
router.get('/product/:id', adminController.getProductsBySubCategoryId);
router.get('/product-images', adminController.getProductImages);
router.get('/product-images/:id',adminController.getProductImagesByProductId);
router.get('/sub-categories', adminController.getSubCategories);
router.get('/sub-categories/:id', adminController.getSubCategoryByCategoryId);

// router.use(authMiddleware.authenticateAdmin);

router.route('/category')
  .post(adminController.createCategory);

router.route('/category/:id')
  .put(adminController.updateCategory)
  .delete(adminController.deleteCategory);

router.route('/product')
  .post(adminController.createProduct);

  router.route('/product/:id')
  .put(adminController.updateProduct)
  .delete(adminController.deleteProduct);

  router.route('/sub-category')
  .post(adminController.createSubCategory);

  router.route('/sub-category/:id')
  .put(adminController.updateSubCategory)
  .delete(adminController.deleteSubCategory);

  router.post('/product-image', upload.single('file'), adminController.createProductImage);

  router.route('/product-image/:id')
  .put(upload.single('file'), adminController.updateProductImage)
  .delete(adminController.deleteProductImage);


export default router;
