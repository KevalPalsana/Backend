import express from 'express';
import adminController from '../controllers/admin.js';
import { Router } from "express";

const router = Router();


router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/get_all', adminController.getAllAdmin);
router.get('/get_admin/:id', adminController.getAdminById);
router.put('/update_admin/:id', adminController.updateAdmin);
router.delete('/delete_admin/:id', adminController.deleteAdmin);

export default router;
