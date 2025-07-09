import express from 'express';
import { Router } from 'express';
import feedbackController from '../controllers/shradhdhaPark.js';

const router = Router() ;

router.post('/shradhdha-park/create-feedback', feedbackController.createFeedback);


router.get('/shradhdha-park/feedbacks', feedbackController.getFeedbacks);

router.put('/shradhdha-park/:id/assign', feedbackController.assignFeedback);

router.delete('/shradhdha-park/delete/:id', feedbackController.deleteFeedback);

export default router;