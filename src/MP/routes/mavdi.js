import express from 'express';
import { Router } from 'express';
import feedbackController from '../controllers/mavdi.js';

const router = Router() ;

router.post('/mavdi/create-feedback', feedbackController.createFeedback);


router.get('/mavdi/feedbacks', feedbackController.getFeedbacks);

router.put('/mavdi/:id/assign', feedbackController.assignFeedback);

router.delete('/mavdi/delete/:id', feedbackController.deleteFeedback);


export default router;