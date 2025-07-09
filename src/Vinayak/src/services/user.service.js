
import {VinayakUser} from '../models/user.model.js'
import {ApiError} from '../utils/ApiError.js';
import httpStatus from "http-status"
import Product from "../models/product.model.js"
import WishList from '../models/WhatWeDo.model.js';
import { Types } from 'mongoose';
import Category from '../models/category.model.js';
import Contact from '../models/contactUs.model.js';

import { VinayakAboutUs } from '../models/aboutUs.model.js';

const getUserByEmail = async (email) => {
    return VinayakUser.findOne({ email });
  };

const getUserByName = async (username) => {
    return VinayakUser.findOne({ username });
  };

const getUserById = async (id) => {
    return VinayakUser.findById(id);
  };

const getProductById = async (id) => {
    return Product.findById(id).select("-password");
  };


const createWishlist = async (userId, productIds) => {
  for (let productId of productIds) {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Invalid productId: ${productId}`);
    }
  }

  const productObjectIds = productIds.map(id => new Types.ObjectId(id));

  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'VinayakUser not found');

  const products = await Promise.all(
    productObjectIds.map(productId => getProductById(productId))
  );
  
  for (let product of products) {
    if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `Product not found`);
  }

  let wishlist = await WishList.findOne({ userId });

  if (!wishlist) {
    wishlist = new WishList({ userId, products: productObjectIds });
  } else {
    for (let productId of productObjectIds) {
      if (!wishlist.products.some(p => p.equals(productId))) {
        wishlist.products.push(productId);
      }
    }
  }

  await wishlist.save();

  return wishlist;
};

const deleteWishlistProduct = async (userId, removeProductIds) => {
  if (!Array.isArray(removeProductIds)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'removeProductIds must be an array');
  }
  removeProductIds.forEach(productId => {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Invalid productId: ${productId}`);
    }
  })

  const removeProductObjectIds  = removeProductIds.map(id => new Types.ObjectId(id));

  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'VinayakUser not found');

 
  let wishlist = await WishList.findOne({ userId });

  if (!wishlist) {
     throw new ApiError(httpStatus.BAD_REQUEST, `Wishlist not found`);
  } 
  
  wishlist.products = wishlist.products.filter(product => 
    !removeProductObjectIds.some(p => p.equals(product))
  )
  
  await wishlist.save();

  return wishlist;
};

const getWishlist = async (userId) =>{
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'VinayakUser not found');

  let wishlist = await WishList.findOne({ userId })
  // .populate('products','name');
  console.log("wishlist",wishlist)
  if (!wishlist) {
     throw new ApiError(httpStatus.BAD_REQUEST, `Wishlist not found`);
  } 
  return wishlist;
}

const deleteWishlist = async (userId) =>{
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'VinayakUser not found');

  let wishlist = await WishList.findOne({ userId });

  if (!wishlist) {
     throw new ApiError(httpStatus.BAD_REQUEST, `Wishlist not found`);
  }

  await wishlist.deleteOne({userId})

  return wishlist;
}


const getOrderListByUser = async(userId,status) =>{
  console.log("userId,status",userId,status)
  const user = await getUserById(userId);

  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'VinayakUser not found');

  if(!status) throw new ApiError(httpStatus.NOT_FOUND, 'status is required'); 
  console.log("status",status)
  if (status !== "complete" && status !== "incomplete") {
    throw new ApiError(httpStatus.NOT_FOUND, 'Select a valid status');
  }
  const data = await Cart.find({ userId: userId, status: status });

  return data;
}


const addShippingAddress = async (userId,addressData) => {
  const user =await getUserById(userId)
  if(!user) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found!');
  console.log("addressData",addressData)
  console.log("usersd",user)

  // if(!user.shippingAddress){
  //   user.shippingAddress = [];
  // }
  user.shippingAddress.push(addressData)

  if(user?.shippingAddress.length === 1){
    user.shippingAddress[0].isPrimary = true;
  }

  await user.save()
  return user;
};

const updateShippingAddress= async (userId,addressId,newAddress) => {
  const user = await getUserById(userId)
  if(!user) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found!');

 const addressIndex = user.shippingAddress.findIndex(address =>{
   return  address._id.toString() === addressId;
  })
  console.log("addressIndex",addressIndex,newAddress)
  if(addressIndex !== -1){
    user.shippingAddress[addressIndex] = {...user.shippingAddress[addressIndex],...newAddress}
  }else {
    user.shippingAddress.push(newAddress)
  }
  const address = user.shippingAddress.id(addressId)
  if(address){
    address.isPrimary = true;
  }

  await user.save()
  return user;
};
const deleteShippingAddress = async (userId, addressId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'VinayakUser not found!');
  }
  
  const addressIndex = user.shippingAddress.findIndex(
    (address) => address._id.toString() === addressId
  );

  if (addressIndex === -1) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found!');
  }
  console.log("after",user?.shippingAddress)

  user.shippingAddress.splice(addressIndex, 1);

  // console.log(
  //   "Updated Shipping Addresses:",
  //   user.shippingAddress.map((address) => address.toObject())
  // );
  // console.log("befor",user?.shippingAddress)
  // if (user.shippingAddress.length > 0) {
  //   const hasPrimary = user.shippingAddress.some((address) => address.isPrimary);
  //   if (!hasPrimary) {
  //     user.shippingAddress[0].isPrimary = true;
  //   }
  // }

  await user.save();

  return user;
};


const updatePrimaryAddress = async (userId,addressId) => {
  const user =await getUserById(userId)
  if(!user) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found!');

  user.shippingAddress.forEach(address =>{
    address.isPrimary = false;
  })

  const address = user.shippingAddress.find(address => {
    return address._id.toString() === addressId;
  });

  if (!address) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Address not found!');
  }
  if(address){
    address.isPrimary = true;
  }
  
  await user.save()
  return user;
};

const getUserAddressById = async (userId) => {
  const user = await getUserById(userId)
  return user;
};

const getProducts = async (query) => {
  // const { page = 1, limit = 10, sortBy, filter = {} } = query;
  
  // const pageNumber = parseInt(page, 10);
  // const limitNumber = parseInt(limit, 10);

  // const options = {
  //   page: pageNumber,
  //   limit: limitNumber,
  // }
  // const result = await Product.paginate(filter, options);
  //   const products = await Product.find()
  //     .populate('categoryId', 'name')
  //     .populate('subCategoryId', 'name')
  //     .populate('collections', 'name')
  //     .populate('labelId', 'name')
  //     .populate('attributes', 'name value');
  
  //   const currentDate = new Date();
  
  //   return products.map(product => {
  //     if (product.priceSale && product.priceSale.startDate && product.priceSale.endDate) {
  //       const saleStart = new Date(product.priceSale.startDate);
  //       const saleEnd = new Date(product.priceSale.endDate);
  
  //       if (currentDate >= saleStart && currentDate <= saleEnd) {
  //         product.salePriceApplied = true;
  
  //         if (product.priceSale.salePrice) {
  //           if (typeof product.priceSale.salePrice === 'string' && product.priceSale.salePrice.includes('%')) {
  //             const discountPercentage = parseFloat(product.priceSale.salePrice.replace('%', ''));
  //             console.log("comessfddffdf",discountPercentage)

  //             product.price = product.price - (product.price * discountPercentage / 100);
  //           } else if (typeof product.priceSale.salePrice === 'number') {
  //             product.price = product.price - product.priceSale.salePrice;
  //           }
  //         }
  //       } else {
  //         product.salePriceApplied = false;
  //         product.price = product.price;
  //       }
  //     } else {
  //       product.salePriceApplied = false;
  //     }
  
  //     return product;
  //   });
  const { page = 1, limit = 10, sortBy, filter = {} } = query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const options = {
    page: pageNumber,
    limit: limitNumber,
    sortBy,  
  };

  const result = await Product.paginate(filter, options);

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
     return  Product.findById(id);
   };

   const getCategories = async () => {
    return  Category.find();
  };

const saveContact = async (contactData) => {
  const contact = new Contact(contactData);
  return await contact.save();
};

const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};


const getAboutUsPage = async() => {
  return VinayakAboutUs.find();
};

const getAboutUsById = async(id) => {
  return VinayakAboutUs.findById(id);
};

export default {getUserByName,updatePrimaryAddress,updateShippingAddress,addShippingAddress,getUserByEmail,getUserById,
  createWishlist,deleteWishlistProduct,deleteWishlist,getWishlist,getOrderListByUser,getUserAddressById,deleteShippingAddress,
  getProducts, getProductsById, getCategories,saveContact, getAllContacts, getContactById, getAboutUsPage, getAboutUsById};
