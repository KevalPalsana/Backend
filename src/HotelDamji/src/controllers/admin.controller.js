import adminService from "../services/admin.service.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status"


const createCategory = catchAsync(async (req, res) => {
  const category = await adminService.createCategory(req.body);
  res.status(httpStatus.CREATED).send({ category });
});

const getCategories = catchAsync(async (req, res) => {
  const category = await adminService.getCategories(req.body);
  res.status(httpStatus.OK).send({ category });
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await adminService.updateCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await adminService.deleteCategory(req.params.id);
  res.status(httpStatus.OK).send({ category });
});

const createSubCategory = catchAsync(async (req, res) => {
  const category = await adminService.createSubCategory(req.body);
  res.status(httpStatus.CREATED).send({ category });
});

const getSubCategories = catchAsync(async (req, res) => {
  const category = await adminService.getSubCategories(req.body);
  res.status(httpStatus.OK).send({ category });
});

const updateSubCategory = catchAsync(async (req, res) => {
  const category = await adminService.updateSubCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const deleteSubCategory = catchAsync(async (req, res) => {
  const category = await adminService.deleteSubCategory(req.params.id);
  res.status(httpStatus.OK).send({ category, Message: "Delete SuccessFully...!" });
});

const createProduct = catchAsync(async (req, res) => {
  const product = await adminService.createProduct(req.body);
  res.status(httpStatus.CREATED).send({ product });
});

const getProducts = catchAsync(async (req, res) => {
  const product = await adminService.getProducts(req.body);
  res.status(httpStatus.OK).send({ product });
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await adminService.updateProduct(req.params.id, req.body);
  res.status(httpStatus.OK).send({ product });
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await adminService.deleteProduct(req.params.id);
  res.status(httpStatus.OK).send({ product });
});

const getProductsById = catchAsync(async (req, res) => {
  const product = await adminService.getProductsById(req.params.id);
  res.status(httpStatus.OK).send({ product });
});

const fetchCategoryWiseProductCount = async (req, res) => {
  try {
    const data = await adminService.getCategoryWiseProductCount();
    res.status(200).json({
      success: true,
      message: 'Category-wise product count fetched successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createGalleryTitle = catchAsync(async (req, res) => {
  const galleryTitle = await adminService.createGalleryTitle(req.body);
  res.status(httpStatus.CREATED).send({ galleryTitle });
});

const getGalleryTitle = catchAsync(async (req, res) => {
  const galleryTitle = await adminService.getGalleryTitle(req.body);
  res.status(httpStatus.OK).send({ galleryTitle });
});

const updateGalleryTitle = catchAsync(async (req, res) => {
  const galleryTitle = await adminService.updateGalleryTitle(req.params.id, req.body);
  res.status(httpStatus.OK).send({ galleryTitle });
});

const deleteGalleryTitle = catchAsync(async (req, res) => {
  const galleryTitle = await adminService.deleteGalleryTitle(req.params.id);
  res.status(httpStatus.OK).send({ galleryTitle });
});

const createGalleryCategory = catchAsync(async (req, res) => {
  const galleryCategory = await adminService.createGalleryCategory(req.body);
  res.status(httpStatus.CREATED).send({ galleryCategory });
});

const getGalleryCategory = catchAsync(async (req, res) => {
  const galleryCategory = await adminService.getGalleryCategory(req.body);
  res.status(httpStatus.OK).send({ galleryCategory });
});

const updateGalleryCategory = catchAsync(async (req, res) => {
  const galleryCategory = await adminService.updateGalleryCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ galleryCategory });
});

const deleteGalleryCategory = catchAsync(async (req, res) => {
  const galleryCategory = await adminService.deleteGalleryCategory(req.params.id);
  res.status(httpStatus.OK).send({ galleryCategory });
});

const addBasaltHandpicked = catchAsync(async (req, res) => {
  const NewsLine = await adminService.createNewLineMotion(req.body);
  res.status(httpStatus.CREATED).send({ NewsLine });
});

const getBasaltHandpicked = catchAsync(async (req, res) => {
  const NewsLine = await adminService.getBasaltHandpicked(req.body);
  res.status(httpStatus.OK).send({ NewsLine });
});
const getBasaltHandpickedById = catchAsync(async (req, res) => {
  const NewsLine = await adminService.getBasaltHandpickedById(req.params.id);
  res.status(httpStatus.OK).send({ NewsLine });
});


const updateBasaltHandpicked = catchAsync(async (req, res) => {
  const NewsLine = await adminService.updateBasaltHandpicked(req.params.id);
  res.status(httpStatus.OK).send({ NewsLine });
});

const deleteBasaltHandpicked = catchAsync(async (req, res) => {
  const NewsLine = await adminService.deleteBasaltHandpicked(req.params.id);
  res.status(httpStatus.OK).send({ NewsLine });
});

const addAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.createAboutUsPage(req.body);
  res.status(httpStatus.CREATED).send({ AboutUs });
});

const getAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getAboutUsPage(req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});
const getAboutUsById = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getAboutUsById(req.params.id);
  res.status(httpStatus.OK).send({ AboutUs });
});


const updateAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.updateAboutUsPage(req.params.id, req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const deleteAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.deleteAboutUsPage(req.params.id);
  res.status(httpStatus.OK).send({ AboutUs });
});

const addSpotLitePage = catchAsync(async (req, res) => {
  const SpotLite = await adminService.createSpotLitePage(req.body);
  res.status(httpStatus.CREATED).send({ SpotLite });
});

const getSpotLitePage = catchAsync(async (req, res) => {
  const SpotLite = await adminService.getSpotLitePage(req.body);
  res.status(httpStatus.OK).send({ SpotLite });
});

const updateSpotLitePage = catchAsync(async (req, res) => {
  const SpotLite = await adminService.updateSpotLitePage(req.params.id, req.body);
  res.status(httpStatus.OK).send({ SpotLite });
});

const deleteSpotLitePage = catchAsync(async (req, res) => {
  const SpotLite = await adminService.deleteSpotLitePage(req.params.id);
  res.status(httpStatus.OK).send({ SpotLite });
});


const createGalleryImage = catchAsync(async (req, res) => {
  const galleryImages = await adminService.createGalleryImage(req.body);
  res.status(httpStatus.CREATED).send({ galleryImages });
});

const getGalleryImages = catchAsync(async (req, res) => {
  const galleryImages = await adminService.getGalleryImages(req.body);
  res.status(httpStatus.OK).send({ galleryImages });
});

const updateGalleryImage = catchAsync(async (req, res) => {
  const galleryImage = await adminService.updateGalleryImage(req.params.id, req.body);
  res.status(httpStatus.OK).send({ galleryImage });
});

const deleteGalleryImage = catchAsync(async (req, res) => {
  const galleryImage = await adminService.deleteGalleryImage(req.params.id);
  res.status(httpStatus.OK).send({ galleryImage });
});


const addSliderImage = catchAsync(async (req, res) => {
  const imageData = req.body;
  const savedImage = await adminService.addSliderImage(imageData);
  res.status(httpStatus.CREATED).send({ message: 'Slider image added successfully', savedImage });
});

const getAllSliderImage = catchAsync(async (req, res) => {
  const images = await adminService.getAllSliderImage();
  res.status(httpStatus.OK).send({ message: 'Slider images retrive successfully', data: images });
});


const updateSliderImage = catchAsync(async (req, res) => {
  const data = await adminService.updateSliderImage(req.params.id, req.body);
  res.status(httpStatus.OK).send({ data });
});


const deleteSliderImage = catchAsync(async (req, res) => {
  const data = await adminService.deleteSliderImage(req.params.id);
  res.status(httpStatus.OK).send({ data });
});

const createFacility = catchAsync(async (req, res) => {
  const facility = await adminService.createFacility(req.body);
  res.status(httpStatus.CREATED).send({ facility });
});

const getFacilities = catchAsync(async (req, res) => {
  const facility = await adminService.getFacilities(req.body);
  res.status(httpStatus.OK).send({ facility });
});

const updateFacility = catchAsync(async (req, res) => {
  const facility = await adminService.updateFacility(req.params.id, req.body);
  res.status(httpStatus.OK).send({ facility });
});

const deleteFacility = catchAsync(async (req, res) => {
  const facility = await adminService.deleteFacility(req.params.id);
  res.status(httpStatus.OK).send({ facility });
});

const createAmenities = catchAsync(async (req, res) => {
  const amenities = await adminService.createAmenities(req.body);
  res.status(httpStatus.CREATED).send({ amenities });
});

const getAmenities = catchAsync(async (req, res) => {
  const amenities = await adminService.getAmenities(req.body);
  res.status(httpStatus.OK).send({ amenities });
});

const updateAmenities = catchAsync(async (req, res) => {
  const anemities = await adminService.updateAmenities(req.params.id, req.body);
  res.status(httpStatus.OK).send({ anemities });
});

const deleteAmenities = catchAsync(async (req, res) => {
  const amenities = await adminService.deleteAmenities(req.params.id);
  res.status(httpStatus.OK).send({ amenities });
});

const createCalculativeSection = catchAsync(async (req, res) => {
  const calculatedData = await adminService.createCalculativeSection(req.body);
  res.status(httpStatus.CREATED).send({ calculatedData });
});

const getCalculativeSection = catchAsync(async (req, res) => {
  const calculateData = await adminService.getCalculativeSection(req.body);
  res.status(httpStatus.OK).send({ calculateData });
});

const updateCalculativeSection = catchAsync(async (req, res) => {
  const calculateData = await adminService.updateCalculativeSection(req.params.id, req.body);
  res.status(httpStatus.OK).send({ calculateData });
});

const deleteCalculativeSection = catchAsync(async (req, res) => {
  const calculateData = await adminService.deleteCalculativeSection(req.params.id);
  res.status(httpStatus.OK).send({ calculateData });
});

const createDarshanTiming = catchAsync(async (req, res) => {
  const darshanData = await adminService.createDarshanTiming(req.body);
  res.status(httpStatus.CREATED).send({ darshanData });
});

const getDarshanTiming = catchAsync(async (req, res) => {
  const darshanData = await adminService.getDarshanTiming(req.body);
  res.status(httpStatus.OK).send({ darshanData });
});

const updateDarshanTiming = catchAsync(async (req, res) => {
  const darshanData = await adminService.updateDarshanTiming(req.params.id, req.body);
  res.status(httpStatus.OK).send({ darshanData });
});

const deleteDarshanTiming = catchAsync(async (req, res) => {
  const darshanData = await adminService.deleteDarshanTiming(req.params.id);
  res.status(httpStatus.OK).send({ darshanData });
});

const createSpecialDatesTiming = catchAsync(async (req, res) => {
  const specialDatesTiming = await adminService.createSpecialDatesTiming(req.body);
  res.status(httpStatus.CREATED).send({ specialDatesTiming });
});

const getSpecialDatesTiming = catchAsync(async (req, res) => {
  const specialDatesTiming = await adminService.getSpecialDatesTiming(req.body);
  res.status(httpStatus.OK).send({ specialDatesTiming });
});

const updateSpecialDatesTiming = catchAsync(async (req, res) => {
  const specialDatesTiming = await adminService.updateSpecialDatesTiming(req.params.id, req.body);
  res.status(httpStatus.OK).send({ specialDatesTiming });
});

const deleteSpecialDatesTiming = catchAsync(async (req, res) => {
  const specialDatesTiming = await adminService.deleteSpecialDatesTiming(req.params.id);
  res.status(httpStatus.OK).send({ specialDatesTiming });
});


const createLifeAtBP = catchAsync(async (req, res) => {
  const seeSightData = await adminService.createLifeAtBP(req.body);
  res.status(httpStatus.CREATED).send({ seeSightData });
});

const getLifeAtBP = catchAsync(async (req, res) => {
  const seeSightData = await adminService.getLifeAtBP(req.body);
  res.status(httpStatus.OK).send({ seeSightData });
});

const updateLifeAtBP = catchAsync(async (req, res) => {
  const seeSightData = await adminService.updateLifeAtBP(req.params.id, req.body);
  res.status(httpStatus.OK).send({ seeSightData });
});

const deleteLifeAtBP = catchAsync(async (req, res) => {
  const seeSightData = await adminService.deleteLifeAtBP(req.params.id);
  res.status(httpStatus.OK).send({ seeSightData });
});

const createFeedback = catchAsync(async (req, res) => {
  const feedbackData = await adminService.createFeedback(req.body);
  res.status(httpStatus.CREATED).send({ feedbackData });
});

const getFeedbacks = catchAsync(async (req, res) => {
  const feedbackData = await adminService.getFeedbacks(req.body);
  res.status(httpStatus.OK).send({ feedbackData });
});

const updateFeedback = catchAsync(async (req, res) => {
  const feedbackData = await adminService.updateFeedback(req.params.id, req.body);
  res.status(httpStatus.OK).send({ feedbackData });
});

const deleteFeedback = catchAsync(async (req, res) => {
  const feedbackData = await adminService.deleteFeedback(req.params.id);
  res.status(httpStatus.OK).send({ feedbackData });
});

const createOffer = catchAsync(async (req, res) => {
  const offerData = await adminService.createOffer(req.body);
  res.status(httpStatus.CREATED).send({ offerData });
});

const getOffers = catchAsync(async (req, res) => {
  const offerData = await adminService.getOffers(req.body);
  res.status(httpStatus.OK).send({ offerData });
});

const updateOffer = catchAsync(async (req, res) => {
  const offerData = await adminService.updateOffer(req.params.id, req.body);
  res.status(httpStatus.OK).send({ offerData });
});

const deleteOffer = catchAsync(async (req, res) => {
  const offerData = await adminService.deleteOffer(req.params.id);
  res.status(httpStatus.OK).send({ offerData });
});

const createBasaltGallery = catchAsync(async (req, res) => {
  const imageData = await adminService.createBasaltGallery(req.body);
  res.status(httpStatus.CREATED).send({ imageData });
});

const getBasaltGallerys = catchAsync(async (req, res) => {
  const imageData = await adminService.getBasaltGallerys(req.body);
  res.status(httpStatus.OK).send({ imageData });
});

const updateBasaltGallery = catchAsync(async (req, res) => {
  const imageData = await adminService.updateBasaltGallery(req.params.id, req.body);
  res.status(httpStatus.OK).send({ imageData });
});

const deleteBasaltGallery = catchAsync(async (req, res) => {
  const imageData = await adminService.deleteBasaltGallery(req.params.id);
  res.status(httpStatus.OK).send({ imageData });
});

const createMenuCategory = catchAsync(async (req, res) => {
  const categoryData = await adminService.createMenuCategory(req.body);
  res.status(httpStatus.CREATED).send({ categoryData });
});

const getMenuCategories = catchAsync(async (req, res) => {
  const categoryData = await adminService.getMenuCategories(req.body);
  res.status(httpStatus.OK).send({ categoryData });
});

const updateMenuCategory = catchAsync(async (req, res) => {
  const categoryData = await adminService.updateMenuCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ categoryData });
});

const deleteMenuCategory = catchAsync(async (req, res) => {
  const categoryData = await adminService.deleleMenuCategory(req.params.id);
  res.status(httpStatus.OK).send({ categoryData });
});

const createMenuItem = catchAsync(async (req, res) => {
  const itemData = await adminService.createMenuItem(req.body);
  res.status(httpStatus.CREATED).send({ itemData });
});

const getMenuItems = catchAsync(async (req, res) => {
  const itemData = await adminService.getMenuItems(req.body);
  res.status(httpStatus.OK).send({ itemData });
});

const updateMenuItem = catchAsync(async (req, res) => {
  const itemData = await adminService.updateMenuItem(req.params.id, req.body);
  res.status(httpStatus.OK).send({ itemData });
});

const deleteMenuItem = catchAsync(async (req, res) => {
  const itemData = await adminService.deleteMenuItem(req.params.id);
  res.status(httpStatus.OK).send({ itemData });
});

const createAdminFeedback = catchAsync(async (req, res) => {
  const feedbackData = await adminService.createAdminFeedback(req.body);
  res.status(httpStatus.CREATED).send({ feedbackData });
});

const getAdminFeedbacks = catchAsync(async (req, res) => {
  const feedbackData = await adminService.getAdminFeedbacks(req.body);
  res.status(httpStatus.OK).send({ feedbackData });
});

const updateAdminFeedback = catchAsync(async (req, res) => {
  const feedbackData = await adminService.updateAdminFeedback(req.params.id, req.body);
  res.status(httpStatus.OK).send({ feedbackData });
});

const deleteAdminFeedback = catchAsync(async (req, res) => {
  const feedbackData = await adminService.deleteAdminFeedback(req.params.id);
  res.status(httpStatus.OK).send({ feedbackData });
});

const createPrivacyPolicy = catchAsync(async (req, res) => {
  const policyData = await adminService.createPrivacyPolicy(req.body);
  res.status(httpStatus.CREATED).send({ policyData });
});

const getPrivacyPolicy = catchAsync(async (req, res) => {
  const policyData = await adminService.getPrivacyPolicy(req.body);
  res.status(httpStatus.OK).send({ policyData });
});

const updatePrivacyPolicy = catchAsync(async (req, res) => {
  const policyData = await adminService.updatePrivacyPolicy(req.params.id, req.body);
  res.status(httpStatus.OK).send({ policyData });
});

const deletePrivacyPolicy = catchAsync(async (req, res) => {
  const policyData = await adminService.deletePrivacyPolicy(req.params.id);
  res.status(httpStatus.OK).send({ policyData });
});

const createHotelBlog = catchAsync(async (req, res) => {
  const careerData = await adminService.createHotelBlog(req.body);
  res.status(httpStatus.CREATED).send({ careerData });
});

const getHotelBlog = catchAsync(async (req, res) => {
  const careerData = await adminService.getHotelBlog(req.body);
  res.status(httpStatus.OK).send({ careerData });
});

const getHotelBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await adminService.getHotelBlogById(id);
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const updateHotelBlog = catchAsync(async (req, res) => {
  const careerData = await adminService.updateHotelBlog(req.params.id, req.body);
  res.status(httpStatus.OK).send({ careerData });
});

const deleteHotelBlog = catchAsync(async (req, res) => {
  const careerData = await adminService.deleteHotelBlog(req.params.id);
  res.status(httpStatus.OK).send({ careerData });
});

const createSubBlog = catchAsync(async (req, res) => {
  const careerData = await adminService.createSubBlog(req.body);
  res.status(httpStatus.CREATED).send({ careerData });
});

const getSubBlog = catchAsync(async (req, res) => {
  const careerData = await adminService.getSubBlog(req.body);
  res.status(httpStatus.OK).send({ careerData });
});

const updateSubBlog = catchAsync(async (req, res) => {
  const careerData = await adminService.updateSubBlog(req.params.id, req.body);
  res.status(httpStatus.OK).send({ careerData });
});

const deleteSubBlog = catchAsync(async (req, res) => {
  const careerData = await adminService.deleteSubBlog(req.params.id);
  res.status(httpStatus.OK).send({ careerData });
});

const createContactUs = catchAsync(async (req, res) => {
  const contactData = await adminService.createContactUs(req.body);
  res.status(httpStatus.CREATED).send({ contactData });
});

const getContactUs = catchAsync(async (req, res) => {
  const contactData = await adminService.getContactUs(req.body);
  res.status(httpStatus.OK).send({ contactData });
});

const updateContactUs = catchAsync(async (req, res) => {
  const contactData = await adminService.updateContactUs(req.params.id, req.body);
  res.status(httpStatus.OK).send({ contactData });
});

const DeleteContactUs = catchAsync(async (req, res) => {
  const contactData = await adminService.DeleteContactUs(req.params.id);
  res.status(httpStatus.OK).send({ contactData });
});

const createWalletAmount = catchAsync(async (req, res) => {
  const amountData = await adminService.createWalletAmount(req.body);
  res.status(httpStatus.CREATED).send({ amountData });
});

const getWalletAmount = catchAsync(async (req, res) => {
  const amountData = await adminService.getWalletAmount(req.body);
  res.status(httpStatus.OK).send({ amountData });
});

const updateWalletAmount = catchAsync(async (req, res) => {
  const amountData = await adminService.updateWalletAmount(req.params.id, req.body);
  res.status(httpStatus.OK).send({ amountData });
});

const deleteWalletAmount = catchAsync(async (req, res) => {
  const amountData = await adminService.deleteWalletAmount(req.params.id);
  res.status(httpStatus.OK).send({ amountData });
});


const createSecondSectionTitle = catchAsync(async (req, res) => {
  const titleData = await adminService.createSecondSectionTitle(req.body);
  res.status(httpStatus.CREATED).send({ titleData });
});

const getSecondSectionTitle = catchAsync(async (req, res) => {
  const titleData = await adminService.getSecondSectionTitle(req.body);
  res.status(httpStatus.OK).send({ titleData });
});

const updateSecondSectionTitle = catchAsync(async (req, res) => {
  const titleData = await adminService.updateSecondSectionTitle(req.params.id, req.body);
  res.status(httpStatus.OK).send({ titleData });
});

const deleteSecondSectionTitle = catchAsync(async (req, res) => {
  const titleData = await adminService.deleteSecondSectionTitle(req.params.id);
  res.status(httpStatus.OK).send({ titleData });
});


const createSecondSection = catchAsync(async (req, res) => {
  const sectionData = await adminService.createSecondSection(req.body);
  res.status(httpStatus.CREATED).send({ sectionData });
});

const getSecondSection = catchAsync(async (req, res) => {
  const sectionData = await adminService.getSecondSection(req.body);
  res.status(httpStatus.OK).send({ sectionData });
});

const updateSecondSection = catchAsync(async (req, res) => {
  const sectionData = await adminService.updateSecondSection(req.params.id, req.body);
  res.status(httpStatus.OK).send({ sectionData });
});

const deleteSecondSection = catchAsync(async (req, res) => {
  const sectionData = await adminService.deleteSecondSection(req.params.id);
  res.status(httpStatus.OK).send({ sectionData });
});

const createAmenitiesOption = catchAsync(async (req, res) => {
  const optionData = await adminService.createAmenitiesOption(req.body);
  res.status(httpStatus.CREATED).send({ optionData });
});

const getAmenitiesOption = catchAsync(async (req, res) => {
  const optionData = await adminService.getAmenitiesOption(req.body);
  res.status(httpStatus.OK).send({ optionData });
});

const updateAmenitiesOption = catchAsync(async (req, res) => {
  const optionData = await adminService.updateAmenitiesOption(req.params.id, req.body);
  res.status(httpStatus.OK).send({ optionData });
});

const deleteAmenitiesOption = catchAsync(async (req, res) => {
  const optionData = await adminService.deleteAmenitiesOption(req.params.id);
  res.status(httpStatus.OK).send({ optionData });
});

const getAmenitiesOptionById = catchAsync(async (req, res) => {
  const optionData = await adminService.getAmenitiesOptionById(req.params.id);
  res.status(httpStatus.OK).send({ optionData });
});

const createAmenitiesSubCategory = catchAsync(async (req, res) => {
  const amenitiesData = await adminService.createAmenitiesSubCategory(req.body);
  res.status(httpStatus.CREATED).send({ amenitiesData });
});

const getAmenitiesSubCategory = catchAsync(async (req, res) => {
  const amenitiesData = await adminService.getAmenitiesSubCategory(req.body);
  res.status(httpStatus.OK).send({ amenitiesData });
});

const updateAmenitiesSubCategory = catchAsync(async (req, res) => {
  const amenitiesData = await adminService.updateAmenitiesSubCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ amenitiesData });
});

const deleteAmenitiesSubCategory = catchAsync(async (req, res) => {
  const amenitiesData = await adminService.deleteAmenitiesSubCategory(req.params.id);
  res.status(httpStatus.OK).send({ amenitiesData });
});

const getAmenitiesSubCategoryById = catchAsync(async (req, res) => {
  const amenitiesData = await adminService.getAmenitiesSubCategoryById(req.params.id);
  res.status(httpStatus.OK).send({ amenitiesData });
});


const createBasaltTestimonial = catchAsync(async (req, res) => {
  const typeData = await adminService.createBasaltTestimonial(req.body);
  res.status(httpStatus.CREATED).send({ typeData });
});

const getBasaltTestimonial = catchAsync(async (req, res) => {
  const typeData = await adminService.getBasaltTestimonial(req.body);
  res.status(httpStatus.OK).send({ typeData });
});

const updateBasaltTestimonial = catchAsync(async (req, res) => {
  const typeData = await adminService.updateBasaltTestimonial(req.params.id, req.body);
  res.status(httpStatus.OK).send({ typeData });
});

const deleteBasaltTestimonial = catchAsync(async (req, res) => {
  const typeData = await adminService.deleteBasaltTestimonial(req.params.id);
  res.status(httpStatus.OK).send({ typeData });
});

const createBasaltFAQ = catchAsync(async (req, res) => {
  const viewData = await adminService.createBasaltFAQ(req.body);
  res.status(httpStatus.CREATED).send({ viewData });
});

const getBasaltFAQ = catchAsync(async (req, res) => {
  const viewData = await adminService.getBasaltFAQ(req.body);
  res.status(httpStatus.OK).send({ viewData });
});

const updateBasaltFAQ = catchAsync(async (req, res) => {
  const viewData = await adminService.updateBasaltFAQ(req.params.id, req.body);
  res.status(httpStatus.OK).send({ viewData });
});

const deleteBasaltFAQ = catchAsync(async (req, res) => {
  const viewData = await adminService.deleteBasaltFAQ(req.params.id);
  res.status(httpStatus.OK).send({ viewData });
});

const createBanner = catchAsync(async (req, res) => {
  const typeData = await adminService.createBanner(req.body);
  res.status(httpStatus.CREATED).send({ typeData });
});

const getBanner = catchAsync(async (req, res) => {
  const typeData = await adminService.getBanner(req.body);
  res.status(httpStatus.OK).send({ typeData });
});

const updateBanner = catchAsync(async (req, res) => {
  const typeData = await adminService.updateBanner(req.params.id, req.body);
  res.status(httpStatus.OK).send({ typeData });
});

const deleteBanner = catchAsync(async (req, res) => {
  const typeData = await adminService.deleteBanner(req.params.id);
  res.status(httpStatus.OK).send({ typeData });
});

const createSpecialTeriff = catchAsync(async (req, res) => {
  const teriffData = await adminService.createSpecialTeriff(req.body);
  res.status(httpStatus.CREATED).send({ teriffData });
});

const getSpecialTeriff = catchAsync(async (req, res) => {
  const teriffData = await adminService.getSpecialTeriff(req.body);
  res.status(httpStatus.OK).send({ teriffData });
});

const updateSpecialTeriff = catchAsync(async (req, res) => {
  const teriffData = await adminService.updateSpecialTeriff(req.params.id, req.body);
  res.status(httpStatus.OK).send({ teriffData });
});

const deleteSpecialTeriff = catchAsync(async (req, res) => {
  const teriffData = await adminService.deleteSpecialTeriff(req.params.id);
  res.status(httpStatus.OK).send({ teriffData });
});

const getSpecialTeriffById = catchAsync(async (req, res) => {
  const teriffData = await adminService.getSpecialTeriffById(req.params.id);
  res.status(httpStatus.OK).send({ teriffData });
});

const getSubCategoriesByAmenitiesId = async (req, res) => {
  try {
    const { amenitiesId } = req.params;

    if (!amenitiesId) {
      return res.status(400).json({ success: false, message: "Amenities ID is required." });
    }

    const subcategories = await adminService.getAmenitiesSubCategoriesByAmenitiesId(amenitiesId);

    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({ success: false, message: "No subcategories found for the given amenities ID." });
    }

    return res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    console.error("Error in controller fetching subcategories:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getAmenitiesOptionByAmenitiesSubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    if (!subCategoryId) {
      return res.status(400).json({
        success: false,
        message: "Subcategory ID is required.",
      });
    }

    const amenitiesOptions = await adminService.getAmenitiesOptionsBySubCategory(subCategoryId);

    if (!amenitiesOptions || amenitiesOptions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No amenities options found for the given subcategory ID.",
      });
    }

    return res.status(200).json({
      success: true,
      data: amenitiesOptions,
    });
  } catch (error) {
    console.error("Error in controller fetching amenities options:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const fetchProductsWithAmenities = async (req, res) => {
  try {
    console.log("Fetching amenities...");
    const amenities = await adminService.getProductsWithAmenities();

    console.log("Fetched Amenities Data:", JSON.stringify(amenities, null, 2));

    if (!amenities || amenities.length === 0) {
      console.log("No amenities found.");
      return res.status(404).json({ success: false, message: "No amenities found." });
    }

    res.status(200).json({ success: true, data: amenities });
  } catch (error) {
    console.error("Error in fetchProductsWithAmenities controller:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch products with amenities",
    });
  }
};

const createRazorPay = async (req, res) => {
  try {
    const { key, secret } = req.body;

    if (!key || !secret) {
      return res.status(400).json({ message: "Both key and secret are required." });
    }

    const razorPayData = await adminService.createRazorPay
      ({ key, secret });

    return res.status(200).json({
      message: "RazorPay data upserted successfully",
      data: razorPayData,
    });
  } catch (error) {
    console.error("Error in createOrUpdateRazorPay:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getRazorPay = catchAsync(async (req, res) => {
  const razorPayData = await adminService.getRazorPay(req.body);
  res.status(httpStatus.OK).send({ razorPayData });
});

const updateRazorPay = catchAsync(async (req, res) => {
  const razorPayData = await adminService.updateRazorPay(req.params.id, req.body);
  res.status(httpStatus.OK).send({ razorPayData });
});

const deleteRazorPay = catchAsync(async (req, res) => {
  const razorPayData = await adminService.deleteRazorPay(req.params.id);
  res.status(httpStatus.OK).send({ razorPayData });
});

const createExtraCharges = catchAsync(async (req, res) => {
  const otherData = await adminService.createExtraCharges(req.body);
  res.status(httpStatus.CREATED).send({ otherData });
});

const getExtraCharges = catchAsync(async (req, res) => {
  const otherData = await adminService.getExtraCharges(req.body);
  res.status(httpStatus.OK).send({ otherData });
});

const updateExtraCharge = catchAsync(async (req, res) => {
  const otherData = await adminService.updateExtraCharge(req.params.id, req.body);
  res.status(httpStatus.OK).send({ otherData });
});

const deleteExtraCharge = catchAsync(async (req, res) => {
  const otherData = await adminService.deleteExtraCharge(req.params.id);
  res.status(httpStatus.OK).send({ otherData });
});


export default {
  createCategory, getCategories, updateCategory, deleteCategory, createSubCategory, getSubCategories, updateSubCategory, deleteSubCategory,
  createProduct, getProducts, updateProduct, deleteProduct, getProductsById,
  addSliderImage, getAllSliderImage, updateSliderImage, deleteSliderImage, addBasaltHandpicked, getBasaltHandpicked, getBasaltHandpickedById, updateBasaltHandpicked, deleteBasaltHandpicked,
  addAboutUsPage, getAboutUsById, getAboutUsPage, updateAboutUsPage, deleteAboutUsPage, createGalleryImage, getGalleryImages, updateGalleryImage, deleteGalleryImage,
  createGalleryTitle, getGalleryTitle, updateGalleryTitle, deleteGalleryTitle, createGalleryCategory, getGalleryCategory, updateGalleryCategory, deleteGalleryCategory, 
  createFacility, getFacilities, updateFacility, deleteFacility, getHotelBlogById,
  createAmenities, getAmenities, updateAmenities, deleteAmenities, createCalculativeSection, getCalculativeSection, updateCalculativeSection, deleteCalculativeSection,
  createDarshanTiming, createSpecialDatesTiming, getDarshanTiming, getSpecialDatesTiming, updateDarshanTiming, updateSpecialDatesTiming, deleteDarshanTiming, deleteSpecialDatesTiming,
  createLifeAtBP, getLifeAtBP, updateLifeAtBP, deleteLifeAtBP, createFeedback, getFeedbacks, updateFeedback, deleteFeedback, createOffer, getOffers, updateOffer, deleteOffer,
  createBasaltGallery, getBasaltGallerys, updateBasaltGallery, deleteBasaltGallery, createMenuCategory, getMenuCategories, updateMenuCategory, deleteMenuCategory,
  createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem, createAdminFeedback, getAdminFeedbacks, updateAdminFeedback, deleteAdminFeedback, createPrivacyPolicy, getPrivacyPolicy, updatePrivacyPolicy, deletePrivacyPolicy,
  createHotelBlog, getHotelBlog, updateHotelBlog, deleteHotelBlog, createSubBlog, getSubBlog, updateSubBlog, deleteSubBlog, createContactUs, getContactUs, updateContactUs, DeleteContactUs, createWalletAmount, getWalletAmount, updateWalletAmount, deleteWalletAmount,
  createSecondSection, getSecondSection, updateSecondSection, deleteSecondSection, createSecondSectionTitle, getSecondSectionTitle, updateSecondSectionTitle, deleteSecondSectionTitle,
  addSpotLitePage, getSpotLitePage, updateSpotLitePage, deleteSpotLitePage, fetchCategoryWiseProductCount, createBasaltTestimonial, getBasaltTestimonial, updateBasaltTestimonial, deleteBasaltTestimonial,
  createBasaltFAQ, getBasaltFAQ, deleteBasaltFAQ, updateBasaltFAQ, createBanner, getBanner, updateBanner, deleteBanner, fetchCategoryWiseProductCount, createAmenitiesOption, createAmenitiesSubCategory,
  getAmenitiesOption, getAmenitiesSubCategory, getAmenitiesSubCategoryById, getSubCategoriesByAmenitiesId, getAmenitiesOptionById, updateAmenitiesOption, updateAmenitiesSubCategory, deleteAmenitiesOption, deleteAmenitiesSubCategory,
  createSpecialTeriff, getSpecialTeriff, getSpecialTeriffById, updateSpecialTeriff, deleteSpecialTeriff, getAmenitiesOptionByAmenitiesSubCategory, fetchProductsWithAmenities,
  createRazorPay, getRazorPay, updateRazorPay, deleteRazorPay, createExtraCharges, getExtraCharges, updateExtraCharge, deleteExtraCharge,
}
