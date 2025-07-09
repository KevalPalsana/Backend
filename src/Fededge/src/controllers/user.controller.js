import userService from "../services/user.service.js";
import { sendSuccessResponse } from "../utils/ApiMessage.js";
import catchAsync from "../utils/catchAsync.js";
import mongoose from "mongoose";


const getFeedbacks = catchAsync(async (req, res) => {
  const feedbackData = await userService.getFeedbacks(req.body);
  sendSuccessResponse(res, 'get',  feedbackData );
});


const getUserAddressById = catchAsync(async (req, res) => {
  const userData = await userService.getUserAddressById(req.params.userId);
  sendSuccessResponse(res, 'get',  userData );
});

const updateFeedback = catchAsync(async (req, res) => {
  const feedbackData = await userService.updateFeedback(req.params.id, req.body);
  sendSuccessResponse(res, 'update',  feedbackData );
});

const deleteFeedback = catchAsync(async (req, res) => {
  const feedbackData = await userService.deleteFeedback(req.params.id);
  sendSuccessResponse(res, 'delete',  feedbackData );
});


const createContact = async (req, res) => {
  try {
    const { name, email, website, phone, budget, description } = req.body;


    const contactData = { name, email, website, phone, budget, description };
    const contact = await userService.saveContact(contactData);

    res.status(201).json({ message: 'Contact message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await userService.getAllContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await userService.getContactById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ contact });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.getUserById(userId);

    if (!user) {
      throw new ApiError("User not found");
    }
    
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error); 
  }
};

const getCoupon  = catchAsync(async (req, res) => {
  const coupon = await userService.getCoupon(req.body);
sendSuccessResponse(res, 'get', coupon);
});

const getCouponById  = catchAsync(async (req, res) => {
  const coupon = await userService.getCouponById(req.params.id);
sendSuccessResponse(res, 'get', coupon)
});

const getBlog = catchAsync(async (req, res) => {
  const blog = await userService.getBlog(req.body);
sendSuccessResponse(res, 'get', blog)
});
const getAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await userService.getAboutUsPage(req.body);
sendSuccessResponse(res, 'get', AboutUs)
});

const getAboutUsById = catchAsync(async (req, res) => {
  const AboutUs = await userService.getAboutUsById(req.params.id);
sendSuccessResponse(res, 'get', AboutUs)
});

export default { getFeedbacks, updateFeedback, deleteFeedback,
  getUserAddressById,createContact, getContacts, getContact,
 getUserById, getCoupon, getCouponById, getBlog, getAboutUsPage, getAboutUsById}