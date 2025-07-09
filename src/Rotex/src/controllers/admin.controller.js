import adminService from "../services/admin.service.js";
import { sendSuccessResponse } from "../utils/ApiMessage.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status"
import RotexOrderSummary from "../models/orderSummary.model.js";

const getFaqs  = catchAsync(async (req, res) => {
  const faqs = await adminService.getFaqs(req.body);
  sendSuccessResponse(res, 'get',  faqs );
});
const createLabel  = catchAsync(async (req, res) => {
    const label = await adminService.createLabel(req.body);
    res.status(httpStatus.CREATED).send({ label });
  });

const getLabels  = catchAsync(async (req, res) => {
    const label = await adminService.getLabels(req.body);
    res.status(httpStatus.OK).send({ label });
  });

const updateLabel  = catchAsync(async (req, res) => {
    const label = await adminService.updateLabel(req.params.id, req.body);
    res.status(httpStatus.OK).send({ label });
  });

const deleteLabel   = catchAsync(async (req, res) => {
    const label = await adminService.deleteLabel(req.params.id);
    res.status(httpStatus.OK).send({ label });
  });

const createBrand  = catchAsync(async (req, res) => {
    const brand = await adminService.createBrand(req.body);
    res.status(httpStatus.CREATED).send({ brand });
  });

const getBrand  = catchAsync(async (req, res) => {
    const brand = await adminService.getBrand(req.body);
    res.status(httpStatus.OK).send({ brand });
  });

const updateBrand = catchAsync(async (req, res) => {
    const brand = await adminService.updateBrand(req.params.id, req.body);
    res.status(httpStatus.OK).send({ brand });
  });

const deleteBrand = catchAsync(async (req, res) => {
    const brand = await adminService.deleteBrand(req.params.id);
    res.status(httpStatus.OK).send({ brand });
  });
const createProblem  = catchAsync(async (req, res) => {
    const data = await adminService.createProblem(req.body);
    res.status(httpStatus.CREATED).send({ data });
  });

const getProblem  = catchAsync(async (req, res) => {
    const data = await adminService.getProblem(req.body);
    res.status(httpStatus.OK).send({ data });
  });

const updateProblem  = catchAsync(async (req, res) => {
    const data = await adminService.updateProblem(req.params.id, req.body);
    res.status(httpStatus.OK).send({ data });
  });

const deleteProblem   = catchAsync(async (req, res) => {
    const data = await adminService.deleteProblem(req.params.id);
    res.status(httpStatus.OK).send({ data });
  });

const createCategory  = catchAsync(async (req, res) => {
    const category = await adminService.createCategory(req.body);
    res.status(httpStatus.CREATED).send({ category });
  });

const getCategories   = catchAsync(async (req, res) => {
    const category = await adminService.getCategories(req.body);
    res.status(httpStatus.OK).send({ category });
  });

const updateCategory  = catchAsync(async (req, res) => {
    const category = await adminService.updateCategory(req.params.id, req.body);
    res.status(httpStatus.OK).send({ category });
  });

const deleteCategory   = catchAsync(async (req, res) => {
    const category = await adminService.deleteCategory(req.params.id);
    res.status(httpStatus.OK).send({ category });
  });

const createSubCategory  = catchAsync(async (req, res) => {
    const category = await adminService.createSubCategory(req.body);
    res.status(httpStatus.CREATED).send({ category });
  });

const getSubCategories   = catchAsync(async (req, res) => {
    const category = await adminService.getSubCategories(req.body);
    res.status(httpStatus.OK).send({ category });
  });

const getSubCategoryByCategoryId = catchAsync(async (req, res) => {
  const category = await adminService.getSubCategoryByCategoryId(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const updateSubCategory  = catchAsync(async (req, res) => {
    const category = await adminService.updateSubCategory(req.params.id, req.body);
    res.status(httpStatus.OK).send({ category });
  });

const deleteSubCategory   = catchAsync(async (req, res) => {
    const category = await adminService.deleteSubCategory(req.params.id);
    res.status(httpStatus.OK).send({ category , Message:"Delete SuccessFully...!"});
  });

const createProduct  = catchAsync(async (req, res) => {
    const product = await adminService.createProduct(req.body);
    res.status(httpStatus.CREATED).send({ product });
  });

const getProducts  = catchAsync(async (req, res) => {
    const product = await adminService.getProducts(req.query);
    res.status(httpStatus.OK).send({ product });
  });

const updateProduct = catchAsync(async (req, res) => {
    const product = await adminService.updateProduct(req.params.id, req.body);
    res.status(httpStatus.OK).send({ product });
  });

const deleteProduct = catchAsync(async (req, res) => {
    const product = await adminService.deleteProduct(req.params.id);
    res.status(httpStatus.OK).send({ product});
  });

// const getProductsById = catchAsync(async (req, res) => {
//     const product = await adminService.getProductsById(req.params.id);
//     res.status(httpStatus.OK).send({ product });
//   });

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { color } = req.query; // Optional color query param
    const product = await adminService.getProductsById(id, color);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await adminService.getProductsByCategory(categoryId);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRelatedProduct = catchAsync(async (req, res) => {
  const {productId} = req.params;
  const {product, relatedProducts} = await adminService.getRelatedProduct(productId);
  res.status(httpStatus.OK).send({ product, relatedProducts });
});

const getFeaturedProducts = catchAsync(async (req, res) => {
  const products = await adminService.getFeaturedProducts(); 
  res.status(httpStatus.OK).send({
      success: true,
      message: 'Featured products fetched successfully',
      data: products
  });
});

const addAttribute = catchAsync(async (req, res) => {
  const attribute = await adminService.createAttribute(req.body);
  res.status(httpStatus.CREATED).send({ attribute });
});

const getAttributes = catchAsync(async (req, res) => {
  const attribute = await adminService.getAttributes(req.body);
  res.status(httpStatus.OK).send({ attribute });
})

const updateAttribute = catchAsync(async (req, res) => {
  const attribute = await adminService.updateAttribute(req.params.id, req.body);
  res.status(httpStatus.OK).send({ attribute });
});

const deleteAttribute = catchAsync(async (req, res) => {
  const attribute = await adminService.deleteAttribute(req.params.id);
  res.status(httpStatus.OK).send({ attribute });
});

const deleteFAQ = catchAsync(async (req, res) => {
  const {question} = req.body;
  const attribute = await adminService.deleteFAQ(req.params.id,question);
  res.status(httpStatus.OK).send({ attribute });
});

const getOrderList = catchAsync(async (req, res) => {
  const {status} = req.query
  const orderList = await adminService.getOrderList(status);
  res.status(httpStatus.OK).send({ orderList });
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await adminService.getOrderById(req.params.id);
  res.status(httpStatus.OK).send({ order });
})

const addShippingStatus = catchAsync(async (req, res) => {
  const statusData = await adminService.createShippingStatus(req.body);
  res.status(httpStatus.CREATED).send({ statusData });
});

const getShippingStatus = catchAsync(async (req, res) => {
  const statusData = await adminService.getShippingStatus(req.body);
  res.status(httpStatus.OK).send({ statusData });
})

const updateShippingStatus = catchAsync(async (req, res) => {
  const statusData = await adminService.updateShippingStatus(req.params.id, req.body);
  res.status(httpStatus.OK).send({ statusData });
});

const deleteShippingStatus = catchAsync(async (req, res) => {
  const statusData = await adminService.deleteShippingStatus(req.params.id);
  res.status(httpStatus.OK).send({ statusData });
});

const addOrderTracking = catchAsync(async (req, res) => {
  const trackingData = await adminService.createOrderTacking(req.params.id,req.body.status);
  res.status(httpStatus.CREATED).send({ trackingData });
});

const getOrderTracking = catchAsync(async (req, res) => {
  const trackingData = await adminService.getOrderTracking(req.body);
  res.status(httpStatus.OK).send({ trackingData });
})

const updateOrderTracking = catchAsync(async (req, res) => {
  const trackingData = await adminService.updateOrderTracking(req.params.id, req.body);
  res.status(httpStatus.OK).send({ trackingData });
});

const deleteOrderTracking = catchAsync(async (req, res) => {
  const trackingData = await adminService.deleteOrderTracking(req.params.id);
  res.status(httpStatus.OK).send({ trackingData });
});


const createWalletAmount = catchAsync(async (req, res) => {
  const amountData = await adminService.createWalletAmount(req.body);
  res.status(httpStatus.CREATED).send({ amountData });
});

const getWalletAmount = catchAsync(async (req, res) => {
  const amountData = await adminService.getWalletAmount(req.body);
  res.status(httpStatus.OK).send({ amountData });
});

const updateWalletAmount = catchAsync(async (req, res) => {
  const amountData = await adminService.updateWalletAmount(req.params.id, req.body);
  res.status(httpStatus.OK).send({ amountData });
});

const deleteWalletAmount = catchAsync(async (req, res) => {
  const amountData = await adminService.deleteWalletAmount(req.params.id);
  res.status(httpStatus.OK).send({ amountData });
});

const createTag  = catchAsync(async (req, res) => {
  const brand = await adminService.createTag(req.body);
  res.status(httpStatus.CREATED).send({ brand });
});

const getTag  = catchAsync(async (req, res) => {
  const brand = await adminService.getTag(req.body);
  res.status(httpStatus.OK).send({ brand });
});

const updateTag = catchAsync(async (req, res) => {
  const brand = await adminService.updateTag(req.params.id, req.body);
  res.status(httpStatus.OK).send({ brand });
});

const deleteTag = catchAsync(async (req, res) => {
  const brand = await adminService.deleteTag(req.params.id);
  res.status(httpStatus.OK).send({ brand });
});

const createCoupon  = catchAsync(async (req, res) => {
  const coupon = await adminService.createCoupon(req.body);
  res.status(httpStatus.CREATED).send({ coupon });
});

const getCoupon  = catchAsync(async (req, res) => {
  const coupon = await adminService.getCoupon(req.body);
  res.status(httpStatus.OK).send({ coupon });
});

const getCouponById  = catchAsync(async (req, res) => {
  const coupon = await adminService.getCouponById(req.params.id);
  res.status(httpStatus.OK).send({ coupon });
});

const updateCoupon = catchAsync(async (req, res) => {
  const coupon = await adminService.updateCoupon(req.params.id, req.body);
  res.status(httpStatus.OK).send({ coupon });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const coupon = await adminService.deleteCoupon(req.params.id);
  res.status(httpStatus.OK).send({ coupon });
});

const addProductStatus = catchAsync(async (req, res) => {
  const statusData = await adminService.createProductStatus(req.body);
  res.status(httpStatus.CREATED).send({ statusData });
});

const getProductStatus = catchAsync(async (req, res) => {
  const statusData = await adminService.getProductStatus(req.body);
  res.status(httpStatus.OK).send({ statusData });
})

const updateProductStatus = catchAsync(async (req, res) => {
  const statusData = await adminService.updateProductStatus(req.params.id, req.body);
  res.status(httpStatus.OK).send({ statusData });
});

const deleteProductStatus = catchAsync(async (req, res) => {
  const statusData = await adminService.deleteProductStatus(req.params.id);
  res.status(httpStatus.OK).send({ statusData });
});

const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    console.log('Received Order ID:', orderId); 

    const updatedOrder =  adminService.updatePaymentStatusService(orderId, paymentStatus);

    res.status(200).json({
      success: true,
      message: `Payment status updated to ${paymentStatus}.`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error.',
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {

    console.log('req.body', req.body)
    const { orderId } = req.params;
    const { orderStatus, courierName, courierNumber } = req.body;

    const order = await RotexOrderSummary.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = orderStatus;

    if (courierName) order.courierName = courierName;
    if (courierNumber) order.courierNumber = courierNumber;

    console.log('courierName', courierName);
    console.log('courierNumber', courierNumber);

    await order.save();

    return res.status(200).json({ message: "Order updated successfully", order });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const addAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.createAboutUsPage(req.body);
  res.status(httpStatus.CREATED).send({ AboutUs });
});

const getAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getAboutUsPage(req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});
const getAboutUsById = catchAsync(async (req, res) => {
  const AboutUs = await adminService.getAboutUsById(req.params.id);
  res.status(httpStatus.OK).send({ AboutUs });
});

const updateAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.updateAboutUsPage(req.params.id, req.body);
  res.status(httpStatus.OK).send({ AboutUs });
});

const deleteAboutUsPage = catchAsync(async (req, res) => {
  const AboutUs = await adminService.deleteAboutUsPage(req.params.id);
  res.status(httpStatus.OK).send({ AboutUs });
});


const addBlog = catchAsync(async (req, res) => {
  const blog = await adminService.createBlog(req.body);
  res.status(httpStatus.CREATED).send({ blog });
});

const getBlogByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const blog = await adminService.getBlogByTitle(title);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ data: blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBlog = catchAsync(async (req, res) => {
  const blog = await adminService.getBlog(req.body);
  res.status(httpStatus.OK).send({ blog });
});

const updateBlog = catchAsync(async (req, res) => {
  const blog = await adminService.updateBlog(req.params.id, req.body);
  res.status(httpStatus.OK).send({ blog });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blog = await adminService.deleteBlog(req.params.id);
  res.status(httpStatus.OK).send({ blog });
});

const createBlogContains = catchAsync(async (req, res) => {
  console.log('req.body', req.body)
  const blog = await adminService.createBlogContains(req.body);
  res.status(httpStatus.CREATED).send({ blog });
});

const getAllBlogContains = catchAsync(async (req, res) => {
  const blog = await adminService.getAllBlogContains(req.body);
  res.status(httpStatus.OK).send({ blog });
});

const getBlogContainsBYBlogId = catchAsync(async (req, res) => {
  const blog = await adminService.getBlogContainsBYBlogId(req.params.id);
  res.status(httpStatus.OK).send({ blog });
});

const getBlogContainsByTitle = catchAsync(async (req, res) => {
   const { title } = req.query;
    console.log('title', title)
  if (!title) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: "Title is required" });
  }

  const blogDetails = await adminService.getBlogContainsByTitle(title);
  console.log('blogDetails', blogDetails)
  if (!blogDetails) {
    return res.status(httpStatus.NOT_FOUND).json({ error: "Blog details not found" });
  }

  res.status(httpStatus.OK).json(blogDetails);
});
const updateBlogContains = catchAsync(async (req, res) => {
  const blog = await adminService.updateBlog(req.params.id, req.body);
  res.status(httpStatus.OK).send({ blog });
});

const deleteBlogContains = catchAsync(async (req, res) => {
  const blog = await adminService.deleteBlogContains(req.params.id);
  res.status(httpStatus.OK).send({ blog });
});


const addBanner = catchAsync(async (req, res) => {
  const blog = await adminService.createBanner(req.body);
  res.status(httpStatus.CREATED).send({ blog });
});

const getBanner = catchAsync(async (req, res) => {
  const blog = await adminService.getBanner(req.body);
  res.status(httpStatus.OK).send({ blog });
});

const updateBanner = catchAsync(async (req, res) => {
  const blog = await adminService.updateBanner(req.params.id, req.body);
  res.status(httpStatus.OK).send({ blog });
});

const deleteBanner = catchAsync(async (req, res) => {
  const blog = await adminService.deleteBanner(req.params.id);
  res.status(httpStatus.OK).send({ blog });
});

const uploadWarranty = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const results = await adminService.uploadWarrantyData(data);

    res.status(200).json({ message: 'Warranty data uploaded successfully', results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const validateWarranty = async (req, res) => {
  try {
    const { warrantyNumbers } = req.body;

    if (!warrantyNumbers || !Array.isArray(warrantyNumbers) || warrantyNumbers.length === 0) {
      return res.status(400).json({ error: 'Warranty numbers are required and must be an array' });
    }

    const { matched, invalid } = await adminService.validateWarrantyNumbers(warrantyNumbers);

    res.status(200).json({
      status: 'success',
      matched,
      invalid,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const addMultipleWarrantyNumbers = async (req, res) => {
  try {
    const warrantyData = req.body;

    if (!Array.isArray(warrantyData) || warrantyData.length === 0) {
      return res.status(400).json({ error: 'Invalid data format. Provide an array of warranty data.' });
    }

    const results = await adminService.addWarrantyNumbersForProducts(warrantyData);

    res.status(201).json({
      message: 'Warranty numbers added successfully for products',
      results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateShippingStatusService = async (req, res) => {
  const { orderId } = req.params;
  const { shippingStatus } = req.body;

  try {
      if (!shippingStatus) {
          return res.status(400).json({ error: 'Shipping status is required.' });
      }

      const updatedOrder = await adminService.updateShippingStatusService(orderId, shippingStatus);

      if (!updatedOrder) {
          return res.status(404).json({ error: 'Order not found.' });
      }

      return res.status(200).json({
          message: 'Shipping status updated successfully.',
          order: updatedOrder,
      });
  } catch (error) {
      console.error('Error updating shipping status:', error);
      return res.status(500).json({ error: 'Internal server error.' });
  }
};

const getOrdersByShippingStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Shipping status name is required.',
      });
    }

    const orders = await adminService.getOrdersByShippingStatusService(status);

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No orders found for shipping status "${status}".`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Orders fetched successfully for shipping status "${status}".`,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders by shipping status:', error.message);
    return res.status(500).json({
      success: false,
      message: `Error fetching orders by shipping status: ${error.message}`,
    });
  }
};
const getContacts = async (req, res) => {
  try {
    const contacts = await adminService.getAllContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


const updateOrderSummaryByIdHandler = async (req, res) => {
  try {
    const order = await adminService.updateOrderSummaryById(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Order updated successfully', data: order });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const deleteOrderSummaryById = async (req, res) => {
  try {
    const order = await adminService.deleteOrderSummaryById(req.params.id);
    res.status(200).json({ success: true, message: 'Order deleted successfully', data: order });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await adminService.getAllComplaints();
        res.status(200).json({ complaints });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getComplaintById = async (req, res) => {
    try {
        const complaint = await adminService.getComplaintById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateComplaint = async (req, res) => {
    try {
        const complaint = await adminService.updateComplaint(req.params.id, req.body);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteComplaint = async (req, res) => {
    try {
        const complaint = await adminService.deleteComplaint(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllQuickFix = async (req, res) => {
  try {
      const data = await adminService.getAllQuickFix();
      res.status(200).json({data});
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const getQuickFixById = async (req, res) => {
  try {
      const data = await adminService.getQuickFixById(req.params.id);
      if (!data) {
          return res.status(404).json({ message: 'data not found' });
      }
      res.status(200).json({data});
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const updateQuickFix = async (req, res) => {
  try {
      const data = await adminService.updateQuickFix(req.params.id, req.body);
      if (!data) {
          return res.status(404).json({ message: 'data not found' });
      }
      res.status(200).json({data});
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

const deleteQuickFix = async (req, res) => {
  try {
      const Data = await adminService.deleteQuickFix(req.params.id);
      if (!Data) {
          return res.status(404).json({ message: 'Data not found' });
      }
      res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const createQuickFix = async (req, res) => {
  try {
      const quickFix = await adminService.createQuickFix(req.body);
      res.status(201).json({quickFix});
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

 const getAllWarranties = async (req, res) => {
  try {
    const warranties = await adminService.getAllWarranties();
    res.status(200).json({ warranties });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const deleteContactUs = async (req, res) => {
  try {
      const Data = await adminService.deleteContactUs(req.params.id);
      if (!Data) {
          return res.status(404).json({ message: 'Data not found' });
      }
      res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const sendOrderConfirmation = async (req, res) => {
  try {
      const { orderId } = req.body;

      if (!orderId) {
          return res.status(400).json({ success: false, message: "Order ID is required!" });
      }

      const response = await adminService.sendOrderConfirmationWhatsApp(orderId);
      res.status(response.success ? 200 : 500).json(response);
  } catch (error) {
      console.error("Error in sendOrderConfirmation Controller:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const sendOfferNotification = async (req, res) => {
  try {
      const { userId, offerDetails } = req.body;

      if (!userId || !offerDetails) {
          return res.status(400).json({ success: false, message: "User ID and offer details are required!" });
      }

      const response = await adminService.sendOfferNotificationWhatsApp(userId, offerDetails);
      res.status(response.success ? 200 : 500).json(response);
  } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const sendBulkOfferNotification = async (req, res) => {
  try {
      const { offerDetails } = req.body;

      if (!offerDetails) {
          return res.status(400).json({ success: false, message: "Offer details are required!" });
      }

      const response = await adminService.sendBulkOfferNotificationWhatsApp(offerDetails);
      res.status(response.success ? 200 : 500).json(response);
  } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const summary = await adminService.getDashboardData();
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    console.error("Error fetching order summary:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const notifyOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await RotexOrderSummary.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const phone = order.customerDetails.phone;
    const orderStatus = order.orderStatus;
    const trackingNumber = order.courierNumber || 'N/A';
    const courierName = order.courierName || 'N/A';
    const finalAmount = order.finalAmount;

    const result = await adminService.sendOrderUpdateWhatsApp({
      phone,
      orderStatus,
      trackingNumber,
      courierName,
      finalAmount,
    });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'WhatsApp notification sent',
        data: result.data,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

const getCartByUserId = catchAsync(async (req, res) => {
    const data = await adminService.getCartByUserId(req.params.userId);
    sendSuccessResponse(res, 'get',  data );
  });


  const getUserById = async (req, res, next) => {
    try {
      const { userId } = req.params;
  
      const user = await adminService.getUserById(userId);
  
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


export default {createCategory,getCategories,updateCategory,deleteCategory,createSubCategory,getSubCategories,getSubCategoryByCategoryId,updateSubCategory,deleteSubCategory,
  createProduct,getProducts,updateProduct,deleteProduct,getProductsById, getRelatedProduct, getFeaturedProducts, createProblem,updateProblem,deleteProblem,getProblem,
  createLabel,deleteLabel,updateLabel,getLabels, addAttribute, getAttributes, updateAttribute, deleteAttribute,deleteBrand,updateBrand,getBrand,createBrand,deleteFAQ,getFaqs,getOrderList,
getOrderById, addShippingStatus, getShippingStatus, updateShippingStatus, deleteShippingStatus, addOrderTracking, getOrderTracking, updateOrderTracking, deleteOrderTracking,
createWalletAmount, getWalletAmount, updateWalletAmount, deleteWalletAmount, createTag, getTag, updateTag, deleteTag, createCoupon, getCoupon, getCouponById, updateCoupon, deleteCoupon,
addProductStatus, getProductStatus, updateProductStatus, deleteProductStatus, updatePaymentStatus, addAboutUsPage, getAboutUsPage, getAboutUsById, updateAboutUsPage, deleteAboutUsPage,
addBlog, getBlog, updateBlog, deleteBlog, getBlogByTitle, addBanner, getBanner, updateBanner, deleteBanner, uploadWarranty, validateWarranty, addMultipleWarrantyNumbers, updateOrderStatus, updateShippingStatusService,
getContacts,getOrdersByShippingStatus, updateOrderSummaryByIdHandler, getAllWarranties, deleteOrderSummaryById, deleteContactUs, sendOrderConfirmation, sendOfferNotification, sendBulkOfferNotification,
 getComplaintById, getAllComplaints, updateComplaint, deleteComplaint, getAllQuickFix, getQuickFixById, updateQuickFix, deleteQuickFix, createQuickFix, getCartByUserId,
createBlogContains, getAllBlogContains, getBlogContainsBYBlogId, getBlogContainsByTitle, updateBlogContains, deleteBlogContains,getProductsByCategory, getDashboardData, notifyOrderStatus, getUserById,
}

