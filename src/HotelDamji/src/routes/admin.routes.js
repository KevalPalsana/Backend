 import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import  {validate}  from '../middlewares/validation.middlewares.js';
import productValidation from '../validations/product.validation.js';

const router = Router();

// router.use(authMiddleware.authenticateAdmin);

router.route('/category')
  .post(adminController.createCategory)
  .get(adminController.getCategories);

router.route('/category/:id')
  .put(adminController.updateCategory)
  .delete(adminController.deleteCategory);

router.route('/product')  
  .post(adminController.createProduct)
  .get(adminController.getProducts);

router.route('/product/:id')
  .put(adminController.updateProduct)
  .delete(adminController.deleteProduct)
  .get(adminController.getProductsById);

router.get('/count-product', adminController.fetchCategoryWiseProductCount);


router.route('/slider-image')
  .post(adminController.addSliderImage)
  .get(adminController.getAllSliderImage);

router.route('/slider-image/:id')
 .put(adminController.updateSliderImage)
 .delete(adminController.deleteSliderImage);

router.route('/handpicked')
.post(adminController.addBasaltHandpicked)
.get(adminController.getBasaltHandpicked);

router.route('/handpicked/:id')
.put(adminController.updateBasaltHandpicked)
.get(adminController.getBasaltHandpickedById)
.delete(adminController.deleteBasaltHandpicked);

router.route('/about-us')
.post(adminController.addAboutUsPage)
.get(adminController.getAboutUsPage);

router.route('/about-us/:id')
.put(adminController.updateAboutUsPage)
.get(adminController.getAboutUsById)
.delete(adminController.deleteAboutUsPage);

router.route('/spotlite')
.post(adminController.addSpotLitePage)
.get(adminController.getSpotLitePage);

router.route('/spotlite/:id')
.put(adminController.updateSpotLitePage)
.delete(adminController.deleteSpotLitePage);

router.route('/gallery-image')
.post(adminController.createGalleryImage)
.get(adminController.getGalleryImages);

router.put('/gallery-image/:id', adminController.updateGalleryImage);
router.delete('/gallery-image/:id', adminController.deleteGalleryImage);

router.route('/gallery-title')
.post(adminController.createGalleryTitle)
.get(adminController.getGalleryTitle);

router.route('gallery-title/:id')
.put(adminController.updateGalleryTitle)
.delete(adminController.deleteGalleryTitle);

router.route('/gallery-category')
.post(adminController.createGalleryCategory)
.get(adminController.getGalleryCategory);

router.route('gallery-category/:id')
.put(adminController.updateGalleryCategory)
.delete(adminController.deleteGalleryCategory);

router.route('/facility')
.post(adminController.createFacility)
.get(adminController.getFacilities);

router.route('/facility/:id')
.put(adminController.updateFacility)
.delete(adminController.deleteFacility);

router.route('/amenities')
.post(adminController.createAmenities)
.get(adminController.getAmenities);

router.route('/amenities/:id')
.put(adminController.updateAmenities)
.delete(adminController.deleteAmenities);

router.route('/calculative')
.post(adminController.createCalculativeSection)
.get(adminController.getCalculativeSection);

router.route('/calculative/:id')
.put(adminController.updateCalculativeSection)
.delete(adminController.deleteCalculativeSection);

router.route('/darshan-timing')
.post(adminController.createDarshanTiming)
.get(adminController.getDarshanTiming);

router.route('/darshan-timing/:id')
.put(adminController.updateDarshanTiming)
.delete(adminController.deleteDarshanTiming);

router.route('/special-dates-timing')
.post(adminController.createSpecialDatesTiming)
.get(adminController.getSpecialDatesTiming);

router.route('/special-dates-timing/:id')
.put(adminController.updateSpecialDatesTiming)
.delete(adminController.deleteSpecialDatesTiming);


router.route('/life-at')
.post(adminController.createLifeAtBP)
.get(adminController.getLifeAtBP);

router.route('/life-at/:id')
.put(adminController.updateLifeAtBP)
.delete(adminController.deleteLifeAtBP);

router.route('/feedback')
.post(adminController.createFeedback)
.get(adminController.getFeedbacks);

router.route('/feedback/:id')
.put(adminController.updateFeedback)
.delete(adminController.deleteFeedback);

router.route('/offer')
.post(adminController.createOffer)
.get(adminController.getOffers);

router.route('/offer/:id')
.put(adminController.updateOffer)
.delete(adminController.deleteOffer);

router.route('/gallery')
.post(adminController.createBasaltGallery)
.get(adminController.getBasaltGallerys);

router.route('/gallery/:id')
.put(adminController.updateBasaltGallery)
.delete(adminController.deleteBasaltGallery);

router.route('/menu-category')
.post(adminController.createMenuCategory)
.get(adminController.getMenuCategories);

router.route('/menu-category/:id')
.put(adminController.updateMenuCategory)
.delete(adminController.deleteMenuCategory);

router.route('/menu-item')
.post(adminController.createMenuItem)
.get(adminController.getMenuItems);

router.route('/menu-item/:id')
.put(adminController.updateMenuItem)
.delete(adminController.deleteMenuItem);

router.route('/admin-feedback')
.post(adminController.createAdminFeedback)
.get(adminController.getAdminFeedbacks);

router.route('/admin-feedback/:id')
.put(adminController.updateAdminFeedback)
.delete(adminController.deleteAdminFeedback);

router.route('/privacy-policy')
.post(adminController.createPrivacyPolicy)
.get(adminController.getPrivacyPolicy);

router.route('/privacy-policy/:id')
.put(adminController.updatePrivacyPolicy)
.delete(adminController.deletePrivacyPolicy);

router.route('/blog')
.post(adminController.createHotelBlog)
.get(adminController.getHotelBlog);

router.route('/blog/:id')
.put(adminController.updateHotelBlog)
.get(adminController.getHotelBlogById)
.delete(adminController.deleteHotelBlog);

router.route('/subblog')
.post(adminController.createSubBlog)
.get(adminController.getSubBlog);

router.route('/subblog/:id')
.put(adminController.updateSubBlog)
.delete(adminController.deleteSubBlog);

router.route('/contact-us')
.post(adminController.createContactUs)
.get(adminController.getContactUs);

router.route('/contact-us/:id')
.put(adminController.updateContactUs)
.delete(adminController.DeleteContactUs);

router.route('/wallet-amount')
.post(adminController.createWalletAmount)
.get(adminController.getWalletAmount);

router.route('/wallet-amount/:id')
.put(adminController.updateWalletAmount)
.delete(adminController.deleteWalletAmount);

router.route('/second-section-title')
.post(adminController.createSecondSectionTitle)
.get(adminController.getSecondSectionTitle);

router.route('/second-section-title/:id')
.put(adminController.updateSecondSectionTitle)
.delete(adminController.deleteSecondSectionTitle);

router.route('/second-section')
.post(adminController.createSecondSection)
.get(adminController.getSecondSection);

router.route('/second-section/:id')
.put(adminController.updateSecondSection)
.delete(adminController.deleteSecondSection);

router.route('/amenities-option')
.post(adminController.createAmenitiesOption)
.get(adminController.getAmenitiesOption);

router.route('/amenities-option/:id')
.put(adminController.updateAmenitiesOption)
.get(adminController.getAmenitiesOptionById)
.delete(adminController.deleteAmenitiesOption);

router.route('/amenities-sub-category')
.post(adminController.createAmenitiesSubCategory)
.get(adminController.getAmenitiesSubCategory);

router.route('/amenities-sub-category/:id')
.put(adminController.updateAmenitiesSubCategory)
.get(adminController.getAmenitiesSubCategoryById)
.delete(adminController.deleteAmenitiesSubCategory);

router.get('/animities-sub-category-by-aminities/:amenitiesId', adminController.getSubCategoriesByAmenitiesId);
router.get('/amenities-option-by-sub-category/:subCategoryId', adminController.getAmenitiesOptionByAmenitiesSubCategory);
router.get("/products-with-amenities", adminController.fetchProductsWithAmenities);


router.route('/testimonial')
.post(adminController.createBasaltTestimonial)
.get(adminController.getBasaltTestimonial);

router.route('/testimonial/:id')
.put(adminController.updateBasaltTestimonial)
.delete(adminController.deleteBasaltTestimonial);

router.route('/faq')
.post(adminController.createBasaltFAQ)
.get(adminController.getBasaltFAQ);

router.route('/faq/:id')
.put(adminController.updateBasaltFAQ)
.delete(adminController.deleteBasaltFAQ);

router.route('/banner')
.post(adminController.createBanner)
.get(adminController.getBanner);

router.route('/banner/:id')
.put(adminController.updateBanner)
.delete(adminController.deleteBanner);

router.route('/special-teriff')
.post(adminController.createSpecialTeriff)
.get(adminController.getSpecialTeriff);

router.route('/special-teriff/:id')
.put(adminController.updateSpecialTeriff)
.get(adminController.getSpecialTeriffById)
.delete(adminController.deleteSpecialTeriff);

router.route('/razor-pay')
.post(adminController.createRazorPay)
.get(adminController.getRazorPay);

router.route('/razor-pay/:id')
.put(adminController.updateRazorPay)
.delete(adminController.deleteRazorPay);

router.route('/extra-charge')
.post(adminController.createExtraCharges)
.get(adminController.getExtraCharges);

router.route('/extra-charge/:id')
.put(adminController.updateExtraCharge)
.delete(adminController.deleteExtraCharge);



export default router;
