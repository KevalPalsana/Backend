import {ApiError} from '../utils/ApiError.js';
import httpStatus from "http-status"
import aboutusModel from '../models/aboutus.model.js';
import blogModel from '../models/blog.model.js';
import ChhapiaContact from '../models/contactUs.model.js';
import ChhapiaUser from '../models/user.model.js';

const getUserByEmail = async (email) => {
    return ChhapiaUser.findOne({ email });
  };

const getUserByName = async (username) => {
    return ChhapiaUser.findOne({ username });
  };

const getUserById = async (id) => {
    return ChhapiaUser.findById(id);
  };


const getUserAddressById = async (userId) => {
  const user = await getUserById(userId)
  return user;
};


const saveContact = async (contactData) => {
  const contact = new ChhapiaContact(contactData);
  return await contact.save();
};

const getAllContacts = async () => {
  return await ChhapiaContact.find().sort({ createdAt: -1 });
};

const getContactById = async (id) => {
  return await ChhapiaContact.findById(id);
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
  return blogModel.find();
};

const getAboutUsPage = async() => {
  return aboutusModel.find();
};

const getAboutUsById = async(id) => {
    return aboutusModel.findById(id);
};


export default {getUserByName,getUserByEmail,getUserById, getUserAddressById,
 saveContact, getAllContacts, getContactById, getCoupon, getCouponById, getBlog, getAboutUsPage, getAboutUsById};
