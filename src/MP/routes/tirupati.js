import express from 'express';
import { Router } from 'express';
import feedbackController from '../controllers/tirupati.js';

const router = Router() ;

router.post('/tirupati/create-feedback', feedbackController.createFeedback);


router.get('/tirupati/feedbacks', feedbackController.getFeedbacks);

router.put('/tirupati/:id/assign', feedbackController.assignFeedback);
router.delete('/tirupati/delete/:id', feedbackController.deleteFeedback);


export default router;