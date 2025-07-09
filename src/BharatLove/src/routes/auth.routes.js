import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validation.middlewares.js';
import authValidation from '../validations/auth.validation.js';


const router = Router();


router.post('/user/register', authController.registerUser); 
router.post('/user/login',authController.loginUser); 
router.put('/user/:userId',authController.updateUser)
router.get('/user/refer-price/:userId', authController.getReferPrice);
router.put('/user/refer-price/:userId', authController.getReferPrice);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyOtp);
router.post('/reset-password', authController.resetPassword);

// admin 
router.post('/admin/register', authController.registerAdmin); 
router.post('/admin/login', authController.loginAdmin); 
router.get('/all-users', authController.getAllUsers);



export default router;