import express from 'express';
import designationController from '../controllers/designation.js';
import { Router } from "express";

const router = Router();

router.post('/add_designation', designationController.createDesignation);
router.get('/get_all_designation', designationController.getAllDesignation);
router.get('/get_designation/:id', designationController.getDesignationById);
router.put('/edit_designation/:id', designationController.updateDesignation);
router.delete('/delete_designation/:id', designationController.deleteDesignation);

export default router;
