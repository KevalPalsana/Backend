import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/categories", adminController.getCategories);
router.get("/products", adminController.getProducts);
router.get("/product/:id", adminController.getProductsByCategoryId);
router.get("/blog-details", adminController.getAllBlogContains);
router.get("/blog-detail/:blogId", adminController.getBlogContainsBYBlogId);
router.get("/industry-category/grouped", adminController.getGroupedCategories);
router.get("/products/:id", adminController.getProductById);


// router.use(authMiddleware.authenticateAdmin);

router.route("/category").post(adminController.createCategory);

router
  .route("/category/:id")
  .put(adminController.updateCategory)
  .delete(adminController.deleteCategory);

router
  .route("/banner")
  .post(adminController.createBanner)
  .get(adminController.getAllBanner);

router
  .route("/banner/:id")
  .put(adminController.updateBanner)
  .delete(adminController.deleteBanner);

router
  .route("/home-about")
  .post(adminController.createHomeAbout)
  .get(adminController.getHomeAbout);

router
  .route("/home-about/:id")
  .put(adminController.updateHomeAbout)
  .delete(adminController.deleteHomeAbout);

router
  .route("/home-contact")
  .post(adminController.createHomeContact)
  .get(adminController.getHomeContact);

router
  .route("/home-contact/:id")
  .put(adminController.updateHomeContact) 
  .delete(adminController.deleteHomeContact);

router
  .route("/industry-category")
  .post(adminController.createIndustriesCategory)
  .get(adminController.getIndustriesCategory);

router
  .route("/industry-category/:id")
  .put(adminController.updateIndustriesCategory)
  .delete(adminController.deleteIndustriesCategory);

router
  .route("/gallery")
  .post(adminController.createGallery)
  .get(adminController.getGallery);

router
  .route("/gallery/:id")
  .put(adminController.updateGallery)
  .delete(adminController.deleteGallery);

router
  .route("/event")
  .post(adminController.createEvent)
  .get(adminController.getEvent);

router
  .route("/event/:id")
  .put(adminController.updateGallery)
  .delete(adminController.deleteGallery);

router
  .route("/main-category")
  .post(adminController.createMainCategory)
  .get(adminController.getMainCategory);

router
  .route("/main-category/:id")
  .put(adminController.updateMainCategory)
  .delete(adminController.deleteMainCategory);

router
  .route("/product-usp")
  .post(adminController.createProductUSP)
  .get(adminController.getProductUSP);

router
  .route("/product-usp/:id")
  .put(adminController.updateProductUSP)
  .delete(adminController.deleteProductUSP);

router
  .route("/product-packing")
  .post(adminController.createProductPacking)
  .get(adminController.getProductPacking);

router
  .route("/product-packing/:id")
  .put(adminController.updateProductPacking)
  .delete(adminController.deleteProductPacking);

router
  .route("/spotlite")
  .post(adminController.createSpotlite)
  .get(adminController.getSpotlite);

router
  .route("/spotlite/:id")
  .put(adminController.updateSpotlite)
  .delete(adminController.deleteSpotlite);

router.route("/product").post(adminController.createProduct);

router
  .route("/product/:id")
  .put(adminController.updateProduct)
  .delete(adminController.deleteProduct);

router
  .route("/testimonial")
  .post(adminController.createFeedback)
  .get(adminController.getFeedbacks);

router
  .route("/testimonial/:id")
  .put(adminController.updateFeedback)
  .delete(adminController.deleteFeedback);

router
  .route("/about-us")
  .post(adminController.addAboutUs)
  .get(adminController.getAboutUs);

router
  .route("/about-us/:id")
  .put(adminController.updateAboutUs)
  .delete(adminController.deleteAboutUs);

router
  .route("/first-year")
  .post(adminController.createFirstYear)
  .get(adminController.getFirstYear);

router
  .route("/first-year/:id")
  .put(adminController.updateFirstYear)
  .delete(adminController.deleteFirstYear);

router
  .route("/second-year")
  .post(adminController.createSecondYear)
  .get(adminController.getSecondYear);

router
  .route("/second-year/:id")
  .put(adminController.updateSecondYear)
  .delete(adminController.deleteSecondYear);

router
  .route("/third-year")
  .post(adminController.createThirdYear)
  .get(adminController.getThirdYear);

router
  .route("/third-year/:id")
  .put(adminController.updateThirdYear)
  .delete(adminController.deleteThirdYear);

router
  .route("/fourth-year")
  .post(adminController.createForthYear)
  .get(adminController.getForthYear);

router
  .route("/fourth-year/:id")
  .put(adminController.updateForthYear)
  .delete(adminController.deleteForthYear);

router
  .route("/core-value")
  .post(adminController.createCoreValue)
  .get(adminController.getCoreValue);

router
  .route("/core-value/:id")
  .put(adminController.updateCoreValue)
  .delete(adminController.deleteCoreValue);

router
  .route("/calculation")
  .post(adminController.createCalculation)
  .get(adminController.getCalculation);

router
  .route("/calculation/:id")
  .put(adminController.updateCalculation)
  .delete(adminController.deleteCalculation);

router
  .route("/hero-section")
  .post(adminController.addHeroSection)
  .get(adminController.getHeroSection);

router
  .route("/hero-section/:id")
  .put(adminController.updateHeroSection)
  .delete(adminController.deleteHeroSection);

router
  .route("/popular-category")
  .post(adminController.createPopularCategory)
  .get(adminController.getPopularCategory);

router
  .route("/popular-category/:id")
  .put(adminController.updatePopularCategory)
  .delete(adminController.deletePopularCategory);

router
  .route("/faq")
  .post(adminController.createFaq)
  .get(adminController.getFaqs);

router
  .route("/faq/:id")
  .put(adminController.updateFaq)
  .delete(adminController.deleteFaq);

router
  .route("/team")
  .post(adminController.createTeam)
  .get(adminController.getTeam);

router
  .route("/team/:id")
  .get(adminController.getTeamById)
  .put(adminController.updateTeam)
  .delete(adminController.deleteTeam);

router
  .route("/company-info")
  .post(adminController.createCompanyInfo)
  .get(adminController.getCompanyInfo);

router
  .route("/company-info/:id")
  .put(adminController.updateCompanyInfo)
  .delete(adminController.deleteCompanyInfo);

// router.route('/about-us')
// .post(adminController.addAboutUsPage)
// .get(adminController.getAboutUsPage);

// router.route('/about-us/:id')
// .put(adminController.updateAboutUsPage)
// .get(adminController.getAboutUsById)
// .delete(adminController.deleteAboutUsPage);

router
  .route("/blog")
  .post(adminController.addBlog)
  .get(adminController.getBlog);

router
  .route("/blog/:id")
  .put(adminController.updateBlog)
  .delete(adminController.deleteBlog);

router
  .route("/what-we-offer")
  .post(adminController.createWhatWeOffer)
  .get(adminController.getWhatWeOffer);

router
  .route("/what-we-offer/:id")
  .put(adminController.updateWhatWeOffer)
  .delete(adminController.deleteWhatWeOffer);

router
  .route("/why-choose-us")
  .post(adminController.createWhyChoose)
  .get(adminController.getAllWhyChoose);

router
  .route("/what-chose-us/:id")
  .put(adminController.updateWhyChoose)
  .delete(adminController.deleteWhyChoose);

router
  .route("/section")
  .post(adminController.createSection)
  .get(adminController.getSection);

router
  .route("/section/:id")
  .put(adminController.updateSection)
  .delete(adminController.deleteSection);

router
  .route("/service-detail")
  .post(adminController.createServiceDetail)
  .get(adminController.getServiceDetail);

router
  .route("/service-detail/:id")
  .put(adminController.updateServiceDetail)
  .delete(adminController.deleteServiceDetail);

router
  .route("/mission")
  .post(adminController.createMission)
  .get(adminController.getMission);

router
  .route("/mission/:id")
  .put(adminController.updateMission)
  .delete(adminController.deleteMission);

router
  .route("/achievement")
  .post(adminController.createAchievement)
  .get(adminController.getAchievement);

router
  .route("/achievement/:id")
  .put(adminController.updateAchievement)
  .delete(adminController.deleteAchievement);

router
  .route("/service")
  .post(adminController.createService)
  .get(adminController.getService);

router
  .route("/service/:id")
  .put(adminController.updateService)
  .delete(adminController.deleteService);

router
  .route("/popular-tag")
  .post(adminController.createPopularTag)
  .get(adminController.getPopularTag);

router
  .route("/popular-tag/:id")
  .put(adminController.updatePopularTag)
  .delete(adminController.deletePopularTag);

router.route("/blog-detail").post(adminController.createBlogContains);

router
  .route("/blog-detail/:id")
  .put(adminController.updateBlogContains)
  .delete(adminController.deleteBlogContains);

router.get("/products/industry/:industryCategoryId", adminController.getProductsByIndustryCategory);

router.get('/products/packaging/:packagingTypeId', adminController.getProductsByPackagingType);

router.get('/products/category/:categoryId', adminController.getProductsByCategory);

export default router;
