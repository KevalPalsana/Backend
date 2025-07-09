import express from 'express';
import { Router } from 'express';
import cartController from '../controllers/cart.js';

const router = Router();

router.post('/cart', cartController.addToCart);

router.get('/cart/:userId', cartController.getCartByUserId);

router.delete('/cart', cartController.removeFromCart);

router.delete('/cart/clear/:userId', cartController.clearCart);

router.put('/cart/update', cartController.updateCart);

router.delete('/cart/delete-food-item', cartController.deleteFoodItemFromCart);

export default router;
