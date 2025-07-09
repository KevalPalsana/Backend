import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import  {validate}  from '../middlewares/validation.middlewares.js';
import productValidation from '../validations/product.validation.js';
import multer from 'multer';

const router = Router() ;

router.route('/text-line')
  .post(adminController.createTextLine);

  router.get('/text-line', adminController.getTextLine);

router.route('/text-line/:id')
  .put(adminController.updateTextLine)
  .delete(adminController.deleteTextLine);

router.route('/key-achievement')
  .post(adminController.createKeyAchievement)
  .get(adminController.getKeyAchievement);

router.route('/key-achievement/:id')
  .put(adminController.updateKeyAchievement)
  .delete(adminController.deleteKeyAchievement);
  
router.route('/testimonial')
.post(adminController.createFeedback)
.get(adminController.getFeedbacks);

router.route('/testimonial/:id')
.put(adminController.updateFeedback)
.delete(adminController.deleteFeedback);


router.route('/popular-category')
.post(adminController.createPopularCategory)
.get(adminController.getPopularCategory);

router.route('/popular-category/:id')
.put(adminController.updatePopularCategory)
.delete(adminController.deletePopularCategory);

router.route('/faq')
.post(adminController.createFaq)
.get(adminController.getFaqs);

router.route('/faq/:id')
.put(adminController.updateFaq)
.delete(adminController.deleteFaq);

router.route('/team')
.post(adminController.createTeam)
.get(adminController.getTeam);

router.route('/team/:id')
.get(adminController.getTeamById)
.put(adminController.updateTeam)
.delete(adminController.deleteTeam);

router.route('/about-us')
.post(adminController.addAboutUsPage)
.get(adminController.getAboutUsPage);

router.route('/about-us/:id')
.put(adminController.updateAboutUsPage)
.delete(adminController.deleteAboutUsPage);

router.route('/blog')
.post(adminController.addBlog)
.get(adminController.getBlog);

router.route('/blog/:id')
.put(adminController.updateBlog)
.delete(adminController.deleteBlog);

router.route('/why-choose-us')
.post(adminController.createWhyChooseUs)
.get(adminController.getWhyChooseUs);

router.route('/why-choose-us/:id')
.put(adminController.updateWhyChooseUs)
.delete(adminController.deleteWhyChooseUs);

router.route('/service-detail')
.post(adminController.createServiceDetail)
.get(adminController.getServiceDetail);

router.route('/service-detail/:id')
.put(adminController.updateServiceDetail)
.delete(adminController.deleteServiceDetail);


router.route('/achievement')
.post(adminController.createAchievement)
.get(adminController.getAchievement);

router.route('/achievement/:id')
.put(adminController.updateAchievement)
.delete(adminController.deleteAchievement);

router.route('/service')
.post(adminController.createService)
.get(adminController.getService);

router.route('/service/:id')
.put(adminController.updateService)
.delete(adminController.deleteService);

router.route('/popular-tag')
.post(adminController.createPopularTag)
.get(adminController.getPopularTag);

router.route('/popular-tag/:id')
.put(adminController.updatePopularTag)
.delete(adminController.deletePopularTag);

router.get('/contact', adminController.getAllContacts);

router.delete('/contact/:id', adminController.deleteContactUs);


export default router;
