import express from 'express';
import premvatiController from '../controllers/pickupLocation.js';
import { Router } from "express";

const router = Router();

router.post('/premvati', premvatiController.createPremvatiList);

router.put('/premvati/:id', premvatiController.updatePremvatiList);


router.get('/premvati', premvatiController.getPremvatiList);
router.get('/premvati/:id', premvatiController.getPremvatiListById);
router.delete('/premvati/:id', premvatiController.deletePremvatiList);

export default router;
