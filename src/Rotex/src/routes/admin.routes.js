import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import  {validate}  from '../middlewares/validation.middlewares.js';
import productValidation from '../validations/product.validation.js';
import multer from 'multer';
import admin from '../../../MP/admin/controllers/admin.js';

const router = Router() ;
const upload = multer({ dest: 'uploads/' });

router.get('/categories', adminController.getCategories);
router.get('/products', adminController.getProducts);
router.get('/product/:id', adminController.getProductsById);
router.get('/orders/shipping-status/:status', adminController.getOrdersByShippingStatus);
router.get('/contact-us', adminController.getContacts);
router.get('/orderList',adminController.getOrderList);
router.get('/order/:id', adminController.getOrderById);
router.get('/shipping-status', adminController.getShippingStatus);
router.get('/complaints', adminController.getAllComplaints);
router.get('/quick-fix', adminController.getAllQuickFix);
router.get('/warranties', adminController.getAllWarranties);
router.get('/blog-details', adminController.getAllBlogContains);
router.get('/blog-detail/:blogId', adminController.getBlogContainsBYBlogId);
router.get("/product-by-category/:categoryId", adminController.getProductsByCategory);
router.get('/cart/:userId', adminController.getCartByUserId);
router.get('/user/:userId', adminController.getUserById);
router.get('/blog-by-title', adminController.getBlogByTitle);
router.get('/blog-detail-by-title', adminController.getBlogContainsByTitle);



router.use(authMiddleware.authenticateAdmin);

router.route('/category')
  .post(validate(productValidation.createCategorySchema),adminController.createCategory);

router.route('/category/:id')
  .put(validate(productValidation.updateCategorySchema),adminController.updateCategory)
  .delete(adminController.deleteCategory);

router.route('/brand')
  .post(adminController.createBrand)
  .get(adminController.getBrand);

router.route('/brand/:id')
  .put( adminController.updateBrand)
  .delete(adminController.deleteBrand);

router.route('/label')
  .post(adminController.createLabel)
  .get(adminController.getLabels);

router.route('/label/:id')
  .put(adminController.updateLabel)
  .delete(adminController.deleteLabel);

router.route('/problem')
  .post(adminController.createProblem)
  .get(adminController.getProblem);

router.route('/problem/:id')
  .put(adminController.updateProblem)
  .delete(adminController.deleteProblem);

router.route('/subcategory')
  .post(adminController.createSubCategory)
  .get(adminController.getSubCategories);

router.route('/subcategory/:id')
  .put(adminController.updateSubCategory)
  .get(adminController.getSubCategoryByCategoryId)
  .delete(adminController.deleteSubCategory);

router.route('/product')
  .post(adminController.createProduct);

  router.route('/product/:id')
  .put(adminController.updateProduct)
  .delete(adminController.deleteProduct);

  router.route('/blog-detail')
  .post(adminController.createBlogContains);

  router.route('/blog-detail/:id')
  .put(adminController.updateBlogContains)
  .delete(adminController.deleteBlogContains);
  
  
  router.get('/productFaqs',adminController.getFaqs)
  router.get('/related-product/:productId', adminController.getRelatedProduct);
  router.delete('/product/:id/faq',adminController.deleteFAQ)
  router.get('/featured-product', adminController.getFeaturedProducts);

router.route('/attribute')
.post(adminController.addAttribute)
.get(adminController.getAttributes);

router.route('/attribute/:id')
.put(adminController.updateAttribute)
.delete(adminController.deleteAttribute);

router.post('/shipping-status', adminController.addShippingStatus);

router.route('/shipping-status/:id')
.put(adminController.updateShippingStatus)
.delete(adminController.deleteShippingStatus);

router.route('/order-tracking')
.get(adminController.getOrderTracking);

router.route('/order-tracking/:id')
.post(adminController.addOrderTracking)
.put(adminController.updateOrderTracking)
.delete(adminController.deleteOrderTracking);

router.route('/wallet-amount')
.post(adminController.createWalletAmount)
.get(adminController.getWalletAmount);

router.route('/wallet-amount/:id')
.put(adminController.updateWalletAmount)
.delete(adminController.deleteWalletAmount);

router.route('/coupon')
.post(adminController.createCoupon)
.get(adminController.getCoupon);

router.route('/coupon/:id')
.get(adminController.getCouponById)
.put(adminController.updateCoupon)
.delete(adminController.deleteCoupon);

router.route('/product-status')
.post(adminController.addProductStatus)
.get(adminController.getProductStatus);

router.route('/product-status/:id')
.put(adminController.updateProductStatus)
.delete(adminController.deleteProductStatus);

router.put('/update-status/:orderId', adminController.updatePaymentStatus);
router.put('/update-order-status/:orderId', adminController.updateOrderStatus);
router.put('/update-shipping-status/:orderId', adminController.updateShippingStatusService);
router.put('/update-order-summary/:id', adminController.updateOrderSummaryByIdHandler);
router.delete('/order-summary/:id', adminController.deleteOrderSummaryById);

router.delete('/delete-contact/:id', adminController.deleteContactUs);


router.route('/about-us')
.post(adminController.addAboutUsPage)
.get(adminController.getAboutUsPage);

router.route('/about-us/:id')
.put(adminController.updateAboutUsPage)
.get(adminController.getAboutUsById)
.delete(adminController.deleteAboutUsPage);

router.route('/blog')
.post(adminController.addBlog)
.get(adminController.getBlog);

router.route('/blog/:id')
.put(adminController.updateBlog)
.delete(adminController.deleteBlog);

router.route('/banner')
.post(adminController.addBanner)
.get(adminController.getBanner);

router.route('/banner/:id')
.put(adminController.updateBanner)
.delete(adminController.deleteBanner);

router.route('/complaint/:id')
.get(adminController.getComplaintById)
.put(adminController.updateComplaint)
.delete(adminController.deleteComplaint);

router.post('/quick-fix', adminController.createQuickFix);

router.route('/quick-fix/:id')
.get(adminController.getQuickFixById)
.put(adminController.updateQuickFix)
.delete(adminController.deleteQuickFix);

router.get("/dashboard-data", adminController.getDashboardData);


router.post('/upload', upload.single('file'), adminController.uploadWarranty);

router.post('/add/warranty', adminController.addMultipleWarrantyNumbers);

router.post("/send-order-confirmation", adminController.sendOrderConfirmation);

router.post("/send-offer-notification", adminController.sendOfferNotification);
router.post("/send-bulk-offer-notification", adminController.sendBulkOfferNotification);

router.post('/order/:orderId/notify-status', adminController.notifyOrderStatus);

export default router;
