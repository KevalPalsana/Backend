import { ApiError } from "../utils/ApiError.js";
import httpStatus, { status } from "http-status"
import { Expense } from "../models/expense.model.js";
import Warranty from "../models/city.model.js";
import OrderSummary from "../models/orderSummary.model.js";
import Group from "../models/category.model.js";
import GroupItem from "../models/subCategory.model.js";
import SPJProduct from "../models/product.model.js";
import Design from "../models/design.model.js";
import Size from "../models/size.model.js";
import MarketRate from "../models/rate.model.js";
import { Labour } from "../models/labour.model.js";
import ItemDetails from "../models/itemDetails.model.js";
import cityModel from "../models/city.model.js";
import State from "../models/state.model.js";
import Customer from "../models/customer.model.js";
import GST from "../models/gst.model.js";
import Info from "../models/info.model.js";
import HUIDRule from "../models/huidRule.model.js";
import Bill from "../models/orderSummary.model.js";
import SerialNo from "../models/serialNo.model.js";
import { SPJUser } from "../models/user.model.js";
import Metal from "../models/metal.model.js";
import Uchak from "../models/uchak.model.js";
import Percentage from "../models/percentage.model.js";
import PerGram from "../models/perGram.model.js";
import PDFDocument from 'pdfkit';
import nonBarcodeCategory from "../models/nonBarcodeCategory.model.js";
import ExpenseCategory from "../models/expenseCategory.model.js";
import roleModel from "../models/role.model.js";
import roleUserModel from "../models/roleUser.model.js";
import NonPerGram from "../models/nonPerGram.model.js";
import NonPercentage from "../models/nonPercentage.model.js";
import NonUchak from "../models/nonUchak.model.js";
import { identcode } from "bwip-js/node";
import SPJNonBarcodeProduct from "../models/nonBarcode.model.js";
import ScanLog from "../models/scanLog.model.js";
import PurchaseBill from "../models/purchaseInvoice.model.js";
import mongoose from "mongoose";

const createSize = async (categoryData) => {
  return await Size.create(categoryData);
};

const getSize = async () => {
  return Size.find();
};

const getSizeByItemId = async (id) => {
  return await Size.findById(id);
};

const updateSize = async (id, categoryData) => {
  const updateData = await Size.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteSize = async (id) => {
  const deleteId = await Size.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};


export const updateStockPricesForMultipleCategories = async (categoryPriceMap) => {
  try {
    const products = await SPJProduct.find({ groupId: { $in: Object.keys(categoryPriceMap) } });
    const nonBarcodeProducts = await SPJNonBarcodeProduct.find({ groupId: { $in: Object.keys(categoryPriceMap) } });

    const allProducts = [...products, ...nonBarcodeProducts];

    for (let product of allProducts) {
      const newMarketRate = categoryPriceMap[product.groupId];

      product.marketRateUsed = newMarketRate;
      product.calculatedMarketRate = newMarketRate * parseFloat(product.netWeight || 0);
      product.totalPrice = product.calculatedMarketRate + parseFloat(product.labour || 0);

      if (product.extraRate) {
        if (typeof product.extraRate === "number") {
          product.totalPrice += product.extraRate;
        } else if (typeof product.extraRate === "string" && product.extraRate.endsWith("%")) {
          const percentage = parseFloat(product.extraRate.replace("%", ""));
          product.totalPrice += (percentage / 100) * product.totalPrice;
        }
      }

      product.GMEPrice = product.calculatedMarketRate + parseFloat(product.labour || 0) + parseFloat(product.extraRate || 0);
      product.finalPrice = product.GMEPrice + parseFloat(product.gst || 0);

      await product.save();
    }

    console.log(`Updated ${allProducts.length} stock items for market rate changes.`);
    return { success: true, message: `${allProducts.length} stock items updated.` };
  } catch (error) {
    console.error("Error updating stock for market rate changes:", error);
    return { success: false, error: error.message };
  }
};

// ✅ **Create or Update Market Rate (Updates Both Barcode & NonBarcode Products)**
export const createMarketRate = async (rates) => {
  try {
    if (!Array.isArray(rates) || rates.length === 0) {
      throw new Error("Invalid input: Expected a non-empty array.");
    }

    // Extract category IDs from the rates array
    const categoryIds = rates.map(({ categoryId }) => categoryId);

    // Bulk update market rates
    const bulkOperations = rates.map(({ categoryId, price }) => ({
      updateOne: {
        filter: { categoryId },
        update: { $set: { price } },
        upsert: true, // Insert if not found
      },
    }));

    const result = await MarketRate.bulkWrite(bulkOperations);
    console.log("Bulk Market Rate Update:", result);

    // Fetch updated market rates
    const updatedRates = await MarketRate.find({ categoryId: { $in: categoryIds } });

    // Map categoryId -> newPrice
    const categoryPriceMap = updatedRates.reduce((acc, rate) => {
      acc[rate.categoryId] = parseFloat(rate.price);
      return acc;
    }, {});

    // Update stock items for all affected categories
    await updateStockPricesForMultipleCategories(categoryPriceMap);

    return result;
  } catch (error) {
    console.error("Error in createMarketRate:", error);
    throw new Error("Failed to create or update market rates.");
  }
};



const getMarketRate = async () => {
  return MarketRate.find().populate("categoryId");
};

const getMarketRateByCategoryId = async (categoryId) => {
  try {
    return await MarketRate.find({ categoryId }).populate('categoryId');
  } catch (error) {
    throw new Error(`Error fetching market rate: ${error.message}`);
  }
};

const updateMarketRate = async (id, rateData) => {
  const updateData = await MarketRate.findByIdAndUpdate(id, rateData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'MarketRate not found');
  return updateData;
};

const deleteMarketRate = async (id) => {
  const deleteId = await MarketRate.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'MarketRate not found');
  return deleteId;
};

const createDesign = async (data) => {
  return await Design.create(data);
};

const getDesign = async () => {
  return Design.find();
};

const getDesignByItemId = async (groupItemId) => {
  const subCategories = await GroupItem.find({ groupItemId });

  return subCategories;
};


const updateDesign = async (id, categoryData) => {
  const updateData = await Design.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteDesign = async (id) => {
  const deleteId = await Design.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createGroup = async (categoryData) => {
  if (!categoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingCategory = await Group.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Category with name "${categoryData.name}" already exists.`);
  }
  return Group.create(categoryData);
};

const getGroups = async () => {
  return Group.find();
};

const updateGroup = async (id, categoryData) => {
  const updateData = await Group.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
  return updateData;
};

const deleteGroup = async (id) => {
  const deleteId = await Group.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  return deleteId;
};

const createGroupItem = async (categoryData) => {
  if (!categoryData.itemName) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingCategory = await GroupItem.findOne({ itemName: categoryData?.itemName })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Sub Category with name "${categoryData.itemName}" already exists.`);
  }
  return GroupItem.create(categoryData);
};

const getGroupItem = async () => {
  return GroupItem.find();
};


const updateGroupItem = async (id, categoryData) => {
  const updateData = await GroupItem.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  return updateData;
};

const deleteGroupItem = async (id) => {
  const deleteId = await GroupItem.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  return deleteId;
};

const createMetal = async (categoryData) => {
  if (!categoryData.metalName) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingCategory = await Metal.findOne({ metalName: categoryData?.metalName })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Sub Category with name "${categoryData.metalName}" already exists.`);
  }
  return Metal.create(categoryData);
};

const getMetal = async () => {
  return Metal.find();
};


const updateMetal = async (id, categoryData) => {
  const updateData = await Metal.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  return updateData;
};

const deleteMetal = async (id) => {
  const deleteId = await Metal.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  return deleteId;
};



const createProduct = async (groupId, groupItemId, productsArray) => {
  return await SPJProduct.bulkInsertProducts(groupId, groupItemId, productsArray);
};

const getProducts = async (query = {}) => {
  return await SPJProduct.find(query).populate('groupId groupItemId design size');
};

const getProductsById = async (id) => {
  return await SPJProduct.findById(id).populate('groupId groupItemId design size');
};

const getProductByBarCode = async (barCode) => {
  try {
    // Fetch the product using the barcode
    const product = await SPJProduct.findOne({ barCode }).populate("groupId groupItemId design size");

    if (!product) {
      throw new Error("Product not found.");
    }

    // Create a scan log entry
    const scanLog = new ScanLog({
      barcode: barCode,
      productId: product._id,
    });

    await scanLog.save();

    return { product, scanLog };
  } catch (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
};


const getProductsByDate = async (fromDate, toDate) => {
  if (!fromDate || !toDate) {
    throw new Error('Both fromDate and toDate are required.');
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);

  if (isNaN(from) || isNaN(to) || from > to) {
    throw new Error('Invalid date range: Ensure fromDate is before toDate.');
  }

  const products = await SPJProduct.find({
    createdAt: { $gte: from, $lte: to },
  });

  return products;
};

async function populateProductQuery(query) {
  const products = await SPJProduct.find(query)
    .populate('groupItemId', 'itemName')
    .populate('groupId', 'categoryName')
    .lean();
  return products;
}

export async function getProductsByGrossWeight(toWeight) {
  const numericValue = parseFloat(toWeight);
  return await populateProductQuery({ toWeight: numericValue });
}

export async function getProductsByNetWeight(netWeight) {
  const numericValue = parseFloat(netWeight);
  return await populateProductQuery({ netWeight: numericValue });
}

export async function getProductsByFineWeight(fineWeight) {
  const numericValue = parseFloat(fineWeight);
  return await populateProductQuery({ fineWeight: numericValue });
}

export async function getProductsByBarCode(barCode) {
  const regex = new RegExp(barCode, 'i');
  return await populateProductQuery({ barCode: { $regex: regex } });
}

export async function getProductsByGroupId(groupName) {
  try {
    const group = await Group.findOne({ name: groupName }).select("_id name");

    if (!group) {
      throw new Error("Group not found");
    }

    return await SPJProduct.find({ groupId: group._id })
      .populate("groupId", "name")  
      .populate("groupItemId", "itemName")
      .select("-__v -createdAt -updatedAt"); 

  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProductsByGroupItemId(itemName) {
  try {
    const groupItem = await GroupItem.findOne({ itemName: itemName }).select("_id itemName");

    if (!groupItem) {
      throw new Error("GroupItem not found");
    }

    return await SPJProduct.find({ groupItemId: groupItem._id })
      .populate("groupId", "name")  
      .populate("groupItemId", "itemName")
      .select("-__v -createdAt -updatedAt"); 

  } catch (error) {
    throw new Error(error.message);
  }}

export async function getProductsByWastage(wastage) {
  const regex = new RegExp(wastage, 'i');
  return await populateProductQuery({ wastage: { $regex: regex } });
}

export async function getProductsByHsnCode(hsnCode) {
  const regex = new RegExp(hsnCode, 'i');
  return await populateProductQuery({ hsnCode: { $regex: regex } });
}

export async function getProductsByGroupName(group) {
  const regex = new RegExp(group, 'i');
  return await populateProductQuery({ group: { $regex: regex } });
}

export async function getProductsByGoldRate(goldRate) {
  const numericValue = parseFloat(goldRate);
  return await populateProductQuery({ goldRate: numericValue });
}

export async function getProductsBySilverRate(silverRate) {
  const numericValue = parseFloat(silverRate);
  return await populateProductQuery({ silverRate: numericValue });
}

export async function getProductsByAccount(account) {
  const regex = new RegExp(account, 'i');
  return await populateProductQuery({ account: { $regex: regex } });
}

export async function getProductsByLabour(labour) {
  const numericValue = parseFloat(labour);
  return await populateProductQuery({ labour: numericValue });
}

export async function getProductsByExtraRate(extraRate) {
  const numericValue = parseFloat(extraRate);
  return await populateProductQuery({ extraRate: numericValue });
}

export async function getProductsByLocation(location) {
  const regex = new RegExp(location, 'i');
  return await populateProductQuery({ location: { $regex: regex } });
}

export async function getProductsByPcs(pcs) {
  const numericValue = parseInt(pcs, 10);
  return await populateProductQuery({ pcs: numericValue });
}

export async function getProductsByDesign(design) {
  return await populateProductQuery({ design });
}

export async function getProductsBySize(size) {
  return await populateProductQuery({ size });
}

export async function getProductsByMoti(moti) {
  const numericValue = parseFloat(moti);
  return await populateProductQuery({ moti: numericValue });
}

export async function getProductsByStone(stone) {
  const numericValue = parseFloat(stone);
  return await populateProductQuery({ stone: numericValue });
}

export async function getProductsByJadatr(jadatr) {
  const numericValue = parseFloat(jadatr);
  return await populateProductQuery({ jadatr: numericValue });
}

export async function getProductsByHuid(huid) {
  const regex = new RegExp(huid, 'i');
  return await populateProductQuery({ huid: { $regex: regex } });
}

export async function getProductsByHuidRule(huidRule) {
  return await populateProductQuery({ huidRule });
}

export async function getProductsByHuidCharge(huidCharge) {
  const numericValue = parseFloat(huidCharge);
  return await populateProductQuery({ huidCharge: numericValue });
}

export async function getProductsByTotalPrice(totalPrice) {
  const numericValue = parseFloat(totalPrice);
  return await populateProductQuery({ totalPrice: numericValue });
}

export async function getProductsByMarketRateUsed(marketRateUsed) {
  const numericValue = parseFloat(marketRateUsed);
  return await populateProductQuery({ marketRateUsed: numericValue });
}

export async function getProductsByCalculatedMarketRate(calculatedMarketRate) {
  const numericValue = parseFloat(calculatedMarketRate);
  return await populateProductQuery({ calculatedMarketRate: numericValue });
}

export async function getProductsByGMEPrice(GMEPrice) {
  const numericValue = parseFloat(GMEPrice);
  return await populateProductQuery({ GMEPrice: numericValue });
}

export async function getProductsByGst(gst) {
  const numericValue = parseFloat(gst);
  return await populateProductQuery({ gst: numericValue });
}

export async function getProductsByFinalPrice(finalPrice) {
  const numericValue = parseFloat(finalPrice);
  return await populateProductQuery({ finalPrice: numericValue });
}


const createCategory = async (data) => {
  return await nonBarcodeCategory.create(data);
};

const getAllCategories = async () => {
  return await nonBarcodeCategory.find();
};

const getCategroyById = async (id) => {
  return await nonBarcodeCategory.findById(id);
};

const updateCategory = async (id, data) => {
  return await nonBarcodeCategory.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategory = async (id) => {
  return await nonBarcodeCategory.findByIdAndDelete(id);
};

// const updateProduct = async (id, productData) => {
//   return await SPJProduct.findByIdAndUpdate(id, productData, {
//     new: true,
//   });
// };

const updateProduct = async (stockId, groupId, groupItemId, products) => {
  try {
    console.log("Updating Stock:", { stockId, groupId, groupItemId, products });

    if (!mongoose.Types.ObjectId.isValid(stockId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid stock ID format");
    }

    // Ensure groupId and groupItemId are valid
    if (!mongoose.Types.ObjectId.isValid(groupId?._id) || !mongoose.Types.ObjectId.isValid(groupItemId?._id)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid group or category ID format");
    }


    let updatedProducts = [];

    for (const product of products) {
      if (!mongoose.Types.ObjectId.isValid(product._id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid product ID: ${product._id}`);
      }


    const updatedProduct = await SPJProduct.findByIdAndUpdate(
      product._id,
      {
        groupId: new mongoose.Types.ObjectId(groupId?._id),
        groupItemId: new mongoose.Types.ObjectId(groupItemId?._id),
        toWeight: product.toWeight,
        lessWeight: product.lessWeight || "0",
        wastage: product.wastage || "0",
        labour: product.labour || "0",
        hsnCode: product.hsnCode || "0",
        location: product.location || "",
        pcs: product.pcs || "1",
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new ApiError(httpStatus.NOT_FOUND, "Stock not found");
    }

    return updatedProduct;
  }
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  return await SPJProduct.findByIdAndDelete(id);

};

const createNonBarcodeProduct = async (groupId, groupItemId, productName, productsArray) => {
  return await SPJNonBarcodeProduct.bulkInsertProducts(groupId, groupItemId, productName, productsArray);
};

const getNonBarcodeProducts = async () => {
  return await SPJNonBarcodeProduct.find().populate('groupId groupItemId design size');
};

const getNonBarcodeProductsById = async (id) => {
  return await SPJNonBarcodeProduct.findById(id).populate('groupId groupItemId design size');
};

const updateNonBarcodeProduct = async (id, productData) => {
  return await SPJNonBarcodeProduct.findByIdAndUpdate(id, productData, {
    new: true,
  });
};

const deleteNonBarcodeProduct = async (id) => {
  return await SPJNonBarcodeProduct.findByIdAndDelete(id);
};

// const getNonBarcodeProductsByGroupItemId = async (groupItemId, query = {}) => {
//   return await SPJNonBarcodeProduct.find({ groupItemId, ...query }).populate('groupId groupItemId design size');
// };

// const getNonBarcodeProductsByGroupId = async (groupId) => {
//   try {
//     return await SPJNonBarcodeProduct.find({ groupId }).populate('groupId groupItemId design size');
//   } catch (error) {
//     throw new Error(`Error fetching products by Group ID: ${error.message}`);
//   }
// };

// const getNonBarcodeProductsByDesign = async (design) => {
//   try {
//     return await SPJNonBarcodeProduct.find({ design }).populate('groupId groupItemId design size');
//   } catch (error) {
//     throw new Error(`Error fetching products by Group ID: ${error.message}`);
//   }
// };
// const getNonBarcodeProductsBySize = async (size) => {
//   try {
//     return await SPJNonBarcodeProduct.find({ size }).populate('groupId groupItemId design size');
//   } catch (error) {
//     throw new Error(`Error fetching products by Group ID: ${error.message}`);
//   }
// };


// const getNonBarcodeProductsByLocation = async (location) => {
//   try {
//     return await SPJNonBarcodeProduct.find({ location }).populate('groupId groupItemId');
//   } catch (error) {
//     throw new Error(`Error fetching products by location: ${error.message}`);
//   }
// };

// const getNonBarcodeProductsByGrossWeight = async (minWeight, maxWeight) => {
//   if (!minWeight || !maxWeight) {
//     throw new Error('Invalid range: minWeight and maxWeight are required.');
//   }

//   const min = parseFloat(minWeight);
//   const max = parseFloat(maxWeight);

//   if (isNaN(min) || isNaN(max) || min > max) {
//     throw new Error('Invalid range: Ensure minWeight is less than maxWeight.');
//   }

//   const products = await SPJNonBarcodeProduct.find({
//     toWeight: { $gte: min, $lte: max },
//   });

//   return products;
// };

const getNonBarcodeProductsByDate = async (fromDate, toDate) => {
  if (!fromDate || !toDate) {
    throw new Error('Both fromDate and toDate are required.');
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);

  if (isNaN(from) || isNaN(to) || from > to) {
    throw new Error('Invalid date range: Ensure fromDate is before toDate.');
  }

  const products = await SPJNonBarcodeProduct.find({
    createdAt: { $gte: from, $lte: to },
  });

  return products;
};

async function populateNonProductQuery(query) {
  const products = await SPJNonBarcodeProduct.find(query)
    .populate('groupItemId', 'itemName')
    .populate('groupId', 'categoryName')
    .lean();

    console.log("Fetched Products:", products); 
  return products;
}

const getNonProductsByGrossWeight = async (toWeight) => {
  const numericValue = parseFloat(toWeight);
  return await populateNonProductQuery({ toWeight: numericValue });
}

const getNonProductsByNetWeight = async (netWeight) => {
  const numericValue = parseFloat(netWeight);
  return await populateNonProductQuery({ netWeight: numericValue });
}

const getNonProductsByFineWeight = async (fineWeight) => {
  const numericValue = parseFloat(fineWeight);
  return await populateNonProductQuery({ fineWeight: numericValue });
}


const getNonProductsByGroupId = async (groupId) => {
  return await populateNonProductQuery({ groupId });
}

const getNonProductsByGroupItemId = async (groupItemId) => {
  return await populateNonProductQuery({ groupItemId });
}

const getNonProductsByWastage = async (wastage) => {
  const regex = new RegExp(wastage, 'i');
  return await populateNonProductQuery({ wastage: { $regex: regex } });
}

const getNonProductsByHsnCode = async (hsnCode) => {
  const regex = new RegExp(hsnCode, 'i');
  return await populateNonProductQuery({ hsnCode: { $regex: regex } });
}

const getNonProductsByGroupName = async (groupName) => {
  // Assuming the product field "group" (not groupId) holds a string value
  const regex = new RegExp(groupName, 'i');
  return await populateNonProductQuery({ groupName: { $regex: regex } });
}

const getNonProductsByGoldRate = async (goldRate) => {
  const numericValue = parseFloat(goldRate);
  return await populateNonProductQuery({ goldRate: numericValue });
}

const getNonProductsByAccount = async (account) => {
  const regex = new RegExp(account, 'i');
  return await populateNonProductQuery({ account: { $regex: regex } });
}

const getNonProductsByLabour = async (labour) => {
  const numericValue = parseFloat(labour);
  return await populateNonProductQuery({ labour: numericValue });
}

const getNonProductsByExtraRate = async (extraRate) => {
  const numericValue = parseFloat(extraRate);
  return await populateNonProductQuery({ extraRate: numericValue });
}

const getNonProductsByLocation = async (location) => {
  const regex = new RegExp(location, 'i');
  return await populateNonProductQuery({ location: { $regex: regex } });
}

const getNonProductsByPcs = async (pcs) => {
  const numericValue = parseInt(pcs, 10);
  return await populateNonProductQuery({ pcs: numericValue });
}

const getNonProductsByTotalPrice = async (totalPrice) => {
  const numericValue = parseFloat(totalPrice);
  return await populateNonProductQuery({ totalPrice: numericValue });
}

const getNonProductsByMarketRateUsed = async (marketRateUsed) => {
  const numericValue = parseFloat(marketRateUsed);
  return await populateNonProductQuery({ marketRateUsed: numericValue });
}

const getNonProductsByCalculatedMarketRate = async (calculatedMarketRate) => {
  const numericValue = parseFloat(calculatedMarketRate);
  return await populateNonProductQuery({ calculatedMarketRate: numericValue });
}

const getNonProductsByGMEPrice = async (GMEPrice) => {
  const numericValue = parseFloat(GMEPrice);
  return await populateNonProductQuery({ GMEPrice: numericValue });
}

const getNonProductsByGst = async (gst) => {
  const numericValue = parseFloat(gst);
  return await populateNonProductQuery({ gst: numericValue });
}

const getNonProductsByFinalPrice = async (finalPrice) => {
  const numericValue = parseFloat(finalPrice);
  return await populateNonProductQuery({ finalPrice: numericValue });
}

/**
 * Utility function to handle numeric parsing
 */
const parseNumericValue = (value) => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? null : parsedValue;
};

/**
 * Get products by any numeric or string field dynamically
 */
const getProductsByField = async (field, value) => {
  if (!value) throw new Error(`${field} is required`);

  let query = {};
  if (typeof value === "string") {
    query[field] = { $regex: value, $options: "i" }; // Case-insensitive for text search
  } else {
    query[field] = parseNumericValue(value) || value;
  }

  return await populateNonProductQuery(query);
};

export const updateStockForLabourChange = async (labourType, groupId, groupItemId, newLabourRate) => {
  try {
    const products = await SPJProduct.find({ groupId, groupItemId });

    for (let product of products) {
      let labourAmount = 0;
      const netWeight = parseFloat(product.netWeight) || 0;

      //Apply Labour Calculation Based on Type
      if (labourType === "uchak") {
        labourAmount = newLabourRate;
      } else if (labourType === "perGram") {
        labourAmount = newLabourRate * netWeight;
      } else if (labourType === "percentage") {
        labourAmount = (netWeight * product.marketRateUsed * newLabourRate) / 100;
      }

      product.labour = labourAmount.toFixed(2);

      //**Recalculate Prices**
      product.totalPrice = product.calculatedMarketRate + parseFloat(product.labour || 0);

      if (product.extraRate) {
        if (typeof product.extraRate === "number") {
          product.totalPrice += product.extraRate;
        } else if (typeof product.extraRate === "string" && product.extraRate.endsWith("%")) {
          const percentage = parseFloat(product.extraRate.replace("%", ""));
          product.totalPrice += (percentage / 100) * product.totalPrice;
        }
      }

      product.GMEPrice = product.calculatedMarketRate + parseFloat(product.labour || 0) + parseFloat(product.extraRate || 0);
      product.finalPrice = product.GMEPrice + parseFloat(product.gst || 0);

      await product.save();
    }

    console.log(`Updated ${products.length} stock items for ${labourType} labour rate change.`);
    return { success: true, message: `${products.length} stock items updated.` };
  } catch (error) {
    console.error("Error updating stock for labour rate change:", error);
    return { success: false, error: error.message };
  }
};

export const updateNonBarcodeStockForLabourChange = async (labourType, groupId, groupItemId, newLabourRate) => {
  try {
    const products = await SPJProduct.find({ groupId, groupItemId });

    for (let product of products) {
      let labourAmount = 0;
      const netWeight = parseFloat(product.netWeight) || 0;

      //Apply Labour Calculation Based on Type
      if (labourType === "uchak") {
        labourAmount = newLabourRate;
      } else if (labourType === "perGram") {
        labourAmount = newLabourRate * netWeight;
      } else if (labourType === "percentage") {
        labourAmount = (netWeight * product.marketRateUsed * newLabourRate) / 100;
      }

      product.labour = labourAmount.toFixed(2);

      //**Recalculate Prices**
      product.totalPrice = product.calculatedMarketRate + parseFloat(product.labour || 0);

      if (product.extraRate) {
        if (typeof product.extraRate === "number") {
          product.totalPrice += product.extraRate;
        } else if (typeof product.extraRate === "string" && product.extraRate.endsWith("%")) {
          const percentage = parseFloat(product.extraRate.replace("%", ""));
          product.totalPrice += (percentage / 100) * product.totalPrice;
        }
      }

      product.GMEPrice = product.calculatedMarketRate + parseFloat(product.labour || 0) + parseFloat(product.extraRate || 0);
      product.finalPrice = product.GMEPrice + parseFloat(product.gst || 0);

      await product.save();
    }

    console.log(`Updated ${products.length} stock items for ${labourType} labour rate change.`);
    return { success: true, message: `${products.length} stock items updated.` };
  } catch (error) {
    console.error("Error updating stock for labour rate change:", error);
    return { success: false, error: error.message };
  }
};


const createUchak = async (data) => {
  const newLabour = await Uchak.create(data);

  await updateStockForLabourChange("uchak", newLabour.group, newLabour.item, parseFloat(newLabour.rate));
  return newLabour;

};

const getAllUchak = async () => {
  return await Uchak.find().populate('group item metal');
};

const getUchakById = async (id) => {
  return await Uchak.findById(id).populate('group item metal');
};

const updateUchak = async (id, data) => {
  const updatedLabour = await Uchak.findByIdAndUpdate(id, data, { new: true });

  if (updatedLabour) {
    await updateStockForLabourChange("uchak", updatedLabour.group, updatedLabour.item, parseFloat(updatedLabour.rate));
  }
  
  return updatedLabour;
};
const deleteUchak = async (id) => {
  const labour = await Uchak.findById(id);
  const { group, item } = labour;
  await Uchak.findByIdAndDelete(id);

  await updateStockForLabourChange("uchak", group, item, null);
  return { success: true, message: "Labour deleted and stock updated." };
};

const createPercentage = async (data) => {
  const newLabour = await Percentage.create(data);

  await updateStockForLabourChange("percentage", newLabour.group, newLabour.item, parseFloat(newLabour.rate));
  return newLabour;
};

const getAllPercentage = async () => {
  return await Percentage.find().populate('group item metal');
};

const getPercentageById = async (id) => {
  return await Percentage.findById(id).populate('group item metal');
};

const updatePercentage = async (id, data) => {
  const updatedLabour = await Percentage.findByIdAndUpdate(id, data, { new: true });

  if (updatedLabour) {
    await updateStockForLabourChange("percentage", updatedLabour.group, updatedLabour.item, parseFloat(updatedLabour.rate));
  }

  return updatedLabour;
};

const deletePercentage = async (id) => {
  const labour = await Percentage.findById(id);
  const { group, item } = labour;
  await Percentage.findByIdAndDelete(id);

  await updateStockForLabourChange("percentage", group, item, null);
  return { success: true, message: "Labour deleted and stock updated." };
};

const createPerGram = async (data) => {
  const newLabour = await PerGram.create(data);

  await updateStockForLabourChange("perGram", newLabour.group, newLabour.item, parseFloat(newLabour.rate));
  return newLabour;};

const getAllPerGram = async () => {
  return await PerGram.find().populate('group item metal');
};

const getPerGramById = async (id) => {
  return await PerGram.findById(id).populate('group item metal');
};

const updatePerGram = async (id, data) => {
  const updatedLabour = await PerGram.findByIdAndUpdate(id, data, { new: true });

  if (updatedLabour) {
    await updateStockForLabourChange("perGram", updatedLabour.group, updatedLabour.item, parseFloat(updatedLabour.rate));
  }

  return updatedLabour;
};

const deletePerGram = async (id) => {
  const labour = await PerGram.findById(id);
  const { group, item } = labour;
  await PerGram.findByIdAndDelete(id);

  await updateStockForLabourChange("perGram", group, item, null);
  return { success: true, message: "Labour deleted and stock updated." };
};

const createNonUchak = async (data) => {
  const newLabour = await NonUchak.create(data);

  await updateNonBarcodeStockForLabourChange("uchak", newLabour.group, newLabour.item, parseFloat(newLabour.rate));
  return newLabour;};

const getAllNonUchak = async () => {
  return await NonUchak.find().populate('group item metal');
};

const getNonUchakById = async (id) => {
  return await NonUchak.findById(id).populate('group item metal');
};

const updateNonUchak = async (id, data) => {
  const updatedLabour = await NonUchak.findByIdAndUpdate(id, data, { new: true });

  if (updatedLabour) {
    await updateNonBarcodeStockForLabourChange("uchak", updatedLabour.group, updatedLabour.item, parseFloat(updatedLabour.rate));
  }
  
  return updatedLabour;
};

const deleteNonUchak = async (id) => {
  const labour = await NonUchak.findById(id);
  const { group, item } = labour;
  await NonUchak.findByIdAndDelete(id);

  await updateNonBarcodeStockForLabourChange("uchak", group, item, null);
  return { success: true, message: "Labour deleted and stock updated." };
};

const createNonPercentage = async (data) => {
  const newLabour = await NonPercentage.create(data);

  await updateNonBarcodeStockForLabourChange("percentage", newLabour.group, newLabour.item, parseFloat(newLabour.rate));
  return newLabour;};

const getAllNonPercentage = async () => {
  return await NonPercentage.find().populate('group item metal');
};

const getNonPercentageById = async (id) => {
  return await NonPercentage.findById(id).populate('group item metal');
};

const updateNonPercentage = async (id, data) => {
  const updatedLabour = await NonPercentage.findByIdAndUpdate(id, data, { new: true });

  if (updatedLabour) {
    await updateNonBarcodeStockForLabourChange("percentage", updatedLabour.group, updatedLabour.item, parseFloat(updatedLabour.rate));
  }

  return updatedLabour;
};

const deleteNonPercentage = async (id) => {
  const labour = await NonPercentage.findById(id);
  const { group, item } = labour;
  await NonPercentage.findByIdAndDelete(id);

  await updateNonBarcodeStockForLabourChange("percentage", group, item, null);
  return { success: true, message: "Labour deleted and stock updated." };};

const createNonPerGram = async (data) => {
  const newLabour = await NonPerGram.create(data);

  await updateNonBarcodeStockForLabourChange("perGram", newLabour.group, newLabour.item, parseFloat(newLabour.rate));
  return newLabour;};

const getAllNonPerGram = async () => {
  return await NonPerGram.find().populate('group item metal');
};

const getNonPerGramById = async (id) => {
  return await NonPerGram.findById(id).populate('group item metal');
};

const updateNonPerGram = async (id, data) => {
  const updatedLabour = await NonPerGram.findByIdAndUpdate(id, data, { new: true });

  if (updatedLabour) {
    await updateNonBarcodeStockForLabourChange("perGram", updatedLabour.group, updatedLabour.item, parseFloat(updatedLabour.rate));
  }

  return updatedLabour;
};

const deleteNonPerGram = async (id) => {
  const labour = await NonPerGram.findById(id);
  const { group, item } = labour;
  await NonPerGram.findByIdAndDelete(id);

  await updateNonBarcodeStockForLabourChange("perGram", group, item, null);
  return { success: true, message: "Labour deleted and stock updated." };};


const createLabourRate = async (categoryData) => {
  const existingCategory = await Labour.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Labour with name "${categoryData.name}" already exists.`);
  }
  const findCategory = await Group.findById(categoryData?.groupId);
  if (!findCategory) throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');

  const findItem = await GroupItem.findById(categoryData?.groupItemId);
  if (!findItem) throw new ApiError(httpStatus.NOT_FOUND, 'GroupItem not found');
  return Labour.create(categoryData);
};

const getLabourRate = async () => {
  return Labour.find();
};

const getLabourRateByItem = async (groupItemId) => {
  if (!groupItemId) throw new ApiError(httpStatus.BAD_REQUEST, 'groupItemId is required!');

  const categoryExists = await GroupItem.findById(groupItemId);
  if (!categoryExists) throw new ApiError(httpStatus.NOT_FOUND, 'GroupItem not found');

  const subCategories = await GroupItem.find({ groupItemId });

  return subCategories;
};

const updateLabourRate = async (id, categoryData) => {
  if (categoryData?.groupItemId) {
    const findCategory = await GroupItem.findById(categoryData?.groupItemId);
    if (!findCategory) throw new ApiError(httpStatus.NOT_FOUND, 'GroupItem not found');
  }

  const updateData = await Labour.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteLabourRate = async (id) => {
  const deleteId = await Labour.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};


const createHUIDRule = async (ruleData) => {
  if (!ruleData.text) throw new ApiError(httpStatus.BAD_REQUEST, 'text is required!');
  const existingCategory = await HUIDRule.findOne({ text: ruleData?.text })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `HUIDRule with text "${ruleData.text}" already exists.`);
  }
  return HUIDRule.create(ruleData);

};


const getHUIDRule = async () => {
  return HUIDRule.find();
};

const updateHUIDRule = async (id, ruleData) => {
  const updateData = await HUIDRule.findByIdAndUpdate(id, ruleData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'HUIDRule not found');
  return updateData;
};


const deleteHUIDRule = async (id) => {
  const deleteId = await HUIDRule.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'HUIDRule not found');
  return deleteId;
};

const getFaqs = async () => {
  const products = SPJProduct.find();

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
const deleteFAQ = async (id, question) => {
  console.log(id, question)
  const product = await SPJProduct.findById(id);

  if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'SPJProduct not found');
  const findFAQIndex = product.productFAQs.findIndex(faq => faq.question === question)

  if (findFAQIndex == -1) throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  product.productFAQs.splice(findFAQIndex, 1);
  product.save()
  return product;
};


const getOrderList = async () => {
  try {
    const orders = await OrderSummary.find().populate({
      path: 'orderItems.productId',
      select: '_id name price description image',
    });

    if (orders.length === 0) {
      throw new Error('No orders found');
    }

    return orders;
  } catch (error) {
    throw new Error(`Error fetching all orders: ${error.message}`);
  }
};

const getOrderById = async (orderId) => {
  try {
    const order = await OrderSummary.findById(orderId).populate({
      path: 'orderItems.productId',
      select: '_id title subTitle price description application color warrantyNumber productImgUrl',
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    throw new Error(`Error fetching order summary: ${error.message}`);
  }
};

const createGST = async (data) => {
  const { percentage } = data;
  if (percentage === undefined) {
    throw new Error('GST percentage is required');
  }

  const existingGst = await GST.findOne();
  if (existingGst) {
    existingGst.percentage = percentage;
    return await existingGst.save();
  } else {
    const gst = new GST({ percentage });
    return await gst.save();
  }
};

const getGST = () => {
  return GST.find();
}


const createWalletAmount = async (amountData) => {
  if (!amountData.amount) throw new ApiError(httpStatus.BAD_REQUEST, 'Amount is required!');
  // if(amountData?.user) {
  //   const userId = await WalletAmount.findById(amountData?.user);
  //   if(userId === null) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'User is required!');
  //   }
  // }

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

const createInfo = async (data) => {
  const existingInfo = await Info.findOne();

  if (existingInfo) {
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        existingInfo[key] = data[key];
      }
    });

    return await existingInfo.save();
  } else {
    const newInfo = new Info(data);
    return await newInfo.save();
  }
};


const getInfo = async () => {
  return Info.find().populate('userId');
};



const createItemDetails = async (detailsData) => {
  const item = new ItemDetails(detailsData);
  return await item.save();
};

const getItemDetails = async () => {
  return ItemDetails.find();
};


const updateItemDetails = async (id, detailsData) => {
  return await Coupon.findByIdAndUpdate(id, detailsData, {
    new: true,
  });
};

const deleteItemDetails = async (id) => {
  return await Coupon.findByIdAndDelete(id);

};

const createState = async (stateData) => {
  if (!stateData?.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Status is required');
  const existingStatus = await State.findOne({ name: stateData?.name });
  if (existingStatus) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This ${stateData?.name} name name already exists.`);
  }

  return State.create(stateData);
};

const getState = () => {
  return State.find();
}

const updateState = async (id, stateData) => {
  const existingStatus = await State.findOne({ name: stateData?.name });
  if (existingStatus) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This ${stateData?.name} name name already exists.`);
  }

  const updateData = await State.findByIdAndUpdate(id, stateData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return updateData;
};

const deleteState = async (id) => {
  const deleteId = await State.findByIdAndDelete(id);
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

const createCity = async (cityData) => {
  const product = new cityModel(cityData);
  return await product.save();
};

const getCity = async () => {
  return cityModel.find();
};


const getCityByState = async (stateId) => {
  if (!stateId) throw new ApiError(httpStatus.BAD_REQUEST, 'stateId is required!');

  const stateExist = await State.findById(stateId);
  if (!stateExist) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');

  const city = await cityModel.find({ stateId });

  return city;
};

const updateCity = async (id, cityData) => {
  const updateData = await cityModel.findByIdAndUpdate(id, cityData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteCity = async (id) => {
  const deleteId = await cityModel.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
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

    const orders = await OrderSummary.find({ shippingStatus: shippingStatus._id }).populate('shippingStatus');
    return orders;
  } catch (error) {
    console.error('Error in service while fetching orders by shipping status:', error);
    throw error;
  }
};


const createCustomer = async (productData) => {
  const product = new Customer(productData);
  return await product.save();
};

const getCustomer = async (query = {}) => {
  return await Customer.find(query).populate('city state');
};

const getCustomerById = async (id) => {
  return await Customer.findById(id).populate('city state');
};


const updateCustomer = async (id, productData) => {
  return await Customer.findByIdAndUpdate(id, productData, {
    new: true,
  });
};

const deleteCustomer = async (id) => {
  return await Customer.findByIdAndDelete(id);

};

const getCustomerByCity = async (city) => {
  if (!city) throw new ApiError(httpStatus.BAD_REQUEST, 'city is required!');

  const cityExist = await cityModel.findById(city);
  if (!cityExist) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');

  const customer = await Customer.find({ city });

  return customer;
};

const getCustomerByName = async (name) => {
  const customer = await Customer.findOne({ name }).populate("city state");

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

const createSerialNo = async (data) => {
  const { number } = data;
  if (number === undefined) {
    throw new Error('GST percentage is required');
  }

  const exstingNumber = await SerialNo.findOne();
  if (exstingNumber) {
    exstingNumber.number = number;
    return await exstingNumber.save();
  } else {
    const no = new SerialNo({ number });
    return await no.save();
  }
};

const getSerialNos = async () => {
  try {
    return await SerialNo.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const createBill = async (billData) => {
  const newBill = new Bill(billData);
  const savedBill = await newBill.save();
  return savedBill;
};

const getBillById = async (id) => {
  const bill = await Bill.findById(id)
    .populate('cityId')
    .populate('customerId')
    .populate({
      path: 'companyId',
      populate: { path: 'userId' }
    })
    .populate({
      path: 'products.productId',
      populate: [
        { path: 'groupItemId' }, 
        { path: 'groupId' } 
      ]
    })
  return bill;
};


const getAllBills = async () => {
  const bills = (await Bill.find().populate('cityId').populate('companyId').populate('customerId')).populate('products.productId');
  return bills;
};

const updateBill = async (id, updateData) => {
  const updatedBill = await Bill.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return updatedBill;
};

const deleteBill = async (id) => {
  const deletedBill = await Bill.findByIdAndDelete(id);
  return deletedBill;
};

const downloadBillsPDF = async () => {
  const bills = await Bill.find().populate('cityId').populate('customerId').populate('products.productId ');

  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('error', (err) => {
    throw new Error(`PDF generation error: ${err.message}`);
  });

  doc.fontSize(20).text('Bills PDF Export', { align: 'center' });
  doc.moveDown(2);

  bills.forEach((bill, index) => {
    doc.fontSize(12).text(`Bill #${index + 1}`, { underline: true });
    doc.text(`Bill No:      ${bill.billNo || ''}`);
    doc.text(`Date:         ${bill.date || ''}`);
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
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on('error', (err) => {
      reject(err);
    });
  });
};

const downloadBillsCSV = async () => {
  const bills = await Bill.find().populate('cityId').populate('customerId');

  let csvData = 'BillNo,Date,TotalPrice,Discount,CGST,SGST,GSTAmount,FinalAmount\n';

  bills.forEach((bill) => {
    csvData += `${bill.billNo || ''},`;
    csvData += `${bill.date || ''},`;
    csvData += `${bill.totalPrice || 0},`;
    csvData += `${bill.discount || 0},`;
    csvData += `${bill.cgstAmount || 0},`;
    csvData += `${bill.sgstAmount || 0},`;
    csvData += `${bill.gstAmount || 0},`;
    csvData += `${bill.finalAmount || 0}\n`;
  });

  return csvData;
};


const createPurchaseBill = async (billData) => {
  const newBill = new PurchaseBill(billData);
  const savedBill = await newBill.save();
  return savedBill;
};

const getPurchaseBillById = async (id) => {
  const bill = await PurchaseBill.findById(id)
    .populate('cityId')
    .populate('customerId')
    .populate({
      path: 'companyId',
      populate: { path: 'userId' }
    })
    .populate({
      path: 'products.productId',
      populate: [
        { path: 'groupItemId' }, 
        { path: 'groupId' } 
      ]
    })
  return bill;
};


const getAllPurchaseBills = async () => {
  const bills = (await PurchaseBill.find().populate('cityId').populate('companyId').populate('customerId')).populate('products.productId');
  return bills;
};

const updatePurchaseBill = async (id, updateData) => {
  const updatedBill = await PurchaseBill.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return updatedBill;
};

const deletePurchaseBill = async (id) => {
  const deletedBill = await PurchaseBill.findByIdAndDelete(id);
  return deletedBill;
};

const downloadPurchaseBillsPDF = async () => {
  const bills = await PurchaseBill.find().populate('cityId').populate('customerId').populate('products.productId ');

  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('error', (err) => {
    throw new Error(`PDF generation error: ${err.message}`);
  });

  doc.fontSize(20).text('Bills PDF Export', { align: 'center' });
  doc.moveDown(2);

  bills.forEach((bill, index) => {
    doc.fontSize(12).text(`Bill #${index + 1}`, { underline: true });
    doc.text(`Bill No:      ${bill.billNo || ''}`);
    doc.text(`Date:         ${bill.date || ''}`);
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
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on('error', (err) => {
      reject(err);
    });
  });
};

const downloadPurchaseBillsCSV = async () => {
  const bills = await PurchaseBill.find().populate('cityId').populate('customerId');

  let csvData = 'BillNo,Date,TotalPrice,Discount,CGST,SGST,GSTAmount,FinalAmount\n';

  bills.forEach((bill) => {
    csvData += `${bill.billNo || ''},`;
    csvData += `${bill.date || ''},`;
    csvData += `${bill.totalPrice || 0},`;
    csvData += `${bill.discount || 0},`;
    csvData += `${bill.cgstAmount || 0},`;
    csvData += `${bill.sgstAmount || 0},`;
    csvData += `${bill.gstAmount || 0},`;
    csvData += `${bill.finalAmount || 0}\n`;
  });

  return csvData;
};

const getUserById = async (id) => {
  return SPJUser.findById(id);
};

const decodeBarcode = async (barcode) => {
  try {
    const product = await SPJProduct.findOne({ barCode: barcode }).populate('groupId groupItemId design size');

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error) {
    console.error('Error fetching product by barcode:', error);
    throw error;
  }
};

const createExpeneCategroy = async (data) => {
  return await ExpenseCategory.create(data);
};

const getAllExpenseCategory = async () => {
  return await ExpenseCategory.find();
};

const getExpenseCategoryById = async (id) => {
  return await ExpenseCategory.findById(id);
};

const updateExpenseCategory = async (id, data) => {
  return await ExpenseCategory.findByIdAndUpdate(id, data, { new: true });
};

const deleteExpenseCategory = async (id) => {
  return await ExpenseCategory.findByIdAndDelete(id);
};

const createExpense = async (data) => {
  return await Expense.create(data);
};

const getAllExpense = async () => {
  return await Expense.find();
};

const getExpenseById = async (id) => {
  return await Expense.findById(id);
};

const updateExpense = async (id, data) => {
  return await Expense.findByIdAndUpdate(id, data, { new: true });
};

const deleteExpense = async (id) => {
  return await Expense.findByIdAndDelete(id);
};


const getExpenseByCategoryId = async (id) => {
  return await Expense.find({ category: categoryId }).populate("category");
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
  return await roleUserModel.create(data);
};

const getAllRoleUsers = async () => {
  return await roleUserModel.find().populate("role");
};

const getRoleUserById = async (id) => {
  return await roleUserModel.findById(id).populate("role");
};

const updateRoleUser = async (id, data) => {
  return await roleUserModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteRoleUser = async (id) => {
  return await roleUserModel.findByIdAndDelete(id);
};

const getAllBarcodes = async () => {
  try {
      const products = await SPJProduct.find({}, 'barCode barcodeImage');
      return products;
  } catch (error) {
      throw new Error('Error fetching barcodes');
  }
};

const getDashboardData = async () => {
  try {
    // Count total purchases
    const totalPurchases = await PurchaseBill.countDocuments();
    const totalSales = await Bill.countDocuments();

    // Aggregate total gross weight and net weight from all sales
    const salesAggregation = await Bill.aggregate([
      { $unwind: "$products" }, // Unwind products array to calculate totals
      {
        $group: {
          _id: null,
          totalGrossWeight: { $sum: { $toDouble: "$products.grossQty" } },
          totalNetWeight: { $sum: { $toDouble: "$products.netQty" } },
        },
      },
    ]);

    const totalSalesGrossWeight = salesAggregation.length > 0 ? salesAggregation[0].totalGrossWeight : 0;
    const totalSalesNetWeight = salesAggregation.length > 0 ? salesAggregation[0].totalNetWeight : 0;

    const purchaseAggregation = await PurchaseBill.aggregate([
      { $unwind: "$products" }, // Unwind products array to calculate totals
      {
        $group: {
          _id: null,
          totalGrossWeight: { $sum: { $toDouble: "$products.grossQty" } },
          totalNetWeight: { $sum: { $toDouble: "$products.netQty" } },
        },
      },
    ]);

    const totalPurchaseGrossWeight = purchaseAggregation.length > 0 ? purchaseAggregation[0].totalGrossWeight : 0;
    const totalPurchaseNetWeight = purchaseAggregation.length > 0 ? purchaseAggregation[0].totalNetWeight : 0;

    const totalGrossWeight = totalSalesGrossWeight + totalPurchaseGrossWeight;
    const totalNetWeight = totalSalesNetWeight + totalPurchaseNetWeight;


    // Fetch today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // End of the day

    // Count total invoices generated today
    const totalSalesInvoicesToday = await Bill.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const totalPurchaseInvoicesToday = await PurchaseBill.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const totalInvoicesToday = totalSalesInvoicesToday + totalPurchaseInvoicesToday;

    // **Fetch stock from SPJProduct**
    const spjProductStock = await SPJProduct.aggregate([
      {
        $project: {
          toWeight: { $toDouble: "$toWeight" },
          fineWeight: { $toDouble: "$fineWeight" },
        },
      },
      {
        $group: {
          _id: null,
          totalStockGrossWeight: { $sum: "$toWeight" },
          totalStockFineWeight: { $sum: "$fineWeight" },
        },
      },
    ]);

    const totalStockGrossWeightSPJProduct = spjProductStock.length > 0 ? spjProductStock[0].totalStockGrossWeight : 0;
    const totalStockFineWeightSPJProduct = spjProductStock.length > 0 ? spjProductStock[0].totalStockFineWeight : 0;

    // **Fetch stock from SPJNonBarcodeProduct**
    const spjNonBarcodeProductStock = await SPJNonBarcodeProduct.aggregate([
      {
        $project: {
          toWeight: { $toDouble: "$toWeight" },
          fineWeight: { $toDouble: "$fineWeight" },
        },
      },
      {
        $group: {
          _id: null,
          totalStockGrossWeight: { $sum: "$toWeight" },
          totalStockFineWeight: { $sum: "$fineWeight" },
        },
      },
    ]);

    const totalStockGrossWeightSPJNonBarcode = spjNonBarcodeProductStock.length > 0 ? spjNonBarcodeProductStock[0].totalStockGrossWeight : 0;
    const totalStockFineWeightSPJNonBarcode = spjNonBarcodeProductStock.length > 0 ? spjNonBarcodeProductStock[0].totalStockFineWeight : 0;

    // **Calculate Final Total Stock Gross Weight and Fine Weight**
    const totalStockGrossWeight = totalStockGrossWeightSPJProduct + totalStockGrossWeightSPJNonBarcode;
    const totalStockFineWeight = totalStockFineWeightSPJProduct + totalStockFineWeightSPJNonBarcode;

    const todaysScanLogs = await ScanLog.find({
      scannedAt: { $gte: today, $lt: tomorrow },
    }).countDocuments();


    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Get data from 6 days ago until today

    const last7DaysExpenses = await Expense.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }, // Filter only last 7 days
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Format date as YYYY-MM-DD
          },
          totalExpense: { $sum: "$amount" }, // Sum expenses per day
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date (ascending)
      },
    ]);

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
      last7DaysExpenses,
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
      throw new Error("Invalid date range. Provide startDate and endDate in DD-MM-YYYY format.");
    }

    startDate = parseDateToUTC(startDate);
    endDate = parseDateToUTC(endDate, true);

    console.log("startDate..", startDate);
    console.log("endDate..", endDate)

    const salesData = await Bill.find({
      createdAt: { $gte: startDate, $lte: endDate }
    })
    .select("billNo date customerId products total finalAmount gstAmount paymentType createdAt")
    .populate("customerId") 
    .populate({
      path: "products.productId",  
      select: "productName rate gstRate hsnCode netWeight pcs" 
    });

    const purchaseData = await PurchaseBill.find({
      createdAt: { $gte: startDate, $lte: endDate }
    })
    .select("billNo date customerId products total finalAmount gstAmount paymentType createdAt")
    .populate("customerId")
    .populate({
      path: "products.productId",  
      select: "productName rate gstRate hsnCode netWeight pcs" 
    });

    const barcodeStockData = await SPJProduct.find({
      createdAt: { $gte: startDate, $lte: endDate }
        }).populate("groupId groupItemId size design");


    const salesSummary = await Bill.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$finalAmount" },
          totalGST: { $sum: "$gstAmount" },
          totalSalesBills: { $sum: 1 },
        },
      },
    ]);

    const purchaseSummary = await PurchaseBill.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
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
        $group: {
          _id: null,
          totalStock: { $sum: 1 },
        },
      }
    ]);

    const totalSales = salesSummary.length ? salesSummary[0].totalSales : 0;
    const totalGST = salesSummary.length ? salesSummary[0].totalGST : 0;
    const totalSalesBills = salesSummary.length ? salesSummary[0].totalSalesBills : 0;

    const totalPurchases = purchaseSummary.length ? purchaseSummary[0].totalPurchases : 0;
    const totalPurchaseGST = purchaseSummary.length ? purchaseSummary[0].totalPurchaseGST : 0;
    const totalPurchaseBills = purchaseSummary.length ? purchaseSummary[0].totalPurchaseBills : 0;

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
      throw new Error('Barcode not found');
    }

    return product;
  } catch (error) {
    console.error('Error fetching barcode image:', error);
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
    "barCode barcodeImage groupId groupItemId toWeight totalPrice"
  );

  if (!products.length) {
    throw new Error("No products found");
  }

  return products;
};

export default {
  createDesign, deleteDesign, updateDesign, getDesign, getDesignByItemId, createGroup, getGroups, updateGroup, deleteGroup, createGroupItem, decodeBarcode, getAllBarcodes,
  createLabourRate, getLabourRate, updateLabourRate, deleteLabourRate, getLabourRateByItem, createSerialNo, getSerialNos, getUserById, getDashboardData,
  getGroupItem, updateGroupItem, deleteGroupItem, createProduct, getProducts, updateProduct, deleteProduct, getProductsById, getProductByBarCode, getProductsByDate,
  getProductsByGroupItemId, getProductsByGroupId, getProductsBySize, getProductsByDesign, getProductsByLocation, getProductsByGrossWeight, createMarketRate, updateMarketRate, deleteMarketRate, getMarketRate, getMarketRateByCategoryId, createHUIDRule, getHUIDRule, updateHUIDRule, deleteHUIDRule,
  deleteSize, updateSize, getSize, createSize, getSizeByItemId, deleteFAQ, getFaqs, getOrderList, getOrderById, createGST, getGST, createMetal, getMetal, updateMetal, deleteMetal,
  createWalletAmount, createItemDetails, getItemDetails, updateItemDetails, deleteItemDetails, createExpeneCategroy, getExpenseCategoryById, getAllExpenseCategory, updateExpenseCategory, deleteExpenseCategory,
  getWalletAmount, updateWalletAmount, deleteWalletAmount, createInfo, getInfo, createState, getState, updateState, deleteState, updatePaymentStatusService, getDaybookData, getProductsByField,
  createCity, getCity, getCityByState, updateCity, deleteCity, uploadWarrantyData, createPurchaseBill, getPurchaseBillById, getAllPurchaseBills, updatePurchaseBill, deletePurchaseBill, downloadPurchaseBillsPDF, downloadPurchaseBillsCSV,
  validateWarrantyNumbers, addWarrantyNumbersForProducts, updateOrderStatusService, updateShippingStatusService, getOrdersByShippingStatusService, createCustomer, getCustomer,
  getCustomerById, updateCustomer, deleteCustomer, getCustomerByCity, createBill, getBillById, getAllBills, updateBill, deleteBill, downloadBillsPDF, downloadBillsCSV,
  createUchak, getAllUchak, getUchakById, updateUchak, deleteUchak, createPerGram, getAllPerGram, getPerGramById, updatePerGram, deletePerGram, createPercentage, getAllPercentage,
  getPercentageById, updatePercentage, deletePercentage, getCustomerByName, createNonBarcodeProduct, getNonBarcodeProducts, updateNonBarcodeProduct, deleteNonBarcodeProduct, getNonBarcodeProductsById,
  getNonBarcodeProductsByDate,createCategory, getAllCategories, getCategroyById, updateCategory, deleteCategory, createExpense, getAllExpense, getExpenseById, updateExpense, deleteExpense, getExpenseByCategoryId,
  createRole, getAllRoles, getRoleById, updateRole, deleteRole, createRoleUser, getAllRoleUsers, getRoleUserById, updateRoleUser, deleteRoleUser, createNonUchak, getNonUchakById, getAllNonUchak,
  updateNonUchak, deleteNonUchak, createNonPerGram, getAllNonPerGram, getNonPerGramById, updateNonPerGram, deleteNonPerGram, createNonPercentage, getNonPercentageById, getAllNonPercentage, updateNonPercentage, deleteNonPercentage,
  getProductsByAccount, getProductsByCalculatedMarketRate, getProductsByDesign, getProductsByExtraRate, getProductsByFinalPrice, getProductsByGrossWeight, getProductsByGMEPrice,
  getProductsByGroupId, getProductsByGroupItemId, getProductsByGroupName, getProductsByGst, getProductsByHsnCode, getProductsByHuid, getProductsByHuidCharge, getProductsByHuidCharge,
  getProductsByHuidRule, getProductsByJadatr, getProductsByLabour, getProductsByFineWeight, getProductsByLocation, getProductsByMarketRateUsed, getProductsByMoti, getProductsByNetWeight,
  getProductsByPcs, getProductsBySilverRate, getProductsBySize, getProductsByStone, getProductsByTotalPrice, getProductsByWastage, getBarcodeImage, bulkDeleteProducts, bulkPrintProducts,
  getNonProductsByAccount, getNonProductsByCalculatedMarketRate, getNonProductsByMarketRateUsed, getNonProductsByExtraRate, getNonProductsByFinalPrice, getNonProductsByFineWeight,
  getNonProductsByGrossWeight, getNonProductsByGMEPrice, getNonProductsByGoldRate, getNonProductsByGrossWeight, getNonProductsByGroupId, getNonProductsByGroupItemId, getNonProductsByGst, 
  getNonProductsByHsnCode, getNonProductsByLabour, getNonProductsByLocation, getNonProductsByNetWeight, getNonProductsByPcs, getNonProductsByTotalPrice, getNonProductsByWastage,
}
