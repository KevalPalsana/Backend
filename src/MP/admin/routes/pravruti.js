import express from 'express';
import pravrutiController from '../controllers/pravruti.js';
import { Router } from "express";

const router = Router();

router.post('/add_pravruti', pravrutiController.createPravruti);
router.get('/get_all_pravruti', pravrutiController.getAllPravruti);
router.get('/get_pravruti/:id', pravrutiController.getPravrutiById);
router.put('/edit_pravruti/:id', pravrutiController.updatePravruti);
router.delete('/delete_pravruti/:id', pravrutiController.deletePravruti);

export default router;
