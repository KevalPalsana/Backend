import { diskStorage } from "multer";
import adminService from "../services/admin.service.js";
import { generateSuccessMessage, sendSuccessResponse } from "../utils/ApiMessage.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status"

const createCategory  = catchAsync(async (req, res) => {
    const category = await adminService.createCategory(req.body);
    res.status(httpStatus.CREATED).send({ category });
  });

const getCategories   = catchAsync(async (req, res) => {
    const category = await adminService.getCategories(req.body);
    res.status(httpStatus.OK).send({ category });
  });

const updateCategory  = catchAsync(async (req, res) => {
    const category = await adminService.updateCategory(req.params.id, req.body);
    res.status(httpStatus.OK).send({ category });
  });

const deleteCategory   = catchAsync(async (req, res) => {
    const category = await adminService.deleteCategory(req.params.id);
    res.status(httpStatus.OK).send({ category });
  });

const createHolidayPackage  = catchAsync(async (req, res) => {
    const holidayPackage = await adminService.createHolidayPackage(req.body);
    res.status(httpStatus.CREATED).send({ holidayPackage });
  });

const getHolidayPackages   = catchAsync(async (req, res) => {
    const holidayPackage = await adminService.getHolidayPackages(req.body);
    res.status(httpStatus.OK).send({ holidayPackage });
  });

const getHolidayPackagesByCategory = catchAsync(async (req, res) => {
  const holidayPackage = await adminService.getHolidayPackagesByCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ holidayPackage });
});

const getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 5 } = req.query;

    const relatedProducts = await adminService.getRelatedProducts(id, Number(limit));
    if (!relatedProducts) {
      return res.status(httpStatus.NOT_FOUND).send({ message: "No related products found" });
    }

    res.status(httpStatus.OK).send({ data: relatedProducts });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch related products" });
  }
};

const updateHolidayPackage  = catchAsync(async (req, res) => {
    const holidayPackage = await adminService.updateHolidayPackage(req.params.id, req.body);
    res.status(httpStatus.OK).send({ holidayPackage });
  });

const deleteHolidayPackage  = catchAsync(async (req, res) => {
    const holidayPackage = await adminService.deleteHolidayPackage(req.params.id);
    res.status(httpStatus.OK).send({ holidayPackage , Message:"Delete SuccessFully...!"});
  });

const createVisaEnquiry  = catchAsync(async (req, res) => { 
    const inquiry = await adminService.createVisaEnquiry(req.body);
    res.status(httpStatus.CREATED).send({ inquiry });
  });

const getVisaEnquiry  = catchAsync(async (req, res) => {
    const inquiry = await adminService.getVisaEnquiry(req.query);
    res.status(httpStatus.OK).send({ inquiry });
  });

const updateVisaEnquiry = catchAsync(async (req, res) => {
    const inquiry = await adminService.updateVisaEnquiry(req.params.id, req.body);
    res.status(httpStatus.OK).send({ inquiry });
  });

const deleteVisaEnquiry = catchAsync(async (req, res) => {
    const inquiry = await adminService.deleteVisaEnquiry(req.params.id);
    res.status(httpStatus.OK).send({ inquiry});
  });

  const getVisaByCountry = catchAsync(async (req, res) => {
    try {
      const { countryId } = req.params;
      
      const visa = await adminService.getVisaByCountry(countryId);
      
      if (visa.length === 0) {
          return res.status(404).json({ success: false, message: "No visa found for this category." });
      }

      res.status(200).json({ success: true, visa });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
  });

 const createProductImage = catchAsync(async (req, res) => {
  const { productId, files } = req.body;

  if (!productId || !files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: 'Product ID and an array of file URLs are required.' });
  }

  try {
      const imageDataArray = files.map((file) => ({ productId, file }));
      const newProductImages = await adminService.createProductImage(imageDataArray);
      res.status(201).json({
          message: 'Product images saved successfully.',
          data: newProductImages,
      });
  } catch (error) {
      console.error('Error saving product images:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
  });
  
 const getProductImages = catchAsync(async (req, res) => {
    const productImages = await adminService.getProductImages();
    sendSuccessResponse(res, 'Fetched all product images', productImages);
  });
  
 const getProductImagesByProductId = catchAsync(async (req, res) => {
    const productImages = await adminService.getProductImagesByProductId(req.params.id);
    if (!productImages || productImages.length === 0) {
      return res.status(404).json({ message: 'No images found for the specified product' });
    }
    sendSuccessResponse(res, 'Fetched product images by product ID', productImages);
  });
  
  const updateProductImage = catchAsync(async (req, res) => {
    const data = {
      productId: req.body.productId,
      file: req.file ? req.file.path : req.body.file,
    };
    const productImage = await adminService.updateProductImage(req.params.id, data);
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }
    sendSuccessResponse(res, 'Product image updated successfully', productImage);
  });
  
  const deleteProductImage = catchAsync(async (req, res) => {
    const productImage = await adminService.deleteProductImage(req.params.id);
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }
    sendSuccessResponse(res, 'Product image deleted successfully', {});
  });

  const createHotel = catchAsync(async (req, res) => {
    const hotel = await adminService.createHotel(req.body);
    res.status(httpStatus.CREATED).send({ hotel });
  });
  
  const getAllHotels = catchAsync(async (req, res) => {
    const hotel = await adminService.getAllHotels(req.body);
    res.status(httpStatus.OK).send({ hotel });
  });
  
  const updateHotel = catchAsync(async (req, res) => {
    const hotel = await adminService.updateHotel(req.params.id, req.body);
    res.status(httpStatus.OK).send({ hotel });
  });
  
  const deleteHotel = catchAsync(async (req, res) => {
    const hotel = await adminService.deleteHotel(req.params.id);
    res.status(httpStatus.OK).send({ hotel });
  });
  
  const getHotelById = catchAsync(async (req, res) => {
    const hotel = await adminService.getHotelById(req.params.id);
    res.status(httpStatus.OK).send({ hotel });
  });
  
  const createHotelPrice = catchAsync(async (req, res) => {
    const hotelPrice = await adminService.createHotelPrice(req.body);
    res.status(httpStatus.CREATED).send({ hotelPrice });
  });
  
  const getAllPrice = catchAsync(async (req, res) => {
    const hotelPrice = await adminService.getAllPrice(req.body);
    res.status(httpStatus.OK).send({ hotelPrice });
  });
  
  const updateHotelPrice = catchAsync(async (req, res) => {
    const hotelPrice = await adminService.updateHotelPrice(req.params.id, req.body);
    res.status(httpStatus.OK).send({ hotelPrice });
  });
  
  const deleteHotelPrice = catchAsync(async (req, res) => {
    const hotelPrice = await adminService.deleteHotelPrice(req.params.id);
    res.status(httpStatus.OK).send({ hotelPrice });
  });
  
  const getPriceByHotel = catchAsync(async (req, res) => {
    const hotelPrice = await adminService.getPriceByHotel(req.params.id);
    res.status(httpStatus.OK).send({ hotelPrice });
  });

  const createEnquiry = catchAsync(async (req, res) => {
    const enquiry = await adminService.createEnquiry(req.body);
    res.status(httpStatus.CREATED).send({ enquiry });
  });
  
  const getAllEnquiries = catchAsync(async (req, res) => {
    const enquiry = await adminService.getAllEnquiries(req.body);
    res.status(httpStatus.OK).send({ enquiry });
  });
  
  const updateEnquiry = catchAsync(async (req, res) => {
    const enquiry = await adminService.updateEnquiry(req.params.id, req.body);
    res.status(httpStatus.OK).send({ enquiry });
  });
  
  const deleteEnquiry = catchAsync(async (req, res) => {
    const enquiry = await adminService.deleteEnquiry(req.params.id);
    res.status(httpStatus.OK).send({ enquiry });
  });
  
  const getEnquiryById = catchAsync(async (req, res) => {
    const enquiry = await adminService.getEnquiryById(req.params.id);
    res.status(httpStatus.OK).send({ enquiry });
  });

  const createBanner = catchAsync(async (req, res) => {
    const banner = await adminService.createBanner(req.body);
    res.status(httpStatus.CREATED).send({ banner });
  });
  
  const getAllBanners = catchAsync(async (req, res) => {
    const banner = await adminService.getAllBanners(req.body);
    res.status(httpStatus.OK).send({ banner });
  });
  
  const updateBanner = catchAsync(async (req, res) => {
    const banner = await adminService.updateBanner(req.params.id, req.body);
    res.status(httpStatus.OK).send({ banner });
  });
  
  const deleteBanner = catchAsync(async (req, res) => {
    const banner = await adminService.deleteBanner(req.params.id);
    res.status(httpStatus.OK).send({ banner });
  });
  
  const getBanerById = catchAsync(async (req, res) => {
    const banner = await adminService.getBanerById(req.params.id);
    res.status(httpStatus.OK).send({ banner });
  });

  const createIncluded = catchAsync(async (req, res) => {
    const included = await adminService.createIncluded(req.body);
    res.status(httpStatus.CREATED).send({ included });
  });
  
  const getAllIncluded = catchAsync(async (req, res) => {
    const included = await adminService.getAllIncluded(req.body);
    res.status(httpStatus.OK).send({ included });
  });
  
  const updateIncluded = catchAsync(async (req, res) => {
    const included = await adminService.updateIncluded(req.params.id, req.body);
    res.status(httpStatus.OK).send({ included });
  });
  
  const deleteIncluded = catchAsync(async (req, res) => {
    const included = await adminService.deleteIncluded(req.params.id);
    res.status(httpStatus.OK).send({ included });
  });
  
  const getIncludedById = catchAsync(async (req, res) => {
    const included = await adminService.getIncludedById(req.params.id);
    res.status(httpStatus.OK).send({ included });
  });

  const createRoom = catchAsync(async (req, res) => {
    const room = await adminService.createRoom(req.body);
    res.status(httpStatus.CREATED).send({ room });
  });
  
  const getAllRooms = catchAsync(async (req, res) => {
    const room = await adminService.getAllRooms(req.body);
    res.status(httpStatus.OK).send({ room });
  });
  
  const updateRoom = catchAsync(async (req, res) => {
    const room = await adminService.updateRoom(req.params.id, req.body);
    res.status(httpStatus.OK).send({ room });
  });
  
  const deleteRoom = catchAsync(async (req, res) => {
    const room = await adminService.deleteRoom(req.params.id);
    res.status(httpStatus.OK).send({ room });
  });
  
  const getRoomById = catchAsync(async (req, res) => {
    const room = await adminService.getRoomById(req.params.id);
    res.status(httpStatus.OK).send({ room });
  });
  
  const getAllContactUs = catchAsync(async (req, res) => {
    const contactus = await adminService.getAllContactUs(req.body);
    res.status(httpStatus.OK).send({ contactus });
  });
  
  const updateContactUs = catchAsync(async (req, res) => {
    const contactus = await adminService.updateContactUs(req.params.id, req.body);
    res.status(httpStatus.OK).send({ contactus });
  });
  
  const deleteContactUs = catchAsync(async (req, res) => {
    const contactus = await adminService.deleteContactUs(req.params.id);
    res.status(httpStatus.OK).send({ contactus });
  });
  
  const getContactUsById = catchAsync(async (req, res) => {
    const contactus = await adminService.getContactUsById(req.params.id);
    res.status(httpStatus.OK).send({ contactus });
  });


  const createPassportInquiry = catchAsync(async (req, res) => {
    const room = await adminService.createPassportInquiry(req.body);
    res.status(httpStatus.CREATED).send({ room });
  });
  
  const getPassportInquiry = catchAsync(async (req, res) => {
    const room = await adminService.getPassportInquiry(req.body);
    res.status(httpStatus.OK).send({ room });
  });
  
  const updatePassportInquiry = catchAsync(async (req, res) => {
    const room = await adminService.updatePassportInquiry(req.params.id, req.body);
    res.status(httpStatus.OK).send({ room });
  });
  
  const deletePassportInquiry = catchAsync(async (req, res) => {
    const room = await adminService.deletePassportInquiry(req.params.id);
    res.status(httpStatus.OK).send({ room });
  });

  const createCountry = catchAsync(async (req, res) => {
    const country = await adminService.createCountry(req.body);
    res.status(httpStatus.CREATED).send({ country });
  });
  
  const getAllCountries = catchAsync(async (req, res) => {
    const country = await adminService.getAllCountries(req.body);
    res.status(httpStatus.OK).send({ country });
  });
  
  const updateCountry = catchAsync(async (req, res) => {
    const country = await adminService.updateCountry(req.params.id, req.body);
    res.status(httpStatus.OK).send({ country });
  });
  
  const deleteCountry = catchAsync(async (req, res) => {
    const country = await adminService.deleteCountry(req.params.id);
    res.status(httpStatus.OK).send({ country });
  });
  
  const getCountryById = catchAsync(async (req, res) => {
    const country = await adminService.getCountryById(req.params.id);
    res.status(httpStatus.OK).send({ country });
  });

  const createTag = catchAsync(async (req, res) => {
    const tag = await adminService.createTag(req.body);
    res.status(httpStatus.CREATED).send({ tag });
  });
  
  const getAllTags = catchAsync(async (req, res) => {
    const tag = await adminService.getAllTags(req.body);
    res.status(httpStatus.OK).send({ tag });
  });
  
  const updateTag = catchAsync(async (req, res) => {
    const tag = await adminService.updateTag(req.params.id, req.body);
    res.status(httpStatus.OK).send({ tag });
  });
  
  const deleteTag = catchAsync(async (req, res) => {
    const tag = await adminService.deleteTag(req.params.id);
    res.status(httpStatus.OK).send({ tag });
  });
  
  const getTagById = catchAsync(async (req, res) => {
    const tag = await adminService.getTagById(req.params.id);
    res.status(httpStatus.OK).send({ tag });
  });
  
  
  const createBlog = catchAsync(async (req, res) => {
    const blogs = await adminService.createBlog(req.body);
    res.status(httpStatus.CREATED).send({ blogs });
  });
  
  const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await adminService.getAllBlogs(req.body);
    res.status(httpStatus.OK).send({ blogs });
  });
  
  const updateBlog = catchAsync(async (req, res) => {
    const blogs = await adminService.updateBlog(req.params.id, req.body);
    res.status(httpStatus.OK).send({ blogs });
  });
  
  const deleteBlog = catchAsync(async (req, res) => {
    const blogs = await adminService.deleteBlog(req.params.id);
    res.status(httpStatus.OK).send({ blogs });
  });
  
  const getBlogById = catchAsync(async (req, res) => {
    const blogs = await adminService.getBlogById(req.params.id);
    res.status(httpStatus.OK).send({ blogs });
  });


  const createPackage = catchAsync(async (req, res) => {
    const packages = await adminService.createPackage(req.body);
    res.status(httpStatus.CREATED).send({ packages });
  });
  
  const getAllPackages = catchAsync(async (req, res) => {
    const packages = await adminService.getAllPackages(req.body);
    res.status(httpStatus.OK).send({ packages });
  });
  
  const updatePackage = catchAsync(async (req, res) => {
    const packages = await adminService.updatePackage(req.params.id, req.body);
    res.status(httpStatus.OK).send({ packages });
  });
  
  const deletePackage = catchAsync(async (req, res) => {
    const packages = await adminService.deletePackage(req.params.id);
    res.status(httpStatus.OK).send({ packages });
  });
  
  const getPackageById = catchAsync(async (req, res) => {
    const tag = await adminService.getPackageById(req.params.id);
    res.status(httpStatus.OK).send({ tag });
  });

  const getPackagesByCategory = catchAsync(async (req, res) => {
    try {
      const { categoryId } = req.params;
      
      const packages = await adminService.getPackagesByCategory(categoryId);
      
      if (packages.length === 0) {
          return res.status(404).json({ success: false, message: "No packages found for this category." });
      }

      res.status(200).json({ success: true, packages });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
  });

  const createBlogDetails = catchAsync(async (req, res) => {
    const blogDetails = await adminService.createBlogDetails(req.body);
    res.status(httpStatus.CREATED).send({ blogDetails });
  });
  
  const getAllBlogDetails = catchAsync(async (req, res) => {
    const blogDetails = await adminService.getAllBlogDetails(req.body);
    res.status(httpStatus.OK).send({ blogDetails });
  });
  
  const updateBlogDetail = catchAsync(async (req, res) => {
    const blogDetails = await adminService.updateBlogDetail(req.params.id, req.body);
    res.status(httpStatus.OK).send({ blogDetails });
  });
  
  const deleteBlogDetail = catchAsync(async (req, res) => {
    const blogDetails = await adminService.deleteBlogDetail(req.params.id);
    res.status(httpStatus.OK).send({ blogDetails });
  });

  const getBlogDetailsByBlog = catchAsync(async (req, res) => {
    try {
      const { blogId } = req.params;
      
      const blogDetails = await adminService.getBlogDetailsByBlog(blogId);
      
      if (blogDetails.length === 0) {
          return res.status(404).json({ success: false, message: "No blogDetails found for this category." });
      }

      res.status(200).json({ success: true, blogDetails });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
  });

  const createAboutUs = catchAsync(async (req, res) => {
    const aboutUs = await adminService.createAboutUs(req.body);
    res.status(httpStatus.CREATED).send({ aboutUs });
  });
  
  const getAboutUs = catchAsync(async (req, res) => {
    const aboutUs = await adminService.getAboutUs(req.body);
    res.status(httpStatus.OK).send({ aboutUs });
  });

  const createFaq = catchAsync(async (req, res) => {
    const faq = await adminService.createFaq(req.body);
    res.status(httpStatus.CREATED).send({ faq });
  });
  
  const getAllFaqs = catchAsync(async (req, res) => {
    const faq = await adminService.getAllFaqs(req.body);
    res.status(httpStatus.OK).send({ faq });
  });
  
  const updateFaq = catchAsync(async (req, res) => {
    const faq = await adminService.updateFaq(req.params.id, req.body);
    res.status(httpStatus.OK).send({ faq });
  });
  
  const deleteFaq = catchAsync(async (req, res) => {
    const faq = await adminService.deleteFaq(req.params.id);
    res.status(httpStatus.OK).send({ faq });
  });


  
  const createTestimonial = catchAsync(async (req, res) => {
    const testimonial = await adminService.createTestimonial(req.body);
    res.status(httpStatus.CREATED).send({ testimonial });
  });
  
  const getAllTestimonials = catchAsync(async (req, res) => {
    const testimonial = await adminService.getAllTestimonials(req.body);
    res.status(httpStatus.OK).send({ testimonial });
  });
  
  const updateTestimonial = catchAsync(async (req, res) => {
    const testimonial = await adminService.updateTestimonial(req.params.id, req.body);
    res.status(httpStatus.OK).send({ testimonial });
  });
  
  const deleteTestimonial = catchAsync(async (req, res) => {
    const testimonial = await adminService.deleteTestimonial(req.params.id);
    res.status(httpStatus.OK).send({ testimonial });
  });

  
  const createExpert = catchAsync(async (req, res) => {
    const expert = await adminService.createExpert(req.body);
    res.status(httpStatus.CREATED).send({ expert });
  });
  
  const getAllExperts = catchAsync(async (req, res) => {
    const expert = await adminService.getAllExperts(req.body);
    res.status(httpStatus.OK).send({ expert });
  });
  
  const updateExpert = catchAsync(async (req, res) => {
    const expert = await adminService.updateExpert(req.params.id, req.body);
    res.status(httpStatus.OK).send({ expert });
  });
  
  const deleteExpert = catchAsync(async (req, res) => {
    const expert = await adminService.deleteExpert(req.params.id);
    res.status(httpStatus.OK).send({ expert });
  });

  
  const createGateway = catchAsync(async (req, res) => {
    const visaGateway = await adminService.createGateway(req.body);
    res.status(httpStatus.CREATED).send({ visaGateway });
  });
  
  const GetAllGateways = catchAsync(async (req, res) => {
    const visaGateway = await adminService.GetAllGateways(req.body);
    res.status(httpStatus.OK).send({ visaGateway });
  });
  
  const updateGateway = catchAsync(async (req, res) => {
    const visaGateway = await adminService.updateGateway(req.params.id, req.body);
    res.status(httpStatus.OK).send({ visaGateway });
  });
  
  const deleteGateway = catchAsync(async (req, res) => {
    const visaGateway = await adminService.deleteGateway(req.params.id);
    res.status(httpStatus.OK).send({ visaGateway });
  });

  const createVisaForm = catchAsync(async (req, res) => {
    const visaForm = await adminService.createVisaForm(req.body);
    res.status(httpStatus.CREATED).send({ visaForm });
  });
  
  const getAllVisaForm = catchAsync(async (req, res) => {
    const visaForm = await adminService.getAllVisaForm(req.body);
    res.status(httpStatus.OK).send({ visaForm });
  });
  
  const updateVisaForm = catchAsync(async (req, res) => {
    const visaForm = await adminService.updateVisaForm(req.params.id, req.body);
    res.status(httpStatus.OK).send({ visaForm });
  });
  
  const deleteVisaForm = catchAsync(async (req, res) => {
    const visaForm = await adminService.deleteVisaForm(req.params.id);
    res.status(httpStatus.OK).send({ visaForm });
  });

  const createPassportForm = catchAsync(async (req, res) => {
    const passportForm = await adminService.createPassportForm(req.body);
    res.status(httpStatus.CREATED).send({ passportForm });
  });
  
  const getAllPassportForm = catchAsync(async (req, res) => {
    const passportForm = await adminService.getAllPassportForm(req.body);
    res.status(httpStatus.OK).send({ passportForm });
  });
  
  const updatePassportForm = catchAsync(async (req, res) => {
    const passportForm = await adminService.updatePassportForm(req.params.id, req.body);
    res.status(httpStatus.OK).send({ passportForm });
  });
  
  const deletePassportForm = catchAsync(async (req, res) => {
    const passportForm = await adminService.deletePassportForm(req.params.id);
    res.status(httpStatus.OK).send({ passportForm });
  });

  
  const createImage = catchAsync(async (req, res) => {
    const image = await adminService.createImage(req.body);
    res.status(httpStatus.CREATED).send({ image });
  });
  
  const getAllImages = catchAsync(async (req, res) => {
    const image = await adminService.getAllImages(req.body);
    res.status(httpStatus.OK).send({ image });
  });
  
  const updateImage = catchAsync(async (req, res) => {
    const image = await adminService.updateImage(req.params.id, req.body);
    res.status(httpStatus.OK).send({ image });
  });
  
  const deleteImage = catchAsync(async (req, res) => {
    const image = await adminService.deleteImage(req.params.id);
    res.status(httpStatus.OK).send({ image });
  });

  const getPackagesByTag = catchAsync(async (req, res) => {
    const { tagId } = req.params;
    const packages = await adminService.getPackagesByTag(tagId);
    res.status(httpStatus.OK).send({ packages });
  });
  
  const getPackagesByCountry = catchAsync(async (req, res) => {
    const { countryId } = req.params;
    const packages = await adminService.getPackagesByCountry(countryId);
    res.status(httpStatus.OK).send({ packages });
  });

  const getPackagesByPrice = catchAsync(async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    const packages = await adminService.getPackagesByPrice(
      parseFloat(minPrice),
      parseFloat(maxPrice)
    );
    res.status(httpStatus.OK).send({ packages });
  });

  const getPackagesByDuration = catchAsync(async (req, res) => {
    const { duration } = req.params;
    const packages = await adminService.getPackagesByDuration(duration);
    res.status(httpStatus.OK).send({ packages });
  });

  const createCustomer = catchAsync(async (req, res) => {
    const customer = await adminService.createCustomer(req.body);
    res.status(httpStatus.CREATED).send({ customer });
  });
  
  const getAllCustomer = catchAsync(async (req, res) => {
    const customer = await adminService.getAllCustomer(req.body);
    res.status(httpStatus.OK).send({ customer });
  });
  
  const updateCustomer = catchAsync(async (req, res) => {
    const customer = await adminService.updateCustomer(req.params.id, req.body);
    res.status(httpStatus.OK).send({ customer });
  });
  
  const deleteCustomer = catchAsync(async (req, res) => {
    const customer = await adminService.deleteCustomer(req.params.id);
    res.status(httpStatus.OK).send({ customer });
  });

  const createTheme = catchAsync(async (req, res) => {
    const theme = await adminService.createTheme(req.body);
    res.status(httpStatus.CREATED).send({ theme });
  });
  
  const getAllThemes = catchAsync(async (req, res) => {
    const theme = await adminService.getAllThemes(req.body);
    res.status(httpStatus.OK).send({ theme });
  });
  
  const updateTheme = catchAsync(async (req, res) => {
    const theme = await adminService.updateTheme(req.params.id, req.body);
    res.status(httpStatus.OK).send({ theme });
  });
  
  const deleteTheme = catchAsync(async (req, res) => {
    const theme = await adminService.deleteTheme(req.params.id);
    res.status(httpStatus.OK).send({ theme });
  });

export default {createCategory,getCategories,updateCategory,deleteCategory,createHolidayPackage,getHolidayPackages,getHolidayPackagesByCategory,updateHolidayPackage,deleteHolidayPackage,
  createVisaEnquiry, getVisaEnquiry,updateVisaEnquiry,deleteVisaEnquiry,createProductImage, getProductImages, getProductImagesByProductId, updateProductImage, deleteProductImage, createHotel, getAllHotels,
getHotelById, updateHotel, deleteHotel, createHotelPrice, getPriceByHotel, getAllPrice, updateHotelPrice, deleteHotelPrice, createEnquiry, getAllEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry,
createBanner, getAllBanners, getBanerById, updateBanner, deleteBanner, getRelatedProducts, createIncluded, getAllIncluded, getIncludedById, updateIncluded, deleteIncluded,
createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom, getAllContactUs, updateContactUs, deleteContactUs, getContactUsById, createPassportInquiry, getPassportInquiry, updatePassportInquiry, deletePassportInquiry,
createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry, createTag, deleteTag, getAllTags, updateTag, getTagById, createPackage, getAllPackages, updatePackage, deletePackage, getPackageById,
getPackagesByCategory, createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, createBlogDetails, getAllBlogDetails, updateBlogDetail, deleteBlogDetail, getBlogDetailsByBlog, 
createAboutUs, getAboutUs, createFaq, getAllFaqs, updateFaq, deleteFaq, createTestimonial, getAllTestimonials, updateTestimonial, deleteTestimonial,
createExpert, getAllExperts, updateExpert, deleteExpert, createGateway, GetAllGateways, updateGateway, deleteGateway, getVisaByCountry, createImage, getAllImages, updateImage, deleteImage,
createVisaForm, getAllVisaForm, updateVisaForm, deleteVisaForm, createPassportForm, getAllPassportForm, updatePassportForm, deletePassportForm, 
getPackagesByCountry, getPackagesByDuration, getPackagesByPrice, getPackagesByTag, createCustomer, getAllCustomer, updateCustomer, deleteCustomer,
createTheme, getAllThemes, updateTheme, deleteTheme,
}
