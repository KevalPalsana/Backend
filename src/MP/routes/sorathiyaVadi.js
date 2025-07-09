import express from 'express';
import { Router } from 'express';
import feedbackController from '../controllers/sorathiyaVadi.js';

const router = Router() ;

router.post('/sorathiya-vadi/create-feedback', feedbackController.createFeedback);


router.get('/sorathiya-vadi/feedbacks', feedbackController.getFeedbacks);

router.put('/sorathiya-vadi/:id/assign', feedbackController.assignFeedback);

router.delete('/sorathiya-vadi/delete/:id', feedbackController.deleteFeedback);


export default router;