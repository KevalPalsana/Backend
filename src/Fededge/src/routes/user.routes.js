import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middlewares.js';
import cartValidation from '../validations/cart.validation.js'

const router = Router();


router.get('/user/:userId', userController.getUserById);

//cart
router.get('/coupons', userController.getCoupon);
router.get('/blogs', userController.getBlog);
router.get('/about-us', userController.getAboutUsPage);
router.get('/about-us/:id', userController.getAboutUsPage);
  
router.route('/review')
.get(userController.getFeedbacks);

router.route('/review/:id')
.put(userController.updateFeedback)
.delete(userController.deleteFeedback);




// ShippingAddress

router.get('/getUserAddress/:userId',userController.getUserAddressById)

router.route('/contact-us')
.post(userController.createContact)
.get(userController.getContacts);

router.get('/contact-us/:id', userController.getContact);


export default router;