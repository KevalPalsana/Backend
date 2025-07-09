import express from 'express';
import { Router } from 'express';
import feedbackController from '../controllers/pramukhVatika.js';

const router = Router() ;

router.post('/pramukh-vatika/create-feedback', feedbackController.createFeedback);


router.get('/pramukh-vatika/feedbacks', feedbackController.getFeedbacks);

router.put('/pramukh-vatika/:id/assign', feedbackController.assignFeedback);
router.delete('/pramukh-vatika/delete/:id', feedbackController.deleteFeedback);


export default router;