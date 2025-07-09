import express from 'express';
import { Router } from 'express';
import userController from '../controllers/user.js';

const router = Router() ;

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
// router.get('/users', userController.getAllUsers); 

export default router;