import express from 'express';
import { Router } from 'express';
import feedbackController from '../controllers/feedback.js';

const router = Router() ;


router.post('/create-feedback', feedbackController.createFeedback);


router.get('/all-feedbacks', feedbackController.getFeedbackList);

router.put('/feedback/:id/assign', feedbackController.assignFeedback);
router.delete('/feedback/delete/:id', feedbackController.deleteFeedback);




export default router;