import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';


const router = Router() ;

router.get('/intro', adminController.getIntroScreens);
router.post('/intro', adminController.createIntro);
router.delete('/intro/:id', adminController.deleteIntro);
router.put('/intro/:id', adminController.updateIntro);
router.get('/user/:id', adminController.getUserByIdAdmin);
router.get('/users', adminController.getAllUsersAdmin);
router.get('/matches', adminController.getAllMatches);
router.get('/interactions/:userId', adminController.getUserInteractions);
router.get('/stars/:userId', adminController.getStarsForUser); 

router.route("/subscription")
.post(adminController.createSubscription)
.get(adminController.getAllSubscriptions);

router.route("/subscription/:id")
.put(adminController.updateSubscription)
.get(adminController.getSubscriptionById)
.delete(adminController.deleteSubscription);

router.route("/aboutus")
.post(adminController.createAboutus)
.get(adminController.getAboutus)

router.route("/termconditions")
.post(adminController.createTermConditions)
.get(adminController.getTermConditions)

router.route("/policy")
.post(adminController.createPolicy)
.get(adminController.getPolicy)

export default router;
