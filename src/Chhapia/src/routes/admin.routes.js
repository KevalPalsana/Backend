import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router();

router
  .route('/service')
  .post(adminController.createService)
  .get(adminController.getService);

router
  .route('/service/:id')
  .put(adminController.updateService)
  .delete(adminController.deleteService);

router
  .route('/why-choose-us')
  .post(adminController.createWhyChooseUs)
  .get(adminController.getWhyChooseUs);

router
  .route('/why-choose-us/:id')
  .put(adminController.updateWhyChooseUs)
  .delete(adminController.deleteWhyChooseUs);

router
  .route('/about-us')
  .post(adminController.createAboutUs)
  .get(adminController.getAboutUs)
  .put(adminController.updateAboutUs);

router
  .route('/faq')
  .post(adminController.createFaq)
  .get(adminController.getFaq);

router
  .route('/faq/:id')
  .put(adminController.updateFaq)
  .delete(adminController.deleteFaq);

router
  .route('/testimonial')
  .post(adminController.createTestimonial)
  .get(adminController.getTestimonial);

router
  .route('/testimonial/:id')
  .put(adminController.updateTestimonial)
  .delete(adminController.deleteTestimonial);

router
  .route('/blog')
  .post(adminController.createBlog)
  .get(adminController.getBlog);

router
  .route('/blog/:id')
  .put(adminController.updateBlog)
  .delete(adminController.deleteBlog);

router
  .route('/calculation')
  .post(adminController.createCalculation)
  .get(adminController.getCalculation);

router
  .route('/calculation/:id')
  .put(adminController.updateCalculation)
  .delete(adminController.deleteCalculation);

router
  .route('/core-value')
  .post(adminController.createCoreValue)
  .get(adminController.getCoreValue);

router
  .route('/core-value/:id')
  .put(adminController.updateCoreValue)
  .delete(adminController.deleteCoreValue);

router
  .route('/contact')
  .post(adminController.createContactUs)
  .get(adminController.getContactUs);

router
  .route('/contact/:id')
  .patch(adminController.updateContactUs)
  .delete(adminController.deleteContactUs);

export default router;
