
import {InfiUser} from '../models/user.model.js'
import {ApiError} from '../utils/ApiError.js';
import httpStatus from "http-status"
import InfiProduct from "../models/product.model.js"
import { InfiReview } from '../models/review.model.js';
import InfiCategory from '../models/category.model.js';
import InfiContact from '../models/contactUs.model.js';
import { InfiBlog } from '../models/blog.model.js';
import { InfiAboutUs } from '../models/aboutUs.model.js';

const getUserByEmail = async (email) => {
    return InfiUser.findOne({ email });
  };

const getUserByName = async (username) => {
    return InfiUser.findOne({ username });
  };

const getUserById = async (id) => {
    return InfiUser.findById(id);
  };

const getProductById = async (id) => {
    return InfiProduct.findById(id).select("-password");
  };

const createFeedback = async (feedbackData) => {
  if(!feedbackData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  if(!feedbackData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!')

    return InfiReview.create(feedbackData);
};


const getUserAddressById = async (userId) => {
  const user = await getUserById(userId)
  return user;
};

const getFeedbacks = async () => {
  return InfiReview.find();
};

const updateFeedback = async (id, feedbackData) => {
  const updateData = await InfiReview.findByIdAndUpdate(id, feedbackData, {new: true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteFeedback = async (id) => {
  const deleteId =  await InfiReview.findByIdAndDelete(id);
  if (deleteId === null ) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};
const getProducts = async (query) => {
  const { page = 1, limit = 10, sortBy, filter = {} } = query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const options = {
    page: pageNumber,
    limit: limitNumber,
    sortBy,  
  };

  const result = await InfiProduct.paginate(filter, options);

  const currentDate = new Date();
  const products = result.results.map(product => {
    if (product.priceSale && product.priceSale.startDate && product.priceSale.endDate) {
      const saleStart = new Date(product.priceSale.startDate);
      const saleEnd = new Date(product.priceSale.endDate);

      if (currentDate >= saleStart && currentDate <= saleEnd) {
        product.salePriceApplied = true;

        if (product.priceSale.salePrice) {
          if (typeof product.priceSale.salePrice === 'string' && product.priceSale.salePrice.includes('%')) {
            const discountPercentage = parseFloat(product.priceSale.salePrice.replace('%', ''));
            product.price = product.price - (product.price * discountPercentage / 100);
          } else if (typeof product.priceSale.salePrice === 'number') {
            product.price = product.price - product.priceSale.salePrice;
          }
        }
      } else {
        product.salePriceApplied = false;
        product.price = product.price;
      }
    } else {
      product.salePriceApplied = false;
    }

    return product;
  });
  return {
    products,
    page: result.page,
    limit: result.limit,
    totalPages: result.totalPages,
    totalResults: result.totalResults,

  }
  };
const getProductsById = async (id) => {
     return  InfiProduct.findById(id);
   };

   const getCategories = async () => {
    return  InfiCategory.find();
  };

const saveContact = async (contactData) => {
  const contact = new InfiContact(contactData);
  return await contact.save();
};

const getAllContacts = async () => {
  return await InfiContact.find().sort({ createdAt: -1 });
};

const getContactById = async (id) => {
  return await InfiContact.findById(id);
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
  return InfiBlog.find();
};

const getAboutUsPage = async() => {
  return InfiAboutUs.find();
};

const getAboutUsById = async(id) => {
  return InfiAboutUs.findById(id);
};

export default {getUserByName,getUserByEmail,getUserById,createFeedback, getFeedbacks, updateFeedback, deleteFeedback,getUserAddressById,getProducts, getProductsById, getCategories,
 saveContact, getAllContacts, getContactById, getCoupon, getCouponById, getBlog, getAboutUsPage, getAboutUsById};
