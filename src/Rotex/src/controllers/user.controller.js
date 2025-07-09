import warrantyModel from "../models/warranty.model.js";
import userService from "../services/user.service.js";
import { sendSuccessResponse } from "../utils/ApiMessage.js";
import catchAsync from "../utils/catchAsync.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";


const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userService.deleteUser(userId);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};


const createCart = catchAsync(async (req, res) => {
  console.log("req.body", req.body);
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

const deleteCartItems = catchAsync(async (req, res) => {
  console.log("req.params", req.params);
  console.log("req.query", req.query); // ✅ log the color

  const { cartId, productId } = req.params;
  const { color: selectedColor } = req.query;

  const data = await userService.deleteCartItems(cartId, productId, selectedColor);
  sendSuccessResponse(res, 'delete', data);
});


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

const createRazorpayOrder = async (req, res) => {
  try {
      const { amount } = req.body;
      const order = await userService.createRazorpayOrderService(amount);
      res.status(200).json({ success: true, order });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

const createOrderSummaryHandler = async (req, res) => {
  try {
      const { userId, customerDetails, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const order = await userService.createOrderSummary(userId, customerDetails, razorpay_order_id, razorpay_payment_id, razorpay_signature);
      res.status(200).json({ success: true, order });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderSummaryById = async (req, res) => {
    const orderId = req.params.id;
    const order = await userService.getOrderSummaryById(orderId);
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

const createWarranty = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 

    const { productName, productColor, warrantyNumber, userId } = req.body;

    if (!productName || !productColor || !warrantyNumber || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const warranty = await userService.createWarranty({
      productName,
      productColor,
      warrantyNumber,
      userId,
    });

    return res.status(201).json({
      message: "Warranty created successfully",
      warranty,
    });
  } catch (error) {
    console.error("Error creating warranty:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getWarrantiesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const warranties = await getWarrantiesByUserService(userId);

    return res.status(200).json({
      message: "Warranties fetched successfully.",
      data: warranties,
    });
  } catch (error) {
    console.error("Error fetching warranties:", error.message);
    return res.status(500).json({ message: "Unable to fetch warranties.", error: error.message });
  }
};


 const getAllWarranties = async (req, res) => {
  try {
    const warranties = await userService.getAllWarranties();
    res.status(200).json({ warranties });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

export const getWarrantiesByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const warranties = await userService.getWarrantiesByUserId(userId);
    res.status(200).json({ success: true, data: warranties });
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: "Unable to fetch warranties." });
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

const createComplaint = async (req, res) => {
  try {
      const { warranty, ...complaintData } = req.body;

      if (warranty) {
          const warrantyExists = await warrantyModel.findOne({ warrantyNumber: warranty });
          if (!warrantyExists) {
              return res.status(400).json({ message: "Invalid warranty number." });
          }
      }

      const complaint = await userService.createComplaint({ ...complaintData, warranty });
      res.status(201).json(complaint);
  } catch (error) {
      console.error("Error creating complaint:", error.message);
      res.status(400).json({ message: error.message });
  }
};

const getAllQuickFix = async (req, res) => {
  try {
      const complaints = await adminService.getAllQuickFix();
      res.status(200).json(complaints);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const getQuickFixById = async (req, res) => {
  try {
      const complaint = await adminService.getQuickFixById(req.params.id);
      if (!complaint) {
          return res.status(404).json({ message: 'Complaint not found' });
      }
      res.status(200).json(complaint);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const getQuickFixByProductAndProblem = async (req, res) => {
  const { productId, problemId } = req.query;  // Destructuring the query parameters

  // Log the incoming parameters for debugging purposes
  console.log('productId:', productId, 'problemId:', problemId);

  // Check if both productId and problemId are provided
  if (!productId || !problemId) {
    return res.status(400).json({ message: "Both productId and problemId are required." });
  }

  try {
    // Call the service method to fetch data
    const quickFixes = await userService.getQuickFixByProductAndProblem(productId, problemId);

    // If no data is found, return a 404 status with a message
    if (!quickFixes || quickFixes.length === 0) {
      return res.status(404).json({ message: "No QuickFix data found for the provided product and problem." });
    }

    // Send the fetched QuickFix data in the response
    res.status(200).json({ quickFixes });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error fetching QuickFix data:", error.message);
    res.status(500).json({ message: "Error fetching QuickFix data." });
  }
};


const getProblem  = catchAsync(async (req, res) => {
  const data = await userService.getProblem(req.body);
sendSuccessResponse(res,'get', data);
});


const getBrand  = catchAsync(async (req, res) => {
  const brand = await userService.getBrand(req.body);
  sendSuccessResponse(res,'get', brand);
});

const getBlogContainsByBlogId = catchAsync(async (req, res) => {
  const { blogId } = req.query;
  const blog = await userService.getBlogContainsByBlogId(blogId);
  sendSuccessResponse(res,'get', blog);
});

const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    const result = await userService.getProductsByCategory(categoryId);
    sendSuccessResponse(res,'get', result);  
};

const initiatePayment = async (req, res) => {
  try {
    const result = await userService.phonePeInitiateService(req.body);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'PhonePe initiation failed' });
  }
};

const checkPaymentStatus = async (req, res) => {
  try {
    const result = await userService.phonePeStatusService(req.params.transactionId);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'PhonePe status check failed' });
  }
};

const getProductByNameController = async (req, res) => {
  try {
    const { title } = req.params;
    const product = await userService.getProductByNameService(title);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message || "Error fetching product" });
  }
};

const createVisitEntryController = async (req, res, next) => {
  try {
    const savedEntry = await userService.createVisitEntryService(req.body);
    res.status(201).json({
      success: true,
      message: "Influencer visit registered successfully.",
      data: savedEntry,
    });
  } catch (error) {
    next(error);
  }
};

const createCodes = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const codes = await userService.generateProductCodes(productId, quantity);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: `${quantity} codes generated successfully`,
    data: codes,
  });
});

const useCode = catchAsync(async (req, res) => {
  const { userId, code } = req.body;
  const result = await userService.validateAndUseCode(code, userId);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Code redeemed successfully. 20 points awarded.',
    data: result,
  });
});

const sendOtp = catchAsync(async (req, res) => {
  const { mobileNumber } = req.body;
  const otp = await userService.generateOtp(mobileNumber);
  res.json({ status: true, message: 'OTP sent successfully', otp });
});

const verifyAndApplyCode = catchAsync(async (req, res) => {
  const { mobileNumber, name, otp, barcodeData } = req.body;

  const isOtpValid = await userService.verifyOtp(mobileNumber, otp);
  if (!isOtpValid) {
    return res.status(400).json({ status: false, message: 'Invalid or expired OTP' });
  }

  const result = await userService.applyProductCode(barcodeData, mobileNumber, name);
  res.json({ status: result.applied, message: result.message });
});



export default {deleteUser, createCart,updateShippingAddress,updatePrimaryAddress,getCartByUserId,updateCartItems,deleteCartItems,updateCartStatus,createWishlist,
  deleteWishlistProduct,getWishlist,deleteWishlist,getOrderListByUser,createFeedback, getFeedbacks, updateFeedback, deleteFeedback,addShippingAddress, createVisitEntryController,
  getUserAddressById,deleteShippingAddress,createOrder,getOrderByOrderId,getOrderByUserId,orderStatusChange,getOrderReceipt, getProducts, getProductsById, getCategories,
  createOrderSummaryHandler, getOrderSummaryById, updateOrderSummaryByIdHandler, deleteOrderSummaryByIdHandler, getOrdersByUserId, getAllOrders, createContact, getContacts, getContact,
  createWarranty, getAllWarranties, getWarrantiesByUserId, getUserById, getCoupon, getCouponById, getBlog, getAboutUsPage, getAboutUsById, createWarranty, createComplaint, getAllQuickFix, 
  getQuickFixById, getQuickFixByProductAndProblem, getProblem, getBrand, getBlogContainsByBlogId, getProductsByCategory, initiatePayment, checkPaymentStatus, createRazorpayOrder, getProductByNameController,
  createCodes, useCode, sendOtp, verifyAndApplyCode,
};