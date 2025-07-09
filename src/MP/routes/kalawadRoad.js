import express from 'express';
import { Router } from 'express';
import feedbackController from '../controllers/kalawadRoad.js';

const router = Router() ;
router.post('/kalawad-road/create-feedback', feedbackController.createFeedback);


router.get('/kalawad-road/feedbacks', feedbackController.getFeedbacks);

router.put('/kalawad-road/:id/assign', feedbackController.assignFeedback);

router.delete('/kalawad-road/delete/:id', feedbackController.deleteFeedback);




export default router;