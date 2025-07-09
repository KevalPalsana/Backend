import { diskStorage } from "multer";
import adminService from "../services/admin.service.js";
import { generateSuccessMessage, sendSuccessResponse } from "../utils/ApiMessage.js";
import { sendResponse } from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status"


const createTextLine  = catchAsync(async (req, res) => {
    const data = await adminService.createTextLine(req.body);
    sendSuccessResponse(res, 'create', data)  
});

const getTextLine  = catchAsync(async (req, res) => {
    const data = await adminService.getTextLine(req.body);
    sendSuccessResponse(res, 'get', data)
});

const updateTextLine = catchAsync(async (req, res) => {
    const data = await adminService.updateTextLine(req.params.id, req.body);
    sendSuccessResponse(res, 'update', data)
  });

const deleteTextLine = catchAsync(async (req, res) => {
    const data = await adminService.deleteTextLine(req.params.id);
    sendSuccessResponse(res, 'delete', data)
  });

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


const createKeyAchievement  = catchAsync(async (req, res) => {
    const data = await adminService.createKeyAchievement(req.body);
    sendSuccessResponse(res, 'post', data)
  });

const getKeyAchievement  = catchAsync(async (req, res) => {
    const data = await adminService.getKeyAchievement(req.body);
    sendSuccessResponse(res, 'get', data)
  });

const updateKeyAchievement  = catchAsync(async (req, res) => {
    const data = await adminService.updateKeyAchievement(req.params.id, req.body);
    sendSuccessResponse(res, 'put', data)
  });

const deleteKeyAchievement   = catchAsync(async (req, res) => {
    const data = await adminService.deleteKeyAchievement(req.params.id);
    sendSuccessResponse(res, 'delete', data)
  });
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

const createWhyChooseUs = catchAsync(async (req, res) => {
  const chooseUsData = await adminService.createWhyChooseUs(req.body);
  sendSuccessResponse(res, 'post', chooseUsData)
});

const getWhyChooseUs = catchAsync(async (req, res) => {
  const chooseUsData = await adminService.getWhyChooseUs(req.body);
  sendSuccessResponse(res, 'get', chooseUsData)
})

const updateWhyChooseUs = catchAsync(async (req, res) => {
  const chooseUsData = await adminService.updateWhyChooseUs(req.params.id, req.body);
  sendSuccessResponse(res, 'put', chooseUsData)
});

const deleteWhyChooseUs = catchAsync(async (req, res) => {
  const chooseUsData = await adminService.deleteWhyChooseUs(req.params.id);
  sendSuccessResponse(res, 'delete', chooseUsData)
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


const addAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.createAboutUsMainPage(req.body);
  res.status(httpStatus.CREATED).send({ AboutUs });
});

const getAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getAboutUsMainPage(req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const updateAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.updateAboutUsMainPage(req.params.id, req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const deleteAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.deleteAboutUsMainPage(req.params.id);
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

const deleteContactUs = catchAsync(async (req, res) => {
  const data = await adminService.deleteContactUs(req.params.id);
  sendSuccessResponse(res, 'delete', data)
});

const getAllContacts  = catchAsync(async (req, res) => {
  const data = await adminService.getAllContacts (req.body);
  sendSuccessResponse(res, 'get', data)
});


export default { createKeyAchievement,updateKeyAchievement,deleteKeyAchievement,getKeyAchievement,
deleteTextLine, updateTextLine,getTextLine,createTextLine, createPopularCategory, getPopularCategory, updatePopularCategory, deletePopularCategory, createWhyChooseUs, getWhyChooseUs, updateWhyChooseUs, deleteWhyChooseUs,
createFaq, getFaqs, updateFaq, deleteFaq, createFeedback, getFeedbacks, updateFeedback, deleteFeedback, createTeam, getTeam, getTeamById, updateTeam, deleteTeam,
addAboutUsPage, getAboutUsPage, updateAboutUsPage, deleteAboutUsPage,
addBlog, getBlog, updateBlog, deleteBlog, createServiceDetail, getServiceDetail, updateServiceDetail, deleteServiceDetail,
createService, getService, updateService, deleteService, createAchievement, getAchievement, updateAchievement, deleteAchievement,
createPopularTag, getPopularTag, updatePopularTag, deletePopularTag, deleteContactUs, getAllContacts}
