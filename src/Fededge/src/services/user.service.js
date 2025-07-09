import {ApiError} from '../utils/ApiError.js';
import httpStatus from "http-status"
import { FededgeReview} from '../models/review.model.js';
import FededgeContact from '../models/contactUs.model.js';
import Coupon from '../models/team.model.js';
import { FededgeBlog } from '../models/blog.model.js';
import { FededgeAboutUs } from '../models/aboutUs.model.js';
import { FededgeUser } from '../models/user.model.js';

const getUserByEmail = async (email) => {
    return FededgeUser.findOne({ email });
  };

const getUserByName = async (username) => {
    return FededgeUser.findOne({ username });
  };

const getUserById = async (id) => {
    return FededgeUser.findById(id);
  };


const createFeedback = async (feedbackData) => {
  if(!feedbackData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  if(!feedbackData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!')

    return FededgeReview.create(feedbackData);
};


const getFeedbacks = async () => {
  return FededgeReview.find();
};

const updateFeedback = async (id, feedbackData) => {
  const updateData = await FededgeReview.findByIdAndUpdate(id, feedbackData, {new: true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteFeedback = async (id) => {
  const deleteId =  await FededgeReview.findByIdAndDelete(id);
  if (deleteId === null ) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};


const saveContact = async (contactData) => {
  const contact = new FededgeContact(contactData);
  return await contact.save();
};


const getAllContacts = async () => {
  return await FededgeContact.find().sort({ createdAt: -1 });
};

const getContactById = async (id) => {
  return await FededgeContact.findById(id);
};

const getCoupon = async () => {
  return Coupon.find();
};

const getCouponById = async (id) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) throw new ApiError(httpStatus.NOT_FOUND, 'Coupon not found!');

  return coupon;
};

const getBlog = async() => {
  return FededgeBlog.find();
};

const getAboutUsPage = async() => {
  return FededgeAboutUs.find();
};

const getAboutUsById = async(id) => {
  return FededgeAboutUs.findById(id);
};

export default {getUserByName,getUserByEmail,getUserById,
  createFeedback, getFeedbacks, updateFeedback, deleteFeedback,saveContact, getAllContacts, getContactById, getCoupon, getCouponById, getBlog, getAboutUsPage, getAboutUsById};
