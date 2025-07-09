import express from'express';
import kshetraController from'../controllers/kshetra.js';
import { Router } from "express";

const router = Router();

router.post('/add_kshetra', kshetraController.createKshetra);
router.get('/get_all_kshetra', kshetraController.getAllKshetra);
router.get('/get_kshetra/:id', kshetraController.getKshetraById);
router.put('/edit_kshetra/:id', kshetraController.updateKshetra);
router.delete('/delete_kshetra/:id', kshetraController.deleteKshetra);

export default router;
