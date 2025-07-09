import IconCategory from "../models/category.model.js"
import { ApiError } from "../utils/ApiError.js";
import IconProduct from "../models/product.model.js"
import httpStatus from "http-status"
import { IconBlog } from "../models/blog.model.js";
import InfiSpotlight from "../models/spotlite.model.js";
import { IconReview } from "../models/review.model.js";
import IconFaq from "../models/faq.model.js";
import IconHeroSection from "../models/heroSection.model.js";
import InfiCompanyInfo from "../models/info.model.js";
import IconService from "../models/service.model.js";
import IconServiceDetail from "../models/serviceDetails.model.js";
import { IconAboutUs } from "../models/aboutUs.model.js";
import IconWhyChoose from "../models/whyChooseus.model.js";
import testimonialModel from "../models/testimonial.model.js";
import IconBlogDetails from "../models/blogContent.model.js";
import bannerModel from "../models/banner.model.js";
import homeAboutModel from "../models/homeAbout.model.js";
import homeContactModel from "../models/homeContact.model.js";
import IconIndustriesCategory from "../models/industryCategory.model.js";
import eventModel from "../models/event.model.js";
import IconMainCategory from "../models/mainCategory.model.js";
import IconProductUSP from "../models/productUSP.model.js";
import IconProductPacking from "../models/productPacking.model.js";

const createCategory = async (categoryData) => {
  return await IconCategory.create(categoryData);
};

const getCategories = async () => {
  return IconCategory.find();
};

const updateCategory = async (id, categoryData) => {
  const updateData = await IconCategory.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'IconCategory not found');
  return updateData;
};

const deleteCategory = async (id) => {
  const deleteId = await IconCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'IconCategory not found');
  return deleteId;
};

const createProduct = async (data) => {
  return await IconProduct.create(data);
};

const getProducts = async () => {
  return await IconProduct.find()
    .populate("category")
    .populate("industryCategory")
    .populate("productUSP")
    .populate("productPacking")
    .lean();
};

const getProductById = async (id) => {
  return await IconProduct.findById(id)
    .populate("category")
    .populate("industryCategory")
    .populate("productUSP")
    .populate("productPacking")
    .lean();
};

const updateProduct = async (id, data) => {
  return await IconProduct.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  return await IconProduct.findByIdAndDelete(id);
};

const getProductsByCategoryId = async (categoryId) => {
  const products = await IconCategory.find({ categoryId }).populate('categoryId');

  if (!products || products.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No products found for this category');
  }

  return products;
};

const createAboutUsMainPage = async (aboutUsData) => {
  if (!aboutUsData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
  if (!aboutUsData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!');
  if (!aboutUsData.image) throw new ApiError(httpStatus.BAD_REQUEST, "Image is required!");

  const existingAboutUs = await AboutUsPage.findOne();

  if (existingAboutUs) {
    return AboutUsPage.findByIdAndUpdate(existingAboutUs._id, aboutUsData, {
      new: true,
      runValidators: true,
    });
  }

  return AboutUsPage.create(aboutUsData);
};


const getAboutUsMainPage = async () => {
  return AboutUsPage.find();
};

const getAboutUsByIdMain = async (id) => {
  return AboutUsPage.findById(id);
};

const updateAboutUsMainPage = async (id, aboutUsData) => {
  const updateData = await AboutUsPage.findByIdAndUpdate(id, aboutUsData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return updateData;
};

const deleteAboutUsMainPage = async (id) => {
  const deleteId = await AboutUsPage.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return deleteId;
};

const createBlog = async (blogData) => {

  const existingBlog = await IconBlog.findOne({ title: blogData?.title });
  if (existingBlog) {
    throw new ApiError(httpStatus.BAD_REQUEST, `IconBlog with title "${existingBlog}" already exists.`);
  }

  return IconBlog.create(blogData);
};

const getBlog = async () => {
  return IconBlog.find();
};

const updateBlog = async (id, blogData) => {
  const updateData = await IconBlog.findByIdAndUpdate(id, blogData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'IconBlog not found');
  return updateData;
};

const deleteBlog = async (id) => {
  const deleteId = await IconBlog.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'IconBlog not found');
  return deleteId;
};

const createHeroSection = async (bannerData) => {
  if (!bannerData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
  return IconHeroSection.create(bannerData);
};

const getHeroSection = async () => {
  return IconHeroSection.find().sort({ createdAt: -1 }); // newest first
};


const updateHeroSection = async (id, bannerData) => {
  const updateData = await IconHeroSection.findByIdAndUpdate(id, bannerData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteHeroSection = async (id) => {
  const deleteId = await IconHeroSection.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createTeam = async (teamData) => {
  if (!teamData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  if (!teamData.role) throw new ApiError(httpStatus.BAD_REQUEST, 'Role is required!');
  if (!teamData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');

  return InfiSpotlight.create(teamData);
};

const getTeam = async () => {
  return InfiSpotlight.find();
};

const getTeamById = async (id) => {
  const team = await InfiSpotlight.findById(id);
  if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'InfiSpotlight not found!');

  return team;
};

const updateTeam = async (id, teamData) => {
  const team = await InfiSpotlight.findByIdAndUpdate(id, teamData, { new: true });
  if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'InfiSpotlight not found!');
  return team;
};

const deleteTeam = async (id) => {
  const deleteId = await InfiSpotlight.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiSpotlight not found');
  return deleteId;
};

const createFeedback = async (feedbackData) => {
  if (!feedbackData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  if (!feedbackData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!')

  return IconReview.create(feedbackData);
};


const getFeedbacks = async () => {
  return IconReview.find();
};

const updateFeedback = async (id, feedbackData) => {
  const updateData = await IconReview.findByIdAndUpdate(id, feedbackData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteFeedback = async (id) => {
  const deleteId = await IconReview.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createFaq = async (attributeData) => {
  if (!attributeData.question) throw new ApiError(httpStatus.BAD_REQUEST, 'question is required!');
  if (!attributeData.answer) throw new ApiError(httpStatus.BAD_REQUEST, 'answer is required!');
  const existingCategory = await IconFaq.findOne({ question: attributeData?.question })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `FAQ with question "${attributeData.question}" already exists.`);
  }
  return IconFaq.create(attributeData);

};

const getFaqs = async () => {
  return IconFaq.find();
};

const updateFaq = async (id, attributeData) => {
  const updateData = await IconFaq.findByIdAndUpdate(id, attributeData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
  return updateData;
};


const deleteFaq = async (id) => {
  const deleteId = await IconFaq.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
  return deleteId;
};

const createCompanyInfo = async (chooseUsData) => {
  if (!chooseUsData.phoneNumber) throw new ApiError(httpStatus.BAD_REQUEST, 'phoneNumber is required!');
  if (!chooseUsData.email) throw new ApiError(httpStatus.BAD_REQUEST, 'email is required!');
  if (!chooseUsData.address) throw new ApiError(httpStatus.BAD_REQUEST, 'address is required!');
  return InfiCompanyInfo.create(chooseUsData);
};

const getCompanyInfo = async () => {
  return InfiCompanyInfo.find();
};

const updateCompanyInfo = async (id, chooseUsData) => {
  const updateData = await InfiCompanyInfo.findByIdAndUpdate(id, chooseUsData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'data not found');
  return updateData;
};

const deleteCompanyInfo = async (id) => {
  const deleteId = await InfiCompanyInfo.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'data not found');
  return deleteId;
};

const createServiceDetail = async (serviceData) => {
  if (!serviceData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
  if (!serviceData.subTitle) throw new ApiError(httpStatus.BAD_REQUEST, 'subTitle is required!');
  if (!serviceData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'description is required!');
  if (!serviceData.subDescription) throw new ApiError(httpStatus.BAD_REQUEST, 'subDescription is required!');

  if (!serviceData?.serviceId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'IconService is  required!');
  }
  else {
    if (serviceData?.serviceId) {
      const findCatId = await IconService.findById(serviceData?.serviceId)
      if (findCatId === null) throw new ApiError(httpStatus.NOT_FOUND, 'IconService not found');
    }
  }

  return IconServiceDetail.create(serviceData);
};

const getServiceDetail = async () => {
  return IconServiceDetail.find();
};

const updateServiceDetail = async (id, serviceData) => {
  const updateData = await IconServiceDetail.findByIdAndUpdate(id, serviceData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteServiceDetail = async (id) => {
  const deleteId = await IconServiceDetail.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createSpotlite = async (coreValueData) => {
  return await InfiSpotlight.create(coreValueData);
};

const getSpotlite = async () => {
  return InfiSpotlight.find();
};

const updateSpotlite = async (id, coreValueData) => {
  const updateData = await InfiSpotlight.findByIdAndUpdate(id, coreValueData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteSpotlite = async (id) => {
  const deleteId = await InfiSpotlight.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};


const createService = async (serviceData) => {
  if (!serviceData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
  if (!serviceData.icon) throw new ApiError(httpStatus.BAD_REQUEST, 'Icon is required!');
  if (!serviceData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'description is required!');
  const existingCategory = await IconService.findOne({ title: serviceData?.title })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `IconService with title "${serviceData.title}" already exists.`);
  }
  return IconService.create(serviceData);
};

const getService = async () => {
  return IconService.find();
};

const updateService = async (id, serviceData) => {
  const updateData = await IconService.findByIdAndUpdate(id, serviceData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteService = async (id) => {
  const deleteId = await IconService.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const getAboutUs = async () => {
  return await IconAboutUs.findOne(); // ✅ Fetch the only existing About Us entry
};

const createOrUpdateAboutUs = async (data) => {
  let aboutUs = await IconAboutUs.findOne();

  if (aboutUs) {
    aboutUs.title = data.title || aboutUs.title;
    aboutUs.description = data.description || aboutUs.description;

    // If items are passed, replace the existing ones
    if (Array.isArray(data.items)) {
      aboutUs.items = data.items;
    }

    await aboutUs.save();
  } else {
    aboutUs = await IconAboutUs.create({
      title: data.title,
      description: data.description,
      items: Array.isArray(data.items) ? data.items : [],
    });
  }

  return aboutUs;
};


const editAboutUs = async (id, data) => {
  const aboutUs = await IconAboutUs.findByIdAndUpdate(id, data, { new: true });
  if (!aboutUs) throw new Error("About Us entry not found");
  return aboutUs;
};

const deleteAboutUs = async (id) => {
  const deletedAboutUs = await IconAboutUs.findByIdAndDelete(id);
  if (!deletedAboutUs) throw new Error("About Us entry not found");
  return deletedAboutUs;
};


const createWhyChoose = async (data) => {
  return await IconWhyChoose.create(data);
};

const getAllWhyChoose = async () => {
  return await IconWhyChoose.find().sort({ createdAt: -1 });
};

const updateWhyChoose = async (id, data) => {
  return await IconWhyChoose.findByIdAndUpdate(id, data, { new: true });
};

const deleteWhyChoose = async (id) => {
  return await IconWhyChoose.findByIdAndDelete(id);
};

const createTestimonial = async (data) => {
  return await testimonialModel.create(data);
};

const getAllTestimonial = async () => {
  return await testimonialModel.find().sort({ createdAt: -1 });
};

const updateTestimonial = async (id, data) => {
  return await testimonialModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteTestimonial = async (id) => {
  return await testimonialModel.findByIdAndDelete(id);
};


const getAllBlogContains = async () => {
  return await IconBlogDetails.find();
};

  const getBlogContainsBYBlogId = async (blogId) => {
    const blog = await IconBlogDetails.findOne({ blogId });
    return blog;
  };

const updateBlogContains = async (id, data) => {
  return await IconBlogDetails.findByIdAndUpdate(id, data, { new: true });
};

const deleteBlogContains = async (id) => {
  return await IconBlogDetails.findByIdAndDelete(id);
};

const createBlogContains = async (data) => {
  const blogData = new IconBlogDetails(data);
  return await blogData.save();
};

const createBanner = async (data) => {
  return await bannerModel.create(data);
};

const getAllBanner = async () => {
  return await bannerModel.find().sort({ createdAt: -1 });
};

const updateBanner = async (id, data) => {
  return await bannerModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteBanner = async (id) => {
  return await bannerModel.findByIdAndDelete(id);
};

const createHomeAbout = async (data) => {
  return await homeAboutModel.create(data);
};

const getHomeAbout = async () => {
  return await homeAboutModel.find().sort({ createdAt: -1 });
};

const updateHomeAbout = async (id, data) => {
  return await homeAboutModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteHomeAbout = async (id) => {
  return await homeAboutModel.findByIdAndDelete(id);
};

const createHomeContact = async (data) => {
  return await homeContactModel.create(data);
};

const getHomeContact = async () => {
  return await homeContactModel.find().sort({ createdAt: -1 });
};

const updateHomeContact = async (id, data) => {
  return await homeContactModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteHomeContact = async (id) => {
  return await homeContactModel.findByIdAndDelete(id);
};

const createIndustriesCategory = async (data) => {
  return await IconIndustriesCategory.create(data);
};

const getIndustriesCategory = async () => {
  return await IconIndustriesCategory.find().sort({ createdAt: -1 });
};

const updateIndustriesCategory = async (id, data) => {
  return await IconIndustriesCategory.findByIdAndUpdate(id, data, { new: true });
};

const deleteIndustriesCategory = async (id) => {
  return await IconIndustriesCategory.findByIdAndDelete(id);
};

const getGroupedCategoriesService = async () => {
  const docs = await IconIndustriesCategory.find().lean();

  return docs.reduce((acc, cat) => {
    const type = cat.categoryType || "Uncategorized";
    if (!acc[type]) acc[type] = [];
    acc[type].push(cat);
    return acc;
  }, {});
};
const createEvent = async (data) => {
  return await eventModel.create(data);
};

const getEvent = async () => {
  return await eventModel.find().sort({ createdAt: -1 });
};

const updateEvent = async (id, data) => {
  return await eventModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteEvent = async (id) => {
  return await eventModel.findByIdAndDelete(id);
};

const createMainCategory = async (data) => {
  return await IconMainCategory.create(data);
};

const getMainCategory = async () => {
  return await IconMainCategory.find().sort({ createdAt: -1 });
};

const updateMainCategory = async (id, data) => {
  return await IconMainCategory.findByIdAndUpdate(id, data, { new: true });
};

const deleteMainCategory = async (id) => {
  return await IconMainCategory.findByIdAndDelete(id);
};

const createProductUSP = async (data) => {
  return await IconProductUSP.create(data);
};

const getProductUSP = async () => {
  return await IconProductUSP.find().sort({ createdAt: -1 });
};

const updateProductUSP = async (id, data) => {
  return await IconProductUSP.findByIdAndUpdate(id, data, { new: true });
};

const deleteProductUSP = async (id) => {
  return await IconProductUSP.findByIdAndDelete(id);
};

const createProductPacking = async (data) => {
  return await IconProductPacking.create(data);
};

const getProductPacking = async () => {
  return await IconProductPacking.find().sort({ createdAt: -1 });
};

const updateProductPacking = async (id, data) => {
  return await IconProductPacking.findByIdAndUpdate(id, data, { new: true });
};

const deleteProductPacking = async (id) => {
  return await IconProductPacking.findByIdAndDelete(id);
};

const getProductsByIndustryCategory = async (industryCategoryId) => {
  const products = await IconProduct.find({
    industryCategory: industryCategoryId,
  })
    .populate("category")
    .populate("industryCategory")
    .populate("productUSP")
    .populate("productPacking")
    .sort({ createdAt: -1 });

  return products;
};
export const getProductsByPackagingType = async (packagingTypeId) => {
  const products = await IconProduct.find({
    productPacking: packagingTypeId,
  })
    .populate("category")
    .populate("industryCategory")
    .populate("productUSP")
    .populate("productPacking")
    .sort({ createdAt: -1 });

  return products;
};

const getProductsByCategory = async (categoryId) => {
  const products = await IconProduct.find({
    category: categoryId,
  })
    .populate("category")
    .populate("industryCategory")
    .populate("productUSP")
    .populate("productPacking")
    .sort({ createdAt: -1 });

  return products;
};

export default {
  createCategory, getCategories, updateCategory, deleteCategory, createProduct, getProducts, updateProduct, deleteProduct, getProductsByCategoryId,
  createBlog, getBlog, updateBlog, deleteBlog, createHeroSection, getHeroSection, updateHeroSection, deleteHeroSection,
  createAboutUsMainPage, getAboutUsMainPage, getAboutUsByIdMain, updateAboutUsMainPage, deleteAboutUsMainPage, createTeam, getTeam, getTeamById, updateTeam, deleteTeam,
  createFeedback, getFeedbacks, updateFeedback, deleteFeedback, createFaq, getFaqs, updateFaq, deleteFaq, createCompanyInfo, getCompanyInfo, updateCompanyInfo, deleteCompanyInfo,
  createServiceDetail, getServiceDetail, updateServiceDetail, deleteServiceDetail, createSpotlite, getSpotlite, updateSpotlite, deleteSpotlite,
  createService, getService, updateService, deleteService, getAboutUs, createOrUpdateAboutUs, editAboutUs, deleteAboutUs,
  createWhyChoose, getAllWhyChoose, updateWhyChoose, deleteWhyChoose, createTestimonial, getAllTestimonial, updateTestimonial, deleteTestimonial,
  createBlogContains, getAllBlogContains, getBlogContainsBYBlogId, updateBlogContains, deleteBlogContains, getProductById, createBanner, getAllBanner, updateBanner, deleteBanner,
  createHomeAbout, getHomeAbout, updateHomeAbout, deleteHomeAbout, createHomeContact, getHomeContact, updateHomeContact, deleteHomeContact,
  createIndustriesCategory, getIndustriesCategory, updateIndustriesCategory, deleteIndustriesCategory, createEvent, getEvent, updateEvent, deleteEvent,
  createMainCategory, getMainCategory, updateMainCategory, deleteMainCategory, createProductUSP, getProductUSP, updateProductUSP, deleteProductUSP,
  createProductPacking, getProductPacking, updateProductPacking, deleteProductPacking, getGroupedCategoriesService, getProductsByIndustryCategory, getProductsByPackagingType,
  getProductsByCategory,
}