import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middlewares.js';
import cartValidation from '../validations/cart.validation.js'

const router = Router();


router.get('/products', userController.getProducts);
router.get('/product/:productId', userController.getProductsById);
router.get('/categories', userController.getCategories);
router.post('/create-order', userController.createOrderSummaryHandler);
router.route('/order-summary/:id')
.get(userController.getOrderSummaryById)
.put(userController.updateOrderSummaryByIdHandler)
.delete(userController.deleteOrderSummaryByIdHandler)

router.get('/order-list/:userId', userController.getOrdersByUserId);

router.get('/user/:userId', userController.getUserById);

//cart

router.post('/cart', userController.createCart); 
router.get('/cart/:userId', userController.getCartByUserId);
router.put('/cart/:cartId', validate(cartValidation.updateCartItemsSchema),userController.updateCartItems);
router.put('/cart/:cartId/status',userController.updateCartStatus);
router.delete('/cart/:cartId/item/:productId', userController.deleteCartItems);
router.get('/coupons', userController.getCoupon);
router.get('/blogs', userController.getBlog);
router.get('/about-us', userController.getAboutUsPage);
router.get('/about-us/:id', userController.getAboutUsPage);


// router.use(authMiddleware.authenticateUser);
//wishlist

router.post('/addWishlist',userController.createWishlist)
router.put('/deleteWishlistProduct',userController.deleteWishlistProduct)
router.route('/wishlist/:userId')
  .get(userController.getWishlist)
  .delete(userController.deleteWishlist)
  
// get OrderList
router.get('/orderList/:userId',(validate(cartValidation.validateOrderRequest)),userController.getOrderListByUser);


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

router.route('/contact-us')
.post(userController.createContact)
.get(userController.getContacts);

router.get('/contact-us/:id', userController.getContact);

// Order 

// specific order
router.get('/getOrderByUserId/:userId',userController.getOrderByUserId)
router.put('/order-status/:userId/:orderId',userController.orderStatusChange)

//Order Receipt

router.get('/getOrderReceipt/:userId/:orderId',userController.getOrderReceipt)

export default router;