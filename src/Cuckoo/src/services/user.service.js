
import HolidayPackage from '../models/packageCategory.model.js';
import SubCategory from '../models/holidayPackages.model.js';
import CuckooUser from '../models/user.model.js'
import VisaPassportInquiry from '../models/visaInquirymodel.js';
import HotelPrice from '../models/price.model.js';
import ContactUs from '../models/contactUs.model.js';
import CustomerForm from '../models/customer.model.js';



const getUserByEmail = async (email) => {
    return CuckooUser.findOne({ email });
  };

const getUserByName = async (name) => {
    return CuckooUser.findOne({ name });
  };

const getUserById = async (id) => {
    return CuckooUser.findById(id);
  };

  const getCategories = async () => {
    return  HolidayPackage.find();
  };

  const getSubCategories = async () => {
    return  SubCategory.find().populate('categoryId');
  };

  const getSubCategoryByCategoryId = async (categoryId) => {
   if (!categoryId) throw new ApiError(httpStatus.BAD_REQUEST, 'categoryId is required!');
 
   const categoryExists = await HolidayPackage.findById(categoryId);
   if (!categoryExists) throw new ApiError(httpStatus.NOT_FOUND, 'HolidayPackage not found');
 
   const subCategories = await SubCategory.find({ categoryId }).populate('categoryId');
   
   return subCategories;
 };

 const getInquiry = async () => {
  return VisaPassportInquiry.find();
};

const getAllPrice = async () => {
  return await HotelPrice.find();
};

 const getPriceByHotel = async (id) => {
  return await HotelPrice.findById(id);
};

const createContactUs = async (data) => {
  return await ContactUs.create(data);
};

const createCustomer = async (data) => {
  return await CustomerForm.create(data);
};


export default {getUserByName,getUserByEmail,getUserById, getCategories, getSubCategories, getSubCategoryByCategoryId, getPriceByHotel, getInquiry, createContactUs, getAllPrice, createCustomer};
