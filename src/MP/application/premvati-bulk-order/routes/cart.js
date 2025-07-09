import  express from 'express';
import  cartController from '../controller/cart.js';
import { Router } from "express";

const router = Router();

router.post('/cart', cartController.addToCart);

router.get('/cart/:userId', cartController.getCartByUserId);

router.delete('/cart', cartController.removeFromCart);

router.delete('/cart/clear/:userId', cartController.clearCart);

router.put('/cart/update', cartController.updateCart);

router.delete('/cart/delete-food-item', cartController.deleteFoodItemFromCart);

export default router;
