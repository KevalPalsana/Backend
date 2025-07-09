import express from 'express';
import userController from '../controllers/premvatiUser.js';
import { Router } from "express";

const router = Router();

router.post('/add_user', userController.registerUser);
router.get('/get_all_user', userController.getAllUsers);
router.get('/get_user/:id', userController.getUserById);
router.put('/edit_user/:id', userController.updateUser);
router.delete('/delete_user/:id', userController.deleteUser);
router.post('/user_login', userController.userLogin);

export default router;
