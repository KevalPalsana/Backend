import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

router.post("/influencer/register", userController.createVisitEntryController);
router.get('/products', userController.getProducts);
router.get("/product-by-category/:categoryId", userController.getProductsByCategory);
router.get('/product/:productId', userController.getProductsById);
router.get('/categories', userController.getCategories);
router.post('/create-order', userController.createOrderSummaryHandler);
router.post('/create-razorpay-order', userController.createRazorpayOrder);
router.route('/order-summary/:id')
.get(userController.getOrderSummaryById)
.put(userController.updateOrderSummaryByIdHandler)
.delete(userController.deleteOrderSummaryByIdHandler)

router.get('/order-list/:userId', userController.getOrdersByUserId);
router.delete('/delete_user/:userId', userController.deleteUser);
router.get("/quick-fix", userController.getQuickFixByProductAndProblem);
router.get('/quick-fix/:id', userController.getQuickFixById);
router.post('/complaint', userController.createComplaint);
router.get('/problems', userController.getProblem);


router.get('/user/:userId', userController.getUserById);

//cart

router.post('/warranty', userController.createWarranty);

router.get('/warranties', userController.getAllWarranties);

router.get('/warranties/:userId', userController.getWarrantiesByUserId);
router.get('/coupons', userController.getCoupon);
router.get('/blogs', userController.getBlog);
router.get('/about-us', userController.getAboutUsPage);
router.get('/about-us/:id', userController.getAboutUsPage);
router.get('/blog-detail', userController.getBlogContainsByBlogId);
router.route('/contact-us')
.post(userController.createContact)
.get(userController.getContacts);
router.get('/brand', userController.getBrand);

router.post('/cart', userController.createCart); 
router.get('/cart/:userId', userController.getCartByUserId);
router.put('/cart/:cartId', userController.updateCartItems);
router.put('/cart/:cartId/status',userController.updateCartStatus);
router.delete('/cart/:cartId/item/:productId', userController.deleteCartItems);
router.post('/addWishlist',userController.createWishlist)
router.put('/deleteWishlistProduct',userController.deleteWishlistProduct)
router.route('/wishlist/:userId')
  .get(userController.getWishlist)
  .delete(userController.deleteWishlist)
  
// get OrderList
router.get('/orderList/:userId',userController.getOrderListByUser);
router.get("/product/by-title/:title", userController.getProductByNameController);



router.route('/review')
.post(userController.createFeedback)
.get(userController.getFeedbacks);

router.route('/review/:id')
.put(userController.updateFeedback)
.delete(userController.deleteFeedback);


// ShippingAddress

router.post('/addShippingAddress/:userId',userController.addShippingAddress)
router.patch('/updatePrimaryAddress/:userId/:addressId',userController.updatePrimaryAddress)
router.put('/updateAddress/:userId/:addressId',userController.updateShippingAddress)
router.delete('/deleteAddress/:userId/:addressId',userController.deleteShippingAddress)
router.get('/getUserAddress/:userId',userController.getUserAddressById)


router.get('/contact-us/:id', userController.getContact);

// Order 

// specific order
router.get('/getOrderByUserId/:userId',userController.getOrderByUserId)
router.put('/order-status/:userId/:orderId',userController.orderStatusChange)
       
//Order Receipt

router.get('/getOrderReceipt/:userId/:orderId',userController.getOrderReceipt)

router.post('/initiate-payment', userController.initiatePayment);
router.get('/check-status/:transactionId', userController.checkPaymentStatus);

router.post('/generate-codes', userController.createCodes);
router.post('/use-code', userController.useCode);

router.post('/send-otp', userController.sendOtp);
router.post('/verify-and-apply', userController.verifyAndApplyCode);

export default router;