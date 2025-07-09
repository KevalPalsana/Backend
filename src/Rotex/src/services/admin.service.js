import Category from "../models/category.model.js"
import { ApiError } from "../utils/ApiError.js";
import SubCategory from "../models/subCategory.model.js"
import httpStatus from "http-status"
import Label from "../models/label.model.js";
import Attribute from "../models/attribute.model.js";
import Brand from "../models/brand.model.js";
import ShippingStatus from "../models/ShippingStatus.model.js";
import OrderTracking from "../models/orderTracking.model.js";
import { generateCouponCode } from "../utils/generateCode.js";
import Coupon from "../models/coupon.model.js";
import WalletAmount from "../models/walletAmount.model.js";
import Tag from "../models/tag.model.js";
import ProductStatus from "../models/productStatus.model.js";
import Order from "../models/order.model.js";
import { RotexAboutUs } from "../models/aboutUs.model.js";
import { RotexBlog } from "../models/blog.model.js";
import Banner from "../models/banner.model.js";
import Warranty from "../models/warranty.model.js";
import Contact from '../models/contactUs.model.js';
import OrderSummary from "../models/orderSummary.model.js";
import Complaint from "../models/complaint.model.js";
import Problem from "../models/collection.model.js";
import QuickFix from "../models/subCategory.model.js";
import axios from "axios";
import dotenv from "dotenv";
import RotexOrderSummary from "../models/orderSummary.model.js";
import { generateMessageTemplate } from "../utils/messageTemplate.js";
import { generateOfferMessageTemplate } from "../utils/offerTemplate.js";
import { RotexUser } from "../models/user.model.js";
import RotexProduct from "../models/product.model.js";
import BlogDetails from "../models/blogContent.model.js";
import moment from 'moment';
import { buildOrderStatusTemplate } from "../utils/order-Template.js";
import RotexCart from "../models/cart.model.js";
import mongoose from "mongoose";


const createBrand = async (brandData) => {
  if (!brandData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  if (!brandData.icon) throw new ApiError(httpStatus.BAD_REQUEST, 'Icon is required');
  if (!brandData.value) throw new ApiError(httpStatus.BAD_REQUEST, 'Value is required');
  if (!brandData.subName) throw new ApiError(httpStatus.BAD_REQUEST, 'SubName is required');

  return Brand.create(brandData);
};

const getBrand = async () => {
  return Brand.find();
};

const updateBrand = async (id, brandData) => {

  const updateData = await Brand.findByIdAndUpdate(id, brandData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  return updateData;
};

const deleteBrand = async (id) => {
  const deleteId = await Brand.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  return deleteId;
};

const createProblem = async (problemData) => {
  if (!problemData.problem) throw new ApiError(httpStatus.BAD_REQUEST, 'problem is required!');
  const existingCategory = await Problem.findOne({ problem: problemData?.problem })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Problem with problem "${problemData.problem}" already exists.`);
  }
  return Problem.create(problemData);
};

const getProblem = async () => {
  return Problem.find();
};

const updateProblem = async (id, problemData) => {
  const existingCategory = await Problem.findOne({ name: problemData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Problem with name "${problemData.name}" already exists.`);
  }
  const updateData = await Problem.findByIdAndUpdate(id, problemData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Problem not found');
  return updateData;
};

const deleteProblem = async (id) => {
  const deleteId = await Problem.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Problem not found');
  return deleteId;
};

const createLabel = async (labelData) => {
  if (!labelData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingCategory = await Label.findOne({ name: labelData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Label with name "${labelData.name}" already exists.`);
  }
  return Label.create(labelData);
};

const getLabels = async () => {
  return Label.find();
};

const updateLabel = async (id, labelData) => {
  const existingCategory = await Label.findOne({ name: labelData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Label with name "${labelData.name}" already exists.`);
  }
  const updateData = await Label.findByIdAndUpdate(id, labelData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Label not found');
  return updateData;
};

const deleteLabel = async (id) => {
  const deleteId = await Label.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Label not found');
  return deleteId;
};
const createCategory = async (categoryData) => {
  if (!categoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingCategory = await Category.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Category with name "${categoryData.name}" already exists.`);
  }
  return Category.create(categoryData);
};

const getCategories = async () => {
  return Category.find();
};

const updateCategory = async (id, categoryData) => {
  const existingCategory = await Category.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Category with name "${categoryData.name}" already exists.`);
  }
  const updateData = await Category.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  return updateData;
};

const deleteCategory = async (id) => {
  const deleteId = await Category.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  return deleteId;
};

const createSubCategory = async (categoryData) => {
  if (!categoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  if (!categoryData.categoryId) throw new ApiError(httpStatus.BAD_REQUEST, 'category id is required!');
  const existingCategory = await SubCategory.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Sub Category with name "${categoryData.name}" already exists.`);
  }
  const findCategory = await Category.findById(categoryData?.categoryId);
  if (!findCategory) throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  return SubCategory.create(categoryData);
};

const getSubCategories = async () => {
  return SubCategory.find();
};

const getSubCategoryByCategoryId = async (categoryId) => {
  if (!categoryId) throw new ApiError(httpStatus.BAD_REQUEST, 'categoryId is required!');

  const categoryExists = await Category.findById(categoryId);
  if (!categoryExists) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');

  const subCategories = await SubCategory.find({ categoryId });

  return subCategories;
};


const updateSubCategory = async (id, categoryData) => {
  const existingCategory = await SubCategory.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Sub Category with name "${categoryData.name}" already exists.`);
  }
  if (categoryData?.categoryId) {
    const findCategory = await Category.findById(categoryData?.categoryId);
    if (!findCategory) throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }

  const updateData = await SubCategory.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  return updateData;
};

const deleteSubCategory = async (id,) => {
  const deleteId = await SubCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  return deleteId;
};

const createProduct = async (productData) => {
  return await RotexProduct.create(productData);
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

  const result = await RotexProduct.paginate(filter, options);

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

const getFaqs = async () => {
  const products = RotexProduct.find();

  let allFAQs = [];
  let seenQuestions = new Set();

  (await products).forEach((product => {
    if (product.productFAQs && Array.isArray(product?.productFAQs)) {
      product?.productFAQs.forEach(faq => {
        if (!seenQuestions.has(faq?.question)) {
          allFAQs.push(faq);
          seenQuestions.add(faq?.question)
        }
      })
    }
  }))
  return allFAQs;
}
const getProductsById = async (productId, color = null) => {
  try {
    const product = await RotexProduct.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // If color is provided, filter images for that color
    let filteredImages = [];
    if (color) {
      const colorData = product.productImages.find((item) => item.color === color);
      filteredImages = colorData ? colorData.images : [];
    }

    return {
      ...product.toObject(),
      filteredImages, // Include filtered images if color is selected
    };
  } catch (error) {
    throw error;
  }
};

const getProductsByCategory = async (categoryId) => {
  try {
    const products = await RotexProduct.find({ categoryId }).populate("categoryId");
    return products.length ? { success: true, products } : { success: false, message: "No products found" };
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};


const getRelatedProduct = async (productId) => {
  const product = await RotexProduct.findById(productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RotexProduct not found');
  }

  const relatedProducts = await RotexProduct.find({
    _id: { $ne: productId },  // Exclude the current product from the related products
    // $or: [
    //     { categoryId: product.categoryId },
    // ]
  })
  // .populate('categoryId', 'name')
  return { product, relatedProducts };
};

const getFeaturedProducts = async () => {
  const featuredProducts = await RotexProduct.find({ featured: true })
  // .populate('categoryId', 'name') 

  if (featuredProducts.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No featured products found');
  }

  return featuredProducts;
};

const updateProduct = async (id, productData) => {
  const updateData = await RotexProduct.findByIdAndUpdate(id, productData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'RotexProduct not found');
  return updateData;
};

const deleteProduct = async (id) => {
  const deleteId = await RotexProduct.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'RotexProduct not found');
  return deleteId;
};

const createAttribute = async (attributeData) => {
  if (!attributeData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  if (!attributeData.value) throw new ApiError(httpStatus.BAD_REQUEST, 'value is required!');
  const existingCategory = await Attribute.findOne({ name: attributeData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Attribute with name "${attributeData.name}" already exists.`);
  }
  return Attribute.create(attributeData);

};


const getAttributes = async () => {
  return Attribute.find();
};

const updateAttribute = async (id, attributeData) => {
  const existingAttribute = await Attribute.findOne({ name: attributeData?.name })
  if (existingAttribute) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Attribute with name "${attributeData.name}" already exists.`);
  }
  const updateData = await Attribute.findByIdAndUpdate(id, attributeData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Attribute not found');
  return updateData;
};


const deleteAttribute = async (id) => {
  const deleteId = await Attribute.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Attribute not found');
  return deleteId;
};
const deleteFAQ = async (id, question) => {
  console.log(id, question)
  const product = await RotexProduct.findById(id);

  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  const findFAQIndex = product.productFAQs.findIndex(faq => faq.question === question)

  if (findFAQIndex == -1) throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  product.productFAQs.splice(findFAQIndex, 1);
  product.save()
  return product;
};

export const getOrderById = async (orderId) => {
  const order = await OrderSummary.findById(orderId)
    .populate({
      path: 'orderItems.productId',
    })
    .populate('shippingStatus');

  if (!order) {
    throw new Error('Order not found');
  }

  order.orderItems = order.orderItems.map((item) => {
    const itemObj = item.toObject();
    const selectedColor = itemObj.selectedColor;
    let selectedColorImage = null;

    // Match selected color in productImages array
    if (
      itemObj.productId &&
      Array.isArray(itemObj.productId.productImages)
    ) {
      const match = itemObj.productId.productImages.find(
        (img) =>
          img.color?.toLowerCase() === selectedColor?.toLowerCase()
      );

      if (match && Array.isArray(match.images) && match.images.length > 0) {
        selectedColorImage = match.images[0];
      }
    }

    return {
      ...itemObj,
      selectedColor: selectedColor || null,
      selectedColorImage: selectedColorImage || null,
    };
  });

  return order;
};

const deleteOrderSummaryById = async (id) => {
  const order = await OrderSummary.findByIdAndDelete(id);
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const getOrderList = async () => {
  try {
    const orders = await OrderSummary.find().populate({
      path: 'orderItems.productId',
      select: '_id name price description image',
    })
      .populate('shippingStatus');

    if (orders.length === 0) {
      throw new Error('No orders found');
    }

    return orders;
  } catch (error) {
    throw new Error(`Error fetching all orders: ${error.message}`);
  }
};

const createShippingStatus = async (statusData) => {
  if (!statusData?.status) throw new ApiError(httpStatus.BAD_REQUEST, 'Status is required');
  const existingStatus = await ShippingStatus.findOne({ status: statusData?.status });
  if (existingStatus) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This ${statusData?.status} status name already exists.`);
  }

  return ShippingStatus.create(statusData);
};

const getShippingStatus = () => {
  return ShippingStatus.find();
}

const updateShippingStatus = async (id, statusData) => {
  const existingStatus = await ShippingStatus.findOne({ status: statusData?.status });
  if (existingStatus) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This ${statusData?.status} status name already exists.`);
  }

  const updateData = await ShippingStatus.findByIdAndUpdate(id, statusData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return updateData;
};

const deleteShippingStatus = async (id) => {
  const deleteId = await ShippingStatus.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return deleteId;
};

const createOrderTacking = async (id, trackingData) => {
  console.log(id, trackingData)

  const alreadyExist = await OrderTracking.find({ orderId: id });
  if (alreadyExist) throw new ApiError(httpStatus.NOT_FOUND, 'Tracking  Already exist ');

  const orderStatus = await ShippingStatus.findById(trackingData);
  if (orderStatus === null) throw new ApiError(httpStatus.NOT_FOUND, 'Status is required!');
  const orderId = await Order.findById(id);
  if (orderId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Order Not found ');

  const newData = new OrderTracking({
    orderId: id,
    status: trackingData
  })
  await newData.save();
  return newData;
};

const getOrderTracking = () => {
  return OrderTracking.find().populate('orderId', 'shippingAddress').populate('status', 'status');
}

const updateOrderTracking = async (id, trackingData) => {
  // const existingStatus = await OrderTracking.findOne({ status: trackingData?.status });
  // if (existingStatus) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, `This ${trackingData?.status} name status is already selected.`);
  // }
  console.log("id, trackingData", id, trackingData)
  const orderStatus = await ShippingStatus.find({ status: trackingData.status });
  if (orderStatus === null) throw new ApiError(httpStatus.NOT_FOUND, 'Status is not found!');
  const updateData = await OrderTracking.findByIdAndUpdate(id, trackingData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  // return;
  return updateData;
};

const deleteOrderTracking = async (id) => {
  const deleteId = await OrderTracking.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return deleteId;
}

const createWalletAmount = async (amountData) => {
  if (!amountData.amount) throw new ApiError(httpStatus.BAD_REQUEST, 'Amount is required!');


  return WalletAmount.create(amountData);
};

const getWalletAmount = async () => {
  return WalletAmount.find();
};

const updateWalletAmount = async (id, amountData) => {
  const updateData = await WalletAmount.findByIdAndUpdate(id, amountData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteWalletAmount = async (id) => {
  const deleteId = await WalletAmount.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createTag = async (tagData) => {
  if (!tagData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingCategory = await Tag.findOne({ name: tagData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Brand with name "${tagData.name}" already exists.`);
  }
  return Tag.create(tagData);
};

const getTag = async () => {
  return Tag.find();
};

const updateTag = async (id, tagData) => {
  const existingCategory = await Tag.findOne({ name: tagData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Brand with name "${tagData.name}" already exists.`);
  }
  const updateData = await Tag.findByIdAndUpdate(id, tagData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  return updateData;
};

const deleteTag = async (id) => {
  const deleteId = await Tag.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  return deleteId;
};


const createCoupon = async (couponData) => {
  const existingCoupon = await Coupon.findOne({ name: couponData.name });
  if (existingCoupon) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon name already exists!');
  }

  const couponCode = couponData.couponCode || generateCouponCode();

  const newCoupon = new Coupon({
    ...couponData,
    couponCode,
    endDate: couponData.endDate || '',
  });

  return await newCoupon.save();
};

const getCoupon = async () => {
  return Coupon.find();
};

const getCouponById = async (id) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) throw new ApiError(httpStatus.NOT_FOUND, 'Coupon not found!');

  return coupon;
};

const updateCoupon = async (id, couponData) => {
  const coupon = await Coupon.findByIdAndUpdate(id, couponData, { new: true });
  if (!coupon) throw new ApiError(httpStatus.NOT_FOUND, 'Coupon not found!');
  return coupon;
};

const deleteCoupon = async (id) => {
  const deleteId = await Coupon.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Coupon not found');
  return deleteId;
};


const createProductStatus = async (statusData) => {
  if (!statusData?.status) throw new ApiError(httpStatus.BAD_REQUEST, 'Status is required');
  const existingStatus = await ProductStatus.findOne({ status: statusData?.status });
  if (existingStatus) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This ${statusData?.status} status name already exists.`);
  }

  return ProductStatus.create(statusData);
};

const getProductStatus = () => {
  return ProductStatus.find();
}

const updateProductStatus = async (id, statusData) => {
  const existingStatus = await ProductStatus.findOne({ status: statusData?.status });
  if (existingStatus) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This ${statusData?.status} status name already exists.`);
  }

  const updateData = await ProductStatus.findByIdAndUpdate(id, statusData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return updateData;
};

const deleteProductStatus = async (id) => {
  const deleteId = await ProductStatus.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return deleteId;
};


const updatePaymentStatusService = async (orderId, paymentStatus) => {
  const allowedStatuses = ['pending', 'completed', 'cancelled'];

  if (!allowedStatuses.includes(paymentStatus)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid payment status. Allowed values: ${allowedStatuses.join(', ')}`
    );
  }

  const order = await OrderSummary.findById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found.');
  }

  // Update payment status
  order.paymentStatus = paymentStatus;
  await order.save();

  return order;
};


const updateOrderStatusService = async (orderId, orderStatus) => {
  try {
    const updatedOrder = await OrderSummary.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    console.error('Error in service while updating order status:', error);
    throw error;
  }
};

const updateShippingStatusService = async (orderId, shippingStatus) => {
  try {
    const updatedOrder = await OrderSummary.findByIdAndUpdate(
      orderId,
      { shippingStatus },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    console.error('Error in service while updating order status:', error);
    throw error;
  }
};

const createAboutUsPage = async (aboutUsData) => {
  if (!aboutUsData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
  if (!aboutUsData.content) throw new ApiError(httpStatus.BAD_REQUEST, 'Content is required!');
  if (!aboutUsData.image) throw new ApiError(httpStatus.BAD_REQUEST, "Image is required!");

  const existingAboutUs = await RotexAboutUs.findOne();

  if (existingAboutUs) {
    return RotexAboutUs.findByIdAndUpdate(existingAboutUs._id, aboutUsData, {
      new: true,
      runValidators: true,
    });
  }

  return RotexAboutUs.create(aboutUsData);
};


const getAboutUsPage = async () => {
  return RotexAboutUs.find();
};

const getAboutUsById = async (id) => {
  return RotexAboutUs.findById(id);
};

const updateAboutUsPage = async (id, aboutUsData) => {
  const updateData = await RotexAboutUs.findByIdAndUpdate(id, aboutUsData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return updateData;
};

const deleteAboutUsPage = async (id) => {
  const deleteId = await RotexAboutUs.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return deleteId;
};


const createBlog = async (blogData) => {
  return await RotexBlog.create(blogData);
};

const getBlog = async () => {
  return RotexBlog.find();
};

const updateBlog = async (id, blogData) => {

  const updateData = await RotexBlog.findByIdAndUpdate(id, blogData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'RotexBlog not found');
  return updateData;
};

const deleteBlog = async (id) => {
  const deleteId = await RotexBlog.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'RotexBlog not found');
  return deleteId;
};

const getBlogByTitle = async (title) => {
  return await RotexBlog.findOne({ title });
};


const createBanner = async (bannerData) => {
  if (!bannerData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
  return Banner.create(bannerData);
};

const getBanner = async () => {
  return Banner.find();
};

const updateBanner = async (id, bannerData) => {
  const updateData = await Banner.findByIdAndUpdate(id, bannerData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  return updateData;
};

const deleteBanner = async (id) => {
  const deleteId = await Banner.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  return deleteId;
};

const uploadWarrantyData = async (data) => {
  const results = [];
  for (const row of data) {
    const { WarrantyNumber, ProductName, ExpiryDate } = row;
    const updatedWarranty = await Warranty.updateOne(
      { warrantyNumber: WarrantyNumber },
      { productName: ProductName, expiryDate: new Date(ExpiryDate) },
      { upsert: true }
    );
    results.push(updatedWarranty);
  }
  return results;
};

const validateWarrantyNumbers = async (warrantyNumbers) => {
  const uniqueWarrantyNumbers = [...new Set(warrantyNumbers)];

  const matchedWarranties = await Warranty.find({
    warrantyNumber: { $in: uniqueWarrantyNumbers },
  });

  const matchedNumbers = matchedWarranties.map((w) => w.warrantyNumber);
  const invalidNumbers = uniqueWarrantyNumbers.filter(
    (number) => !matchedNumbers.includes(number)
  );

  return { matched: matchedWarranties, invalid: invalidNumbers };
};

const addWarrantyNumbersForProducts = async (warrantyData) => {
  const results = [];

  for (const { productId, warrantyNumber } of warrantyData) {
    const product = await RotexProduct.findById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }

    const existingWarranty = await Warranty.findOne({ warrantyNumber });
    if (existingWarranty) {
      throw new Error(`Warranty number ${warrantyNumber} already exists.`);
    }

    const newWarranty = await Warranty.create({
      warrantyNumber,
      productId,
    });

    product.warrantyNumbers = product.warrantyNumbers || [];
    product.warrantyNumbers.push(warrantyNumber);
    await product.save();

    results.push(newWarranty);
  }

  return results;
};

const getOrdersByShippingStatusService = async (status) => {
  try {
    const shippingStatus = await ShippingStatus.findOne({ status });
    if (!shippingStatus) {
      throw new Error(`Shipping status "${status}" not found.`);
    }

    const orders = await OrderSummary.find({ shippingStatus: shippingStatus._id }).populate('shippingStatus');
    return orders;
  } catch (error) {
    console.error('Error in service while fetching orders by shipping status:', error);
    throw error;
  }
};

const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

const updateOrderSummaryById = async (id, updateData) => {
  const order = await OrderSummary.findByIdAndUpdate(id, updateData, { new: true });
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
}

const getAllComplaints = async () => {
  return await Complaint.find().populate('productId');
};

const getComplaintById = async (id) => {
  return await Complaint.findById(id);
};

const updateComplaint = async (id, data) => {
  return await Complaint.findByIdAndUpdate(id, data, { new: true });
};

const deleteComplaint = async (id) => {
  return await Complaint.findByIdAndDelete(id);
};

const getAllQuickFix = async () => {
  return await QuickFix.find().populate('productId', 'title').populate('problemId', 'problem');
};

const getQuickFixById = async (id) => {
  return await QuickFix.findById(id);
};

const updateQuickFix = async (id, data) => {
  return await QuickFix.findByIdAndUpdate(id, data, { new: true });
};

const deleteQuickFix = async (id) => {
  return await QuickFix.findByIdAndDelete(id);
};

const createQuickFix = async (data) => {
  const quickFix = new QuickFix(data);
  return await quickFix.save();
};

const getAllWarranties = async () => {
  return await Warranty.find().populate('productId');
};

const deleteContactUs = async (id) => {
  return await Contact.findByIdAndDelete(id);
};


dotenv.config();
const sendOrderConfirmationWhatsApp = async (orderId) => {
  try {
    //Fetch order details from MongoDB
    const order = await RotexOrderSummary.findById(orderId).populate("orderItems.productId");

    if (!order) {
      return { success: false, message: "Order not found." };
    }

    //Generate WhatsApp message template
    const messageTemplate = generateMessageTemplate(order);

    //Send message via Gallabox API
    const response = await axios.post(
      "https://server.gallabox.com/devapi/messages/whatsapp",
      messageTemplate,
      {
        headers: {
          "apiKey": process.env.GALLABOX_API_KEY,
          "apiSecret": process.env.GALLABOX_API_SECRET,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("WhatsApp Order Confirmation Sent:", response.data);
      return { success: true, message: "WhatsApp notification sent." };
    } else {
      console.error("Failed to send WhatsApp notification:", response.status);
      return { success: false, message: "Failed to send WhatsApp notification." };
    }
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error.response?.data || error.message);
    return { success: false, message: "Error sending WhatsApp notification.", error: error.message };
  }
};

const sendOfferNotificationWhatsApp = async (userId, offerDetails) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { success: false, message: "User not found." };

    if (!user.subscribedToOffers) {
      return { success: false, message: "User has opted out of promotional messages." };
    }

    const messageTemplate = generateOfferMessageTemplate(user, offerDetails);

    const response = await axios.post(
      "https://server.gallabox.com/devapi/messages/whatsapp",
      messageTemplate,
      {
        headers: {
          "apiKey": process.env.GALLABOX_API_KEY,
          "apiSecret": process.env.GALLABOX_API_SECRET,
          "Content-Type": "application/json",
        },
      }
    );

    return response.status === 200
      ? { success: true, message: "WhatsApp offer notification sent." }
      : { success: false, message: "Failed to send offer notification." };

  } catch (error) {
    return { success: false, message: "Error sending WhatsApp offer notification.", error: error.message };
  }
};

const sendBulkOfferNotificationWhatsApp = async (offerDetails) => {
  try {
    const users = await RotexUser.find({ subscribedToOffers: true });

    if (users.length === 0) {
      return { success: false, message: "No subscribed users found." };
    }

    const promises = users.map((user) => sendOfferNotificationWhatsApp(user._id, offerDetails));
    const results = await Promise.all(promises);

    return { success: true, message: "Bulk offer notifications sent.", results };
  } catch (error) {
    return { success: false, message: "Error sending bulk offer notifications.", error: error.message };
  }
};

const getAllBlogContains = async () => {
  return await BlogDetails.find();
};

const getBlogContainsBYBlogId = async (blogId) => {
  try {
    const blogDetails = await BlogDetails.findOne({ blogId }).lean();
    console.log('blogDetails', blogDetails)
    return blogDetails;
  } catch (error) {
    throw new Error("Error fetching blog details: " + error.message);
  }
};

const getBlogContainsByTitle = async (title) => {
  try {
    const decodedTitle = decodeURIComponent(title);
    const cleanTitle = decodedTitle.replace(/-/g, " ").trim();

        console.log("Searching blog title:", cleanTitle);

    const blog = await RotexBlog.findOne({
      title: { $regex: cleanTitle, $options: "i" }, // <-- more flexible
    }).lean();


    if (!blog) return null;

    const blogDetails = await BlogDetails.findOne({ blogId: blog._id }).populate("blogId").lean();

    return blogDetails;
  } catch (error) {
    throw new Error("Failed to fetch blog details by title: " + error.message);
  }
};

const updateBlogContains = async (id, data) => {
  return await BlogDetails.findByIdAndUpdate(id, data, { new: true });
};

const deleteBlogContains = async (id) => {
  return await BlogDetails.findByIdAndDelete(id);
};

const createBlogContains = async (data) => {
  const quickFix = new BlogDetails(data);
  return await quickFix.save();
};

const sendOrderUpdateWhatsApp = async ({
  phone,
  orderStatus,
  trackingNumber,
  courierName,
  finalAmount,
}) => {
  try {
    const config = buildOrderStatusTemplate(phone, {
      orderStatus,
      trackingNumber,
      courierName,
      orderValue: finalAmount, // keep this if your template uses {{3}} for order value
    });

    const response = await axios(config);

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || 'Failed to send WhatsApp update',
      error: err?.response?.data || err.message,
    };
  }
};



const getDashboardData = async () => {
  const totalOrders = await RotexOrderSummary.countDocuments();

  const completedOrders = await RotexOrderSummary.countDocuments({
    orderStatus: "Delivered",
  });

  const cancelledOrders = await RotexOrderSummary.countDocuments({
    orderStatus: "Cancelled",
  });

  const todayStart = moment().startOf("day").toDate();
  const todayEnd = moment().endOf("day").toDate();

  const todaysOrders = await RotexOrderSummary.countDocuments({
    createdAt: { $gte: todayStart, $lte: todayEnd },
  });

  const totalComplaints = await Complaint.countDocuments();

  const totalUsers = await RotexUser.countDocuments();

  return {
    totalOrders,
    completedOrders,
    cancelledOrders,
    todaysOrders,
    totalComplaints,
    totalUsers,
  };
};
const getUserById = async (id) => {
  return RotexUser.findById(id);
};

const getCartByUserId = async (userId) => {
  const user = await getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "user not found");

  const cart = await RotexCart.findOne({ userId }).populate({
    path: "items.productId",
    select: "title price productImages",
  });

  return cart;
};


export default {
  createLabel, deleteLabel, updateLabel, getLabels, createCategory, getCategories, updateCategory, deleteCategory, createSubCategory, sendOrderConfirmationWhatsApp,
  getSubCategories, getSubCategoryByCategoryId, updateSubCategory, deleteSubCategory, createProduct, getProducts, updateProduct, deleteProduct, getProductsById, getRelatedProduct,
  getFeaturedProducts, createProblem, updateProblem, deleteProblem, getProblem, createAttribute, getAttributes, updateAttribute, deleteAttribute, deleteContactUs,
  deleteBrand, updateBrand, getBrand, createBrand, deleteFAQ, getFaqs, getOrderList, getOrderById, createShippingStatus, getShippingStatus, updateShippingStatus, deleteShippingStatus,
  createOrderTacking, getOrderTracking, updateOrderTracking, deleteOrderTracking, createWalletAmount, createCoupon, getCoupon, getCouponById, updateCoupon, deleteCoupon,
  getWalletAmount, updateWalletAmount, deleteWalletAmount, createTag, getTag, updateTag, deleteTag, createProductStatus, getProductStatus, updateProductStatus, deleteProductStatus, updatePaymentStatusService,
  createAboutUsPage, getAboutUsById, getAboutUsPage, updateAboutUsPage, deleteAboutUsPage, createBlog, getBlog, updateBlog, deleteBlog, getBlogByTitle, createBanner, getBanner, updateBanner, deleteBanner, uploadWarrantyData,
  validateWarrantyNumbers, addWarrantyNumbersForProducts, updateOrderStatusService, updateShippingStatusService, getOrdersByShippingStatusService, getAllContacts, getAllComplaints, getComplaintById, getUserById,
  updateComplaint, deleteComplaint, getQuickFixById, getAllQuickFix, updateQuickFix, deleteQuickFix, createQuickFix, getAllWarranties, deleteOrderSummaryById, sendOfferNotificationWhatsApp, sendBulkOfferNotificationWhatsApp,
  createBlogContains, getAllBlogContains, getBlogContainsBYBlogId, getBlogContainsByTitle, updateBlogContains, deleteBlogContains, getProductsByCategory, getDashboardData, updateOrderSummaryById, sendOrderUpdateWhatsApp, getCartByUserId,
}