import { diskStorage } from "multer";
import adminService from "../services/admin.service.js";
import { sendSuccessResponse } from "../utils/ApiMessage.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status"


  const createService  = catchAsync(async (req, res) => {
    const service = await adminService.createService(req.body);
    sendSuccessResponse(res, 'create', service)  
});

const getService  = catchAsync(async (req, res) => {
    const service = await adminService.getService(req.body);
    sendSuccessResponse(res, 'get', service)
});

const updateService = catchAsync(async (req, res) => {
    const service = await adminService.updateService(req.params.id, req.body);
    sendSuccessResponse(res, 'update', service)
  });

const deleteService = catchAsync(async (req, res) => {
    const service = await adminService.deleteService(req.params.id);
    sendSuccessResponse(res, 'delete', service)
  });


const createGallery  = catchAsync(async (req, res) => {
    const data = await adminService.createGallery(req.body);
    sendSuccessResponse(res, 'post', data)
  });

const getGallery  = catchAsync(async (req, res) => {
    const data = await adminService.getGallery(req.body);
    sendSuccessResponse(res, 'get', data)
  });

const updateGallery  = catchAsync(async (req, res) => {
    const data = await adminService.updateGallery(req.params.id, req.body);
    sendSuccessResponse(res, 'put', data)
  });

const deleteGallery   = catchAsync(async (req, res) => {
    const data = await adminService.deleteGallery(req.params.id);
    sendSuccessResponse(res, 'delete', data)
  });

  const createSpotlite  = catchAsync(async (req, res) => {
    const data = await adminService.createSpotlite(req.body);
    sendSuccessResponse(res, 'post', data)
  });

const getSpotlite  = catchAsync(async (req, res) => {
    const data = await adminService.getSpotlite(req.body);
    sendSuccessResponse(res, 'get', data)
  });

const updateSpotlite  = catchAsync(async (req, res) => {
    const data = await adminService.updateSpotlite(req.params.id, req.body);
    sendSuccessResponse(res, 'put', data)
  });

const deleteSpotlite   = catchAsync(async (req, res) => {
    const data = await adminService.deleteSpotlite(req.params.id);
    sendSuccessResponse(res, 'delete', data)
  });

const createCategory  = catchAsync(async (req, res) => {
  console.log('req.body', req.body)
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

const createSubCategory  = catchAsync(async (req, res) => {
    const category = await adminService.createSubCategory(req.body);
    res.status(httpStatus.CREATED).send({ category });
  });

const getSubCategories   = catchAsync(async (req, res) => {
    const category = await adminService.getSubCategories(req.body);
    res.status(httpStatus.OK).send({ category });
  });

const getSubCategoryByCategoryId = catchAsync(async (req, res) => {
  const category = await adminService.getSubCategoryByCategoryId(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const updateSubCategory  = catchAsync(async (req, res) => {
    const category = await adminService.updateSubCategory(req.params.id, req.body);
    res.status(httpStatus.OK).send({ category });
  });

const deleteSubCategory   = catchAsync(async (req, res) => {
    const category = await adminService.deleteSubCategory(req.params.id);
    res.status(httpStatus.OK).send({ category , Message:"Delete SuccessFully...!"});
  });

const createProduct  = catchAsync(async (req, res) => {
    const product = await adminService.createProduct(req.body);
    res.status(httpStatus.CREATED).send({ product });
  });

const getProducts  = catchAsync(async (req, res) => {
    const product = await adminService.getProducts(req.query);
    res.status(httpStatus.OK).send({ product });
  });

const updateProduct = catchAsync(async (req, res) => {
    const product = await adminService.updateProduct(req.params.id, req.body);
    res.status(httpStatus.OK).send({ product });
  });

const deleteProduct = catchAsync(async (req, res) => {
    const product = await adminService.deleteProduct(req.params.id);
    res.status(httpStatus.OK).send({ product});
  });

const getProductsByCategoryId = catchAsync(async (req, res) => {
    const product = await adminService.getProductsByCategoryId(req.params.id);
    res.status(httpStatus.OK).send({ product });
  });

const getFeaturedProducts = catchAsync(async (req, res) => {
  const products = await adminService.getFeaturedProducts(); 
  res.status(httpStatus.OK).send({
      success: true,
      message: 'Featured products fetched successfully',
      data: products
  });
});

const createCalculation = catchAsync(async (req, res) => {
  const calculation = await adminService.createCalculation(req.body);
  sendSuccessResponse(res, 'post', calculation)
});

const getCalculation = catchAsync(async (req, res) => {
  const calculation = await adminService.getCalculation(req.body);
  sendSuccessResponse(res, 'get', calculation)
})

const updateCalculation = catchAsync(async (req, res) => {
  const calculation = await adminService.updateCalculation(req.params.id, req.body);
  sendSuccessResponse(res, 'put', calculation)
});

const deleteCalculation = catchAsync(async (req, res) => {
  const calculation = await adminService.deleteCalculation(req.params.id);
  sendSuccessResponse(res, 'delete', calculation)
});

const getOrderList = catchAsync(async (req, res) => {
  const {status} = req.query
  const orderList = await adminService.getOrderList(status);
  res.status(httpStatus.OK).send({ orderList });
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await adminService.getOrderById(req.params.id);
  res.status(httpStatus.OK).send({ order });
})

const createPopularCategory = catchAsync(async (req, res) => {
  const category = await adminService.createPopularCategory(req.body);
  sendSuccessResponse(res, 'post', category)
});

const getPopularCategory = catchAsync(async (req, res) => {
  const category = await adminService.getPopularCategory(req.body);
  sendSuccessResponse(res, 'get', category)
})

const updatePopularCategory = catchAsync(async (req, res) => {
  const category = await adminService.updatePopularCategory(req.params.id, req.body);
  sendSuccessResponse(res, 'put', category)
});

const deletePopularCategory = catchAsync(async (req, res) => {
  const category = await adminService.deletePopularCategory(req.params.id);
  sendSuccessResponse(res, 'delete', category)
});

const createSection = catchAsync(async (req, res) => {
  const section = await adminService.createSection(req.body);
  sendSuccessResponse(res, 'post', section)
});

const getSection = catchAsync(async (req, res) => {
  const section = await adminService.getSection(req.body);
  sendSuccessResponse(res, 'get', section)
})

const updateSection = catchAsync(async (req, res) => {
  const section = await adminService.updateSection(req.params.id, req.body);
  sendSuccessResponse(res, 'put', section)
});

const deleteSection = catchAsync(async (req, res) => {
  const section = await adminService.deleteSection(req.params.id);
  sendSuccessResponse(res, 'delete', section)
});


const createFaq = catchAsync(async (req, res) => {
  const faq = await adminService.createFaq(req.body);
  sendSuccessResponse(res, 'get', faq)
});

const getFaqs = catchAsync(async (req, res) => {
  const faqs = await adminService.getFaqs(req.body);
  sendSuccessResponse(res, 'get', faqs)
});

const updateFaq = catchAsync(async (req, res) => {
  const faq = await adminService.updateFaq(req.params.id, req.body);
  sendSuccessResponse(res, 'put', faq)
});

const deleteFaq = catchAsync(async (req, res) => {
  const faq = await adminService.deleteFaq(req.params.id);
  sendSuccessResponse(res, 'delete', faq)
});

const createFeedback  = catchAsync(async (req, res) => {
  const testimonial = await adminService.createFeedback(req.body);
  sendSuccessResponse(res, 'post', testimonial)
});

const getFeedbacks  = catchAsync(async (req, res) => {
  const testimonial = await adminService.getFeedbacks(req.body);
  sendSuccessResponse(res, 'get', testimonial)
});

const updateFeedback = catchAsync(async (req, res) => {
  const testimonial = await adminService.updateFeedback(req.params.id, req.body);
  sendSuccessResponse(res, 'put', testimonial)
});

const deleteFeedback = catchAsync(async (req, res) => {
  const testimonial = await adminService.deleteFeedback(req.params.id);
  sendSuccessResponse(res, 'delete', testimonial)
});

const createTeam  = catchAsync(async (req, res) => {
  const team = await adminService.createTeam(req.body);
  sendSuccessResponse(res, 'post', team)
});

const getTeam  = catchAsync(async (req, res) => {
  const team = await adminService.getTeam(req.body);
  sendSuccessResponse(res, 'get', team)
});

const getTeamById  = catchAsync(async (req, res) => {
  const team = await adminService.getTeamById(req.params.id);
  sendSuccessResponse(res, 'get', team)
});

const updateTeam = catchAsync(async (req, res) => {
  const team = await adminService.updateTeam(req.params.id, req.body);
  sendSuccessResponse(res, 'put', team)
});

const deleteTeam = catchAsync(async (req, res) => {
  const team = await adminService.deleteTeam(req.params.id);
  sendSuccessResponse(res, 'delete', team)
});

const createCompanyInfo = catchAsync(async (req, res) => {
  const infoData = await adminService.createCompanyInfo(req.body);
  sendSuccessResponse(res, 'post', infoData)
});

const getCompanyInfo = catchAsync(async (req, res) => {
  const infoData = await adminService.getCompanyInfo(req.body);
  sendSuccessResponse(res, 'get', infoData)
})

const updateCompanyInfo = catchAsync(async (req, res) => {
  const infoData = await adminService.updateCompanyInfo(req.params.id, req.body);
  sendSuccessResponse(res, 'put', infoData)
});

const deleteCompanyInfo = catchAsync(async (req, res) => {
  const infoData = await adminService.deleteCompanyInfo(req.params.id);
  sendSuccessResponse(res, 'delete', deleteCompanyInfo)
});

const addAboutUs = catchAsync(async (req, res) => {
  const AboutUs = await adminService.createOrUpdateAboutUs(req.body);
  res.status(httpStatus.CREATED).send({ AboutUs });
});

const getAboutUs = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getAboutUs(req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const updateAboutUs = catchAsync(async (req, res) => {
  const AboutUs = await adminService.editAboutUs(req.params.id, req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const deleteAboutUs = catchAsync(async (req, res) => {
  const AboutUs = await adminService.deleteAboutUs(req.params.id);
  res.status(httpStatus.OK).send({ AboutUs });
});

const createFirstYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.createFirstYear(req.body);
  res.status(httpStatus.CREATED).send({ AboutUs });
});

const getFirstYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getFirstYear(req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const updateFirstYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.updateFirstYear(req.params.id, req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const deleteFirstYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.deleteFirstYear(req.params.id);
  res.status(httpStatus.OK).send({ AboutUs });
});

const createSecondYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.createSecondYear(req.body);
  res.status(httpStatus.CREATED).send({ AboutUs });
});

const getSecondYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getSecondYear(req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const updateSecondYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.updateSecondYear(req.params.id, req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const deleteSecondYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.deleteSecondYear(req.params.id);
  res.status(httpStatus.OK).send({ AboutUs });
});

const createThirdYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.createThirdYear(req.body);
  res.status(httpStatus.CREATED).send({ AboutUs });
});

const getThirdYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getThirdYear(req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const updateThirdYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.updateThirdYear(req.params.id, req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const deleteThirdYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.deleteThirdYear(req.params.id);
  res.status(httpStatus.OK).send({ AboutUs });
});

const createForthYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.createForthYear(req.body);
  res.status(httpStatus.CREATED).send({ AboutUs });
});

const getForthYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getForthYear(req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const updateForthYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.updateForthYear(req.params.id, req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const deleteForthYear = catchAsync(async (req, res) => {
  const AboutUs = await adminService.deleteForthYear(req.params.id);
  res.status(httpStatus.OK).send({ AboutUs });
});

const addBlog = catchAsync(async (req, res) => {
  const blog = await adminService.createBlog(req.body);
  res.status(httpStatus.CREATED).send({ blog });
});

const getBlog = catchAsync(async (req, res) => {
  const blog = await adminService.getBlog(req.body);
  res.status(httpStatus.OK).send({ blog });
});

const updateBlog = catchAsync(async (req, res) => {
  const blog = await adminService.updateBlog(req.params.id, req.body);
  res.status(httpStatus.OK).send({ blog });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blog = await adminService.deleteBlog(req.params.id);
  res.status(httpStatus.OK).send({ blog });
});


const addHeroSection = catchAsync(async (req, res) => {
  const heroSection = await adminService.createHeroSection(req.body);
  res.status(httpStatus.CREATED).send({ heroSection });
});

const getHeroSection = catchAsync(async (req, res) => {
  const heroSection = await adminService.getHeroSection(req.body);
  res.status(httpStatus.OK).send({ heroSection });
});

const updateHeroSection = catchAsync(async (req, res) => {
  const heroSection = await adminService.updateHeroSection(req.params.id, req.body);
  res.status(httpStatus.OK).send({ heroSection });
});

const deleteHeroSection = catchAsync(async (req, res) => {
  const heroSection = await adminService.deleteHeroSection(req.params.id);
  res.status(httpStatus.OK).send({ heroSection });
});

const createWhatWeOffer = catchAsync(async (req, res) => {
  const WhatWeOffer = await adminService.createWhatWeOffer(req.body);
  sendSuccessResponse(res, 'post', WhatWeOffer)
});

const getWhatWeOffer = catchAsync(async (req, res) => {
  const WhatWeOffer = await adminService.getWhatWeOffer(req.body);
  sendSuccessResponse(res, 'get', WhatWeOffer)
});

const updateWhatWeOffer = catchAsync(async (req, res) => {
  const WhatWeOffer = await adminService.updateWhatWeOffer(req.params.id, req.body);
  sendSuccessResponse(res, 'put', WhatWeOffer)
});

const deleteWhatWeOffer = catchAsync(async (req, res) => {
  const WhatWeOffer = await adminService.deleteWhatWeOffer(req.params.id);
  sendSuccessResponse(res, 'delete', WhatWeOffer)
});

const createServiceDetail = catchAsync(async (req, res) => {
  const vision = await adminService.createServiceDetail(req.body);
  sendSuccessResponse(res, 'post', vision)
});

const getServiceDetail = catchAsync(async (req, res) => {
  const vision = await adminService.getServiceDetail(req.body);
  sendSuccessResponse(res, 'get', vision)
});

const updateServiceDetail = catchAsync(async (req, res) => {
  const vision = await adminService.updateServiceDetail(req.params.id, req.body);
  sendSuccessResponse(res, 'put', vision)
});

const deleteServiceDetail = catchAsync(async (req, res) => {
  const vision = await adminService.deleteServiceDetail(req.params.id);
  sendSuccessResponse(res, 'delete', vision)
});

const createMission = catchAsync(async (req, res) => {
  const mission = await adminService.createMission(req.body);
  sendSuccessResponse(res, 'post', mission)
});

const getMission = catchAsync(async (req, res) => {
  const mission = await adminService.getMission(req.body);
  sendSuccessResponse(res, 'get', mission)
});

const updateMission = catchAsync(async (req, res) => {
  const mission = await adminService.updateMission(req.params.id, req.body);
  sendSuccessResponse(res, 'put', mission)
});

const deleteMission = catchAsync(async (req, res) => {
  const mission = await adminService.deleteMission(req.params.id);
  sendSuccessResponse(res, 'delete', mission)
});

const createOurCore = catchAsync(async (req, res) => {
  const coreValuesMain = await adminService.createOurCore(req.body);
  sendSuccessResponse(res, 'post', coreValuesMain)
});

const getOurCore  = catchAsync(async (req, res) => {
  const coreValuesMain = await adminService.getOurCore (req.body);
  sendSuccessResponse(res, 'get', coreValuesMain)
});

const updateOurCore = catchAsync(async (req, res) => {
  const coreValuesMain = await adminService.updateOurCore(req.params.id, req.body);
  sendSuccessResponse(res, 'put', coreValuesMain)
});

const deleteOurCore = catchAsync(async (req, res) => {
  const coreValuesMain = await adminService.deleteOurCore(req.params.id);
  sendSuccessResponse(res, 'delete', coreValuesMain)
});

const createAchievement = catchAsync(async (req, res) => {
  const data = await adminService.createAchievement(req.body);
  sendSuccessResponse(res, 'post', data)
});

const getAchievement  = catchAsync(async (req, res) => {
  const data = await adminService.getAchievement (req.body);
  sendSuccessResponse(res, 'get', data)
});

const updateAchievement = catchAsync(async (req, res) => {
  const data = await adminService.updateAchievement(req.params.id, req.body);
  sendSuccessResponse(res, 'put', data)
});

const deleteAchievement = catchAsync(async (req, res) => {
  const data = await adminService.deleteAchievement(req.params.id);
  sendSuccessResponse(res, 'delete', data)
});

const createPopularTag = catchAsync(async (req, res) => {
  const data = await adminService.createPopularTag(req.body);
  sendSuccessResponse(res, 'post', data)
});

const getPopularTag  = catchAsync(async (req, res) => {
  const data = await adminService.getPopularTag (req.body);
  sendSuccessResponse(res, 'get', data)
});

const updatePopularTag = catchAsync(async (req, res) => {
  const data = await adminService.updatePopularTag(req.params.id, req.body);
  sendSuccessResponse(res, 'put', data)
});

const deletePopularTag = catchAsync(async (req, res) => {
  const data = await adminService.deletePopularTag(req.params.id);
  sendSuccessResponse(res, 'delete', data)
});

const createCoreValue = catchAsync(async (req, res) => {
  const coreValue = await adminService.createCoreValue(req.body);
  res.status(httpStatus.CREATED).send({ coreValue });
});

const getCoreValue = catchAsync(async (req, res) => {
  const coreValue = await adminService.getCoreValue(req.body);
  res.status(httpStatus.OK).send({ coreValue });
});

const updateCoreValue = catchAsync(async (req, res) => {
  const coreValue = await adminService.updateCoreValue(req.params.id, req.body);
  res.status(httpStatus.OK).send({ coreValue });
});

const deleteCoreValue = catchAsync(async (req, res) => {
  const coreValue = await adminService.deleteCoreValue(req.params.id);
  res.status(httpStatus.OK).send({ coreValue });
});

const createWhyChoose = async (req, res) => {
  try {
    const result = await adminService.createWhyChoose(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to create", error: err.message });
  }
};

export const getAllWhyChoose = async (req, res) => {
  try {
    const data = await adminService.getAllWhyChoose();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", error: err.message });
  }
};

export const updateWhyChoose = async (req, res) => {
  try {
    const updated = await adminService.updateWhyChoose(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update", error: err.message });
  }
};

const deleteWhyChoose = async (req, res) => {
  try {
    await adminService.deleteWhyChoose(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
};



const createTestimonial = async (req, res) => {
  try {
    const result = await adminService.createTestimonial(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to create", error: err.message });
  }
};

export const getAllTestimonial = async (req, res) => {
  try {
    const data = await adminService.getAllTestimonial();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", error: err.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const updated = await adminService.updateTestimonial(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update", error: err.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    await adminService.deleteTestimonial(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
};

const createBlogContains = catchAsync(async (req, res) => {
  console.log('req.body', req.body)
  const blog = await adminService.createBlogContains(req.body);
  res.status(httpStatus.CREATED).send({ blog });
});

const getAllBlogContains = catchAsync(async (req, res) => {
  const blog = await adminService.getAllBlogContains(req.body);
  res.status(httpStatus.OK).send({ blog });
});

const getBlogContainsBYBlogId = catchAsync(async (req, res) => {
  const blog = await adminService.getBlogContainsBYBlogId(req.params.id);
  res.status(httpStatus.OK).send({ blog });
});

const updateBlogContains = catchAsync(async (req, res) => {
  const blog = await adminService.updateBlog(req.params.id, req.body);
  res.status(httpStatus.OK).send({ blog });
});

const deleteBlogContains = catchAsync(async (req, res) => {
  const blog = await adminService.deleteBlogContains(req.params.id);
  res.status(httpStatus.OK).send({ blog });
});

const createBanner = catchAsync(async (req, res) => {
  const banner = await adminService.createBanner(req.body);
  sendSuccessResponse(res, 'post', banner)
});

const getAllBanner = catchAsync(async (req, res) => {
  const banner = await adminService.getAllBanner(req.body);
  sendSuccessResponse(res, 'get', banner)
});

const updateBanner = catchAsync(async (req, res) => {
  const banner = await adminService.updateBanner(req.params.id, req.body);
  sendSuccessResponse(res, 'put', banner)
});

const deleteBanner = catchAsync(async (req, res) => {
  const banner = await adminService.deleteBanner(req.params.id);
  sendSuccessResponse(res, 'delete', banner)
});

const createHomeAbout = catchAsync(async (req, res) => {
  const about = await adminService.createHomeAbout(req.body);
  sendSuccessResponse(res, 'post', about)
});

const getHomeAbout = catchAsync(async (req, res) => {
  const about = await adminService.getHomeAbout(req.body);
  sendSuccessResponse(res, 'get', about)
});

const updateHomeAbout = catchAsync(async (req, res) => {
  const about = await adminService.updateHomeAbout(req.params.id, req.body);
  sendSuccessResponse(res, 'put', about)
});

const deleteHomeAbout = catchAsync(async (req, res) => {
  const about = await adminService.deleteHomeAbout(req.params.id);
  sendSuccessResponse(res, 'delete', about)
});

const createHomeContact = catchAsync(async (req, res) => {
  const contact = await adminService.createHomeContact(req.body);
  sendSuccessResponse(res, 'post', contact)
});

const getHomeContact = catchAsync(async (req, res) => {
  const contact = await adminService.getHomeContact(req.body);
  sendSuccessResponse(res, 'get', contact)
});

const updateHomeContact = catchAsync(async (req, res) => {
  const contact = await adminService.updateHomeContact(req.params.id, req.body);
  sendSuccessResponse(res, 'put', contact)
});

const deleteHomeContact = catchAsync(async (req, res) => {
  const contact = await adminService.deleteHomeContact(req.params.id);
  sendSuccessResponse(res, 'delete', contact)
});

const createIndustriesCategory = catchAsync(async (req, res) => {
  const category = await adminService.createIndustriesCategory(req.body);
  sendSuccessResponse(res, 'post', category)
});

const getIndustriesCategory = catchAsync(async (req, res) => {
  const category = await adminService.getIndustriesCategory(req.body);
  sendSuccessResponse(res, 'get', category)
});

const updateIndustriesCategory = catchAsync(async (req, res) => {
  const category = await adminService.updateIndustriesCategory(req.params.id, req.body);
  sendSuccessResponse(res, 'put', category)
});

const deleteIndustriesCategory = catchAsync(async (req, res) => {
  const category = await adminService.deleteIndustriesCategory(req.params.id);
  sendSuccessResponse(res, 'delete', category)
});

 const getGroupedCategories = async (req, res) => {
  try {
    const groupedCategories = await adminService.getGroupedCategoriesService();
    res.status(200).json({ groupedCategories });
  } catch (err) {
    console.error("Error fetching grouped categories:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const createEvent = catchAsync(async (req, res) => {
  const category = await adminService.createEvent(req.body);
  sendSuccessResponse(res, 'post', category)
});

const getEvent = catchAsync(async (req, res) => {
  const category = await adminService.getEvent(req.body);
  sendSuccessResponse(res, 'get', category)
});

const updateEvent = catchAsync(async (req, res) => {
  const category = await adminService.updateEvent(req.params.id, req.body);
  sendSuccessResponse(res, 'put', category)
});

const deleteEvent = catchAsync(async (req, res) => {
  const category = await adminService.deleteEvent(req.params.id);
  sendSuccessResponse(res, 'delete', category)
});

const createMainCategory = catchAsync(async (req, res) => {
  const category = await adminService.createMainCategory(req.body);
  sendSuccessResponse(res, 'post', category)
});

const getMainCategory = catchAsync(async (req, res) => {
  const category = await adminService.getMainCategory(req.body);
  sendSuccessResponse(res, 'get', category)
});

const updateMainCategory = catchAsync(async (req, res) => {
  const category = await adminService.updateMainCategory(req.params.id, req.body);
  sendSuccessResponse(res, 'put', category)
});

const deleteMainCategory = catchAsync(async (req, res) => {
  const category = await adminService.deleteMainCategory(req.params.id);
  sendSuccessResponse(res, 'delete', category)
});

const createProductUSP = catchAsync(async (req, res) => {
  const product = await adminService.createProductUSP(req.body);
  sendSuccessResponse(res, 'post', product)
});

const getProductUSP = catchAsync(async (req, res) => {
  const product = await adminService.getProductUSP(req.body);
  sendSuccessResponse(res, 'get', product)
});

const updateProductUSP = catchAsync(async (req, res) => {
  const product = await adminService.updateProductUSP(req.params.id, req.body);
  sendSuccessResponse(res, 'put', product)
});

const deleteProductUSP = catchAsync(async (req, res) => {
  const product = await adminService.deleteProductUSP(req.params.id);
  sendSuccessResponse(res, 'delete', product)
});

const createProductPacking = catchAsync(async (req, res) => {
  const product = await adminService.createProductPacking(req.body);
  sendSuccessResponse(res, 'post', product)
});

const getProductPacking = catchAsync(async (req, res) => {
  const product = await adminService.getProductPacking(req.body);
  sendSuccessResponse(res, 'get', product)
});

const updateProductPacking = catchAsync(async (req, res) => {
  const product = await adminService.updateProductPacking(req.params.id, req.body);
  sendSuccessResponse(res, 'put', product)
});

const deleteProductPacking = catchAsync(async (req, res) => {
  const product = await adminService.deleteProductPacking(req.params.id);
  sendSuccessResponse(res, 'delete', product)
});

const getProductsByIndustryCategory = catchAsync(async (req, res) => {
  const { industryCategoryId } = req.params;

  const products = await adminService.getProductsByIndustryCategory(industryCategoryId);

  res.status(httpStatus.OK).json({
    status: true,
    message: "Products fetched successfully",
    data: products,
  });
});

const getProductsByPackagingType = catchAsync(async (req, res) => {
  const { packagingTypeId } = req.params;

  const products = await adminService.getProductsByPackagingType(packagingTypeId);

  res.status(httpStatus.OK).json({
    status: true,
    message: "Packaging products fetched successfully",
    data: products,
  });
});

 const getProductsByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  const products = await adminService.getProductsByCategory(categoryId);

  res.status(httpStatus.OK).json({
    status: true,
    message: "Category products fetched successfully",
    data: products,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;       
  const product = await adminService.getProductById(id);

  res.status(httpStatus.OK).json({
    status: true,
    message: 'Product retrieved successfully',
    data: product,
  });
});

export default {createCategory,getCategories,updateCategory,deleteCategory,createSubCategory,getSubCategories,getSubCategoryByCategoryId,updateSubCategory,deleteSubCategory,
  createProduct,getProducts,updateProduct,deleteProduct,getProductsByCategoryId, getFeaturedProducts, createGallery,updateGallery,deleteGallery,getGallery,
createCalculation, getCalculation, updateCalculation, deleteCalculation,deleteBanner, updateBanner,getAllBanner,createBanner,getOrderList,
getOrderById, createPopularCategory, getPopularCategory, updatePopularCategory, deletePopularCategory, createSection, getSection, updateSection, deleteSection,
createFaq, getFaqs, updateFaq, deleteFaq, createFeedback, getFeedbacks, updateFeedback, deleteFeedback, createTeam, getTeam, getTeamById, updateTeam, deleteTeam,
createCompanyInfo, getCompanyInfo, updateCompanyInfo, deleteCompanyInfo, addAboutUs, getAboutUs, updateAboutUs, deleteAboutUs, createAchievement, getAchievement,
addBlog, getBlog, updateBlog, deleteBlog, createWhatWeOffer, getWhatWeOffer, updateWhatWeOffer, deleteWhatWeOffer, createServiceDetail, getServiceDetail, updateServiceDetail, deleteServiceDetail,
createMission, getMission, updateMission, deleteMission, createOurCore, getOurCore, updateOurCore, deleteOurCore, addHeroSection, getHeroSection, updateHeroSection, deleteHeroSection,
createService, getService, updateService, deleteService, createAchievement, getAchievement, updateAchievement, deleteAchievement, createSecondYear, getSecondYear, updateSecondYear, deleteSecondYear,
createPopularTag, getPopularTag, updatePopularTag, deletePopularTag, createFirstYear, getFirstYear, updateFirstYear, deleteFirstYear, createThirdYear, getThirdYear, updateThirdYear, deleteThirdYear,
createForthYear, getForthYear, updateForthYear, deleteForthYear, createCoreValue, getCoreValue, updateCoreValue, deleteCoreValue,
createSpotlite, getSpotlite, updateSpotlite, deleteSpotlite, createWhyChoose, deleteWhyChoose, updateWhyChoose, getAllWhyChoose, createTestimonial, getAllTestimonial, updateTestimonial, deleteTestimonial,
createBlogContains, getAllBlogContains, getBlogContainsBYBlogId, updateBlogContains, deleteBlogContains, createHomeAbout, getHomeAbout, updateHomeAbout, deleteHomeAbout,
createHomeContact, getHomeContact, updateHomeContact, deleteHomeContact, createIndustriesCategory, getIndustriesCategory, updateIndustriesCategory, deleteIndustriesCategory,
createEvent, getEvent, updateEvent, deleteEvent, createMainCategory, getMainCategory, updateMainCategory, deleteMainCategory, createProductUSP, getProductUSP, updateProductUSP, deleteProductUSP,
createProductPacking, getProductPacking, updateProductPacking, deleteProductPacking, getGroupedCategories, getProductsByIndustryCategory, getProductById, getProductsByPackagingType, getProductsByCategory,
}
