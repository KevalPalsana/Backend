// routes/auth.routes.js
import { Router } from 'express';
import authController from '../controllers/auth.controller.js';


const router = Router();

router.post('/user/otp', authController.requestOtp);     
router.post('/user/verify', authController.verifyOtp);

export default router;


