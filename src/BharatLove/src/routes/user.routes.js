import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

router.post('/location', userController.setUserLocation);
router.post('/onboarding', userController.submitOnboarding);
router.post('/filter-matches', userController.getFilteredMatches);
router.get('/data/:userId', userController.getUserProfile);
router.post('/report', userController.reportUser);
router.post('/subscribe', userController.createSubscription);
router.post('/action', userController.recordMatchAction);
router.put('/update/:userId', userController.updateProfile);
router.put('/discovery-settings', userController.updateDiscoverySettings);
router.get('/intro', userController.getIntroScreens);


export default router;

