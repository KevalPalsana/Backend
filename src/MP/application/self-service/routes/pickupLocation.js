import express from 'express';
import premvatiController from '../controllers/pickupLocation.js';
import storage from '../../../utils/fileUpload.js';  
import multer from 'multer';
const uploadImage = multer({ storage: storage }).single('image');
import { Router } from "express";

const router = Router();


router.post('/premvati', uploadImage, premvatiController.createPremvatiList);

router.put('/premvati/:id', uploadImage, premvatiController.updatePremvatiList);


router.get('/premvati', premvatiController.getPremvatiList);
router.get('/premvati/:id', premvatiController.getPremvatiListById);
router.delete('/premvati/:id', premvatiController.deletePremvatiList);

export default router;
