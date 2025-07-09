import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";
import RameshwarCategory from "../models/category.model.js";
import SPJProduct from "../models/product.model.js";
import RameshwarVendor from "../models/vendor.model.js";
import GST from "../models/gst.model.js";
import RameshwarInfo from "../models/info.model.js";
import SaleInvoice from "../models/saleInvoice.model.js";
import { RameshwarUser } from "../models/user.model.js";
import PDFDocument from "pdfkit";
import roleModel from "../models/role.model.js";
import roleUserModel from "../models/roleUser.model.js";
import RameshwarPurchaseBill from "../models/purchaseInvoice.model.js";
import Poll from "../models/poll.model.js";
import DeliveryChallan from "../models/deliveryChallan.model.js";
import RameshwarCustomer from "../models/customer.model.js";
import LocalPurchaseBill from "../models/localPurchaseInvoice.model.js";
import RameshwarProduct from "../models/product.model.js";
import PONumber from "../models/PO.model.js";
import AssignTask from "../models/assignTask.model.js";
import BrokenPoll from "../models/brokenPoll.model.js";
import PGVCLPoll from "../models/pgvclPoll.model.js";
import PGVCLBrokenPoll from "../models/pgvclBrokenPoll.model.js";
import dayjs from "dayjs";
import RameshwarRole from "../models/role.model.js";
import RameshwarRoleUser from "../models/roleUser.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import RameshwarGST from "../models/gst.model.js";
import LocalCategory from "../models/localCategory.model.js";
import https from "https";
import http from "http";
import { URL } from "url";
import mime from "mime-types";

const createCategory = async (data) => {
const companyObjectId = new mongoose.Types.ObjectId(data.companyId);

  const existing = await RameshwarCategory.findOne({
    companyId: companyObjectId,
    name: data.name,
  });

  if (existing) throw new Error('Category already exists for this company');

  return await RameshwarCategory.create({
    ...data,
    companyId: companyObjectId,
  });
};

const getCategories = async () => {
  return RameshwarCategory.find();
};

const getCategoriesByCompany = async (companyId) => {
  const query = mongoose.isValidObjectId(companyId)
    ? { companyId: new mongoose.Types.ObjectId(companyId) }
    : { companyId };

  return await RameshwarCategory.find(query);
};


const updateCategory = async (id, data) => {
  const updateFields = {};

  if (data.name !== undefined) updateFields.name = data.name;
  if (data.hsnCode !== undefined) updateFields.hsnCode = data.hsnCode;
  if (data.stock !== undefined) updateFields.stock = data.stock;

  console.log("data", data);

  const updatedCategory = await RameshwarCategory.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  return updatedCategory;
};

const deleteCategory = async (id) => {
  const deleteId = await RameshwarCategory.findByIdAndDelete(id);
  if (deleteId === null)
    throw new ApiError(httpStatus.NOT_FOUND, "RameshwarCategory not found");
  return deleteId;
};

const createLocalCategory = async (categoryData) => {
  if (!categoryData.name)
    throw new ApiError(httpStatus.BAD_REQUEST, "name is required!");
  const existingCategory = await LocalCategory.findOne({
    name: categoryData?.name,
  });
  if (existingCategory) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `RameshwarCategory with name "${categoryData.name}" already exists.`
    );
  }
  return LocalCategory.create(categoryData);
};

const getLocalCategories = async () => {
  return LocalCategory.find();
};

const updateLocalCategory = async (id, data) => {
  const updateFields = {};

  if (data.name !== undefined) updateFields.name = data.name;
  if (data.stock !== undefined) updateFields.stock = data.stock;

  console.log("data", data);

  const updatedCategory = await LocalCategory.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  return updatedCategory;
};

const deleteLocalCategory = async (id) => {
  const deleteId = await LocalCategory.findByIdAndDelete(id);
  if (deleteId === null)
    throw new ApiError(httpStatus.NOT_FOUND, "RameshwarCategory not found");
  return deleteId;
};

const createMetal = async (categoryData) => {
  if (!categoryData.metalName)
    throw new ApiError(httpStatus.BAD_REQUEST, "name is required!");
  const existingCategory = await Metal.findOne({
    metalName: categoryData?.metalName,
  });
  if (existingCategory) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Sub RameshwarCategory with name "${categoryData.metalName}" already exists.`
    );
  }
  return Metal.create(categoryData);
};

const getMetal = async () => {
  return Metal.find();
};

const updateMetal = async (id, categoryData) => {
  const updateData = await Metal.findByIdAndUpdate(id, categoryData, {
    new: true,
  });
  if (updateData === null)
    throw new ApiError(httpStatus.NOT_FOUND, "SubCategory not found");
  return updateData;
};

const deleteMetal = async (id) => {
  const deleteId = await Metal.findByIdAndDelete(id);
  if (deleteId === null)
    throw new ApiError(httpStatus.NOT_FOUND, "SubCategory not found");
  return deleteId;
};

const getCategoryByName = async (name) => {
  try {
    const category = await RameshwarCategory.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    return category;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProduct = async (data) => {
  return await RameshwarProduct.create(data);
};

const getProducts = async (companyId) => {
  if (!companyId) throw new Error('companyId is required');
  return await RameshwarProduct.find({ companyId });
};

const getProductsById = async (id) => {
  return await RameshwarProduct.findById(id);
};

const updateProduct = async (id, data) => {
  const updateData = await RameshwarProduct.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (updateData === null)
    throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
  return updateData;
};

const deleteProduct = async (id) => {
  return await RameshwarProduct.findByIdAndDelete(id);
};

const createWalletAmount = async (amountData) => {
  if (!amountData.amount)
    throw new ApiError(httpStatus.BAD_REQUEST, "Amount is required!");
  return WalletAmount.create(amountData);
};

const getWalletAmount = async () => {
  return WalletAmount.find();
};

const updateWalletAmount = async (id, amountData) => {
  const updateData = await WalletAmount.findByIdAndUpdate(id, amountData, {
    new: true,
  });
  if (updateData === null)
    throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
  return updateData;
};

const deleteWalletAmount = async (id) => {
  const deleteId = await WalletAmount.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, "Data not found");
  return deleteId;
};

const createInfo = async (data) => {
  return await RameshwarInfo.create(data);
};

const getInfo = async () => {
  return RameshwarInfo.find().populate("userId");
};

const getCompanyByIdService = async (id) => {
  return await RameshwarInfo.findById(id);
};

const updateInfo = async (id, data) => {
  const updateData = await RameshwarInfo.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (updateData === null)
    throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
  return updateData;
};

const deleteInfo = async (id) => {
  const deleteId = await RameshwarInfo.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, "Data not found");
  return deleteId;
};

const getCompanyInfoByUserId = async (userId) => {
  try {
    const companyInfo = await RameshwarInfo.findOne({ userId });

    if (!companyInfo) {
      return null;
    }

    return companyInfo;
  } catch (error) {
    console.error("Error fetching company info:", error);
    throw new Error("Failed to retrieve company information.");
  }
};

const updatePaymentStatusService = async (orderId, paymentStatus) => {
  const allowedStatuses = ["pending", "completed", "cancelled"];

  if (!allowedStatuses.includes(paymentStatus)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid payment status. Allowed values: ${allowedStatuses.join(", ")}`
    );
  }

  const order = await SaleInvoice.findById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found.");
  }

  // Update payment status
  order.paymentStatus = paymentStatus;
  await order.save();

  return order;
};

const updateOrderStatusService = async (orderId, orderStatus) => {
  try {
    const updatedOrder = await SaleInvoice.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    console.error("Error in service while updating order status:", error);
    throw error;
  }
};

const updateShippingStatusService = async (orderId, shippingStatus) => {
  try {
    const updatedOrder = await SaleInvoice.findByIdAndUpdate(
      orderId,
      { shippingStatus },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    console.error("Error in service while updating order status:", error);
    throw error;
  }
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
    const product = await SPJProduct.findById(productId);
    if (!product) {
      throw new Error(`SPJProduct with ID ${productId} does not exist.`);
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
    const shippingStatus = await GST.findOne({ status });
    if (!shippingStatus) {
      throw new Error(`Shipping status "${status}" not found.`);
    }

    const orders = await SaleInvoice.find({
      shippingStatus: shippingStatus._id,
    }).populate("shippingStatus");
    return orders;
  } catch (error) {
    console.error(
      "Error in service while fetching orders by shipping status:",
      error
    );
    throw error;
  }
};

const createVendor = async (productData) => {
  const product = new RameshwarVendor(productData);
  return await product.save();
};

const getVendor = async (query = {}) => {
  return await RameshwarVendor.find(query);
};

const getVendorById = async (id) => {
  return await RameshwarVendor.findById(id);
};

const updateVendor = async (id, productData) => {
  return await RameshwarVendor.findByIdAndUpdate(id, productData, {
    new: true,
  });
};

const deleteVendor = async (id) => {
  return await RameshwarVendor.findByIdAndDelete(id);
};

const getVendorByName = async (name) => {
  const customer = await RameshwarVendor.findOne({ name });

  if (!customer) {
    throw new Error("Vendor not found");
  }

  return customer;
};

const createBill = async (billData) => {
  const newBill = new SaleInvoice(billData);
  const savedBill = await newBill.save();
  return savedBill;
};

const extractParts = (pollNo) => {
  const prefix = pollNo.replace(/[0-9]/g, "");
  const num = parseInt(pollNo.replace(/[^0-9]/g, ""), 10);
  return { prefix, num };
};

const getBillById = async (id) => {
  //   const bill = await SaleInvoice.findById(id)
  //     .populate({
  //       path: 'poNumber',
  //       populate: [
  //         { path: 'companyId' },
  //         { path: 'assignId' },
  //         { path: 'productId' },
  //       ]
  //     })
  //     .populate({
  //       path: 'companyId',
  //       populate: { path: 'userId' }
  //     })
  //     .populate({
  //       path: 'products.productId',
  //       populate: { path: 'productName hsnCode' }
  //     });

  //   return bill;
  // };
  const invoice = await SaleInvoice.findById(id)
    .populate("companyId")
    .populate({
      path: "poNumber",
      populate: [
        { path: "companyId" },
        { path: "assignId" },
        { path: "productId" },
      ],
    });

  if (!invoice) throw new Error("Sale Invoice not found");

  const allPolls = await Poll.find({ poNumber: invoice.poNumber?._id });

  // Match poll number to date logic
  const pollDates = invoice.pollNumbers.map((pollNum) => {
    let matchedDate = null;

    for (let poll of allPolls) {
      const startNum = parseInt(poll.startNumber.replace(/^\D+/g, ""));
      const endNum = parseInt(poll.lastNumber.replace(/^\D+/g, ""));
      const prefix = poll.startNumber.replace(/[0-9]/g, "");
      const num = parseInt(pollNum.replace(/^\D+/g, ""));
      const numPrefix = pollNum.replace(/[0-9]/g, "");

      if (prefix === numPrefix && num >= startNum && num <= endNum) {
        matchedDate = poll.createdAt;
        break;
      }
    }

    return {
      number: pollNum,
      date: matchedDate || new Date(),
    };
  });

  const invoiceWithPollDates = {
    ...invoice.toObject(),
    pollDates,
  };

  return invoiceWithPollDates;
};

const getAllBills = async () => {
  const bills = await SaleInvoice.find()
    .populate("companyId")
    .populate("poNumber")
    .populate({
      path: "products.productId",
      populate: { path: "productName hsnCode" },
    })
    .sort({ createdAt: -1 });

  return bills;
};

const updateBill = async (id, updateData) => {
  const updatedBill = await SaleInvoice.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return updatedBill;
};

const deleteBill = async (id) => {
  const deletedBill = await SaleInvoice.findByIdAndDelete(id);
  return deletedBill;
};

const downloadBillsPDF = async () => {
  const bills = await SaleInvoice.find()
    .populate("poNumber")
    .populate("companyId");

  const doc = new PDFDocument({ size: "A4", margin: 50 });

  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("error", (err) => {
    throw new Error(`PDF generation error: ${err.message}`);
  });

  doc.fontSize(20).text("Bills PDF Export", { align: "center" });
  doc.moveDown(2);

  bills.forEach((bill, index) => {
    doc.fontSize(12).text(`Bill #${index + 1}`, { underline: true });
    doc.text(`Bill No:      ${bill.billNo || ""}`);
    doc.text(`Date:         ${bill.date || ""}`);
    doc.text(`Total Price:  ${bill.totalPrice || 0}`);
    doc.text(`Discount:     ${bill.discount || 0}`);
    doc.text(`CGST:         ${bill.cgstAmount || 0}`);
    doc.text(`SGST:         ${bill.sgstAmount || 0}`);
    doc.text(`GST Amount:   ${bill.gstAmount || 0}`);
    doc.text(`Final Amount: ${bill.finalAmount || 0}`);
    doc.moveDown(1.5);
  });

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on("error", (err) => {
      reject(err);
    });
  });
};

const downloadBillsCSV = async () => {
  const bills = await SaleInvoice.find().populate("poNumber");

  let csvData =
    "BillNo,Date,TotalPrice,Discount,CGST,SGST,GSTAmount,FinalAmount\n";

  bills.forEach((bill) => {
    csvData += `${bill.billNo || ""},`;
    csvData += `${bill.date || ""},`;
    csvData += `${bill.totalPrice || 0},`;
    csvData += `${bill.discount || 0},`;
    csvData += `${bill.cgstAmount || 0},`;
    csvData += `${bill.sgstAmount || 0},`;
    csvData += `${bill.gstAmount || 0},`;
    csvData += `${bill.finalAmount || 0}\n`;
  });

  return csvData;
};

const createPurchaseBill = async (data) => {
  const bill = new RameshwarPurchaseBill(data);
  return await bill.save();
};

// const getPurchaseBillById = async (id) => {
//   const bill = await RameshwarPurchaseBill.findById(id)
//   .populate('products.categoryId')
//   .populate('vendorId');
//   return bill;
// };

const getPurchaseBillById = async (id) => {
  const bill = await RameshwarPurchaseBill.findById(id)
    .populate("products.categoryId")
    .populate("vendorId");

  if (!bill) throw new Error("Bill not found");

  bill.products = bill.products.map((product) => ({
    ...product.toObject(),
    categoryId: product.categoryId?._id || null,
  }));

  return bill;
};

const updatePurchaseBill = async (id, updateData) => {
  const updatedBill = await RameshwarPurchaseBill.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedBill;
};

// const deletePurchaseBill = async (id) => {
//   const deletedBill = await RameshwarPurchaseBill.findByIdAndDelete(id);
//   return deletedBill;
// };

export const deletePurchaseBill = async (id) => {
  // 1. Fetch the bill
  const bill = await RameshwarPurchaseBill.findById(id);
  if (!bill) throw new Error("Purchase bill not found");

  // 2. Loop through products and decrease stock
  for (const product of bill.products) {
    const categoryId =
      typeof product.categoryId === "object"
        ? product.categoryId?._id?.toString()
        : product.categoryId;

    if (categoryId && product.quantity) {
      const category = await RameshwarCategory.findById(categoryId);
      if (category) {
        category.stock = (category.stock || 0) - Number(product.quantity);
        await category.save();
      }
    }
  }

  // 3. Delete the purchase bill
  const deletedBill = await RameshwarPurchaseBill.findByIdAndDelete(id);
  return deletedBill;
};

const downloadPurchaseBillsPDF = async () => {
  const bills = await RameshwarPurchaseBill.find()
    .populate("vendorId")
    .populate("products.productId");

  const doc = new PDFDocument({ size: "A4", margin: 50 });

  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("error", (err) => {
    throw new Error(`PDF generation error: ${err.message}`);
  });

  doc.fontSize(20).text("Bills PDF Export", { align: "center" });
  doc.moveDown(2);

  bills.forEach((bill, index) => {
    doc.fontSize(12).text(`Bill #${index + 1}`, { underline: true });
    doc.text(`Bill No:      ${bill.billNo || ""}`);
    doc.text(`Date:         ${bill.date || ""}`);
    doc.text(`Total Price:  ${bill.totalPrice || 0}`);
    doc.text(`Discount:     ${bill.discount || 0}`);
    doc.text(`CGST:         ${bill.cgstAmount || 0}`);
    doc.text(`SGST:         ${bill.sgstAmount || 0}`);
    doc.text(`GST Amount:   ${bill.gstAmount || 0}`);
    doc.text(`Final Amount: ${bill.finalAmount || 0}`);
    doc.moveDown(1.5);
  });

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on("error", (err) => {
      reject(err);
    });
  });
};

const downloadPurchaseBillsCSV = async () => {
  const bills = await RameshwarPurchaseBill.find().populate("vendorId");

  let csvData =
    "BillNo,Date,TotalPrice,Discount,CGST,SGST,GSTAmount,FinalAmount\n";

  bills.forEach((bill) => {
    csvData += `${bill.billNo || ""},`;
    csvData += `${bill.date || ""},`;
    csvData += `${bill.totalPrice || 0},`;
    csvData += `${bill.discount || 0},`;
    csvData += `${bill.cgstAmount || 0},`;
    csvData += `${bill.sgstAmount || 0},`;
    csvData += `${bill.gstAmount || 0},`;
    csvData += `${bill.finalAmount || 0}\n`;
  });

  return csvData;
};

async function populatePurchaseBillQuery(query) {
  const bills = await RameshwarPurchaseBill.find(query)
    .populate("vendorId", "name")
    .populate("products.categoryId", "categoryName")
    .lean();

  console.log("Fetched Bills:", bills);
  return bills;
}

const getAllPurchaseBills = async () => {
  return await populatePurchaseBillQuery({});
};

const getPurchaseBillsByCreateDate = async (createDate, billType) => {
  return await populatePurchaseBillQuery({ date: createDate, billType });
};

const getPurchaseBillsByBillDate = async (billDate, billType) => {
  return await populatePurchaseBillQuery({ billDate: billDate, billType });
};

const getPurchaseBillsByProductName = async (productName, billType) => {
  return await populatePurchaseBillQuery({
    billType,
    products: {
      $elemMatch: {
        productName: { $regex: new RegExp(`^${productName}$`, "i") },
      },
    },
  });
};

const getPurchaseBillsByHSNSAC = async (hsnSac, billType) => {
  return await populatePurchaseBillQuery({
    "products.hsnSac": hsnSac,
    billType,
  });
};

const getPurchaseBillsByQuantity = async (quantity, billType) => {
  return await populatePurchaseBillQuery({
    "products.quantity": parseFloat(quantity),
    billType,
  });
};

const getPurchaseBillsByRate = async (rate, billType) => {
  return await populatePurchaseBillQuery({
    "products.rate": parseFloat(rate),
    billType,
  });
};

const getPurchaseBillsByPer = async (per, billType) => {
  return await populatePurchaseBillQuery({ "products.per": per, billType });
};

const getPurchaseBillsByDiscount = async (discount, billType) => {
  return await populatePurchaseBillQuery({
    "products.discount": parseFloat(discount),
    billType,
  });
};

const getPurchaseBillsByTotalAmount = async (finalTotal, billType) => {
  return await populatePurchaseBillQuery({
    finalTotal: parseFloat(finalTotal),
    billType,
  });
};

const getPurchaseBillsByPaymentType = async (paymentStatus, billType) => {
  return await populatePurchaseBillQuery({ paymentStatus, billType });
};

export const getPurchaseBillsByBillType = async (billType) => {
  return await RameshwarPurchaseBill.find({ billType })
    .populate("vendorId")
    .sort({ createdAt: -1 });
};

const getPurchaseBillsByVendorName = async (vendorName, billType) => {
  const vendor = await RameshwarVendor.findOne({
    name: { $regex: `^${vendorName}$`, $options: "i" },
  });

  const bills = await RameshwarPurchaseBill.find({
    vendorId: vendor?._id,
    billType,
  }).populate("products.categoryId", "categoryName");

  return bills;
};

const createLocalPurchaseBill = async (billData) => {
  const newBill = new LocalPurchaseBill(billData);
  const savedBill = await newBill.save();
  return savedBill;
};

const getLocalPurchaseBillById = async (id) => {
  const bill = await LocalPurchaseBill.findById(id).populate(
    "products.categoryId",
    "categoryName"
  );
  return bill;
};

const updateLocalPurchaseBill = async (id, updateData) => {
  const updatedBill = await LocalPurchaseBill.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedBill;
};

const deleteLocalPurchaseBill = async (id) => {
  const deletedBill = await LocalPurchaseBill.findByIdAndDelete(id);
  return deletedBill;
};

const downloadLocalPurchaseBillsPDF = async () => {
  const bills = await LocalPurchaseBill.find()
    .populate("vendorId")
    .populate("products.productId ");

  const doc = new PDFDocument({ size: "A4", margin: 50 });

  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("error", (err) => {
    throw new Error(`PDF generation error: ${err.message}`);
  });

  doc.fontSize(20).text("Bills PDF Export", { align: "center" });
  doc.moveDown(2);

  bills.forEach((bill, index) => {
    doc.fontSize(12).text(`Bill #${index + 1}`, { underline: true });
    doc.text(`Bill No:      ${bill.billNo || ""}`);
    doc.text(`Date:         ${bill.date || ""}`);
    doc.text(`Total Price:  ${bill.totalPrice || 0}`);
    doc.text(`Discount:     ${bill.discount || 0}`);
    doc.text(`CGST:         ${bill.cgstAmount || 0}`);
    doc.text(`SGST:         ${bill.sgstAmount || 0}`);
    doc.text(`GST Amount:   ${bill.gstAmount || 0}`);
    doc.text(`Final Amount: ${bill.finalAmount || 0}`);
    doc.moveDown(1.5);
  });

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on("error", (err) => {
      reject(err);
    });
  });
};

const downloadLocalPurchaseBillsCSV = async () => {
  const bills = await LocalPurchaseBill.find().populate("vendorId");

  let csvData =
    "BillNo,Date,TotalPrice,Discount,CGST,SGST,GSTAmount,FinalAmount\n";

  bills.forEach((bill) => {
    csvData += `${bill.billNo || ""},`;
    csvData += `${bill.date || ""},`;
    csvData += `${bill.totalPrice || 0},`;
    csvData += `${bill.discount || 0},`;
    csvData += `${bill.cgstAmount || 0},`;
    csvData += `${bill.sgstAmount || 0},`;
    csvData += `${bill.gstAmount || 0},`;
    csvData += `${bill.finalAmount || 0}\n`;
  });

  return csvData;
};

async function populateLocalPurchaseBillQuery(query) {
  const bills = await LocalPurchaseBill.find(query)
    .populate("products.categoryId", "categoryName")
    .lean();

  console.log("Fetched Bills:", bills);
  return bills;
}

const getAllLocalPurchaseBills = async () => {
  return await populateLocalPurchaseBillQuery({});
};

const getLocalPurchaseBillsByCreateDate = async (createDate) => {
  return await populateLocalPurchaseBillQuery({ date: createDate });
};

const getLocalPurchaseBillsByBillDate = async (billDate) => {
  return await populateLocalPurchaseBillQuery({ billDate: billDate });
};

const getLocalPurchaseBillsByProductName = async (productName) => {
  return await populateLocalPurchaseBillQuery({
    products: {
      $elemMatch: {
        productName: { $regex: new RegExp(`^${productName}$`, "i") },
      },
    },
  });
};

const getLocalPurchaseBillsByQuantity = async (quantity) => {
  return await populateLocalPurchaseBillQuery({
    "products.quantity": parseFloat(quantity),
  });
};

const getLocalPurchaseBillsByRate = async (rate) => {
  return await populateLocalPurchaseBillQuery({
    "products.rate": parseFloat(rate),
  });
};

const getLocalPurchaseBillsByPer = async (per) => {
  return await populateLocalPurchaseBillQuery({ "products.per": per });
};

const getLocalPurchaseBillsByDiscount = async (discount) => {
  return await populateLocalPurchaseBillQuery({
    "products.discount": parseFloat(discount),
  });
};

const getLocalPurchaseBillsByTotalAmount = async (finalTotal) => {
  return await populateLocalPurchaseBillQuery({
    finalTotal: parseFloat(finalTotal),
  });
};

const getLocalPurchaseBillsByPaymentType = async (paymentStatus) => {
  return await populateLocalPurchaseBillQuery({ paymentStatus });
};

const getUserById = async (id) => {
  return RameshwarUser.findById(id);
};

const decodeBarcode = async (barcode) => {
  try {
    const product = await SPJProduct.findOne({ barCode: barcode }).populate(
      "CategoryId"
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    throw error;
  }
};

const createRole = async (data) => {
  return await roleModel.create(data);
};

const getAllRoles = async () => {
  return await roleModel.find();
};

const getRoleById = async (id) => {
  return await roleModel.findById(id);
};

const updateRole = async (id, data) => {
  return await roleModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteRole = async (id) => {
  return await roleModel.findByIdAndDelete(id);
};

const createRoleUser = async (data) => {
  const {
    name,
    email,
    password,
    roleId,
    companyId,
    loginEnabled = true,
    avatar,
  } = data;

  if (!name || !email || !password || !roleId || !companyId) {
    throw new Error("Name, email, password, and roleId are required.");
  }

  const role = await RameshwarRole.findById(roleId);
  if (!role) {
    throw new Error("Invalid roleId. Role not found.");
  }

  const existingUser = await RameshwarRoleUser.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await RameshwarRoleUser.create({
    name,
    email,
    password: hashedPassword,
    roleId,
    companyId,
    loginEnabled,
    avatar,
  });

  return newUser;
};

const getAllRoleUsers = async () => {
  return await roleUserModel.find().populate("roleId companyId");
};

const getRoleUserById = async (id) => {
  return await roleUserModel.findById(id).populate("roleId companyId");
};

const updateRoleUser = async (id, data) => {
  return await roleUserModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteRoleUser = async (id) => {
  return await roleUserModel.findByIdAndDelete(id);
};

const getAllBarcodes = async () => {
  try {
    const products = await SPJProduct.find({}, "barCode barcodeImage");
    return products;
  } catch (error) {
    throw new Error("Error fetching barcodes");
  }
};

const getSaleInvoicesByCompanyIdService = async (companyId) => {
  try {
    const invoices = await SaleInvoice.find({ companyId })
      .populate("companyId")
      .populate({
        path: "poNumber",
        populate: [
          { path: "companyId" },
          { path: "assignId" },
          { path: "productId" },
        ],
      })
      .sort({ createdAt: -1 });
    return invoices;
  } catch (error) {
    throw new Error("Failed to fetch invoices by companyId");
  }
};

const getPONumberByAssignIdService = async (assignId) => {
  if (!assignId) {
    throw new Error("Assign ID is required");
  }

  const poNumbers = await PONumber.find({ assignId })
    .populate("companyId")
    .populate("productId")
    .populate("assignId")
    .sort({ createdAt: -1 });

  return poNumbers;
};

const getDashboardData = async () => {
  try {
    // Count total purchases
    const totalPurchases = await RameshwarPurchaseBill.countDocuments();
    const totalSales = await SaleInvoice.countDocuments();

    // Aggregate total gross weight and net weight from all sales
    const salesAggregation = await SaleInvoice.aggregate([
      { $unwind: "$products" }, // Unwind products array to calculate totals
      {
        $RameshwarCategory: {
          _id: null,
          totalGrossWeight: { $sum: { $toDouble: "$products.grossQty" } },
          totalNetWeight: { $sum: { $toDouble: "$products.netQty" } },
        },
      },
    ]);

    const totalSalesGrossWeight =
      salesAggregation.length > 0 ? salesAggregation[0].totalGrossWeight : 0;
    const totalSalesNetWeight =
      salesAggregation.length > 0 ? salesAggregation[0].totalNetWeight : 0;

    const purchaseAggregation = await RameshwarPurchaseBill.aggregate([
      { $unwind: "$products" }, // Unwind products array to calculate totals
      {
        $RameshwarCategory: {
          _id: null,
          totalGrossWeight: { $sum: { $toDouble: "$products.grossQty" } },
          totalNetWeight: { $sum: { $toDouble: "$products.netQty" } },
        },
      },
    ]);

    const totalPurchaseGrossWeight =
      purchaseAggregation.length > 0
        ? purchaseAggregation[0].totalGrossWeight
        : 0;
    const totalPurchaseNetWeight =
      purchaseAggregation.length > 0
        ? purchaseAggregation[0].totalNetWeight
        : 0;

    const totalGrossWeight = totalSalesGrossWeight + totalPurchaseGrossWeight;
    const totalNetWeight = totalSalesNetWeight + totalPurchaseNetWeight;

    // Fetch today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // End of the day

    // Count total invoices generated today
    const totalSalesInvoicesToday = await SaleInvoice.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const totalPurchaseInvoicesToday =
      await RameshwarPurchaseBill.countDocuments({
        createdAt: { $gte: today, $lt: tomorrow },
      });

    const totalInvoicesToday =
      totalSalesInvoicesToday + totalPurchaseInvoicesToday;

    // **Fetch stock from SPJProduct**
    const spjProductStock = await SPJProduct.aggregate([
      {
        $project: {
          toWeight: { $toDouble: "$toWeight" },
          fineWeight: { $toDouble: "$fineWeight" },
        },
      },
      {
        $RameshwarCategory: {
          _id: null,
          totalStockGrossWeight: { $sum: "$toWeight" },
          totalStockFineWeight: { $sum: "$fineWeight" },
        },
      },
    ]);

    const totalStockGrossWeightSPJProduct =
      spjProductStock.length > 0 ? spjProductStock[0].totalStockGrossWeight : 0;
    const totalStockFineWeightSPJProduct =
      spjProductStock.length > 0 ? spjProductStock[0].totalStockFineWeight : 0;

    // **Fetch stock from SPJNonBarcodeProduct**
    const spjNonBarcodeProductStock = await SPJNonBarcodeProduct.aggregate([
      {
        $project: {
          toWeight: { $toDouble: "$toWeight" },
          fineWeight: { $toDouble: "$fineWeight" },
        },
      },
      {
        $RameshwarCategory: {
          _id: null,
          totalStockGrossWeight: { $sum: "$toWeight" },
          totalStockFineWeight: { $sum: "$fineWeight" },
        },
      },
    ]);

    const totalStockGrossWeightSPJNonBarcode =
      spjNonBarcodeProductStock.length > 0
        ? spjNonBarcodeProductStock[0].totalStockGrossWeight
        : 0;
    const totalStockFineWeightSPJNonBarcode =
      spjNonBarcodeProductStock.length > 0
        ? spjNonBarcodeProductStock[0].totalStockFineWeight
        : 0;

    // **Calculate Final Total Stock Gross Weight and Fine Weight**
    const totalStockGrossWeight =
      totalStockGrossWeightSPJProduct + totalStockGrossWeightSPJNonBarcode;
    const totalStockFineWeight =
      totalStockFineWeightSPJProduct + totalStockFineWeightSPJNonBarcode;

    const todaysScanLogs = await ScanLog.find({
      scannedAt: { $gte: today, $lt: tomorrow },
    }).countDocuments();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Get data from 6 days ago until today

    return {
      totalPurchases,
      totalSales,
      totalGrossWeight,
      totalNetWeight,
      totalInvoicesToday,
      totalStockGrossWeightSPJProduct,
      totalStockFineWeightSPJProduct,
      totalStockGrossWeightSPJNonBarcode,
      totalStockFineWeightSPJNonBarcode,
      totalStockGrossWeight,
      totalStockFineWeight,
      todaysScanLogs,
    };
  } catch (error) {
    throw new Error(`Error fetching dashboard data: ${error.message}`);
  }
};

const getDaybookData = async (startDate, endDate) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const parseDateToUTC = (dateStr, endOfDay = false) => {
      if (!dateStr) throw new Error("Invalid date format. Expected DD-MM-YYYY");
      const [day, month, year] = dateStr.split("-");

      // ✅ Ensure correct UTC conversion
      let date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

      if (endOfDay) {
        date.setUTCHours(23, 59, 59, 999); // End of the day
      }

      return date;
    };

    if (!startDate || !endDate) {
      throw new Error(
        "Invalid date range. Provide startDate and endDate in DD-MM-YYYY format."
      );
    }

    startDate = parseDateToUTC(startDate);
    endDate = parseDateToUTC(endDate, true);

    console.log("startDate..", startDate);
    console.log("endDate..", endDate);

    const salesData = await SaleInvoice.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .select(
        "billNo date vendorId products total finalAmount gstAmount paymentType createdAt"
      )
      .populate("vendorId")
      .populate({
        path: "products.productId",
        select: "productName rate gstRate hsnCode netWeight pcs",
      });

    const purchaseData = await RameshwarPurchaseBill.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .select(
        "billNo date vendorId products total finalAmount gstAmount paymentType createdAt"
      )
      .populate("vendorId")
      .populate({
        path: "products.categoryId",
        select: "productName rate gstRate hsnCode netWeight pcs quantity",
      });

    const barcodeStockData = await SPJProduct.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate("CategoryId");

    const salesSummary = await SaleInvoice.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $RameshwarCategory: {
          _id: null,
          totalSales: { $sum: "$finalAmount" },
          totalGST: { $sum: "$gstAmount" },
          totalSalesBills: { $sum: 1 },
        },
      },
    ]);

    const purchaseSummary = await RameshwarPurchaseBill.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $RameshwarCategory: {
          _id: null,
          totalPurchases: { $sum: "$finalAmount" },
          totalPurchaseGST: { $sum: "$gstAmount" },
          totalPurchaseBills: { $sum: 1 },
        },
      },
    ]);

    const stockSummary = await SPJProduct.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $RameshwarCategory: {
          _id: null,
          totalStock: { $sum: 1 },
        },
      },
    ]);

    const categoryWiseQuantity = await RameshwarPurchaseBill.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $unwind: "$products" }, // Flatten the products array
      {
        $group: {
          _id: "$products.categoryId", // Group by category
          totalQuantity: { $sum: "$products.quantity" }, // Sum up the quantity
        },
      },
      {
        $lookup: {
          from: "RameshwarCategory", // Collection name of category
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          categoryName: "$category.name",
          totalQuantity: 1,
        },
      },
    ]);

    const totalSales = salesSummary.length ? salesSummary[0].totalSales : 0;
    const totalGST = salesSummary.length ? salesSummary[0].totalGST : 0;
    const totalSalesBills = salesSummary.length
      ? salesSummary[0].totalSalesBills
      : 0;

    const totalPurchases = purchaseSummary.length
      ? purchaseSummary[0].totalPurchases
      : 0;
    const totalPurchaseGST = purchaseSummary.length
      ? purchaseSummary[0].totalPurchaseGST
      : 0;
    const totalPurchaseBills = purchaseSummary.length
      ? purchaseSummary[0].totalPurchaseBills
      : 0;

    const totalStock = stockSummary.length ? stockSummary[0].totalStock : 0;

    const profit = totalSales - totalPurchases;
    const netGST = totalGST - totalPurchaseGST;

    return {
      summary: {
        dateRange: { startDate, endDate },
        totalSales,
        totalPurchases,
        profit,
        netGST,
        totalSalesBills,
        totalPurchaseBills,
        totalStock,
      },
      categoryWiseQuantity,
      sales: salesData,
      purchases: purchaseData,
      barcodeStock: barcodeStockData,
    };
  } catch (error) {
    throw new Error("Error fetching daybook data: " + error.message);
  }
};

const getBarcodeImage = async (barCode) => {
  try {
    const product = await SPJProduct.findOne({ barCode });

    if (!product) {
      throw new Error("Barcode not found");
    }

    return product;
  } catch (error) {
    console.error("Error fetching barcode image:", error);
    return null;
  }
};

const bulkDeleteProducts = async (productIds) => {
  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new Error("Invalid productIds array");
  }

  const result = await SPJProduct.deleteMany({ _id: { $in: productIds } });

  if (result.deletedCount === 0) {
    throw new Error("No products found to delete");
  }

  return { message: `Deleted ${result.deletedCount} products successfully.` };
};

const bulkPrintProducts = async (productIds) => {
  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new Error("Invalid productIds array");
  }

  const products = await SPJProduct.find(
    { _id: { $in: productIds } },
    "barCode barcodeImage CategoryId toWeight totalPrice"
  );

  if (!products.length) {
    throw new Error("No products found");
  }

  return products;
};

const createPoll = async (pollData) => {
  const poll = new Poll({
    ...pollData,
    againstPollQuantity: pollData.againstPollQuantity || 0,
    infoId: pollData.infoId, // <-- include infoId
  });

  await poll.save();
  return poll;
};

const getPolls = async (infoId) => {
  const filter = {};

  if (infoId) {
    filter.infoId = infoId;
  }

  return await Poll.find(filter)
    .populate("companyName usedMaterials.category poNumber infoId")
    .sort({ date: -1 });
};

const calculateUsage = async (pollId) => {
  const poll = await Poll.findById(pollId).populate("categoriesUsed.category");
  if (!poll) throw new Error("Poll not found");

  const totalCategories = await RameshwarCategory.countDocuments();
  const usedCategories = poll.categoriesUsed.length;
  const remainingCategories = totalCategories - usedCategories;

  return {
    pollNumber: poll.pollNumber,
    totalCreated: poll.totalCreated,
    usedCategories,
    remainingCategories,
    usageDetails: poll.categoriesUsed,
  };
};

const createPGVCLPoll = async (pollData) => {
  const poll = new Poll(pollData);
  await poll.save();
  return poll;
};

const getPGVCLPolls = async () =>
  await Poll.find().populate("usedMaterials.category");

const calculateUsagePGVCL = async (pollId) => {
  const poll = await Poll.findById(pollId).populate("categoriesUsed.category");
  if (!poll) throw new Error("Poll not found");

  const totalCategories = await RameshwarCategory.countDocuments();
  const usedCategories = poll.categoriesUsed.length;
  const remainingCategories = totalCategories - usedCategories;

  return {
    pollNumber: poll.pollNumber,
    totalCreated: poll.totalCreated,
    usedCategories,
    remainingCategories,
    usageDetails: poll.categoriesUsed,
  };
};

const createChallan = async (challanData) => {
  return await DeliveryChallan.create(challanData);
};

const getAllChallans = async () => {
  return await DeliveryChallan.find();
};

const getChallanById = async (id) => {
  return await DeliveryChallan.findById(id);
};

const updateChallan = async (id, challanData) => {
  return await DeliveryChallan.findByIdAndUpdate(id, challanData, {
    new: true,
  });
};

const deleteChallan = async (id) => {
  return await DeliveryChallan.findByIdAndDelete(id);
};

const createCustomer = async (productData) => {
  const product = new RameshwarCustomer(productData);
  return await product.save();
};

const getCustomers = async (query = {}) => {
  return await RameshwarCustomer.find(query);
};

const getCustomerById = async (id) => {
  return await RameshwarCustomer.findById(id);
};

const updateCustomer = async (id, productData) => {
  return await RameshwarCustomer.findByIdAndUpdate(id, productData, {
    new: true,
  });
};

const deleteCustomer = async (id) => {
  return await RameshwarCustomer.findByIdAndDelete(id);
};

const getCustomerByName = async (name) => {
  const customer = await RameshwarCustomer.findOne({ name });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

const createGST = async (data) => {
  return await RameshwarGST.create(data);
};

const getAllGST = async () => {
  return await RameshwarGST.find().sort({ createdAt: -1 });
};

const getGSTByMonthYear = async (month, year) => {
  return await RameshwarGST.aggregate([
    {
      $addFields: {
        createdMonth: { $month: "$createdAt" },
        createdYear: { $year: "$createdAt" },
      },
    },
    {
      $match: {
        createdMonth: parseInt(month),
        createdYear: parseInt(year),
      },
    },
  ]);
};

const updateGST = async (id, data) => {
  return await RameshwarGST.findByIdAndUpdate(id, data, { new: true });
};

const deleteGST = async (id) => {
  return await RameshwarGST.findByIdAndDelete(id);
};

async function populateSaleBillQuery(query) {
  const bills = await SaleInvoice.find(query)
    .populate("companyId")
    .populate({
      path: "poNumber",
      populate: [{ path: "companyId" }, { path: "assignId" }],
    })
    .populate({
      path: "products.productId",
      populate: { path: "productName hsnCode" },
    })
    .lean()
    .sort({ createdAt: -1 });

  console.log("Fetched Bills:", bills);
  return bills;
}

const getAllSalesBills = async () => {
  return await populateSaleBillQuery({});
};

const getSaleBillsByCreateDate = async (createDate) => {
  return await populateSaleBillQuery({ date: createDate });
};

const getSaleBillsByBillDate = async (billDate) => {
  return await populateSaleBillQuery({ billDate: billDate });
};

const getSaleBillsByProductName = async (productName) => {
  return await populateSaleBillQuery({
    products: {
      $elemMatch: {
        productName: { $regex: new RegExp(`^${productName}$`, "i") },
      },
    },
  });
};

const getSaleBillsByHSNSAC = async (hasnCode) => {
  return await populateSaleBillQuery({ "products.hsnCode": hasnCode });
};

const getSaleBillsByQuantity = async (quantity) => {
  return await populateSaleBillQuery({
    "products.quantity": parseFloat(quantity),
  });
};

const getSaleBillsByRate = async (rate) => {
  return await populateSaleBillQuery({ "products.rate": parseFloat(rate) });
};

const getSaleBillsByPer = async (per) => {
  return await populateSaleBillQuery({ "products.per": per });
};

const getSaleBillsByTotalAmount = async (finalTotal) => {
  return await populateSaleBillQuery({ finalTotal: parseFloat(finalTotal) });
};

const getSaleBillsByCustomerName = async (customerName, billType) => {
  const customer = await RameshwarVendor.findOne({
    name: { $regex: `^${customerName}$`, $options: "i" },
  });

  const bills = await SaleInvoice.find({ customerId: customer?._id }).populate(
    "customerId"
  );

  return bills;
};

const createBrokenPoll = async ({
  companyName,
  product,
  manufacturingDate,
  todayDate,
  brokenPollNumbers,
  brokenCount,
  poNumber,
  totalPoll,
  infoId, 
}) => {
  const brokenPoll = new BrokenPoll({
    product,
    manufacturingDate,
    todayDate,
    brokenPollNumbers,
    brokenCount: brokenPollNumbers.length,
    poNumber,
    companyName,
    totalPoll,
    infoId, 
  });

  return await brokenPoll.save();
};


const getAllBrokenPolls = async (infoId) => {
  const filter = {};

  if (infoId) {
    filter.infoId = infoId;
  }

  return await BrokenPoll.find(filter)
    .populate("companyName")
    .populate("poNumber")
    .populate("infoId") 
    .sort({ createdAt: -1 });
};


const getBrokenPollsByPollId = async (pollId) => {
  return await BrokenPoll.find({ pollId }).populate("poNumber");
};

const deleteBrokenPoll = async (id) => {
  const deleted = await BrokenPoll.findByIdAndDelete(id);
  if (!deleted) throw new Error("Broken poll record not found");
  return deleted;
};

const createPGVCLBrokenPoll = async ({
  companyName,
  product,
  manufacturingDate,
  todayDate,
  brokenPollNumbers,
  brokenCount,
  poNumber,
  totalPoll,
}) => {

  const brokenPoll = new BrokenPoll({
    product,
    manufacturingDate,
    todayDate,
    brokenPollNumbers,
    brokenCount: brokenPollNumbers.length,
    poNumber,
    companyName,
    totalPoll,
  });

  return await brokenPoll.save();
};

const getAllPGVCLBrokenPolls = async () => {
  return await BrokenPoll.find().populate("companyName").populate("poNumber");
};

const getPGVCLBrokenPollsByPollId = async (pollId) => {
  return await BrokenPoll.find({ pollId }).populate("poNumber");
};

const deletePGVCLBrokenPoll = async (id) => {
  const deleted = await BrokenPoll.findByIdAndDelete(id);
  if (!deleted) throw new Error("Broken poll record not found");
  return deleted;
};

function generateAlphaNumericSeries(from, to) {
  if (!from || !to) return [];

  const fromPrefixMatch = from.match(/^[A-Za-z\-]+/);
  const prefix = fromPrefixMatch ? fromPrefixMatch[0] : "";

  const startNum = parseInt(from.replace(prefix, ""));
  const endNum = parseInt(to.replace(prefix, ""));

  if (isNaN(startNum) || isNaN(endNum)) return [];

  const series = [];
  for (let i = startNum; i <= endNum; i++) {
    series.push(`${prefix}${i}`);
  }

  return series;
}

// const createPONumber = async (poData) => {
//   const { from, to, poNumber, companyId, assignId, productId, price, totalQuantity, minimumQuantity, mark } = poData;

//   const pollNumbers = generateAlphaNumericSeries(from, to);

//   const newPO = await PONumber.create({
//     poNumber,
//     companyId,
//     assignId,
//     from,
//     to,
//     totalQuantity,
//     minimumQuantity,
//     pollNumbers,
//     price,
//     mark,
//     productId,
//   });

//   return newPO;
// };

const createPONumber = async (poData) => {
  const {
    from,
    to: _to,
    minimumQuantity,
    poNumber,
    companyId,
    assignId,
    productId,
    price,
    totalQuantity,
    mark,
    isTransferPoll,
  } = poData;

  // Auto-calculate `to` for safety
  let to = _to;
  if (!to && from && minimumQuantity > 0) {
    const prefixMatch = from.match(/^[^0-9]+/);
    const numberMatch = from.match(/\d+/);

    if (prefixMatch && numberMatch) {
      const prefix = prefixMatch[0];
      const startNum = parseInt(numberMatch[0]);
      const endNum = startNum + parseInt(minimumQuantity) - 1;
      to = `${prefix}${endNum}`;
    } else if (/^\d+$/.test(from)) {
      const startNum = parseInt(from);
      const endNum = startNum + parseInt(minimumQuantity) - 1;
      to = `${endNum}`;
    } else {
      throw new Error("Invalid `from` format for poll number series.");
    }
  }

  const pollNumbers = generateAlphaNumericSeries(from, to);

  const newPO = await PONumber.create({
    poNumber,
    companyId,
    assignId,
    from,
    to,
    totalQuantity: pollNumbers.length,
    minimumQuantity,
    pollNumbers,
    price,
    mark,
    productId,
    isTransferPoll,
  });

  return newPO;
};

const getPONumber = async () => {
  return await PONumber.find().populate("companyId assignId productId");
};

const getPONumberByCompanyId = async (companyId) => {
  const poNumbers = await PONumber.find({ companyId }).populate(
    "companyId productId assignId"
  );
  return poNumbers;
};

const getPONumberById = async (id) => {
  return await PONumber.findById(id)
    .populate("companyId")
    .populate("productId")
    .populate({
      path: "assignId",
      populate: {
        path: "userId",
      },
    });
};

const updatePONumber = async (id, data) => {
  return await PONumber.findByIdAndUpdate(id, data, { new: true });
};

const deletePONumber = async (id) => {
  return await PONumber.findByIdAndDelete(id);
};

const getPODetailsByNumber = async (poNumber) => {
  return await PONumber.findOne({ poNumber }).populate(
    "companyId productId assignId"
  );
};

const createAssignTask = async (data) => {
  return await AssignTask.create(data);
};

const getAllAssignedTasks = async () => {
  return await AssignTask.find()
    .populate("poId")
    .populate("fromCompanyId")
    .populate("toCompanyId");
};

const getTasksByCompanyId = async (companyId) => {
  return await AssignTask.find({ toCompanyId: companyId })
    .populate("poId")
    .populate("fromCompanyId")
    .populate("toCompanyId");
};

const getTasksAssignedToCompany = async (companyId) => {
  return AssignTask.find({ toCompanyId: companyId })
    .populate("poId", "poNumber date")
    .populate("fromCompanyId", "name")
    .populate("toCompanyId", "name");
};

const getTaskById = async (taskId) => {
  return AssignTask.findById(taskId)
    .populate("poId", "poNumber date")
    .populate("fromCompanyId", "name")
    .populate("toCompanyId", "name");
};

const getUnseenTasksForNotification = async (companyId) => {
  return AssignTask.find({ toCompanyId: companyId, isNotified: false })
    .populate("poId", "poNumber")
    .populate("fromCompanyId", "name");
};

const markTaskAsNotified = async (taskId) => {
  return AssignTask.findByIdAndUpdate(
    taskId,
    { isNotified: true },
    { new: true }
  );
};

const addPaymentToAdpBill = async (billId, paymentDate, amountPaid) => {
  const bill = await RameshwarPurchaseBill.findById(billId);
  await bill.addPayment(new Date(paymentDate), amountPaid);
  return bill;
};

const addPayment = async (billId, amountPaid, paymentDate) => {
  const bill = await RameshwarPurchaseBill.findById(billId);

  if (!bill) {
    throw new Error("Purchase Bill Not Found");
  }

  bill.paymentHistory.push({ paymentDate, amountPaid });
  bill.paidAmount += amountPaid;
  bill.remainingAmount = bill.finalTotal - bill.paidAmount;
  bill.paymentStatus = bill.remainingAmount <= 0 ? "paid" : "remaining";

  await bill.save();

  return bill;
};

const addReturnAndCommissionService = async (billId, data) => {
  const bill = await RameshwarPurchaseBill.findById(billId);
  if (!bill) throw new Error("Purchase Bill not found");

  if (bill.billType !== "adp")
    throw new Error("Return & Commission allowed only for ADP Bills");

  bill.returnAndCommissionHistory.push(data);
  return await bill.save();
};

const savePODocumentService = async (poId, documentUrl) => {
  const updated = await PONumber.findByIdAndUpdate(
    poId,
    { $push: { document: documentUrl } },
    { new: true }
  );
  return updated;
};

const getPoDocumentsService = async (poId) => {
  const po = await PONumber.findById(poId);
  return po?.document || null;
};

const deletePODocument = async (poId, fileUrl) => {
  const po = await PONumber.findById(poId);
  if (!po) throw new Error("PO not found");

  if (!po.document.includes(fileUrl)) {
    throw new Error("PDF not found in PO document array");
  }

  po.document = po.document.filter((url) => url !== fileUrl);
  await po.save();
  return { message: "PDF deleted successfully", document: po.document };
};

const updateCategoryStockService = async (categoryId, quantity) => {
  const category = await RameshwarCategory.findById(categoryId);
  if (!category) throw new Error("Category not found");

  category.stock = (category.stock || 0) + parseFloat(quantity);
  return await category.save();
};

const updateCategoryAdpStockService = async (categoryId, quantity) => {
  const category = await RameshwarCategory.findById(categoryId);
  if (!category) throw new Error("Category not found");

  category.stock = (category.stock || 0) + parseFloat(quantity);
  return await category.save();
};

const updatePoll = async (id, data) => {
  return await Poll.findByIdAndUpdate(id, data, { new: true });
};

const deletePoll = async (id) => {
  return await Poll.findByIdAndDelete(id);
};

const updateBrokenPoll = async (id, data) => {
  return await BrokenPoll.findByIdAndUpdate(id, data, { new: true });
};

const updatePGVCLPoll = async (id, data) => {
  return await PGVCLPoll.findByIdAndUpdate(id, data, { new: true });
};

const deletePGVCLPoll = async (id) => {
  return await PGVCLPoll.findByIdAndDelete(id);
};

const updateBrokenPGVCLPoll = async (id, data) => {
  return await PGVCLBrokenPoll.findByIdAndUpdate(id, data, { new: true });
};

const decreaseStockService = async (categoryId, quantity) => {
  const qty = parseFloat(quantity);
  if (isNaN(qty) || qty <= 0) throw new Error("Invalid quantity");

  const updated = await RameshwarCategory.findByIdAndUpdate(
    categoryId,
    { $inc: { stock: -qty } },
    { new: true }
  );

  if (!updated) throw new Error("Category not found");

  if (updated.stock < 0) {
    updated.stock = 0;
    await updated.save();
  }

  return updated;
};

const decreaseAdpStockService = async (categoryId, quantity) => {
  const qty = parseFloat(quantity);
  if (isNaN(qty) || qty <= 0) throw new Error("Invalid quantity");

  const updated = await RameshwarCategory.findByIdAndUpdate(
    categoryId,
    { $inc: { stock: -qty } },
    { new: true }
  );

  if (!updated) throw new Error("Category not found");

  if (updated.stock < 0) {
    updated.stock = 0;
    await updated.save();
  }

  return updated;
};

const getPollsByCompanyService = async (companyId) => {
  if (!companyId) {
    throw new Error("Company ID is required.");
  }

  const polls = await Poll.find({ companyName: companyId })
    .populate("companyName", "name")
    .populate("poNumber", "poNumber")
    .populate("usedMaterials.category", "name")
    .sort({ date: -1 });

  return polls;
};

const createFolderService = async (companyId, folderName) => {
  const company = await RameshwarInfo.findById(companyId);
  if (!company) throw new Error("Company not found");

  company.folders.push({ name: folderName, images: [] });
  await company.save();

  return company;
};

const renameFolderService = async (companyId, folderIndex, newName) => {
  const company = await RameshwarInfo.findById(companyId);
  if (!company) throw new Error("Company not found");

  if (!company.folders[folderIndex]) throw new Error("Folder not found");

  company.folders[folderIndex].name = newName;
  await company.save();

  return company;
};

const deleteFolderService = async (companyId, folderIndex) => {
  const company = await RameshwarInfo.findById(companyId);
  if (!company) throw new Error("Company not found");

  if (
    !Array.isArray(company.folders) ||
    folderIndex < 0 ||
    folderIndex >= company.folders.length
  ) {
    throw new Error("Invalid folder index");
  }

  company.folders.splice(folderIndex, 1); // Remove folder at index
  await company.save();
  return company;
};

const uploadImageToFolderService = async (
  companyId,
  folderIndex,
  imageUrl,
  imageName
) => {
  const company = await RameshwarInfo.findById(companyId);

  company.folders[folderIndex].images.push({
    url: imageUrl,
    name: imageName || "",
  });

  await company.save();
  return company;
};

export const getImagesFromFolderService = async (companyId, folderIndex) => {
  const company = await RameshwarInfo.findById(companyId);
  if (!company) throw new Error("Company not found");

  const folder = company.folders[folderIndex];

  return folder?.images;
};

const deleteImageFromFolderService = async (
  companyId,
  folderIndex,
  imageIndex
) => {
  const company = await RameshwarInfo.findById(companyId);
  if (!company) throw new Error("Company not found");

  company.folders[folderIndex].images.splice(imageIndex, 1);
  await company.save();
  return company;
};

const getAllFoldersService = async (companyId) => {
  const company = await RameshwarInfo.findById(companyId);
  if (!company) throw new Error("Company not found");

  return company.folders || [];
};

// const getDashboardStatsService = async () => {
//   const startOfMonth = dayjs().startOf("month").toDate();
//   const today = dayjs().endOf("day").toDate();

//   const totalSales = await SaleInvoice.countDocuments({
//     createdAt: { $gte: startOfMonth, $lte: today }
//   });

//   const totalPurchase = await RameshwarPurchaseBill.countDocuments({
//     createdAt: { $gte: startOfMonth, $lte: today }
//   });

//   const salesGSTResult = await SaleInvoice.aggregate([
//     { $match: { createdAt: { $gte: startOfMonth, $lte: today } } },
//     { $group: { _id: null, totalGST: { $sum: "$gstAmount" } } },
//   ]);
//   const totalSalesGST = salesGSTResult[0]?.totalGST || 0;

//   // Purchase GST Total (CGST + SGST)
//   const purchaseGSTResult = await RameshwarPurchaseBill.aggregate([
//     { $match: { createdAt: { $gte: startOfMonth, $lte: today } } },
//     { $group: { _id: null, totalCGST: { $sum: "$cgst" }, totalSGST: { $sum: "$sgst" } } },
//   ]);
//   const totalPurchaseGST = (purchaseGSTResult[0]?.totalCGST || 0) + (purchaseGSTResult[0]?.totalSGST || 0);

//   // GST Payable = Purchase GST - Sales GST
//   const totalGST = totalPurchaseGST - totalSalesGST;

//   const totalPo = await PONumber.countDocuments({ createdAt: { $gte: startOfMonth, $lte: today } });
//   const totalPolls = await Poll.countDocuments({ date: { $gte: startOfMonth, $lte: today } });
//   const pgvclPolls = await PGVCLPoll.countDocuments({ date: { $gte: startOfMonth, $lte: today } });

//   return {
//     totalSales,
//     totalPurchase,
//     totalGST,
//     totalPo,
//     totalPolls,
//     pgvclPolls,
//   };
// };

export const getDashboardStatsService = async (companyId) => {
  const startOfMonth = dayjs().startOf("month").toDate();
  const today = dayjs().endOf("day").toDate();

  const companyFilter = companyId ? { companyId } : {}; // ⬅️ add companyId filter if passed

  const totalSales = await SaleInvoice.countDocuments({
    createdAt: { $gte: startOfMonth, $lte: today },
    ...companyFilter,
  });

  const totalPurchase = await RameshwarPurchaseBill.countDocuments({
    createdAt: { $gte: startOfMonth, $lte: today },
    ...companyFilter,
  });

  // Sales GST Total (CGST + SGST + IGST)
  const salesGSTResult = await SaleInvoice.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth, $lte: today },
        ...companyFilter,
      },
    },
    {
      $group: {
        _id: null,
        totalCGST: { $sum: "$cgstAmount" },
        totalSGST: { $sum: "$sgstAmount" },
        totalIGST: { $sum: "$gstAmount" }, // assuming gstAmount = IGST
      },
    },
  ]);

  const totalSalesCGST = salesGSTResult[0]?.totalCGST || 0;
  const totalSalesSGST = salesGSTResult[0]?.totalSGST || 0;
  const totalSalesIGST = salesGSTResult[0]?.totalIGST || 0;
  const totalSalesGST = totalSalesCGST + totalSalesSGST + totalSalesIGST;

  // Purchase GST Total (CGST + SGST)
  const purchaseGSTResult = await RameshwarPurchaseBill.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth, $lte: today },
        ...companyFilter,
      },
    },
    {
      $group: {
        _id: null,
        totalCGST: { $sum: "$cgstAmount" },
        totalSGST: { $sum: "$sgstAmount" },
      },
    },
  ]);

  const totalPurchaseCGST = purchaseGSTResult[0]?.totalCGST || 0;
  const totalPurchaseSGST = purchaseGSTResult[0]?.totalSGST || 0;
  const totalPurchaseGST = totalPurchaseCGST + totalPurchaseSGST;

  // GST Payable = Purchase GST - Sales GST
  const gstPayable = totalPurchaseGST - totalSalesGST;

  const totalPo = await PONumber.countDocuments({
    createdAt: { $gte: startOfMonth, $lte: today },
    ...companyFilter,
  });

  const totalPolls = await Poll.countDocuments({
    date: { $gte: startOfMonth, $lte: today },
    ...companyFilter,
  });

  const pgvclPolls = await PGVCLPoll.countDocuments({
    date: { $gte: startOfMonth, $lte: today },
    ...companyFilter,
  });

  console.log(`📄 Total Sales Invoices: ${totalSales}`);
  console.log(`✅ Total Purchase Invoices: ${totalPurchase}`);
  console.log("💵 Sales GST Aggregation Result:", salesGSTResult);
  console.log("🛒 Purchase GST Aggregation Result:", purchaseGSTResult);
  console.log(`💵 Total Sales GST (CGST + SGST + IGST): ${totalSalesGST}`);
  console.log(`🛒 Total Purchase GST (CGST + SGST): ${totalPurchaseGST}`);
  console.log(`📈 GST Payable (Purchase GST - Sales GST): ${gstPayable}`);
  console.log(`📄 Total PO Created: ${totalPo}`);
  console.log(`📄 Total Polls Created: ${totalPolls}`);
  console.log(`📄 PGVCL Polls Created: ${pgvclPolls}`);

  return {
    totalSales,
    totalPurchase,
    gstPayable,
    totalPo,
    totalPolls,
    pgvclPolls,
  };
};

// export const getDashboardStatsService = async () => {
//   const startOfMonth = dayjs().startOf("month").toDate();
//   const today = dayjs().endOf("day").toDate();

//   const totalSales = await SaleInvoice.countDocuments({
//     createdAt: { $gte: startOfMonth, $lte: today }
//   });

//   const totalPurchase = await RameshwarPurchaseBill.countDocuments({
//     createdAt: { $gte: startOfMonth, $lte: today }
//   });

//   // Sales GST Total (CGST + SGST + IGST)
//   const salesGSTResult = await SaleInvoice.aggregate([
//     { $match: { createdAt: { $gte: startOfMonth, $lte: today } } },
//     {
//       $group: {
//         _id: null,
//         totalCGST: { $sum: "$cgstAmount" },
//         totalSGST: { $sum: "$sgstAmount" },
//         totalIGST: { $sum: "$gstAmount" }, // assuming gstAmount is IGST
//       }
//     }
//   ]);

//   const totalSalesCGST = salesGSTResult[0]?.totalCGST || 0;
//   const totalSalesSGST = salesGSTResult[0]?.totalSGST || 0;
//   const totalSalesIGST = salesGSTResult[0]?.totalIGST || 0;
//   const totalSalesGST = totalSalesCGST + totalSalesSGST + totalSalesIGST;

//   // Purchase GST Total (CGST + SGST)
//   const purchaseGSTResult = await RameshwarPurchaseBill.aggregate([
//     { $match: { createdAt: { $gte: startOfMonth, $lte: today } } },
//     {
//       $group: {
//         _id: null,
//         totalCGST: { $sum: "$cgstAmount" },
//         totalSGST: { $sum: "$sgstAmount" },
//       }
//     }
//   ]);

//   const totalPurchaseCGST = purchaseGSTResult[0]?.totalCGST || 0;
//   const totalPurchaseSGST = purchaseGSTResult[0]?.totalSGST || 0;
//   const totalPurchaseGST = totalPurchaseCGST + totalPurchaseSGST;

//   // GST Payable = Purchase GST - Sales GST
//   const gstPayable = totalPurchaseGST - totalSalesGST;

//   const totalPo = await PONumber.countDocuments({ createdAt: { $gte: startOfMonth, $lte: today } });
//   const totalPolls = await Poll.countDocuments({ date: { $gte: startOfMonth, $lte: today } });
//   const pgvclPolls = await PGVCLPoll.countDocuments({ date: { $gte: startOfMonth, $lte: today } });

//   console.log(`📄 Total Sales Invoices: ${totalSales}`);
//   console.log(`✅ Total Purchase Invoices: ${totalPurchase}`);
//   console.log("💵 Sales GST Aggregation Result:", salesGSTResult);
//   console.log("🛒 Purchase GST Aggregation Result:", purchaseGSTResult);
//   console.log(`💵 Total Sales GST (CGST + SGST + IGST): ${totalSalesGST}`);
//   console.log(`🛒 Total Purchase GST (CGST + SGST): ${totalPurchaseGST}`);
//   console.log(`📈 GST Payable (Purchase GST - Sales GST): ${gstPayable}`);
//   console.log(`📄 Total PO Created: ${totalPo}`);
//   console.log(`📄 Total Polls Created: ${totalPolls}`);
//   console.log(`📄 PGVCL Polls Created: ${pgvclPolls}`);

//   return {
//     totalSales,
//     totalPurchase,
//     gstPayable,
//     totalPo,
//     totalPolls,
//     pgvclPolls,
//   };
// };

const getPurchaseGSTByMonth = async (month, year) => {
  const purchase = await RameshwarPurchaseBill.aggregate([
    {
      $addFields: {
        createdMonth: { $month: "$createdAt" },
        createdYear: { $year: "$createdAt" },
      },
    },
    {
      $match: {
        createdMonth: parseInt(month),
        createdYear: parseInt(year),
      },
    },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productName",
        purchaseCGST: { $sum: "$cgstAmount" },
        purchaseSGST: { $sum: "$sgstAmount" },
      },
    },
    {
      $project: {
        productName: "$_id",
        purchaseCGST: { $round: ["$purchaseCGST", 2] },
        purchaseSGST: { $round: ["$purchaseSGST", 2] },
        totalPurchaseGST: {
          $round: [{ $add: ["$purchaseCGST", "$purchaseSGST"] }, 2],
        },
      },
    },
    { $sort: { productName: 1 } },
  ]);

  // 🔸 Total of all categories (sum of CGST + SGST)
  const total = purchase.reduce(
    (acc, curr) => {
      acc.totalCGST += curr.purchaseCGST;
      acc.totalSGST += curr.purchaseSGST;
      acc.totalGST += curr.totalPurchaseGST;
      return acc;
    },
    { totalCGST: 0, totalSGST: 0, totalGST: 0 }
  );

  return { purchase, total };
};

const getSalesGSTByMonth = async (companyId, month, year) => {
  const companyObjId = new mongoose.Types.ObjectId(companyId);

  const sales = await SaleInvoice.aggregate([
    {
      $addFields: {
        createdMonth: { $month: "$createdAt" },
        createdYear: { $year: "$createdAt" },
      },
    },
    {
      $match: {
        companyId: companyObjId,
        createdMonth: parseInt(month),
        createdYear: parseInt(year),
      },
    },
    {
      $addFields: {
        totalProductQty: {
          $reduce: {
            input: "$products",
            initialValue: 0,
            in: { $add: ["$$value", "$$this.quantity"] },
          },
        },
      },
    },
    {
      $group: {
        _id: "$customerId",
        totalCGST: { $sum: "$cgstAmount" },
        totalSGST: { $sum: "$sgstAmount" },
        totalPollQty: { $sum: "$totalProductQty" },
      },
    },
    {
      $lookup: {
        from: "rameshwarcustomers",
        localField: "_id",
        foreignField: "_id",
        as: "customer",
      },
    },
    { $unwind: "$customer" },
    {
      $project: {
        customerName: "$customer.name",
        totalCGST: { $round: ["$totalCGST", 2] },
        totalSGST: { $round: ["$totalSGST", 2] },
        totalGST: { $round: [{ $add: ["$totalCGST", "$totalSGST"] }, 2] },
        pollQuantity: "$totalPollQty",
      },
    },
    { $sort: { customerName: 1 } },
  ]);

  // 🔸 Total of all customers (sum of CGST + SGST + poll quantity)
  const total = sales.reduce(
    (acc, curr) => {
      acc.totalCGST += curr.totalCGST;
      acc.totalSGST += curr.totalSGST;
      acc.totalGST += curr.totalGST;
      acc.totalPollQty += curr.pollQuantity;
      return acc;
    },
    { totalCGST: 0, totalSGST: 0, totalGST: 0, totalPollQty: 0 }
  );

  return { sales, total };
};

const getCombinedPurchaseAndSalesGST = async (companyId, month, year) => {
  try {
    const { purchase, total: purchaseTotal } = await getPurchaseGSTByMonth(
      month,
      year
    );
    const { sales, total: salesTotal } = await getSalesGSTByMonth(
      companyId,
      month,
      year
    );

    const gstRecord = await RameshwarGST.aggregate([
      {
        $addFields: {
          createdMonth: { $month: "$createdAt" },
          createdYear: { $year: "$createdAt" },
        },
      },
      {
        $match: {
          createdMonth: parseInt(month),
          createdYear: parseInt(year),
        },
      },
      { $limit: 1 },
    ]);

    const gstSummary = gstRecord[0] || null;
    let gstDifference = null;

    if (gstSummary) {
      gstDifference = {
        pollQuantityDiff: gstSummary.pollQuantity - salesTotal.totalPollQty,
        gstDiff: gstSummary.gst - salesTotal.totalGST,
        saleVsPurchaseGSTDiff: salesTotal.totalGST - purchaseTotal.totalGST,
        netGST:
          gstSummary.gst -
          salesTotal.totalGST +
          (salesTotal.totalGST - purchaseTotal.totalGST),
      };
    }

    return {
      purchase,
      purchaseTotal,
      sales,
      salesTotal,
      gstRecorded: gstSummary,
      gstDifference,
    };
  } catch (error) {
    console.error("Combined GST Aggregation Error:", error);
    throw error;
  }
};

const downloadFileFromUrl = (fileUrl, fileName, res) => {
  return new Promise((resolve, reject) => {
    const parsed = new URL(fileUrl);
    const client = parsed.protocol === "https:" ? https : http;

    client
      .get(fileUrl, (fileRes) => {
        if (fileRes.statusCode !== 200) {
          return reject(new Error("Failed to fetch file"));
        }

        // Get extension from actual file URL if not provided in fileName
        const urlExt = fileUrl.split(".").pop().split("?")[0];
        const finalName = fileName.includes(".")
          ? fileName
          : `${fileName}.${urlExt}`;
        const mimeType = mime.lookup(finalName) || "application/octet-stream";

        res.setHeader("Content-Type", mimeType);
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${finalName}"`
        );

        fileRes.pipe(res);
        fileRes.on("end", resolve);
      })
      .on("error", reject);
  });
};

export default {
  createCategory, getCategoriesByCompany,
  getCategories,
  updateCategory,
  deleteCategory,
  decodeBarcode,
  getAllBarcodes,
  getCompanyInfoByUserId,
  getCategoryByName,
  downloadFileFromUrl,
  getUserById,
  getDashboardData,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsById,
  createMetal,
  getMetal,
  updateMetal,
  deleteMetal,
  createWalletAmount,
  getWalletAmount,
  updateWalletAmount,
  deleteWalletAmount,
  createInfo,
  getInfo,
  updateInfo,
  deleteInfo,
  updatePaymentStatusService,
  getDaybookData,
  uploadWarrantyData,
  createPurchaseBill,
  getPurchaseBillById,
  getAllPurchaseBills,
  updatePurchaseBill,
  deletePurchaseBill,
  downloadPurchaseBillsPDF,
  downloadPurchaseBillsCSV,
  validateWarrantyNumbers,
  addWarrantyNumbersForProducts,
  updateOrderStatusService,
  updateShippingStatusService,
  getOrdersByShippingStatusService,
  createVendor,
  getVendor,
  getVendorById,
  updateVendor,
  deleteVendor,
  createBill,
  getBillById,
  getAllBills,
  updateBill,
  deleteBill,
  downloadBillsPDF,
  downloadBillsCSV,
  getPurchaseBillsByBillType,
  getVendorByName,
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  createRoleUser,
  getAllRoleUsers,
  getRoleUserById,
  updateRoleUser,
  deleteRoleUser,
  createPoll,
  getPolls,
  calculateUsage,
  getBarcodeImage,
  bulkDeleteProducts,
  bulkPrintProducts,
  createChallan,
  getChallanById,
  getAllChallans,
  updateChallan,
  deleteChallan,
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerByName,
  getPurchaseBillsByCreateDate,
  getPurchaseBillsByBillDate,
  getPurchaseBillsByProductName,
  getPurchaseBillsByHSNSAC,
  getPurchaseBillsByQuantity,
  getPurchaseBillsByRate,
  getPurchaseBillsByPer,
  getPurchaseBillsByDiscount,
  getPurchaseBillsByTotalAmount,
  getPurchaseBillsByPaymentType,
  getSaleBillsByBillDate,
  getSaleBillsByCreateDate,
  getSaleBillsByHSNSAC,
  getSaleBillsByProductName,
  getSaleBillsByProductName,
  getSaleBillsByProductName,
  getSaleBillsByQuantity,
  getSaleBillsByRate,
  getSaleBillsByTotalAmount,
  getSaleBillsByPer,
  getAllSalesBills,
  createLocalPurchaseBill,
  updateLocalPurchaseBill,
  updateBrokenPoll,
  deleteLocalPurchaseBill,
  getAllLocalPurchaseBills,
  getLocalPurchaseBillById,
  getLocalPurchaseBillsByBillDate,
  getLocalPurchaseBillsByCreateDate,
  getLocalPurchaseBillsByDiscount,
  getLocalPurchaseBillsByPaymentType,
  getLocalPurchaseBillsByPer,
  getLocalPurchaseBillsByProductName,
  getLocalPurchaseBillsByQuantity,
  getLocalPurchaseBillsByRate,
  getLocalPurchaseBillsByTotalAmount,
  downloadLocalPurchaseBillsCSV,
  downloadLocalPurchaseBillsPDF,
  createBrokenPoll,
  getAllBrokenPolls,
  getBrokenPollsByPollId,
  deleteBrokenPoll,
  createPONumber,
  getPONumber,
  getPODetailsByNumber,
  getPONumberById,
  updatePONumber,
  deletePONumber,
  getPurchaseBillsByVendorName,
  getSaleBillsByCustomerName,
  createAssignTask,
  getAllAssignedTasks,
  getTasksByCompanyId,
  savePODocumentService,
  getPoDocumentsService,
  getTasksAssignedToCompany,
  getUnseenTasksForNotification,
  getTaskById,
  markTaskAsNotified,
  addPaymentToAdpBill,
  getPONumberByCompanyId,
  addPayment,
  addReturnAndCommissionService,
  updatePoll,
  deletePoll,
  createPGVCLPoll,
  getPGVCLPolls,
  calculateUsagePGVCL,
  createPGVCLBrokenPoll,
  getAllPGVCLBrokenPolls,
  getPGVCLBrokenPollsByPollId,
  deletePGVCLBrokenPoll,
  deletePODocument,
  updateCategoryStockService,
  updatePGVCLPoll,
  updateBrokenPGVCLPoll,
  deletePGVCLPoll,
  decreaseStockService,
  updateCategoryAdpStockService,
  decreaseAdpStockService,
  getPollsByCompanyService,
  getDashboardStatsService,
  createFolderService,
  renameFolderService,
  uploadImageToFolderService,
  getAllFoldersService,
  deleteImageFromFolderService,
  getImagesFromFolderService,
  getSaleInvoicesByCompanyIdService,
  getPONumberByAssignIdService,
  getSalesGSTByMonth,
  getCombinedPurchaseAndSalesGST,
  createGST,
  getAllGST,
  getGSTByMonthYear,
  updateGST,
  deleteGST,
  getCompanyByIdService,
  deleteFolderService,
  createLocalCategory,
  getLocalCategories,
  updateLocalCategory,
  deleteLocalCategory,
};
