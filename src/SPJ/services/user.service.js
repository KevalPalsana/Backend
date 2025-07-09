import {SPJUser} from '../models/user.model.js'
import {ApiError} from '../utils/ApiError.js';
import httpStatus from "http-status"
import Product from "../models/product.model.js"
import Category from '../models/category.model.js';
import OrderSummary from '../models/orderSummary.model.js';
import Warranty from '../models/city.model.js';
import Coupon from '../models/itemDetails.model.js';

const getUserByEmail = async (email) => {
    return SPJUser.findOne({ email });
  };

const getUserByName = async (name) => {
    return SPJUser.findOne({ name });
  };

const getUserById = async (id) => {
    return SPJUser.findById(id);
  };

const getProductById = async (id) => {
    return Product.findById(id).select("-password");
  };


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
    throw new ApiError(httpStatus.BAD_REQUEST, 'SPJUser not found!');
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
  
const getOrderSummaryById = async (orderId) => {
    try {
      const order = await OrderSummary.findById(orderId).populate({
        path: 'orderItems.productId',
        select: '_id title subTitle price description application color warrantyNumbers productImgUrl', 
      })
      .populate('shippingStatus');
  
      if (!order) {
        throw new Error('Order not found');
      }
  
      return order;
    } catch (error) {
      throw new Error(`Error fetching order summary: ${error.message}`);
    }
  };
  
 
  const getOrdersByUser = async (userId) => {
    try {
      const orders = await OrderSummary.find({ userId }).populate({
        path: 'orderItems.productId',
        select: '_id title subTitle color price description productImgUrl',
      });
  
      if (orders.length === 0) {
        return { message: 'No orders found for this user', orders: [] };
      }
  
      return orders; 
    } catch (error) {
      console.error('Error fetching user orders:', error.message); 
      return { error: `Error fetching user orders: ${error.message}` }; 
    }
  };

const getAllOrders = async () => {
    try {
      const orders = await OrderSummary.find().populate({
        path: 'orderItems.productId',
        select: '_id title subTitle color price description productImgUrl', 
      });
  
      if (orders.length === 0) {
        throw new Error('No orders found');
      }
  
      return orders;
    } catch (error) {
      throw new Error(`Error fetching all orders: ${error.message}`);
    }
  };
  


const updateOrderSummaryById = async (id, updateData) => {
  const order = await OrderSummary.findByIdAndUpdate(id, updateData, { new: true });
  if (!order) {
    throw new Error('Order not found');
  }
  return order;s
};


const deleteOrderSummaryById = async (id) => {
  const order = await OrderSummary.findByIdAndDelete(id);
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const getOrdersByUserId = async (userId) => {
  try {
    const orders = await OrderSummary.find({ userId }).sort({ date: -1 }); 
    return orders;
  } catch (error) {
    throw new Error("Error fetching order s from the database");
  }
};

const createWarranty = async ({ productName, productColor, warrantyNumber, userId }) => {
  const product = await Product.findOne({
    title: { $regex: new RegExp(`^${productName}$`, "i") }, 
  });

  if (!product) {
    throw new Error(`Product "${productName}" not found.`);
  }

  console.log("Product Found:", product);
  console.log("Product Color Field:", product.color, typeof product.color); 

  let colorExists = false;

if (Array.isArray(product.color)) {
  const allColors = product.color[0].split(",").map(c => c.trim().toLowerCase());
  colorExists = allColors.includes(productColor.toLowerCase());
}

if (!colorExists) {
  throw new Error(`Color "${productColor}" does not exist for product "${productName}".`);
}



  const existingWarranty = await Warranty.findOne({ warrantyNumber });
  if (existingWarranty) {
    throw new Error("This warranty number is already assigned to another product");
  }

  const warranty = new Warranty({
    productId: product._id,
    productColor,
    userId,
    warrantyNumber,
  });

  await warranty.save();
  return warranty;
};



export const getWarrantiesByUserService = async (userId) => {
  return await Warranty.find({ userId }).populate("productId", "title color price");
};




const getAllWarranties = async () => {
  return await Warranty.find().populate('productId').sort({ createdAt: -1 });
};

const getWarrantiesByUserId = async (userId) => {
  try {
    const warranties = await Warranty.find({ userId })
      .populate("productId", "title price color") 
      .populate("userId")
      .lean();

    return warranties;
  } catch (error) {
    console.error("Service Error: Unable to fetch warranties", error.message);
    throw new Error("Unable to fetch warranties. Please try again later.");
  }
};

const getCoupon = async () => {
  return Coupon.find();
};

const getCouponById = async (id) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) throw new ApiError(httpStatus.NOT_FOUND, 'Coupon not found!');

  return coupon;
};


export default {getUserByName,updatePrimaryAddress,updateShippingAddress,addShippingAddress,getUserByEmail,getUserById,
  getUserAddressById,deleteShippingAddress, getProducts, getProductsById, getCategories, getOrderSummaryById, updateOrderSummaryById, deleteOrderSummaryById,
  getOrdersByUserId, getAllOrders, getOrdersByUser,createWarranty, getWarrantiesByUserId, getAllWarranties, getCoupon, getCouponById};
