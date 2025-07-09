import { Router } from 'express';
import authController from '../controllers/auth.controller.js';


const router = Router();


router.post('/user/register',authController.registerUser); 
router.post('/admin/register', authController.registerAdmin);
router.post('/admin/login', authController.loginAdmin);

export default router;