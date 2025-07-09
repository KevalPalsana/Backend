import express from 'express';
import mandalController from '../controllers/mandal.js';
import { Router } from "express";

const router = Router();

router.post('/mandal', mandalController.createMandal);
router.get('/mandals', mandalController.getMandals);
router.get('/mandal/:id', mandalController.getMandalById);
router.put('/mandal/:id', mandalController.updateMandal);
router.delete('/mandal/:id', mandalController.deleteMandal);


