import AssignTask from "../models/assignTask.model.js";
import { RameshwarUser } from "../models/user.model.js";
import adminService from "../services/admin.service.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import mqttClient from "../config/mqttClient.js";

const createProduct = catchAsync(async (req, res) => {
  console.log("req.body", req.body);
  const product = await adminService.createProduct(req.body);
  res.status(httpStatus.CREATED).send({ product });
});

const getProducts = catchAsync(async (req, res) => {
  const { companyId } = req.query;

  if (!companyId) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'companyId is required' });
  }

  const products = await adminService.getProducts(companyId);
  res.status(httpStatus.OK).send({ products });
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await adminService.updateProduct(req.params.id, req.body);
  res.status(httpStatus.OK).send({ product });
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await adminService.deleteProduct(req.params.id);
  res.status(httpStatus.OK).send({ product });
});

const getProductsById = catchAsync(async (req, res) => {
  const product = await adminService.getProductsById(req.params.id);
  res.status(httpStatus.OK).send({ product });
});

const createCategory = catchAsync(async (req, res) => {
  console.log('req.body', req.body);
  const category = await adminService.createCategory(req.body);
  res.status(httpStatus.CREATED).send({ category });
});

const handleGetCompanyCategories = async (req, res) => {
  try {
    console.log("companyId from req.query:", req.query);
    const { companyId } = req.query;
    const categories = await adminService.getCategoriesByCompany(companyId);
    console.log('categories', categories)
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
  }
};

const getAllCategories = catchAsync(async (req, res) => {
  const category = await adminService.getCategories(req.body);
  res.status(httpStatus.OK).send({ category });
});

const updateCategory = catchAsync(async (req, res) => {
  console.log("req.body", req.body);
  const category = await adminService.updateCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await adminService.deleteCategory(req.params.id);
  res.status(httpStatus.OK).send({ category });
});

const createLocalCategory = catchAsync(async (req, res) => {
  const category = await adminService.createLocalCategory(req.body);
  res.status(httpStatus.CREATED).send({ category });
});

const getAllLocalCategories = catchAsync(async (req, res) => {
  const category = await adminService.getLocalCategories(req.body);
  res.status(httpStatus.OK).send({ category });
});

const updateLocalCategory = catchAsync(async (req, res) => {
  console.log("req.body", req.body);
  const category = await adminService.updateLocalCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const deleteLocalCategory = catchAsync(async (req, res) => {
  const category = await adminService.deleteLocalCategory(req.params.id);
  res.status(httpStatus.OK).send({ category });
});

const fetchCategoryByName = async (req, res) => {
      const { name } = req.params;
      const category = await adminService.getCategoryByName(name);
      res.status(httpStatus.OK).send({ data: category });
};


const getCategroyById = catchAsync(async (req, res) => {
  const category = await adminService.getCategroyById(req.params.id);
  res.status(httpStatus.OK).send({ category });
});

const getOrderList = catchAsync(async (req, res) => {
  const { status } = req.query
  const orderList = await adminService.getOrderList(status);
  res.status(httpStatus.OK).send({ orderList });
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await adminService.getOrderById(req.params.id);
  res.status(httpStatus.OK).send({ order });
})

const createGST = catchAsync(async (req, res) => {
  const data = await adminService.createGST(req.body);
  res.status(httpStatus.CREATED).send({ data });
});

const getGST = catchAsync(async (req, res) => {
  const statusData = await adminService.getGST(req.body);
  res.status(httpStatus.OK).send({ statusData });
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

const createInfo = catchAsync(async (req, res) => {
  const data = await adminService.createInfo(req.body);
  res.status(httpStatus.CREATED).send({ data });
});

const getInfo = catchAsync(async (req, res) => {
  const data = await adminService.getInfo(req.body);
  res.status(httpStatus.OK).send({ data });
});

const updateInfo = catchAsync(async (req, res) => {
  const data = await adminService.updateInfo(req.params.id, req.body);
  res.status(httpStatus.OK).send({ data });
});

const deleteInfo = catchAsync(async (req, res) => {
  const data = await adminService.deleteInfo(req.params.id);
  res.status(httpStatus.OK).send({ data });
});

const getCompanyById = async (req, res) => {
  try {
    const company = await adminService.getCompanyByIdService(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(httpStatus.OK).json({ company });
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error fetching company" });
  }
};


const getCompanyInfoByUserId = async (req, res) => {
    const { userId } = req.params;
    const companyInfo = await adminService.getCompanyInfoByUserId(userId);
    res.status(httpStatus.OK).send({ companyInfo });
  };

const createItemDetails = catchAsync(async (req, res) => {
  const ItemDetails = await adminService.createItemDetails(req.body);
  res.status(httpStatus.CREATED).send({ ItemDetails });
});

const getItemDetails = catchAsync(async (req, res) => {
  const ItemDetails = await adminService.getItemDetails(req.body);
  res.status(httpStatus.OK).send({ ItemDetails });
});

const updateItemDetails = catchAsync(async (req, res) => {
  const ItemDetails = await adminService.updateItemDetails(req.params.id, req.body);
  res.status(httpStatus.OK).send({ ItemDetails });
});

const deleteItemDetails = catchAsync(async (req, res) => {
  const ItemDetails = await adminService.deleteItemDetails(req.params.id);
  res.status(httpStatus.OK).send({ ItemDetails });
});

const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    console.log('Received Order ID:', orderId);

    const updatedOrder = adminService.updatePaymentStatusService(orderId, paymentStatus);

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
  const { orderId } = req.params; 
  const { orderStatus } = req.body;  

  try {
    if (!orderStatus) {
      return res.status(400).json({ error: 'Order status is required.' });
    }

    const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ error: `Invalid order status. Valid statuses are: ${validStatuses.join(', ')}` });
    }

    const updatedOrder = await adminService.updateOrderStatusService(orderId, orderStatus);

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    return res.status(200).json({
      message: 'Order status updated successfully.',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

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

const createVendor = catchAsync(async (req, res) => {
  const customer = await adminService.createVendor(req.body);
  res.status(httpStatus.CREATED).send({ customer });
});

const getVendor = catchAsync(async (req, res) => {
  const customer = await adminService.getVendor(req.body);
  res.status(httpStatus.OK).send({ customer });
});

const getVendorById = catchAsync(async (req, res) => {
  const customer = await adminService.getVendorById(req.params.id, req.body);
  res.status(httpStatus.OK).send({ customer });
});

const getVendorByName = async (req, res) => {
  try {
    const { name } = req.params;
    const customer = await adminService.getVendorByName(name);

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    if (error.message === "RameshwarVendor not found") {
      return res.status(404).json({ success: false, error: error.message });
    }
    console.error("Error fetching customer by name:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const updateVendor = catchAsync(async (req, res) => {
  const customer = await adminService.updateVendor(req.params.id, req.body);
  res.status(httpStatus.OK).send({ customer });
});

const deleteVendor = catchAsync(async (req, res) => {
  const customer = await adminService.deleteVendor(req.params.id);
  res.status(httpStatus.OK).send({ customer, Message: "Delete SuccessFully...!" });
});


const createBill = catchAsync(async (req, res) => {
  const bill = await adminService.createBill(req.body);
  res.status(httpStatus.CREATED).send({ bill });
});

const getAllBills = catchAsync(async (req, res) => {
  const bill = await adminService.getAllBills(req.body);
  res.status(httpStatus.OK).send({ bill });
});

const getBillById = catchAsync(async (req, res) => {
  const bill = await adminService.getBillById(req.params.id, req.body);
  res.status(httpStatus.OK).send({ bill });
});

const getAllBillById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { type } = req.query; 

  if (!type) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "Invoice type is required!" });
  }

  let bill;

  if (type === "purchase") {
      bill = await adminService.getPurchaseBillById(id);
  } else if (type === "sale") {
      bill = await adminService.getBillById(id);
  } else {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid invoice type!" });
  }

  if (!bill) {
      return res.status(httpStatus.NOT_FOUND).send({ message: "Invoice not found!" });
  }

  res.status(httpStatus.OK).send({ bill });
});



const updateBill = catchAsync(async (req, res) => {
  const bill = await adminService.updateBill(req.params.id, req.body);
  res.status(httpStatus.OK).send({ bill });
});

const deleteBill = catchAsync(async (req, res) => {
  const bill = await adminService.deleteBill(req.params.id);
  res.status(httpStatus.OK).send({ bill, Message: "Delete SuccessFully...!" });
});

const downloadBillsCSV = async (req, res) => {
  try {
    const csvData = await adminService.downloadBillsCSV();

    res.header('Content-Type', 'text/csv');
    res.attachment('bills.csv');
    return res.send(csvData);
  } catch (error) {
    console.error('Error downloading bills:', error);
    return res.status(500).json({ error: 'Server error while downloading bills' });
  }
};

const downloadBillsPDF = async (req, res) => {
  try {
    const pdfData = await adminService.downloadBillsPDF(); 

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=bills.pdf');

    return res.send(pdfData);
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ error: 'Server error while downloading PDF' });
  }
};


const createPurchaseBill = catchAsync(async (req, res) => {
  try {
    const bill = await adminService.createPurchaseBill(req.body);
    res.status(httpStatus.CREATED).send({ bill });
  } catch (error) {
    console.error("Error creating purchase bill:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

// const getAllPurchaseBills = catchAsync(async (req, res) => {
//   const bill = await adminService.getAllPurchaseBills(req.body);
//   res.status(httpStatus.OK).send({ bill });
// });

const getPurchaseBillById = catchAsync(async (req, res) => {
  const bill = await adminService.getPurchaseBillById(req.params.id, req.body);
  res.status(httpStatus.OK).send({ bill });
});


const updatePurchaseBill = catchAsync(async (req, res) => {
  const bill = await adminService.updatePurchaseBill(req.params.id, req.body);
  res.status(httpStatus.OK).send({ bill });
});

const deletePurchaseBill = catchAsync(async (req, res) => {
  const bill = await adminService.deletePurchaseBill(req.params.id);
  res.status(httpStatus.OK).send({ bill, Message: "Delete SuccessFully...!" });
});

const downloadPurchaseBillsCSV = async (req, res) => {
  try {
    const csvData = await adminService.downloadPurchaseBillsCSV();

    res.header('Content-Type', 'text/csv');
    res.attachment('bills.csv');
    return res.send(csvData);
  } catch (error) {
    console.error('Error downloading bills:', error);
    return res.status(500).json({ error: 'Server error while downloading bills' });
  }
};

const downloadPurchaseBillsPDF = async (req, res) => {
  try {
    const pdfData = await adminService.downloadPurchaseBillsPDF(); 

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=bills.pdf');

    return res.send(pdfData);
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ error: 'Server error while downloading PDF' });
  }
};


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

const scanBarcode = async (req, res) => {
  const { barcode } = req.params;

  try {
    if (!barcode) {
      return res.status(400).json({ message: 'Barcode is required' });
    }

    const product = await adminService.decodeBarcode(barcode);

    return res.status(200).json({
      message: 'Product fetched successfully',
      product,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message || 'Product not found' });
  }
};


const createExpeneCategroy = catchAsync(async (req, res) => {
  const expenseCategory = await adminService.createExpeneCategroy(req.body);
  res.status(httpStatus.CREATED).send({ expenseCategory });
});

const getAllExpenseCategory = catchAsync(async (req, res) => {
  const expenseCategory = await adminService.getAllExpenseCategory(req.body);
  res.status(httpStatus.OK).send({ expenseCategory });
});
const getExpenseCategoryById = catchAsync(async (req, res) => {
  const expenseCategory = await adminService.getExpenseCategoryById(req.params.id);
  res.status(httpStatus.OK).send({ expenseCategory });
});

const updateExpenseCategory = catchAsync(async (req, res) => {
  const expenseCategory = await adminService.updateExpenseCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ expenseCategory });
});

const deleteExpenseCategory = catchAsync(async (req, res) => {
  const expenseCategory = await adminService.deleteExpenseCategory(req.params.id);
  res.status(httpStatus.OK).send({ expenseCategory });
});

const createExpense = catchAsync(async (req, res) => {
  const expense = await adminService.createExpense(req.body);
  res.status(httpStatus.CREATED).send({ expense });
});

const getAllExpense = catchAsync(async (req, res) => {
  const expense = await adminService.getAllExpense(req.body);
  res.status(httpStatus.OK).send({ expense });
});

const getExpenseByCategoryId = catchAsync(async (req, res) => {
  const expense = await adminService.getExpenseByCategoryId(req.params.id, req.body);
  res.status(httpStatus.OK).send({ expense });
});

const updateExpense = catchAsync(async (req, res) => {
  const expense = await adminService.updateExpense(req.params.id, req.body);
  res.status(httpStatus.OK).send({ expense });
});

const deleteExpense = catchAsync(async (req, res) => {
  const expense = await adminService.deleteExpense(req.params.id);
  res.status(httpStatus.OK).send({ expense, Message: "Delete SuccessFully...!" });
});

const getExpenseById = catchAsync(async (req, res) => {
  const expense = await adminService.getExpenseById(req.params.id);
  res.status(httpStatus.OK).send({ expense });
});

const createRole = catchAsync(async (req, res) => {
  const role = await adminService.createRole(req.body);
  res.status(httpStatus.CREATED).send({ role });
});

const getAllRoles = catchAsync(async (req, res) => {
  const role = await adminService.getAllRoles(req.body);
  res.status(httpStatus.OK).send({ role });
});
const getRoleById = catchAsync(async (req, res) => {
  const role = await adminService.getRoleById(req.params.id);
  res.status(httpStatus.OK).send({ role });
});

const updateRole = catchAsync(async (req, res) => {
  const role = await adminService.updateRole(req.params.id, req.body);
  res.status(httpStatus.OK).send({ role });
});

const deleteRole = catchAsync(async (req, res) => {
  const role = await adminService.deleteRole(req.params.id);
  res.status(httpStatus.OK).send({ role });
});

const createRoleUser = catchAsync(async (req, res) => {
  const roleUser = await adminService.createRoleUser(req.body);
  res.status(httpStatus.CREATED).send({ roleUser });
});

const getAllRoleUsers = catchAsync(async (req, res) => {
  const roleUser = await adminService.getAllRoleUsers(req.body);
  res.status(httpStatus.OK).send({ roleUser });
});
const getRoleUserById = catchAsync(async (req, res) => {
  const roleUser = await adminService.getRoleUserById(req.params.id);
  res.status(httpStatus.OK).send({ roleUser });
});

const updateRoleUser = catchAsync(async (req, res) => {
  const roleUser = await adminService.updateRoleUser(req.params.id, req.body);
  res.status(httpStatus.OK).send({ roleUser });
});

const deleteRoleUser = catchAsync(async (req, res) => {
  const roleUser = await adminService.deleteRoleUser(req.params.id);
  res.status(httpStatus.OK).send({ roleUser });
});

const fetchAllBarcodes = async (req, res) => {
  try {
      const barcodes = await adminService.getAllBarcodes();
      res.status(200).json({ success: true, barcodes });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

const fetchDashboardData = async (req, res) => {
  try {
    const dashboardData = await adminService.getDashboardData();
    return res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Error in Dashboard Controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


const getDaybookReport = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;
    console.log("startDate", startDate);
    console.log("endDate", endDate);

    const daybookData = await adminService.getDaybookData(startDate, endDate);

    return res.status(200).json({
      success: true,
      message: "Daybook data retrieved successfully",
      data: daybookData,
    });

  } catch (error) {
    console.error("Error fetching daybook data:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBarcodeImage = async (req, res) => {
  try {
    const { barcode } = req.params;

    if (!barcode) {
      return res.status(400).json({ message: "Barcode is required" });
    }

    const barcodeData = await adminService.getBarcodeImage(barcode);

    if (!barcodeData) {
      return res.status(404).json({ message: "Barcode not found" });
    }

    return res.status(200).json({
      barcode: barcodeData.barCode,
      barcodeImage: barcodeData.barcodeImage || "",
      toWeight: barcodeData.toWeight || "0",
      netWeight: barcodeData.netWeight || "0",
      fineWeight: barcodeData.fineWeight || "0",
      groupId: barcodeData.groupId || null,
      gst: barcodeData.gst || 0,
      labour: barcodeData.labour || "0",
      extraRate: barcodeData.extraRate || 0,
      totalPrice: barcodeData.totalPrice || 0,
      finalPrice: barcodeData.finalPrice || 0,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handleBulkDelete = async (req, res) => {
  try {
    const { productIds } = req.body;
    const result = await adminService.bulkDeleteProducts(productIds);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting products:", error);
    res.status(400).json({ message: error.message });
  }
}

const handleBulkPrint = async (req, res) => {
  try {
    const { productIds } = req.body;
    const products = await adminService.bulkPrintProducts(productIds);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products for bulk print:", error);
    res.status(400).json({ message: error.message });
  }
};

const createPoll = catchAsync(async (req, res) => {
  const poll = await adminService.createPoll(req.body);
  res.status(httpStatus.CREATED).send({ success: true, poll });
});

const getPolls = catchAsync(async (req, res) => {
  const polls = await adminService.getPolls();
  res.status(httpStatus.OK).send({ success: true, polls });
});

const getUsage = catchAsync(async (req, res) => {
  const usage = await adminService.calculateUsage(req.params.id);
  res.status(httpStatus.OK).send({ success: true, usage });
});

const createPGVCLPoll = catchAsync(async (req, res) => {
  const poll = await adminService.createPGVCLPoll(req.body);
  res.status(httpStatus.CREATED).send({ success: true, poll });
});

const getPGVCLPolls = catchAsync(async (req, res) => {
  const polls = await adminService.getPGVCLPolls();
  res.status(httpStatus.OK).send({ success: true, polls });
});

const getUsagePGVCL = catchAsync(async (req, res) => {
  const usage = await adminService.calculateUsagePGVCL(req.params.id);
  res.status(httpStatus.OK).send({ success: true, usage });
});


const createChallan = catchAsync(async (req, res) => {
  const challan = await adminService.createChallan(req.body);
  res.status(httpStatus.CREATED).send({ challan });
});

const getAllChallans = catchAsync(async (req, res) => {
  const challan = await adminService.getAllChallans(req.body);
  res.status(httpStatus.OK).send({ challan });
});
const getChallanById = catchAsync(async (req, res) => {
  const challan = await adminService.getChallanById(req.params.id);
  res.status(httpStatus.OK).send({ challan });
});

const updateChallan = catchAsync(async (req, res) => {
  const challan = await adminService.updateChallan(req.params.id, req.body);
  res.status(httpStatus.OK).send({ challan });
});

const deleteChallan = catchAsync(async (req, res) => {
  const challan = await adminService.deleteChallan(req.params.id);
  res.status(httpStatus.OK).send({ challan });
});

const createCustomer = catchAsync(async (req, res) => {
  const customer = await adminService.createCustomer(req.body);
  res.status(httpStatus.CREATED).send({ customer });
});

const getCustomers = catchAsync(async (req, res) => {
  const customer = await adminService.getCustomers(req.body);
  res.status(httpStatus.OK).send({ customer });
});
const getCustomerById = catchAsync(async (req, res) => {
  const customer = await adminService.getCustomerById(req.params.id);
  res.status(httpStatus.OK).send({ customer });
});

const updateCustomer = catchAsync(async (req, res) => {
  const customer = await adminService.updateCustomer(req.params.id, req.body);
  res.status(httpStatus.OK).send({ customer });
});

const deleteCustomer = catchAsync(async (req, res) => {
  const customer = await adminService.deleteCustomer(req.params.id);
  res.status(httpStatus.OK).send({ customer });
});

const getCustomerByName = async (req, res) => {
  try {
    const { name } = req.params;
    const customer = await adminService.getCustomerByName(name);

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    if (error.message === "Customer not found") {
      return res.status(404).json({ success: false, error: error.message });
    }
    console.error("Error fetching customer by name:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getAllPurchaseBills = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getAllPurchaseBills();
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByCreateDate = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByCreateDate(req.params.createDate, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByBillDate = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByBillDate(req.params.billDate, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByProductName = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByProductName(req.params.productName, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByHSNSAC = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByHSNSAC(req.params.hsnSac, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByQuantity = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByQuantity(req.params.quantity, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByRate = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByRate(req.params.rate, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByPer = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByPer(req.params.per, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByDiscount = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByDiscount(req.params.discount, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByTotalAmount = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByTotalAmount(req.params.finalTotal, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByPaymentType = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByPaymentType(req.params.paymentStatus, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByActualBillType = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByBillType("actual");
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getPurchaseBillsByADPBillType = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getPurchaseBillsByBillType("adp");
  res.status(httpStatus.OK).send({ purchaseBills });
});
const getPurchaseBillsByVendorName = async (req, res) => {
  console.log("req.params", req.params)
  const purchaseBills = await adminService.getPurchaseBillsByVendorName(req.params.vendorName, req.params.billType);
  res.status(httpStatus.OK).send({ purchaseBills });
};

const getAllSalesBills = catchAsync(async (req, res) => {
  const saleBills = await adminService.getAllSalesBills();
  res.status(httpStatus.OK).send({ saleBills });
});

const getSaleBillsByCreateDate = catchAsync(async (req, res) => {
  const saleBills = await adminService.getSaleBillsByCreateDate(req.params.createDate);
  res.status(httpStatus.OK).send({ saleBills });
});

const getSaleBillsByBillDate = catchAsync(async (req, res) => {
  const saleBills = await adminService.getSaleBillsByBillDate(req.params.billDate);
  res.status(httpStatus.OK).send({ saleBills });
});

const getSaleBillsByProductName = catchAsync(async (req, res) => {
  const saleBills = await adminService.getSaleBillsByProductName(req.params.productName);
  res.status(httpStatus.OK).send({ saleBills });
});

const getSaleBillsByHSNSAC = catchAsync(async (req, res) => {
  const saleBills = await adminService.getSaleBillsByHSNSAC(req.params.hsnCode);
  res.status(httpStatus.OK).send({ saleBills });
});

const getSaleBillsByQuantity = catchAsync(async (req, res) => {
  const saleBills = await adminService.getSaleBillsByQuantity(req.params.quantity);
  res.status(httpStatus.OK).send({ saleBills });
});

const getSaleBillsByRate = catchAsync(async (req, res) => {
  const saleBills = await adminService.getSaleBillsByRate(req.params.rate);
  res.status(httpStatus.OK).send({ saleBills });
});

const getSaleBillsByPer = catchAsync(async (req, res) => {
  const saleBills = await adminService.getSaleBillsByPer(req.params.per);
  res.status(httpStatus.OK).send({ saleBills });
});


const getSaleBillsByTotalAmount = catchAsync(async (req, res) => {
  const saleBills = await adminService.getSaleBillsByTotalAmount(req.params.finalTotal);
  res.status(httpStatus.OK).send({ saleBills });
});

const getSaleBillsByCustomerName = async (req, res) => {
  const saleBills = await adminService.getSaleBillsByCustomerName(req.params.customerName);
  res.status(httpStatus.OK).send({ saleBills });
};


const createLocalPurchaseBill = catchAsync(async (req, res) => {
  try {
    const bill = await adminService.createLocalPurchaseBill(req.body);

    res.status(httpStatus.CREATED).send({ bill });
  } catch (error) {
    console.error("Error creating purchase bill:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

// const getAllPurchaseBills = catchAsync(async (req, res) => {
//   const bill = await adminService.getAllPurchaseBills(req.body);
//   res.status(httpStatus.OK).send({ bill });
// });

const getLocalPurchaseBillById = catchAsync(async (req, res) => {
  const bill = await adminService.getLocalPurchaseBillById(req.params.id, req.body);
  res.status(httpStatus.OK).send({ bill });
});


const updateLocalPurchaseBill = catchAsync(async (req, res) => {
  const bill = await adminService.updateLocalPurchaseBill(req.params.id, req.body);
  res.status(httpStatus.OK).send({ bill });
});

const deleteLocalPurchaseBill = catchAsync(async (req, res) => {
  const bill = await adminService.deleteLocalPurchaseBill(req.params.id);
  res.status(httpStatus.OK).send({ bill, Message: "Delete SuccessFully...!" });
});

const downloadLocalPurchaseBillsCSV = async (req, res) => {
  try {
    const csvData = await adminService.downloadLocalPurchaseBillsCSV();

    res.header('Content-Type', 'text/csv');
    res.attachment('bills.csv');
    return res.send(csvData);
  } catch (error) {
    console.error('Error downloading bills:', error);
    return res.status(500).json({ error: 'Server error while downloading bills' });
  }
};

const downloadLocalPurchaseBillsPDF = async (req, res) => {
  try {
    const pdfData = await adminService.downloadLocalPurchaseBillsPDF(); 

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=bills.pdf');

    return res.send(pdfData);
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ error: 'Server error while downloading PDF' });
  }
};

const getAllLocalPurchaseBills = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getAllLocalPurchaseBills();
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getLocalPurchaseBillsByCreateDate = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getLocalPurchaseBillsByCreateDate(req.params.createDate);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getLocalPurchaseBillsByBillDate = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getLocalPurchaseBillsByBillDate(req.params.billDate);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getLocalPurchaseBillsByProductName = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getLocalPurchaseBillsByProductName(req.params.productName);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getLocalPurchaseBillsByQuantity = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getLocalPurchaseBillsByQuantity(req.params.quantity);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getLocalPurchaseBillsByRate = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getLocalPurchaseBillsByRate(req.params.rate);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getLocalPurchaseBillsByPer = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getLocalPurchaseBillsByPer(req.params.per);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getLocalPurchaseBillsByDiscount = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getLocalPurchaseBillsByDiscount(req.params.discount);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getLocalPurchaseBillsByTotalAmount = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getLocalPurchaseBillsByTotalAmount(req.params.finalTotal);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const getLocalPurchaseBillsByPaymentType = catchAsync(async (req, res) => {
  const purchaseBills = await adminService.getLocalPurchaseBillsByPaymentType(req.params.paymentStatus);
  res.status(httpStatus.OK).send({ purchaseBills });
});

const createBrokenPoll = catchAsync(async (req, res) => {
  const {
    poNumber,
    product,
    manufacturingDate,
    todayDate,
    brokenPollNumbers,
    companyName,
    brokenCount,
    totalPoll,
    infoId, 
  } = req.body;

  const brokenPoll = await adminService.createBrokenPoll({
    poNumber,
    product,
    manufacturingDate,
    todayDate,
    brokenPollNumbers,
    companyName,
    brokenCount,
    totalPoll,
    infoId,
  });

  res.status(httpStatus.CREATED).send({
    message: 'Broken poll created successfully',
    brokenPoll,
  });
});

const getAllBrokenPolls = catchAsync(async (req, res) => {
  const { infoId } = req.query;
  const brokenPolls = await adminService.getAllBrokenPolls(infoId);

  res.status(httpStatus.OK).send({ brokenPolls });
});

const getBrokenPollsByPollId = catchAsync(async (req, res) => {
  const { pollId } = req.params;
  const brokenPolls = await adminService.getBrokenPollsByPollId(pollId);
  res.status(httpStatus.OK).send({ brokenPolls });
});

 const deleteBrokenPoll = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleted = await adminService.deleteBrokenPoll(id);
  res.status(httpStatus.OK).send({ message: 'Deleted successfully', deleted });
});


const createPGVCLBrokenPoll = catchAsync(async (req, res) => {
  const {
    poNumber,
    product,
    brokenCount,
    manufacturingDate,
    todayDate,
    brokenPollNumbers,
    companyName,
    totalPoll,
  } = req.body;

  const brokenPoll = await adminService.createPGVCLBrokenPoll({
    poNumber,
    product,
    manufacturingDate,
    todayDate,
    brokenPollNumbers,
    companyName, 
    brokenCount,
    totalPoll,
  });

  res.status(httpStatus.CREATED).send({
    message: 'Broken poll created successfully',
    brokenPoll
  });
});

 const getAllPGVCLBrokenPolls = catchAsync(async (req, res) => {
  const brokenPolls = await adminService.getAllPGVCLBrokenPolls();
  res.status(httpStatus.OK).send({ brokenPolls });
});

const getPGVCLBrokenPollsByPollId = catchAsync(async (req, res) => {
  const { pollId } = req.params;
  const brokenPolls = await adminService.getPGVCLBrokenPollsByPollId(pollId);
  res.status(httpStatus.OK).send({ brokenPolls });
});

 const deletePGVCLBrokenPoll = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleted = await adminService.deletePGVCLBrokenPoll(id);
  res.status(httpStatus.OK).send({ message: 'Deleted successfully', deleted });
});



const createPONumber = catchAsync(async (req, res) => {
  console.log("req.body", req.body);
  const PONumber = await adminService.createPONumber(req.body);
  res.status(httpStatus.CREATED).send({ PONumber });
});

const getPONumber = catchAsync(async (req, res) => {
  const PONumber = await adminService.getPONumber(req.body);
  res.status(httpStatus.OK).send({ PONumber });
});


const getPONumberByCompanyId = catchAsync(async (req, res) => {
  const { companyId } = req.params;
  const PONumber = await adminService.getPONumberByCompanyId(companyId);
  res.status(httpStatus.OK).send({ PONumber });
});




const getPoDetailsByNumber = catchAsync(async (req, res) => {
  const { poNumber } = req.params;

  const po = await adminService.getPODetailsByNumber(poNumber);

  res.status(httpStatus.OK).send({
    success: true,
    data: po,
  });
});

const getPONumberById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const po = await adminService.getPONumberById(id);

  res.status(httpStatus.OK).send({
    success: true,
    PONumber: po,
  });
});

const updatePONumber = catchAsync(async (req, res) => {
  const PONumber = await adminService.updatePONumber(req.params.id, req.body);
  res.status(httpStatus.OK).send({ PONumber });
});

const deletePONumber = catchAsync(async (req, res) => {
  const PONumber = await adminService.deletePONumber(req.params.id);
  res.status(httpStatus.OK).send({ PONumber });
});

// const createAssignTask = catchAsync(async (req, res) => {
//   const task = await adminService.createAssignTask(req.body);

//   const managers = await RameshwarUser.find({
//     role: 'manager',
//     companyId: req.body.toCompanyId,
//   });

//   managers.forEach((manager) => {
//     const socketId = connectedUsers.get(manager._id.toString());
//     if (socketId) {
//       io.to(socketId).emit('taskAssigned', {
//         title: 'New Task Assigned',
//         taskId: task._id,
//         message: `A task has been assigned to your company.`,
//       });
//     }
//   });

//   res.status(httpStatus.CREATED).json({ message: 'Task assigned successfully', task });
// });

// const createAssignTask = catchAsync(async (req, res) => {
//   const task = await adminService.createAssignTask(req.body);

//   const io = req.app.locals.io; 

//   const managers = await RameshwarUser.find({
//       role: 'manager',
//       companyId: req.body.toCompanyId,
//   });

//   managers.forEach((manager) => {
//       const socketId = connectedUsers.get(manager._id.toString());
//       if (socketId) {
//           io.to(socketId).emit('taskAssigned', {
//               title: 'New Task Assigned',
//               taskId: task._id,
//               message: `A task has been assigned to your company.`,
//           });
//       }
//   });

//   res.status(httpStatus.CREATED).json({ message: 'Task assigned successfully', task });
// });


const createAssignTask = catchAsync(async (req, res) => {
  const task = await AssignTask.create(req.body);

  // Populate poId, fromCompanyId, toCompanyId details
  const populatedTask = await AssignTask.findById(task._id)
      .populate('poId')
      .populate('fromCompanyId')
      .populate('toCompanyId');

  // Find managers of the company
  const managers = await RameshwarUser.find({ role: 'manager', companyId: req.body.toCompanyId });

  // Prepare notification payload
  const payload = JSON.stringify({
      title: 'New Task Assigned',
      taskId: task._id,
      po: populatedTask.poId,
      fromCompany: populatedTask.fromCompanyId,
      toCompany: populatedTask.toCompanyId,
      pollQty: populatedTask.pollQty,
      startPoll: populatedTask.startPoll,
      endPoll: populatedTask.endPoll,
      message: `A new task has been assigned to your company.`,
  });

  // Publish to MQTT
  const topic = `company/${req.body.toCompanyId}/notifications`;
  mqttClient.publish(topic, payload, { qos: 1 }, (err) => {
      if (err) {
          console.error('MQTT Publish Error:', err);
      } else {
          console.log('Notification published on topic:', topic);
      }
  });

  res.status(httpStatus.CREATED).json({ message: 'Task assigned and notification sent', task: populatedTask });
});

const getAllTasks = catchAsync(async (req, res) => {
  const tasks = await adminService.getAllAssignedTasks();
  res.status(httpStatus.OK).json({ tasks });
});

const getTasksByCompanyId = catchAsync(async (req, res) => {
  const { companyId } = req.params;
  const tasks = await adminService.getTasksByCompanyId(companyId);
  res.status(httpStatus.OK).json({ tasks });
});

const getAssignedTasksForManager = catchAsync(async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(httpStatus.FORBIDDEN).json({ message: 'Access denied. Manager only.' });
  }
  const tasks = await adminService.getTasksAssignedToCompany(req.user.companyId);
  res.status(httpStatus.OK).json({ message: 'Assigned tasks retrieved', tasks });
});

const getTaskDetailsById = catchAsync(async (req, res) => {
  const task = await adminService.getTaskById(req.params.taskId);
  if (!task) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Task not found' });
  }

  if (!task.isNotified) await adminService.markTaskAsNotified(task._id);

  res.status(httpStatus.OK).json({ message: 'Task details', task });
});

const getTaskNotifications = catchAsync(async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(httpStatus.FORBIDDEN).json({ message: 'Access denied. Manager only.' });
  }
  const notifications = await adminService.getUnseenTasksForNotification(req.user.companyId);
  res.status(httpStatus.OK).json({ message: 'Unseen task notifications', notifications });
});

const addPaymentToAdpBill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { paymentDate, amountPaid } = req.body; 
  const updatedBill = await adminService.addPaymentToAdpBill(id, paymentDate, Number(amountPaid));

  return res.status(httpStatus.OK).json({
      message: "Payment added successfully",
      bill: updatedBill,
  });
});

const addPayment = async (req, res) => {
      const { billId } = req.params;
      const { amountPaid, paymentDate } = req.body;
      const bill = await adminService.addPayment(billId, amountPaid, paymentDate);
      res.status(httpStatus.OK).json({ message: 'Payment add', bill });
    };

    const addReturnAndCommission = catchAsync (async (req, res) => {
      const { billId } = req.params;
      console.log("ter.body", req.body);
      const { returnDate, returnAmount, commission, note } = req.body;
  
      if (!returnDate || returnAmount === undefined || commission === undefined) {
          res.status(400);
          throw new Error("Please provide returnDate, returnAmount and commission");
      }
  
      const bill = await adminService.addReturnAndCommissionService(billId, { returnDate, returnAmount, commission, note });
      res.status(httpStatus.OK).json({ message: 'Return & Commission add', bill });
  });
  
  const saveDocumentToPOController = async (req, res) => {
    try {
      const { poId, document } = req.body;
  
      if (!poId || !document) {
        return res.status(400).json({ message: "poId and document are required." });
      }
  
      const updatedPO = await adminService.savePODocumentService(poId, document);
  
      if (!updatedPO) {
        return res.status(404).json({ message: "PO not found." });
      }
  
      return res.status(200).json({
        message: "Document saved successfully to PO.",
        po: updatedPO,
      });
    } catch (error) {
      console.error("Error saving document to PO:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  const getPoDocuments = async (req, res) => {
    try {
      const { poId } = req.params;
  
      const documents = await adminService.getPoDocumentsService(poId);
  
      if (!documents) {
        return res.status(404).json({ message: "PO not found" });
      } 
  
      res.status(200).json({ documents });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  const deletePDF = async (req, res) => {
    try {
      console.log("req.body", req.body);
      const { fileUrl } = req.body;
      const { id } = req.params;
      if (!fileUrl) return res.status(400).json({ message: "Missing fileUrl" });
  
      const result = await adminService.deletePODocument(id, fileUrl);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Delete PDF error", error: err.message });
    }
  };

  const updateStockController = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        const updatedCategory = await adminService.updateCategoryStockService(id, quantity);

        res.status(200).json({
            message: "Stock updated successfully",
            updatedStock: updatedCategory.stock,
        });
    } catch (error) {
        console.error("Stock Update Error:", error);
        res.status(500).json({ message: "Failed to update stock", error: error.message });
    }
};


 const updatePoll = async (req, res) => {
  try {
    const updated = await adminService.updatePoll(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Poll not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 const deletePoll = async (req, res) => {
  try {
    const deleted = await adminService.deletePoll(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Poll not found" });
    res.json({ message: "Poll deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const decreaseStockController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { quantity } = req.body;

    if (!quantity || isNaN(quantity)) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const result = await adminService.decreaseStockService(categoryId, parseFloat(quantity));
    return res.status(200).json({ message: 'Stock decreased successfully', result });
  } catch (error) {
    console.error('Error decreasing stock:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateAdpStockController = async (req, res) => {
  try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity) {
          return res.status(400).json({ message: "Quantity is required" });
      }

      const updatedCategory = await adminService.updateCategoryAdpStockService(id, quantity);

      res.status(200).json({
          message: "Stock updated successfully",
          updatedStock: updatedCategory.stock,
      });
  } catch (error) {
      console.error("Stock Update Error:", error);
      res.status(500).json({ message: "Failed to update stock", error: error.message });
  }
};

const decreaseAdpStockController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { quantity } = req.body;

    if (!quantity || isNaN(quantity)) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const result = await adminService.decreaseAdpStockService(categoryId, parseFloat(quantity));
    return res.status(200).json({ message: 'Stock decreased successfully', result });
  } catch (error) {
    console.error('Error decreasing stock:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPollByCompanyController = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const polls = await adminService.getPollsByCompanyService(companyId);
    res.status(200).json({ success: true, data: polls });
  } catch (error) {
    next(error);
  }
};

const createFolderController = async (req, res) => {
  try {
    const { companyId, folderName } = req.body;

    const company = await adminService.createFolderService(companyId, folderName);

    return res.status(200).json({ success: true, message: "Folder created successfully", company });
  } catch (error) {
    console.error("createFolderController Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const renameFolderController = async (req, res) => {
  try {
    const { companyId, folderIndex, newName } = req.body;

    const company = await adminService.renameFolderService(companyId, folderIndex, newName);

    return res.status(200).json({ success: true, message: "Folder renamed successfully", company });
  } catch (error) {
    console.error("renameFolderController Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteFolderController = async (req, res) => {
  try {
    const { companyId, folderIndex } = req.body;

    const updatedCompany = await adminService.deleteFolderService(companyId, folderIndex);

    return res.status(200).json({
      success: true,
      message: "Folder deleted successfully",
      data: updatedCompany.folders,
    });
  } catch (error) {
    console.error("deleteFolderController Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getAllFoldersController = async (req, res) => {
  try {
    const { companyId } = req.params;

    const folders = await adminService.getAllFoldersService(companyId);

    return res.status(200).json({ success: true, folders });
  } catch (error) {
    console.error("getAllFoldersController Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const uploadImageToFolderController = async (req, res) => {
  try {
    const { companyId, folderIndex, imageUrl, imageName } = req.body;

    const company = await adminService.uploadImageToFolderService(
      companyId,
      folderIndex,
      imageUrl,
      imageName
    );

    return res.status(200).json({ success: true, message: "Image uploaded successfully", company });
  } catch (error) {
    console.error("uploadImageToFolderController Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};


const getImagesFromFolder = async (req, res) => {
  const { companyId, folderIndex } = req.params;
  const images = await adminService.getImagesFromFolderService(companyId, folderIndex);
  res.status(200).json({ success: true, images });
};

const deleteImageFromFolder = async (req, res) => {
  const { companyId, folderIndex, imageIndex } = req.body;
  const result = await adminService.deleteImageFromFolderService(companyId, folderIndex, imageIndex);
  res.status(200).json({ success: true, message: "Image deleted successfully", result });
};

const getSaleInvoicesByCompanyIdController = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({ message: "companyId is required." });
    }

    const invoices = await adminService.getSaleInvoicesByCompanyIdService(companyId);

    res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPONumberByAssignId = async (req, res) => {
  try {
    const { assignId } = req.params;

    const PONumber = await adminService.getPONumberByAssignIdService(assignId);

    res.status(200).json({ success: true,  PONumber });
  } catch (error) {
    console.error("Error in getPONumberByAssignId controller:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

// const getDashboardStatsController = async (req, res, next) => {
//   try {
//     const stats = await adminService.getDashboardStatsService();
//     res.status(200).json({ success: true, data: stats });
//   } catch (error) {
//     next(error);
//   }
// };

const getDashboardStatsController = async (req, res) => {
  try {
    const companyId = req.query.companyId || null; 
    const stats = await adminService.getDashboardStatsService(companyId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

const getMonthlyGstReport = async (req, res) => {
  const { companyId, month, year } = req.query;

  if (!companyId || !month || !year) {
    return res.status(400).json({
      success: false,
      message: "Please provide companyId, month, and year"
    });
  }

  try {
    const data = await adminService.getCombinedPurchaseAndSalesGST(companyId, month, year);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    console.error("❌ GST Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


const createGSTEntry = async (req, res) => {
  try {
    const gst = await adminService.createGST(req.body);
    res.status(201).json({ success: true, data: gst });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create GST", error });
  }
};

const getGSTEntries = async (req, res) => {
  try {
    const entries = await adminService.getAllGST();
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch GST entries", error });
  }
};

const getMonthlyGST = async (req, res) => {
  try {
    const { month, year } = req.query;
    const entries = await adminService.getGSTByMonthYear(month, year);
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch GST by month/year", error });
  }
};

const updateGSTEntry = async (req, res) => {
  try {
    const updated = await adminService.updateGST(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update GST entry", error });
  }
};

const deleteGSTEntry = async (req, res) => {
  try {
    await adminService.deleteGST(req.params.id);
    res.status(200).json({ success: true, message: "GST entry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete GST entry", error });
  }
};


 const downloadController = async (req, res) => {
  const { fileUrl, fileName } = req.query;

  if (!fileUrl) return res.status(400).send("Missing fileUrl");

  try {
    await adminService.downloadFileFromUrl(fileUrl, fileName, res);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Download failed");
  }
};



export default {
  scanBarcode, fetchAllBarcodes, getOrderList, getOrderById, createGST, getGST, createBill, fetchCategoryByName,createProduct, getProducts, updateProduct, deleteProduct, getProductsById, 
  getAllBills, getBillById, updateBill, deleteBill, downloadBillsCSV, downloadBillsPDF, createExpeneCategroy, getAllExpenseCategory, getExpenseCategoryById, updateExpenseCategory,
  createWalletAmount, getWalletAmount, updateWalletAmount, deleteWalletAmount, createInfo, getInfo, updateInfo, deleteInfo, createItemDetails, getItemDetails, updateItemDetails, deleteItemDetails, deleteExpenseCategory,
  updatePaymentStatus, getUserById, fetchDashboardData,createExpense, getAllExpense, getExpenseByCategoryId, getExpenseById, updateExpense, deleteExpense, uploadWarranty, validateWarranty, 
  addMultipleWarrantyNumbers, updateOrderStatus, updateShippingStatusService,getOrdersByShippingStatus, createVendor, getVendor, deleteVendor, updateVendor, getVendorById, getVendorByName, 
  getPurchaseBillsByADPBillType, getPurchaseBillsByActualBillType,createRoleUser, getAllRoleUsers, getRoleUserById, updateRoleUser, deleteRoleUser, getCompanyInfoByUserId, createPoll, getPolls, getUsage,
  createCategory, handleGetCompanyCategories, getCategroyById, getAllCategories, updateCategory,deleteCategory, createRole, getAllRoles, getRoleById, updateRole, deleteRole, getPurchaseBillsByVendorName,
  createPurchaseBill, getPurchaseBillById, getAllPurchaseBills, updatePurchaseBill, deletePurchaseBill, downloadPurchaseBillsCSV, downloadPurchaseBillsPDF, getSaleBillsByCustomerName,
  getDaybookReport,handleBulkDelete, handleBulkPrint, getCustomerByName,createChallan, getAllChallans, getChallanById, updateChallan, deleteChallan, createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer,
  getPurchaseBillsByCreateDate, getPurchaseBillsByBillDate, getPurchaseBillsByProductName, getPurchaseBillsByHSNSAC, getPurchaseBillsByQuantity, getPurchaseBillsByRate, getPoDocuments,
  getPurchaseBillsByPer, getPurchaseBillsByDiscount, getPurchaseBillsByTotalAmount, getPurchaseBillsByPaymentType, getSaleBillsByBillDate, getSaleBillsByTotalAmount, saveDocumentToPOController,
  getSaleBillsByCreateDate, getSaleBillsByHSNSAC, getSaleBillsByPer, getSaleBillsByProductName, getSaleBillsByQuantity, getSaleBillsByRate, getAllSalesBills, getPoDetailsByNumber,
  createLocalPurchaseBill, updateLocalPurchaseBill, deleteLocalPurchaseBill, downloadLocalPurchaseBillsCSV, downloadLocalPurchaseBillsPDF, getAllLocalPurchaseBills, getPGVCLPolls, createPGVCLPoll,
  getLocalPurchaseBillById, getLocalPurchaseBillsByBillDate, getLocalPurchaseBillsByCreateDate, getLocalPurchaseBillsByDiscount, getLocalPurchaseBillsByPaymentType, getUsagePGVCL,
  getLocalPurchaseBillsByPer, getLocalPurchaseBillsByProductName, getLocalPurchaseBillsByQuantity, getLocalPurchaseBillsByTotalAmount, getLocalPurchaseBillsByRate, updatePoll, deletePoll,
  createBrokenPoll, getAllBrokenPolls, getBrokenPollsByPollId, deleteBrokenPoll, createPONumber, getPONumber, updatePONumber, deletePONumber, getPONumberById, addPayment, getCompanyById,
  createAssignTask,getAllTasks, getTasksByCompanyId, getAssignedTasksForManager, getTaskDetailsById, getTaskNotifications, addPaymentToAdpBill, getPONumberByCompanyId, addReturnAndCommission,
  createPGVCLBrokenPoll, getPGVCLBrokenPollsByPollId, getAllPGVCLBrokenPolls, deletePGVCLBrokenPoll, deletePDF, updateStockController, decreaseStockController, updateAdpStockController,
  updateAdpStockController, decreaseAdpStockController, getPollByCompanyController, getDashboardStatsController, createFolderController, renameFolderController, uploadImageToFolderController, getAllFoldersController,
  getImagesFromFolder, deleteImageFromFolder, getSaleInvoicesByCompanyIdController, getPONumberByAssignId, getMonthlyGstReport, createGSTEntry, getGSTEntries, getMonthlyGST, updateGSTEntry, deleteGSTEntry, deleteFolderController,
  createLocalCategory, getAllLocalCategories, updateLocalCategory, deleteLocalCategory, downloadController,

}
