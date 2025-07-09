import express from 'express';
import { uploadPhoto, createSplashScreenImage, getAllSplashScreenImages, getSplashScreenImageById, updateSplashScreenImage, deleteSplashScreenImage} from '../controllers/splashImage.js';
import { Router } from "express";

const router = Router();


router.post('/add_image', uploadPhoto, createSplashScreenImage);

router.get('/get_all_images', getAllSplashScreenImages);

router.get('get_image/:id', getSplashScreenImageById);

router.put('edit_image/:id', updateSplashScreenImage);

router.delete('delete_image/:id', deleteSplashScreenImage);

export default router;
