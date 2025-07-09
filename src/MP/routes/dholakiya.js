import express from 'express';
import { Router } from 'express';
import feedbackController from '../controllers/dholakiya.js';

const router = Router() ;

router.post('/dholakiya/create-feedback', feedbackController.createFeedback);


router.get('/dholakiya/feedbacks', feedbackController.getFeedbacks);

router.put('/dholakiya/:id/assign', feedbackController.assignFeedback);
router.delete('/dholakiya/delete/:id', feedbackController.deleteFeedback);


export default router;