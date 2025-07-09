import userService from "../services/user.service.js";
import { sendSuccessResponse } from "../utils/ApiMessage.js";
import catchAsync from "../utils/catchAsync.js";
import mongoose from "mongoose";

const createCart = catchAsync(async (req, res) => {
    const {userId,items} = req.body
    const data = await userService.createCart(userId,items);
    console.log("data",data)
    sendSuccessResponse(res, 'create',  data );
  });

const getCartByUserId = catchAsync(async (req, res) => {
    const data = await userService.getCartByUserId(req.params.userId);
    sendSuccessResponse(res, 'get',  data );
  });

const updateCartItems  = catchAsync (async (req,res)=>{
  const data = await userService.updateCartItems(req.params.cartId,req.body.items);
  sendSuccessResponse(res, 'update',  data );
})
const deleteCartItems  = catchAsync (async (req,res)=>{
  const data = await userService.deleteCartItems(req.params.cartId,req.params.productId);
  sendSuccessResponse(res, 'delete',  data );
})

const updateCartStatus  = catchAsync (async (req,res)=>{
  const data = await userService.updateCartStatus(req.params.cartId);
  sendSuccessResponse(res, 'update',  data );
})

const createWishlist = catchAsync(async (req, res) => {
  const {userId,productId} = req.body
  const data = await userService.createWishlist(userId,productId);
  sendSuccessResponse(res, 'create',  data );
});

const deleteWishlistProduct = catchAsync(async (req, res) => {
  const {userId,deleteProductId} = req.body
  const data = await userService.deleteWishlistProduct(userId,deleteProductId);
  sendSuccessResponse(res, 'update',  data );
});

const getWishlist = catchAsync(async (req, res) => {
  const {userId} = req.params;
  console.log("userIds",userId)
  const data = await userService.getWishlist(userId);
  sendSuccessResponse(res, 'get',  data );
});

const deleteWishlist = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const data = await userService.deleteWishlist(userId);
  sendSuccessResponse(res, 'delete',  data );
});

const getOrderListByUser = catchAsync(async (req, res) => {
  const {status} = req.query
  const {userId} = req.params
  const orderList = await userService.getOrderListByUser(userId,status);
  sendSuccessResponse(res, 'get',  orderList );
});

const createFeedback = catchAsync(async (req, res) => {
  const feedbackData = await userService.createFeedback(req.body);
  sendSuccessResponse(res, 'create',  feedbackData );
});

const addShippingAddress = catchAsync(async (req, res) => {
  const {userId} = req.params
  const addShippingAddress = await userService.addShippingAddress(userId,req.body);
  sendSuccessResponse(res, 'create',  addShippingAddress );
});

const updatePrimaryAddress = catchAsync(async (req, res) => {
  const {userId,addressId} = req.params
  const updateAddress = await userService.updatePrimaryAddress(userId,addressId);
  sendSuccessResponse(res, 'update',  updateAddress );
});

const updateShippingAddress = catchAsync(async (req, res) => {
  const {userId,addressId} = req.params
  const updatePrimaryAddress = await userService.updateShippingAddress(userId,addressId,req.body);
  sendSuccessResponse(res, 'update',  updatePrimaryAddress );
});

const deleteShippingAddress = catchAsync(async (req, res) => {
  const {userId,addressId} = req.params
  const updatePrimaryAddress = await userService.deleteShippingAddress(userId,addressId);
  sendSuccessResponse(res, 'delete',  updatePrimaryAddress );
});

const getFeedbacks = catchAsync(async (req, res) => {
  const feedbackData = await userService.getFeedbacks(req.body);
  sendSuccessResponse(res, 'get',  feedbackData );
});

const getOrderByUserId = catchAsync(async (req, res) => {
  const orderData = await userService.getOrderByUserId(req.params.userId);
  sendSuccessResponse(res, 'get',  orderData );
});

const getOrderByOrderId = catchAsync(async (req, res) => {
  const orderData = await userService.getOrderByOrderId(req.params.orderId);
  sendSuccessResponse(res, 'get',  orderData );
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

const createOrder = catchAsync(async (req, res) => {
  const {userId,shippingAddressId,paymentMethod,cartId} = req.body
  const order = await userService.createOrder(userId,shippingAddressId,paymentMethod,cartId);
  sendSuccessResponse(res, 'create',  order );
});

const orderStatusChange = catchAsync(async (req, res) => {
  const {status} = req.query;
  const order = await userService.orderStatusChange(req.params.userId,req.params.orderId,status);
  sendSuccessResponse(res, 'update',  order );
});

const getOrderReceipt = catchAsync(async (req, res) => {
  const {status} = req.query;
  const order = await userService.getOrderReceipt(req.params.userId,req.params.orderId);
  sendSuccessResponse(res, 'get',  order );
});

const getProducts  = catchAsync(async (req, res) => {
  const product = await userService.getProducts(req.query);
  sendSuccessResponse(res, 'get', product)
});

// const getProductsById = catchAsync(async (req, res) => {
//   const product = await userService.getProductsById(req.params.id);
//   sendSuccessResponse(res, 'get', product)
// });

const getProductsById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  console.log("Product ID received in backend:", productId);
  console.log("Type of Product ID:", typeof productId);


  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid Product ID' });
  }

  const product = await userService.getProductsById(productId);

  if (!product) {
    return res.status(404).json({ status: 'fail', message: 'Product not found' });
  }

  sendSuccessResponse(res, 'get', product);
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await userService.getCategories(req.query);
  sendSuccessResponse(res, 'get', categories);
});

const createOrderSummaryHandler = async (req, res) => {
  try {
    const order = await userService.createOrderSummary(req.body);
    res.status(201).json({ success: true, message: 'Order created successfully', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderSummaryById = async (req, res) => {
    const orderId = req.params.id;
    const order = await orderService.getOrderSummaryById(orderId);
    sendSuccessResponse(res, 'get', order);
};

const updateOrderSummaryByIdHandler = async (req, res) => {
  try {
    const order = await userService.updateOrderSummaryById(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Order updated successfully', data: order });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const deleteOrderSummaryByIdHandler = async (req, res) => {
  try {
    const order = await userService.deleteOrderSummaryById(req.params.id);
    res.status(200).json({ success: true, message: 'Order deleted successfully', data: order });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    const orders = await userService.getOrdersByUser(userId);
    sendSuccessResponse(res, 'get', orders);           
};

const getAllOrders = async (req, res ) => {
  const orders = await userService.getAllOrders();
  sendSuccessResponse(res, 'get', orders);
}


const createContact = async (req, res) => {
  try {
    const { name, email, subject, phone, message } = req.body;

    if (!name || !email || !subject || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contactData = { name, email, subject, phone, message };
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

export default {createCart,updateShippingAddress,updatePrimaryAddress,getCartByUserId,updateCartItems,deleteCartItems,updateCartStatus,createWishlist,
  deleteWishlistProduct,getWishlist,deleteWishlist,getOrderListByUser,createFeedback, getFeedbacks, updateFeedback, deleteFeedback,addShippingAddress,
  getUserAddressById,deleteShippingAddress,createOrder,getOrderByOrderId,getOrderByUserId,orderStatusChange,getOrderReceipt, getProducts, getProductsById, getCategories,
createOrderSummaryHandler, getOrderSummaryById, updateOrderSummaryByIdHandler, deleteOrderSummaryByIdHandler, getOrdersByUserId, getAllOrders, createContact, getContacts, getContact,
 getUserById, getCoupon, getCouponById, getBlog, getAboutUsPage, getAboutUsById}