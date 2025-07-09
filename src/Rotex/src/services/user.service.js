import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";
import Product from "../models/product.model.js";
import WishList from "../models/wishList.model.js";
import { Types } from "mongoose";
import Order from "../models/order.model.js";
import orderStatus from "../config/orderStatus.js";
import Category from "../models/category.model.js";
import OrderSummary from "../models/orderSummary.model.js";
import Contact from "../models/contactUs.model.js";
import Warranty from "../models/warranty.model.js";
import Coupon from "../models/coupon.model.js";
import { RotexBlog } from "../models/blog.model.js";
import { RotexAboutUs } from "../models/aboutUs.model.js";
import warrantyModel from "../models/warranty.model.js";
import { RotexUser } from "../models/user.model.js";
import RotexReview from "../models/review.model.js";
import RotexCart from "../models/cart.model.js";
import Complaint from "../models/complaint.model.js";
import QuickFix from "../models/subCategory.model.js";
import Problem from "../models/collection.model.js";
import Brand from "../models/brand.model.js";
import BlogDetails from "../models/blogContent.model.js";
import RotexProduct from "../models/product.model.js";
import dotenv from "dotenv";
import { createXVerify } from "../utils/phonepe.js";
import axios from "axios";
import Razorpay from "razorpay";
import path from "path";
import crypto from "crypto";
import InfluencerVisit from "../models/infulancer.model.js";
import RotexCode from "../models/code.model.js";
import HYGOCode from "../models/code.model.js";

dotenv.config({ path: path.resolve(process.cwd(), "config.env") });

const {
  PHONEPE_MERCHANT_ID,
  PHONEPE_SALT_KEY,
  PHONEPE_SALT_INDEX,
  PHONEPE_ENV,
} = process.env;

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const getUserByEmail = async (email) => {
  return RotexUser.findOne({ email });
};

const getUserByName = async (username) => {
  return RotexUser.findOne({ username });
};

const getUserById = async (id) => {
  return RotexUser.findById(id);
};

const getProductById = async (id) => {
  return Product.findById(id).select("-password");
};

const deleteUser = async (userId) => {
  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User ID is required!");
  }

  const deletedUser = await RotexUser.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User not found or already deleted"
    );
  }

  return {
    message: "User deleted successfully",
    user: deletedUser,
  };
};

export const createCart = async (userId, items) => {
  const user = await RotexUser.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "RotexUser not found");
  }

  let existingCart = await RotexCart.findOne({ userId });

  if (existingCart) {
    for (let item of items) {
      const existingItem = existingCart.items.find(
        (cartItem) =>
          cartItem.productId.toString() === item.productId.toString() &&
          cartItem.selectedColor === item.selectedColor // ✅ match also by color
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        existingCart.items.push({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor, // ✅ new
          selectedColorImage: item.selectedColorImage, // ✅ new
        });
      }
    }

    existingCart.totalPrice = existingCart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    await existingCart.save();
    return existingCart;
  }

  const newCart = new RotexCart({
    userId,
    items: items.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      selectedColorImage: item.selectedColorImage,
    })),
    totalPrice: items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    ),
  });

  await newCart.save();
  return newCart;
};

const createOrder = async (
  userId,
  shippingAddressId,
  paymentMethod,
  cartId
) => {
  // Fetch the cart and populate product details
  const cart = await RotexCart.findOne({ _id: cartId, userId }).populate(
    "items.productId"
  );
  if (!cart || cart.items.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "RotexCart not found or cart is empty!"
    );
  }

  // Fetch the user
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "RotexUser not found!");
  }

  // Find the shipping address
  const shippingAddress = user.shippingAddress?.find(
    (address) => address._id.toString() === shippingAddressId
  );
  if (!shippingAddress) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Shipping address not found!");
  }

  // Map cart items to order items
  const orderItems = cart.items.map((data) => ({
    productId: data?.productId?._id,
    name: data?.productId?.name,
    quantity: data?.quantity,
    price: data?.price,
    selectedColor: data?.selectedColor,
    selectedColorImage: data?.selectedColorImage,
  }));

  // Calculate total price
  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.quantity * item?.price,
    0
  );

  // Calculate GST and final price
  const gst = totalPrice * 0.18;
  const finalPrice = totalPrice + gst + 100;

  // Create a new order
  const newOrder = new Order({
    userId,
    shippingAddress,
    paymentMethod,
    orderItems,
    totalPrice,
    finalPrice,
  });

  await newOrder.save();

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return newOrder;
};

const orderStatusChange = async (userId, orderId, status) => {
  const normalizedStatus = status?.trim().toLowerCase();

  if (!orderStatus.includes(normalizedStatus)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Select a valid status");
  }
  const order = await Order.findOne({ _id: orderId, userId }).sort({
    createdAt: -1,
  });

  order.status = status;
  await order.save();
  return order;
};
const getOrderReceipt = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, userId })
    .populate("orderItems.productId")
    .populate("userId", "username email");

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  const receipt = {
    orderId: order._id,
    userId: order.userId._id,
    username: order.userId.username,
    email: order.userId.email,
    shippingAddress: order.shippingAddress,
    items: order?.orderItems?.map((item) => ({
      product: item?.productId._id,
      productName: item?.productId?.name,
      quantity: item?.quantity,
      price: item?.price,
      total: item?.quantity * item?.price,
    })),
    totalPrice: order.totalPrice,
    finalPrice: order.finalPrice,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
  return receipt;
};
const getOrderByOrderId = async (orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    status: { $ne: "cancelled" },
  }).populate("orderItems.productId");

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found.");
  }
  return order;
};

const getOrderByUserId = async (userId) => {
  const order = await Order.find({ userId, status: { $ne: "cancelled" } }).sort(
    { createdAt: -1 }
  );

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found.");
  }
  return order;
};

const getCartByUserId = async (userId) => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "user not found");

  const cart = await RotexCart.findOne({ userId }).populate({
    path: "items.productId",
    select: "title price productImages", // ✅ explicitly select required fields
  });

  // if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, "cart not found");
  return cart;
};


const updateCartItems = async (cartId, items) => {
  console.log("🔧 Updating cart:", cartId);
  console.log("📦 Incoming items:", items);

  const cart = await RotexCart.findById(cartId);
  if (!cart) {
    console.error("❌ Cart not found");
    throw new ApiError(httpStatus.BAD_REQUEST, "RotexCart not found");
  }

  for (let newItem of items) {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === newItem.productId.toString()
    );

    if (existingItem) {
      console.log(`🖊️ Updating existing item: ${newItem.productId}`);
      existingItem.quantity = newItem.quantity;
      existingItem.price = newItem.price;
      existingItem.selectedColor = newItem.selectedColor;
      existingItem.selectedColorImage = newItem.selectedColorImage;
    } else {
      console.log(`➕ Adding new item: ${newItem.productId}`);
      cart.items.push(newItem);
    }
  }

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  await cart.save();
  console.log("✅ Cart saved");

  // ✅ Populate productId after saving
  const populatedCart = await RotexCart.findById(cartId).populate({
    path: "items.productId",
    select: "title price productImages",
  });

  if (!populatedCart) {
    console.error("❌ Populated cart not found after update");
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to retrieve updated cart"
    );
  }

  // 🧾 Log populated cart output
  console.log("📦 Populated cart:");
  populatedCart.items.forEach((item, i) => {
    console.log(`  #${i + 1}:`);
    console.log("    Product ID: ", item.productId?._id);
    console.log("    Title: ", item.productId?.title);
    console.log("    Price: ", item.productId?.price);
    console.log("    Image: ", item.productId?.productImages?.[0]);
  });

  return populatedCart;
};

// const deleteCartItems = async (cartId, productId) => {
//   const cart = await RotexCart.findById(cartId);
//   if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, 'RotexCart not found');

//   if (cart.items.length === 0) throw new ApiError(httpStatus.BAD_REQUEST, 'No items in the cart');

//   const initialItemCount = cart.items.length;
//   cart.items = cart.items.filter(item => item.productId.toString() !== productId);

//   cart.calculateTotalPrice();

//   const updatedCart = await cart.save();

//   if (initialItemCount === cart.items.length) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Item not found in cart');
//   }

//   return updatedCart;
// }

const deleteCartItems = async (cartId, productId, selectedColor) => {
  const cart = await RotexCart.findById(cartId);
  if (!cart) {
    throw new ApiError(httpStatus.BAD_REQUEST, "RotexCart not found");
  }

  if (!cart.items || cart.items.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No items in the cart");
  }

  const initialItemCount = cart.items.length;

  // Log for debugging
  console.log("Trying to delete:");
  console.log("Product ID:", productId);
  console.log("Selected Color:", selectedColor);
  console.log(
    "Cart Items:",
    cart.items.map((i) => ({
      productId: i.productId.toString(),
      selectedColor: i.selectedColor,
    }))
  );

  // Filter out the matching item
  cart.items = cart.items.filter((item) => {
    return !(
      item.productId.toString() === productId.toString() &&
      item.selectedColor === selectedColor
    );
  });

  // Check if anything was actually removed
  if (initialItemCount === cart.items.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Item not found in cart");
  }

  // Recalculate total
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const updatedCart = await cart.save();
  return updatedCart;
};

const updateCartStatus = async (cartId) => {
  const cart = await RotexCart.findById(cartId);
  if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, "RotexCart not found");
  const updateStatus = await RotexCart.findByIdAndUpdate(
    cartId,
    { status: "complete" },
    { new: true }
  );

  if (!updateStatus)
    throw new ApiError(httpStatus.BAD_REQUEST, "Error in update status");

  return updateStatus;
};

const createWishlist = async (userId, productIds) => {
  for (let productId of productIds) {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Invalid productId: ${productId}`
      );
    }
  }

  const productObjectIds = productIds.map((id) => new Types.ObjectId(id));

  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "RotexUser not found");

  const products = await Promise.all(
    productObjectIds.map((productId) => getProductById(productId))
  );

  for (let product of products) {
    if (!product)
      throw new ApiError(httpStatus.BAD_REQUEST, `Product not found`);
  }

  let wishlist = await WishList.findOne({ userId });

  if (!wishlist) {
    wishlist = new WishList({ userId, products: productObjectIds });
  } else {
    for (let productId of productObjectIds) {
      if (!wishlist.products.some((p) => p.equals(productId))) {
        wishlist.products.push(productId);
      }
    }
  }

  await wishlist.save();

  return wishlist;
};

const deleteWishlistProduct = async (userId, removeProductIds) => {
  if (!Array.isArray(removeProductIds)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "removeProductIds must be an array"
    );
  }
  removeProductIds.forEach((productId) => {
    if (!Types.ObjectId.isValid(productId)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Invalid productId: ${productId}`
      );
    }
  });

  const removeProductObjectIds = removeProductIds.map(
    (id) => new Types.ObjectId(id)
  );

  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "RotexUser not found");

  let wishlist = await WishList.findOne({ userId });

  if (!wishlist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Wishlist not found`);
  }

  wishlist.products = wishlist.products.filter(
    (product) => !removeProductObjectIds.some((p) => p.equals(product))
  );

  await wishlist.save();

  return wishlist;
};

const getWishlist = async (userId) => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "RotexUser not found");

  let wishlist = await WishList.findOne({ userId });
  // .populate('products','name');
  console.log("wishlist", wishlist);
  if (!wishlist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Wishlist not found`);
  }
  return wishlist;
};

const deleteWishlist = async (userId) => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "RotexUser not found");

  let wishlist = await WishList.findOne({ userId });

  if (!wishlist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Wishlist not found`);
  }

  await wishlist.deleteOne({ userId });

  return wishlist;
};

const getOrderListByUser = async (userId, status) => {
  console.log("userId,status", userId, status);
  const user = await getUserById(userId);

  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "RotexUser not found");

  if (!status) throw new ApiError(httpStatus.NOT_FOUND, "status is required");
  console.log("status", status);
  if (status !== "complete" && status !== "incomplete") {
    throw new ApiError(httpStatus.NOT_FOUND, "Select a valid status");
  }
  const data = await RotexCart.find({ userId: userId, status: status });

  return data;
};

const createFeedback = async (feedbackData) => {
  if (!feedbackData.name)
    throw new ApiError(httpStatus.BAD_REQUEST, "Name is required!");
  if (!feedbackData.description)
    throw new ApiError(httpStatus.BAD_REQUEST, "Description is required!");

  return RotexReview.create(feedbackData);
};

const addShippingAddress = async (userId, addressData) => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "user not found!");
  console.log("addressData", addressData);
  console.log("usersd", user);

  // if(!user.shippingAddress){
  //   user.shippingAddress = [];
  // }
  user.shippingAddress.push(addressData);

  if (user?.shippingAddress.length === 1) {
    user.shippingAddress[0].isPrimary = true;
  }

  await user.save();
  return user;
};

const updateShippingAddress = async (userId, addressId, newAddress) => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "user not found!");

  const addressIndex = user.shippingAddress.findIndex((address) => {
    return address._id.toString() === addressId;
  });
  console.log("addressIndex", addressIndex, newAddress);
  if (addressIndex !== -1) {
    user.shippingAddress[addressIndex] = {
      ...user.shippingAddress[addressIndex],
      ...newAddress,
    };
  } else {
    user.shippingAddress.push(newAddress);
  }
  const address = user.shippingAddress.id(addressId);
  if (address) {
    address.isPrimary = true;
  }

  await user.save();
  return user;
};
const deleteShippingAddress = async (userId, addressId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "RotexUser not found!");
  }

  const addressIndex = user.shippingAddress.findIndex(
    (address) => address._id.toString() === addressId
  );

  if (addressIndex === -1) {
    throw new ApiError(httpStatus.NOT_FOUND, "Address not found!");
  }
  console.log("after", user?.shippingAddress);

  user.shippingAddress.splice(addressIndex, 1);

  await user.save();

  return user;
};

const updatePrimaryAddress = async (userId, addressId) => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "user not found!");

  user.shippingAddress.forEach((address) => {
    address.isPrimary = false;
  });

  const address = user.shippingAddress.find((address) => {
    return address._id.toString() === addressId;
  });

  if (!address) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Address not found!");
  }
  if (address) {
    address.isPrimary = true;
  }

  await user.save();
  return user;
};

const getUserAddressById = async (userId) => {
  const user = await getUserById(userId);
  return user;
};

const getFeedbacks = async () => {
  return RotexReview.find();
};

const updateFeedback = async (id, feedbackData) => {
  const updateData = await RotexReview.findByIdAndUpdate(id, feedbackData, {
    new: true,
  });
  if (updateData === null)
    throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
  return updateData;
};

const deleteFeedback = async (id) => {
  const deleteId = await RotexReview.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, "Data not found");
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

  const result = await Product.paginate(filter, options);

  const currentDate = new Date();
  const products = result.results.map((product) => {
    if (
      product.priceSale &&
      product.priceSale.startDate &&
      product.priceSale.endDate
    ) {
      const saleStart = new Date(product.priceSale.startDate);
      const saleEnd = new Date(product.priceSale.endDate);

      if (currentDate >= saleStart && currentDate <= saleEnd) {
        product.salePriceApplied = true;

        if (product.priceSale.salePrice) {
          if (
            typeof product.priceSale.salePrice === "string" &&
            product.priceSale.salePrice.includes("%")
          ) {
            const discountPercentage = parseFloat(
              product.priceSale.salePrice.replace("%", "")
            );
            product.price =
              product.price - (product.price * discountPercentage) / 100;
          } else if (typeof product.priceSale.salePrice === "number") {
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
  };
};
const getProductsById = async (id) => {
  return Product.findById(id);
};

const getCategories = async () => {
  return Category.find();
};

const createRazorpayOrderService = async (amount) => {
  const order = await razorpayInstance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });
  return order;
};

const verifyRazorpaySignatureService = (orderId, paymentId, signature) => {
  console.log("Loaded Secret:", process.env.RAZORPAY_KEY_SECRET);
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expected === signature;
};

//  const createOrderSummary = async (orderData) => {
//   try {
//     const { userId, customerDetails } = orderData;

//     const userCart = await RotexCart.findOne({ userId }).populate('items.productId');
//     if (!userCart || userCart.items.length === 0) {
//       throw new Error('RotexCart is empty or does not exist. Cannot create order.');
//     }

//     console.log('RotexUser RotexCart:', userCart);

//     const orderItems = [];
//     for (const cartItem of userCart.items) {
//       if (!cartItem.productId) {
//         throw new Error(`Product in cart is missing or invalid.`);
//       }

//       const product = await Product.findById(cartItem.productId._id);
//       if (!product) {
//         throw new Error(`Product with ID ${cartItem.productId._id} not found.`);
//       }

//       if (product.stock < cartItem.quantity) {
//         throw new Error(
//           `Insufficient stock for product ${product.name}. Available: ${product.stock}`
//         );
//       }

//       product.stock -= cartItem.quantity;
//       await product.save();

//       orderItems.push({
//         productId: product._id,
//         quantity: cartItem.quantity,
//         price: product.price,
//       });
//     }

//     const totalPrice = orderItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );

//     const newOrder = new OrderSummary({
//       userId,
//       customerDetails,
//       orderItems,
//       totalPrice,
//     });

//     await newOrder.save();

//     await RotexCart.findOneAndUpdate({ userId }, { items: [] });

//     return newOrder;
//   } catch (error) {
//     console.error(`Error creating order summary: ${error.message}`);
//     throw new Error(`Error creating order summary: ${error.message}`);
//   }
// };

const createOrderSummary = async (
  userId,
  customerDetails,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) => {
  const userCart = await RotexCart.findOne({ userId }).populate(
    "items.productId"
  );
  if (!userCart || userCart.items.length === 0) {
    throw new Error("Cart is empty or does not exist.");
  }

  const orderItems = [];
  let totalPrice = 0;

  for (const cartItem of userCart.items) {
    if (!cartItem.productId) throw new Error("Product missing in cart");

    const product = await Product.findById(cartItem.productId._id);
    if (!product) throw new Error("Product not found");
    if (product.stock < cartItem.quantity)
      throw new Error("Insufficient stock");

    // Decrement stock
    product.stock -= cartItem.quantity;
    await product.save();

    // Compute item price
    let itemTotal = product.price * cartItem.quantity;

    // Exclude charges for "eco lite"
    const isEcoLite = product?.name?.toLowerCase() === "eco lite";

    // Apply GST or shipping charges conditionally
    let gstAmount = 0;
    let shippingFee = 0;

    if (!isEcoLite) {
      gstAmount = itemTotal * 0.18; // Assuming 18% GST
      shippingFee = 50; // Assuming flat shipping per item
    }

    const finalPrice = itemTotal + gstAmount + shippingFee;

    totalPrice += finalPrice;

    orderItems.push({
      productId: product._id,
      quantity: cartItem.quantity,
      price: product.price,
      selectedColor: cartItem.selectedColor,
      selectedColorImage: cartItem.selectedColorImage,
      gst: gstAmount,
      shipping: shippingFee,
      itemTotal: finalPrice,
    });
  }

  const orderSummary = new OrderSummary({
    userId,
    customerDetails,
    orderItems,
    totalPrice,
    razorpayOrderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    paymentSignature: razorpay_signature,
  });

  await orderSummary.save();

  // Clear the user's cart
  await RotexCart.findOneAndUpdate({ userId }, { items: [] });

  return orderSummary;
};


const getOrderSummaryById = async (orderId) => {
  const order = await OrderSummary.findById(orderId)
    .populate({
      path: "orderItems.productId",
    })
    .populate("shippingStatus");

  return order;
};

const getOrdersByUser = async (userId) => {
  try {
    const orders = await OrderSummary.find({ userId }).populate({
      path: "orderItems.productId",
      select: "_id title subTitle color price description productImgUrl",
    });

    if (orders.length === 0) {
      return { message: "No orders found for this user", orders: [] };
    }

    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    return { error: `Error fetching user orders: ${error.message}` };
  }
};

const getAllOrders = async () => {
  try {
    const orders = await OrderSummary.find().populate({
      path: "orderItems.productId",
      select: "_id title subTitle color price description productImgUrl",
    });

    if (orders.length === 0) {
      throw new Error("No orders found");
    }

    return orders;
  } catch (error) {
    throw new Error(`Error fetching all orders: ${error.message}`);
  }
};

const updateOrderSummaryById = async (id, updateData) => {
  const order = await OrderSummary.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

const deleteOrderSummaryById = async (id) => {
  const order = await OrderSummary.findByIdAndDelete(id);
  if (!order) {
    throw new Error("Order not found");
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

// const createWarranty = async ({
//   productName,
//   productColor,
//   warrantyNumber,
//   userId,
// }) => {
//   const product = await Product.findOne({
//     title: { $regex: new RegExp(`^${productName}$`, "i") },
//   });

//   if (!product) {
//     throw new Error(`Product "${productName}" not found.`);
//   }

//   console.log("Product Found:", product);
//   console.log("Product Color Field:", product.color, typeof product.color);

//   let colorExists = false;

//   if (Array.isArray(product.color)) {
//     const allColors = product.color[0]
//       .split(",")
//       .map((c) => c.trim().toLowerCase());
//     colorExists = allColors.includes(productColor.toLowerCase());
//   }

//   if (!colorExists) {
//     throw new Error(
//       `Color "${productColor}" does not exist for product "${productName}".`
//     );
//   }

//   const existingWarranty = await Warranty.findOne({ warrantyNumber });
//   if (existingWarranty) {
//     throw new Error(
//       "This warranty number is already assigned to another product"
//     );
//   }

//   const warranty = new Warranty({
//     productId: product._id,
//     productColor,
//     userId,
//     warrantyNumber,
//   });

//   await warranty.save();
//   return warranty;
// };

/* ------------------------------------------------------------------ */
/*  1.  HEX ↔ NAME MAP                                                */
/* ------------------------------------------------------------------ */
    const colorNames = {
    "#dddcdc": "White",
    "#363636": "Matte Black",
    "#4b3933": "Chocolate Brown",
    "#dfdfdf": "White and Grey",
    "#311d1c": "Brown",
    "#191919": "Black",
    "#505a65": "Black and Grey",
    "#d2cabb": "Ivory",
    "#996a5a": "Dark Shade",
    "#b89455": "Light Shade",
    "#d4dadb": "Star White",
    "#e2e4e5": "Pearl White",
    "#3b2424": "Metalic Brown",
    "#ce9e4c": "Antique Ivory",
    "#735140": "Wood Ivory",
    "#213d5d": "Blue Ocean",
    "#2d2d2b": "Black and Gold",
  };

// invert =>  { "white": "#e3e3e5", ... }
const nameToHexMap = Object.entries(colorNames).reduce((acc, [hex, name]) => {
  acc[name.toLowerCase()] = hex.toLowerCase();
  return acc;
}, {});

/* ------------------------------------------------------------------ */
/*  2.  MAIN FUNCTION                                                 */
/* ------------------------------------------------------------------ */
const createWarranty = async ({
  productName,
  productColor,   // may be "White" or "#e3e3e5"
  warrantyNumber,
  userId,
}) => {
  /* ------------------ product lookup ------------------ */
  const product = await Product.findOne({
    title: { $regex: new RegExp(`^${productName}$`, "i") },
  });
  if (!product) throw new Error(`Product "${productName}" not found.`);

  /* ------------------ normalise requested colour ------------------ */
  const requested = (productColor || "").trim().toLowerCase();
  // turn name → hex if needed
  const requestedHex = requested.startsWith("#")
    ? requested
    : nameToHexMap[requested] || null;

  if (!requestedHex) {
    throw new Error(`Colour "${productColor}" is not recognised.`);
  }

  /* ------------------ build list of AVAILABLE colours ------------------ */
  const available = new Set();

  // a) legacy product.color field (string or [string])
  if (product.color) {
    const list = Array.isArray(product.color) ? product.color : [product.color];
    list.forEach((c) =>
      c
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .forEach((s) => {
          // add both the raw entry and any mapped hex/name
          available.add(s);
          if (s.startsWith("#") && colorNames[s]) available.add(colorNames[s].toLowerCase());
          if (!s.startsWith("#") && nameToHexMap[s]) available.add(nameToHexMap[s]);
        })
    );
  }

  // b) modern productImages[*].color
  if (Array.isArray(product.productImages)) {
    product.productImages.forEach((img) => {
      const col = (img.color || "").toLowerCase();
      if (!col) return;
      available.add(col);
      if (colorNames[col]) available.add(colorNames[col].toLowerCase());
    });
  }

  const colourOK =
    available.has(requested) || available.has(requestedHex.toLowerCase());

  if (!colourOK) {
    throw new Error(
      `Color "${productColor}" does not exist for product "${productName}".`
    );
  }

  /* ------------------ warranty-number uniqueness ------------------ */
  const existing = await Warranty.findOne({ warrantyNumber });
  if (existing) {
    throw new Error("This warranty number is already assigned to another product.");
  }

  /* ------------------ create + save ------------------ */
  const warranty = new Warranty({
    productId: product._id,
    productColor: requestedHex, // always store hex for consistency
    userId,
    warrantyNumber,
  });

  await warranty.save();
  return warranty;
};



export const getWarrantiesByUserService = async (userId) => {
  return await Warranty.find({ userId }).populate(
    "productId",
    "title color price"
  );
};

const getAllWarranties = async () => {
  return await Warranty.find().populate("productId").sort({ createdAt: -1 });
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
  if (!coupon) throw new ApiError(httpStatus.NOT_FOUND, "Coupon not found!");

  return coupon;
};

const getBlog = async () => {
  return RotexBlog.find();
};

const getAboutUsPage = async () => {
  return RotexAboutUs.find();
};

const getAboutUsById = async (id) => {
  return RotexAboutUs.findById(id);
};

const createComplaint = async (complaintData) => {
  const { productId, customerName, phoneNumber, email, address, message } =
    complaintData;

  if (
    !productId ||
    !customerName ||
    !phoneNumber ||
    !email ||
    !address ||
    !message
  ) {
    throw new Error(
      "Missing required fields: productId, customerName, phoneNumber, email, address."
    );
  }

  const newComplaint = new Complaint(complaintData);

  const savedComplaint = await newComplaint.save();

  return savedComplaint;
};

const getAllQuickFix = async () => {
  try {
    const quickFixes = await QuickFix.find()
      .populate("productId")
      .populate("problemId");
    res.status(200).json({ quickFixes });
  } catch (error) {
    console.error("Error fetching QuickFix data:", error.message);
    res.status(500).json({ message: "Error fetching QuickFix data." });
  }
};

const getQuickFixById = async (id) => {
  try {
    const quickFixes = await QuickFix.findById(id)
      .populate("productId")
      .populate("problemId");
    res.status(200).json({ quickFixes });
  } catch (error) {
    console.error("Error fetching QuickFix data:", error.message);
    res.status(500).json({ message: "Error fetching QuickFix data." });
  }
};

const getQuickFixByProductAndProblem = async (productId, problemId) => {
  try {
    // Find QuickFix data based on the productId and problemId
    const quickFixes = await QuickFix.find({
      productId,
      problemId,
    })
      .populate("productId") // Populate the product details
      .populate("problemId"); // Populate the problem details

    // Return the fetched quickFixes data
    return quickFixes;
  } catch (error) {
    console.error("Error fetching QuickFix data from database:", error.message);
    throw new Error("Error fetching QuickFix data from database");
  }
};

const getProblem = async () => {
  return Problem.find();
};

const getBrand = async () => {
  return Brand.find();
};
const getBlogContainsByBlogId = async (blogId) => {
  const blog = await BlogDetails.findOne({ blogId });
  return blog;
};

const getProductsByCategory = async (categoryId) => {
  try {
    const products = await RotexProduct.find({ categoryId }).populate(
      "categoryId"
    );
    return products.length
      ? { success: true, products }
      : { success: false, message: "No products found" };
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const BASE_URL =
  PHONEPE_ENV === "live"
    ? "https://api.phonepe.com/apis/hermes"
    : "https://api-preprod.phonepe.com/apis/pg-sandbox";

const phonePeInitiateService = async ({
  amount,
  mobileNumber,
  transactionId,
  redirectUrl,
}) => {
  const payload = {
    merchantId: PHONEPE_MERCHANT_ID,
    transactionId,
    merchantUserId: "user123",
    amount: Number(amount) * 100,
    redirectUrl,
    redirectMode: "POST",
    mobileNumber,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
  const xVerify = createXVerify(
    base64Payload,
    "/pg/v1/pay",
    PHONEPE_SALT_KEY,
    PHONEPE_SALT_INDEX
  );

  const response = await axios.post(
    `${BASE_URL}/pg/v1/pay`,
    { request: base64Payload },
    {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": PHONEPE_MERCHANT_ID,
      },
    }
  );

  return response.data;
};

const phonePeStatusService = async (transactionId) => {
  const path = `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}`;
  const xVerify = createXVerify(
    path,
    "",
    PHONEPE_SALT_KEY,
    PHONEPE_SALT_INDEX,
    true
  );

  const response = await axios.get(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "X-VERIFY": xVerify,
      "X-MERCHANT-ID": PHONEPE_MERCHANT_ID,
    },
  });

  return response.data;
};

const getProductByNameService = async (title) => {
  const decodedTitle = decodeURIComponent(title).replace(/-/g, " ");

  const product = await Product.findOne({
    title: new RegExp("^" + decodedTitle + "$", "i"),
  });

  console.log("Searching for:", decodedTitle);
  console.log("Found product:", product);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const createVisitEntryService = async (formData) => {
  const entry = new InfluencerVisit(formData);
  return await entry.save();
};

const generateProductCodes = async (productId, quantity = 1) => {
  const codes = [];
  for (let i = 0; i < quantity; i++) {
    const newCode = generateCode(productId);
    const saved = await RotexCode.create({ code: newCode, productId });
    codes.push(saved);
  }
  return codes;
};

const validateAndUseCode = async (codeInput, userId) => {
  const code = await RotexCode.findOne({ code: codeInput });
  if (!code) throw new Error('Invalid code');
  if (code.used) throw new Error('Code already used');

  const user = await UserProfile.findById(userId);
  if (!user) throw new Error('User not found');

  code.used = true;
  code.assignedTo = userId;
  await code.save();

  user.points = (user.points || 0) + 20;
  user.scannedCodes = user.scannedCodes || [];
  user.scannedCodes.push(code.code);
  await user.save();

  const product = await RotexProduct.findById(code.productId);

  return { user, product, code };
};

const generateOtp = async (mobileNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 
  await RotexCode.findOneAndUpdate(
    { mobileNumber },
    { otp, expiresAt },
    { upsert: true, new: true }
  );
  return otp;
};

const verifyOtp = async (mobileNumber, otpInput) => {
  const otpRecord = await RotexCode.findOne({ mobileNumber });
  if (!otpRecord || otpRecord.otp !== otpInput || otpRecord.expiresAt < new Date()) {
    return false;
  }
  await OTP.deleteOne({ mobileNumber });
  return true;
};
7
const applyProductCode = async (barcodeData, mobileNumber, name) => {
  const product = await HYGOCode.findOne({ code: barcodeData });

  if (!product || product.used) { 
    return { applied: false, message: 'Code is invalid or already used.' };
  }

  product.used = true;
  product.usedBy = { mobileNumber, name, appliedAt: new Date() };
  await product.save();

  return { applied: true, message: 'Code successfully applied.' };
};


export default {
  getUserByName, generateProductCodes, validateAndUseCode, generateOtp, verifyOtp,
  updatePrimaryAddress, applyProductCode,
  updateShippingAddress,
  addShippingAddress,
  createCart,
  getCartByUserId,
  updateCartItems,
  deleteCartItems,
  updateCartStatus,
  getUserByEmail,
  getUserById,
  createComplaint,
  createWishlist,
  deleteWishlistProduct,
  deleteWishlist,
  getWishlist,
  getOrderListByUser,
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback,
  getUserAddressById,
  deleteShippingAddress,
  createOrder,
  getOrderByOrderId,
  getOrderByUserId,
  orderStatusChange,
  getOrderReceipt,
  getProducts,
  getProductsById,
  getCategories,
  createOrderSummary,
  getOrderSummaryById,
  updateOrderSummaryById,
  deleteOrderSummaryById,
  createVisitEntryService,
  getOrdersByUserId,
  getAllOrders,
  getOrdersByUser,
  saveContact,
  deleteUser,
  getAllContacts,
  getContactById,
  createWarranty,
  getWarrantiesByUserId,
  getAllWarranties,
  getCoupon,
  getCouponById,
  getBlog,
  getAboutUsPage,
  getAboutUsById,
  getAllQuickFix,
  getQuickFixById,
  getQuickFixByProductAndProblem,
  getProblem,
  getBrand,
  getBlogContainsByBlogId,
  getProductsByCategory,
  phonePeInitiateService,
  phonePeStatusService,
  createRazorpayOrderService,
  getProductByNameService,
};
