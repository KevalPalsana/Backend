import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import  {validate}  from '../middlewares/validation.middlewares.js';
import productValidation from '../validations/product.validation.js';
import multer from 'multer';

const router = Router() ;
const upload = multer({ dest: 'uploads/' });

router.get('/categories', adminController.getCategories);
router.get('/visa-enquiries', adminController.getVisaEnquiry);
router.get('/passport-inquiries', adminController.getPassportInquiry);
router.get('/hotel-price', adminController.getAllPrice);
router.get('/hotel-price/:id',adminController.getPriceByHotel);
router.get('/holiday-packages', adminController.getHolidayPackages);
router.get('/holiday-packages/:id', adminController.getHolidayPackagesByCategory);
router.get('/hotels', adminController.getAllHotels);
router.get('/hotel/:id', adminController.getHotelById);
router.get('/enquiries', adminController.getAllEnquiries);
router.get("/enquiry/:id", adminController.getEnquiryById);
router.get("/banners", adminController.getAllBanners);
router.get("/banner/:id", adminController.getBanerById);
router.get("/included", adminController.getAllIncluded);
router.get("/included/:id", adminController.getIncludedById);
router.get("/related-products/:id", adminController.getRelatedProducts);
router.get("/rooms", adminController.getAllRooms);
router.get("/room/:id", adminController.getRoomById);
router.get("/contact-us", adminController.getAllContactUs);
router.get("/contact-us/:id", adminController.getContactUsById);
router.get("/countries", adminController.getAllCountries);
router.get("/country/:id", adminController.getCountryById);
router.get("/tags", adminController.getAllTags);
router.get("/tag/:id", adminController.getTagById);
router.get("/packages", adminController.getAllPackages);
router.get("/package/:id", adminController.getPackageById);
router.get("/packages/:categoryId", adminController.getPackagesByCategory);
router.get("/blogs", adminController.getAllBlogs);
router.get("/blog/:id", adminController.getBlogById);
router.get("/blog-details", adminController.getAllBlogDetails);
router.get("/blog-detail/:blogId", adminController.getBlogDetailsByBlog);
router.get("/about-us", adminController.getAboutUs);
router.get("/faqs", adminController.getAllFaqs);
router.get("/visa-experts", adminController.getAllExperts);
router.get("/visa-gateway", adminController.GetAllGateways);
router.get("/testimonials", adminController.getAllTestimonials);
router.get("/visa-form", adminController.getAllVisaForm);
router.get("/passport-form", adminController.getAllPassportForm);
router.get("/visa-by-country/:countryId", adminController.getVisaByCountry);
router.get("/images", adminController.getAllImages);
router.get("/package-by-tag/:tagId", adminController.getPackagesByTag);
router.get("/package-by-country/:countryId", adminController.getPackagesByCountry);
router.get("/package-by-price", adminController.getPackagesByPrice);
router.get("/package-by-duration/:duration", adminController.getPackagesByDuration);
router.get("/customers", adminController.getAllCustomer);
router.get("/themes", adminController.getAllThemes);
// router.use(authMiddleware.authenticateAdmin);

router.route('/category')
  .post(adminController.createCategory);

router.route('/category/:id')
  .put(adminController.updateCategory)
  .delete(adminController.deleteCategory);

router.route('/visa-enquiry')
  .post(adminController.createVisaEnquiry);

  router.route('/visa-enquiry/:id')
  .put(adminController.updateVisaEnquiry)
  .delete(adminController.deleteVisaEnquiry);

  
router.route('/passport-inquiry')
.post(adminController.createPassportInquiry);

router.route('/passport-inquiry/:id')
.put(adminController.updatePassportInquiry)
.delete(adminController.deletePassportInquiry);

  router.route('/holiday-package')
  .post(adminController.createHolidayPackage);

  router.route('/holiday-package/:id')
  .put(adminController.updateHolidayPackage)
  .delete(adminController.deleteHolidayPackage);

  router.route('/hotel')
  .post(adminController.createHotel);

  router.route('/hotel/:id')
  .put(adminController.updateHotel)
  .delete(adminController.deleteHotel);

  router.route('/hotel-price')
  .post(adminController.createHotelPrice);

  router.route('/hotel-price/:id')
  .put(adminController.updateHotelPrice)
  .delete(adminController.deleteHotelPrice);

  router.route('/inquiry')
  .post(adminController.createEnquiry);

  router.route('/inquiry/:id')
  .put(adminController.updateEnquiry)
  .delete(adminController.deleteEnquiry);

  router.route('/included')
  .post(adminController.createIncluded);

  router.route('/included/:id')
  .put(adminController.updateIncluded)
  .delete(adminController.deleteIncluded);

  router.route('/room')
  .post(adminController.createRoom);

  router.route('/room/:id')
  .put(adminController.updateRoom)
  .delete(adminController.deleteRoom);

  router.route('/country')
  .post(adminController.createCountry);

  router.route('/country/:id')
  .put(adminController.updateCountry)
  .delete(adminController.deleteCountry);

  router.route('/tag')
  .post(adminController.createTag);

  router.route('/tag/:id')
  .put(adminController.updateTag)
  .delete(adminController.deleteTag);

  router.route('/package')
  .post(adminController.createPackage);

  router.route('/package/:id')
  .put(adminController.updatePackage)
  .delete(adminController.deletePackage);

  router.route('/blog')
  .post(adminController.createBlog);

  router.route('/blog/:id')
  .put(adminController.updateBlog)
  .delete(adminController.deleteBlog);

  router.route('/blog-detail')
  .post(adminController.createBlogDetails);

  router.route('/blog-detail/:id')
  .put(adminController.updateBlogDetail)
  .delete(adminController.deleteBlogDetail);

  router.route('/about-us')
  .post(adminController.createAboutUs);

  router.route('/faq')
  .post(adminController.createFaq);

  router.route('/faq/:id')
  .put(adminController.updateFaq)
  .delete(adminController.deleteFaq);

  router.route('/testimonial')
  .post(adminController.createTestimonial);

  router.route('/testimonial/:id')
  .put(adminController.updateTestimonial)
  .delete(adminController.deleteTestimonial);

  router.route('/visa-expert')
  .post(adminController.createExpert);

  router.route('/visa-expert/:id')
  .put(adminController.updateExpert)
  .delete(adminController.deleteExpert);

  router.route('/visa-gateway')
  .post(adminController.createGateway);

  router.route('/visa-gateway/:id')
  .put(adminController.updateGateway)
  .delete(adminController.deleteGateway);

  router.route('/visa-form')
  .post(adminController.createVisaForm);

  router.route('/visa-form/:id')
  .put(adminController.updateVisaForm)
  .delete(adminController.deleteVisaForm);

  router.route('/passport-form')
  .post(adminController.createPassportForm);

  router.route('/passport-form/:id')
  .put(adminController.updatePassportForm)
  .delete(adminController.deletePassportForm);

  
  router.route('/image')
  .post(adminController.createImage);

  router.route('/image/:id')
  .put(adminController.updateImage)
  .delete(adminController.deleteImage);

  router.route('/theme')
  .post(adminController.createTheme);

  router.route('/theme/:id')
  .put(adminController.updateTheme)
  .delete(adminController.deleteTheme);

  router.delete("/customer/:id", adminController.deleteCustomer);


export default router;
