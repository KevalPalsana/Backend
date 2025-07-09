import adminService from "../services/admin.service.js";
import { generateSuccessMessage, sendSuccessResponse } from "../utils/ApiMessage.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import SPJNonBarcodeProduct from "../models/nonBarcode.model.js";
import SPJProduct from "../models/product.model.js";

const getFaqs = catchAsync(async (req, res) => {
  const faqs = await adminService.getFaqs(req.body);
  sendSuccessResponse(res, 'get', faqs);
});
const createDesign = catchAsync(async (req, res) => {
  const design = await adminService.createDesign(req.body);
  res.status(httpStatus.CREATED).send({ design });
});

const getDesign = catchAsync(async (req, res) => {
  const design = await adminService.getDesign(req.body);
  res.status(httpStatus.OK).send({ design });
});

const getDesignByItemId = catchAsync(async (req, res) => {
  const design = await adminService.getDesignByItemId(req.params.id, req.body);
  res.status(httpStatus.OK).send({ design})
});

const updateDesign = catchAsync(async (req, res) => {
  const design = await adminService.updateDesign(req.params.id, req.body);
  res.status(httpStatus.OK).send({ design });
});

const deleteDesign = catchAsync(async (req, res) => {
  const design = await adminService.deleteDesign(req.params.id);
  res.status(httpStatus.OK).send({ design });
});

const createSize = catchAsync(async (req, res) => {
  const size = await adminService.createSize(req.body);
  res.status(httpStatus.CREATED).send({ size });
});

const getSize = catchAsync(async (req, res) => {
  const size = await adminService.getSize(req.body);
  res.status(httpStatus.OK).send({ size });
});

const getSizeByItemId = catchAsync(async (req, res) => {
  const size = await adminService.getSizeByItemId(req.params.id, req.body);
  res.status(httpStatus.OK).send({ size})
});

const updateSize = catchAsync(async (req, res) => {
  const size = await adminService.updateSize(req.params.id, req.body);
  res.status(httpStatus.OK).send({ size });
});

const deleteSize = catchAsync(async (req, res) => {
  const size = await adminService.deleteSize(req.params.id);
  res.status(httpStatus.OK).send({ size });
});

const createLabourRate = catchAsync(async (req, res) => {
  const size = await adminService.createLabourRate(req.body);
  res.status(httpStatus.CREATED).send({ size });
});

const getLabourRate = catchAsync(async (req, res) => {
  const size = await adminService.getLabourRate(req.body);
  res.status(httpStatus.OK).send({ size });
});

const getLabourRateByItem = catchAsync(async (req, res) => {
  const size = await adminService.getLabourRateByItem(req.params.id, req.body);
  res.status(httpStatus.OK).send({ size})
});

const updateLabourRate = catchAsync(async (req, res) => {
  const size = await adminService.updateLabourRate(req.params.id, req.body);
  res.status(httpStatus.OK).send({ size });
});

const deleteLabourRate = catchAsync(async (req, res) => {
  const size = await adminService.deleteLabourRate(req.params.id);
  res.status(httpStatus.OK).send({ size });
});
// const createMarketRate = catchAsync(async (req, res) => {
//   try {
//     console.log('req.body', req.body)
//     const marketRate = await adminService.createMarketRate(req.body);
//     return res.status(201).json({
//       message: "Rates inserted successfully",
//       data: marketRate
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });


export const createMarketRate = catchAsync(async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const result = await adminService.createMarketRate(req.body);

    return res.status(200).json({
      message: "Market Rates inserted or updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
});


const getMarketRate = catchAsync(async (req, res) => {
  const marketRate = await adminService.getMarketRate(req.body);
  res.status(httpStatus.OK).send({ marketRate });
});

const getMarketRateByCategoryId = catchAsync(async (req, res) => {
  try {
    const { categoryId } = req.query;
    if (!categoryId) return res.status(400).json({ message: 'categoryId is required' });
    const rates = await adminService.getMarketRateByCategoryId(categoryId);
    res.json(rates);
  } catch (error) {
    console.error('Error fetching by categoryId:', error);
    res.status(500).json({ error: error.message });
  }
});

const updateMarketRate = catchAsync(async (req, res) => {
  const marketRate = await adminService.updateMarketRate(req.params.id, req.body);
  res.status(httpStatus.OK).send({ marketRate });
});

const deleteMarketRate = catchAsync(async (req, res) => {
  const marketRate = await adminService.deleteMarketRate(req.params.id);
  res.status(httpStatus.OK).send({ marketRate });
});

const createGroup = catchAsync(async (req, res) => {
  console.log("Request Body:", req.body);

  const category = await adminService.createGroup(req.body);
  res.status(httpStatus.CREATED).send({ category });
});

const getGroups = catchAsync(async (req, res) => {
  const category = await adminService.getGroups(req.body);
  res.status(httpStatus.OK).send({ category });
});

const updateGroup = catchAsync(async (req, res) => {
  const category = await adminService.updateGroup(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const deleteGroup = catchAsync(async (req, res) => {
  const category = await adminService.deleteGroup(req.params.id);
  res.status(httpStatus.OK).send({ category });
});

const createMetal = catchAsync(async (req, res) => {
  const category = await adminService.createMetal(req.body);
  res.status(httpStatus.CREATED).send({ category });
});

const getMetal = catchAsync(async (req, res) => {
  const category = await adminService.getMetal(req.body);
  res.status(httpStatus.OK).send({ category });
});

// const getMetalById = catchAsync(async (req, res) => {
//   const category = await adminService.getMetalById(req.params.id, req.body);
//   res.status(httpStatus.OK).send({ category });
// });

const updateMetal = catchAsync(async (req, res) => {
  const category = await adminService.updateMetal(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const deleteMetal = catchAsync(async (req, res) => {
  const category = await adminService.deleteMetal(req.params.id);
  res.status(httpStatus.OK).send({ category, Message: "Delete SuccessFully...!" });
});

const createGroupItem = catchAsync(async (req, res) => {
  const category = await adminService.createGroupItem(req.body);
  res.status(httpStatus.CREATED).send({ category });
});

const getGroupItem = catchAsync(async (req, res) => {
  const category = await adminService.getGroupItem(req.body);
  res.status(httpStatus.OK).send({ category });
});

// const getGroupItemByGroupId = catchAsync(async (req, res) => {
//   const category = await adminService.getGroupItemByGroupId(req.params.id, req.body);
//   res.status(httpStatus.OK).send({ category });
// });

const updateGroupItem = catchAsync(async (req, res) => {
  const category = await adminService.updateGroupItem(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const deleteGroupItem = catchAsync(async (req, res) => {
  const category = await adminService.deleteGroupItem(req.params.id);
  res.status(httpStatus.OK).send({ category, Message: "Delete SuccessFully...!" });
});


const createUchak = catchAsync(async (req, res) => {
  const uchak = await adminService.createUchak(req.body);
  res.status(httpStatus.CREATED).send({ uchak });
});

const getAllUchak = catchAsync(async (req, res) => {
  const uchak = await adminService.getAllUchak(req.body);
  res.status(httpStatus.OK).send({ uchak });
});

const updateUchak = catchAsync(async (req, res) => {
  const uchak = await adminService.updateUchak(req.params.id, req.body);
  res.status(httpStatus.OK).send({ uchak });
});

const deleteUchak = catchAsync(async (req, res) => {
  const uchak = await adminService.deleteUchak(req.params.id);
  res.status(httpStatus.OK).send({ uchak });
});

const getUchakById = catchAsync(async (req, res) => {
  const uchak = await adminService.getUchakById(req.params.id);
  res.status(httpStatus.OK).send({ uchak });
});

const createPercentage = catchAsync(async (req, res) => {
  const percentage = await adminService.createPercentage(req.body);
  res.status(httpStatus.CREATED).send({ percentage });
});

const getAllPercentage = catchAsync(async (req, res) => {
  const percentage = await adminService.getAllPercentage(req.body);
  res.status(httpStatus.OK).send({ percentage });
});

const updatePercentage = catchAsync(async (req, res) => {
  const percentage = await adminService.updatePercentage(req.params.id, req.body);
  res.status(httpStatus.OK).send({ percentage });
});

const deletePercentage = catchAsync(async (req, res) => {
  const percentage = await adminService.deletePercentage(req.params.id);
  res.status(httpStatus.OK).send({ percentage });
});

const getPercentageById = catchAsync(async (req, res) => {
  const percentage = await adminService.getPercentageById(req.params.id);
  res.status(httpStatus.OK).send({ percentage });
});

const createPerGram = catchAsync(async (req, res) => {
  const pergram = await adminService.createPerGram(req.body);
  res.status(httpStatus.CREATED).send({ pergram });
});

const getAllPerGram = catchAsync(async (req, res) => {
  const pergram = await adminService.getAllPerGram(req.body);
  res.status(httpStatus.OK).send({ pergram });
});

const updatePerGram = catchAsync(async (req, res) => {
  const pergram = await adminService.updatePerGram(req.params.id, req.body);
  res.status(httpStatus.OK).send({ pergram });
});

const deletePerGram = catchAsync(async (req, res) => {
  const pergram = await adminService.deletePerGram(req.params.id);
  res.status(httpStatus.OK).send({ pergram });
});

const getPerGramById = catchAsync(async (req, res) => {
  const pergram = await adminService.getPerGramById(req.params.id);
  res.status(httpStatus.OK).send({ pergram });
});

const createNonUchak = catchAsync(async (req, res) => {
  const uchak = await adminService.createNonUchak(req.body);
  res.status(httpStatus.CREATED).send({ uchak });
});

const getAllNonUchak = catchAsync(async (req, res) => {
  const uchak = await adminService.getAllNonUchak(req.body);
  res.status(httpStatus.OK).send({ uchak });
});

const updateNonUchak = catchAsync(async (req, res) => {
  const uchak = await adminService.updateNonUchak(req.params.id, req.body);
  res.status(httpStatus.OK).send({ uchak });
});

const deleteNonUchak = catchAsync(async (req, res) => {
  const uchak = await adminService.deleteNonUchak(req.params.id);
  res.status(httpStatus.OK).send({ uchak });
});

const getNonUchakById = catchAsync(async (req, res) => {
  const uchak = await adminService.getNonUchakById(req.params.id);
  res.status(httpStatus.OK).send({ uchak });
});

const createNonPercentage = catchAsync(async (req, res) => {
  const percentage = await adminService.createNonPercentage(req.body);
  res.status(httpStatus.CREATED).send({ percentage });
});

const getAllNonPercentage = catchAsync(async (req, res) => {
  const percentage = await adminService.getAllNonPercentage(req.body);
  res.status(httpStatus.OK).send({ percentage });
});

const updateNonPercentage = catchAsync(async (req, res) => {
  const percentage = await adminService.updateNonPercentage(req.params.id, req.body);
  res.status(httpStatus.OK).send({ percentage });
});

const deleteNonPercentage = catchAsync(async (req, res) => {
  const percentage = await adminService.deleteNonPercentage(req.params.id);
  res.status(httpStatus.OK).send({ percentage });
});

const getNonPercentageById = catchAsync(async (req, res) => {
  const percentage = await adminService.getNonPercentageById(req.params.id);
  res.status(httpStatus.OK).send({ percentage });
});

const createNonPerGram = catchAsync(async (req, res) => {
  const pergram = await adminService.createNonPerGram(req.body);
  res.status(httpStatus.CREATED).send({ pergram });
});

const getAllNonPerGram = catchAsync(async (req, res) => {
  const pergram = await adminService.getAllNonPerGram(req.body);
  res.status(httpStatus.OK).send({ pergram });
});

const updateNonPerGram = catchAsync(async (req, res) => {
  const pergram = await adminService.updateNonPerGram(req.params.id, req.body);
  res.status(httpStatus.OK).send({ pergram });
});

const deleteNonPerGram = catchAsync(async (req, res) => {
  const pergram = await adminService.deleteNonPerGram(req.params.id);
  res.status(httpStatus.OK).send({ pergram });
});

const getNonPerGramById = catchAsync(async (req, res) => {
  const pergram = await adminService.getNonPerGramById(req.params.id);
  res.status(httpStatus.OK).send({ pergram });
});

// const createProduct = catchAsync(async (req, res) => {
//   try {
//     const { groupId, groupItemId, products } = req.body;

//     console.log("🔹 Received Request Data:", { groupId, groupItemId, products });

//     if (!Array.isArray(products) || products.length === 0) {
//       console.error("❌ Error: products must be an array and not empty", products);
//       return res.status(400).json({ success: false, message: "Products must be an array of product objects." });
//     }

//     // ✅ Call service
//     const result = await adminService.createProduct(groupId, groupItemId, products);

//     console.log("🔹 Inserted Products Response:", result);

//     // ✅ Extract insertedProducts safely
//     const insertedProducts = result?.insertedProducts || [];

//     if (!Array.isArray(insertedProducts) || insertedProducts.length === 0) {
//       console.error("❌ No valid products inserted:", insertedProducts);
//       return res.status(500).json({ success: false, message: "No products were inserted." });
//     }

//     // ✅ Return only the required fields
//     res.status(201).json({
//       success: true,
//       message: "Products inserted successfully",
//       data: insertedProducts,
//     });
//   } catch (error) {
//     console.error("❌ Controller Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

const createProduct = catchAsync(async (req, res) => {
  try {
    const { groupId, groupItemId, products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "Products must be an array of product objects." });
    }

    const result = await adminService.createProduct(groupId, groupItemId, products);
    const insertedProductIds = result?.insertedProducts.map((p) => p._id);

    const populatedProducts = await SPJProduct.find({ _id: { $in: insertedProductIds } })
      .populate("groupItemId", "itemName") 
      .populate("groupId", "name")
      .populate("size", "sizeName")
      .populate("design", "designName")
      .exec();

    if (!populatedProducts || populatedProducts.length === 0) {
      return res.status(500).json({ success: false, message: "No products were inserted." });
    }

    // **Send Response**
    res.status(201).json({
      success: true,
      message: "Products inserted successfully",
      data: populatedProducts.map(product => ({
        _id: product._id,
        groupId: product.groupId,
        groupItemId: product.groupItemId, // ✅ Populated groupItemId Details
        toWeight: product.toWeight,
        netWeight: product.netWeight,
        fineWeight: product.fineWeight,
        labour: product.labour,
        extraRate: product.extraRate,
        gst: product.gst,
        design: product.design,
        size: product.size, // ✅ Ensure size is properly included
        totalPrice: product.totalPrice,
        barCode: product.barCode,
        barcodeImage: product.barcodeImage,
        finalPrice: product.finalPrice,
      })),
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});


const getProducts = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query;
  const options = { page: parseInt(page), limit: parseInt(limit) };
  const product = await adminService.getProducts(query, options);
  res.status(httpStatus.OK).send({ product });
});

// const updateProduct = catchAsync(async (req, res) => {
//   console.log("Req.body", req.body);
//   const product = await adminService.updateProduct(req.params.id, req.body);
//   console.log("product", product)
//   res.status(httpStatus.OK).send({ product });
// });
const updateProduct = async (req, res) => {
  try {
    const stockId = req.params.id;
    const { groupId, groupItemId, products } = req.body;

    // Call the service function to update stock
    const updatedStock = await adminService.updateProduct(stockId, groupId, groupItemId, products);

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    console.log("✅ Updated Stock Data:", updatedStock);
    res.status(200).json(updatedStock);
  } catch (error) {
    console.error("❌ Error updating stock:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = catchAsync(async (req, res) => {
  const product = await adminService.deleteProduct(req.params.id);
  res.status(httpStatus.OK).send({ product });
});

const getProductsById = catchAsync(async (req, res) => {
  const product = await adminService.getProductsById(req.params.id);
  res.status(httpStatus.OK).send({ product });
});
// const getProductsByGroupItemId = catchAsync(async (req, res) => {
//   const { page = 1, limit = 10, ...query } = req.query;
//   const options = { page: parseInt(page), limit: parseInt(limit) };
//   const products = await adminService.getProductsByGroupItemId(
//     req.params.groupItemId,
//     query,
//     options
//   ); 
//   res.status(httpStatus.OK).send({ products });
// });

const getProductByBarCode = catchAsync(async (req, res) => {
  const { barcode } = req.body;

  try {
    const product = await adminService.getProductByBarCode(barcode);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

//  const getProductByGroupId = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const products = await adminService.getProductsByGroupId(groupId);
//     if (!products.length) {
//       return res.status(404).json({ message: 'No products found for the given Group ID.' });
//     }
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// const getProductByDesign = async (req, res) => {
//   try {
//     const { design } = req.params;
//     const products = await adminService.getProductByDesign(design);
//     if (!products.length) {
//       return res.status(404).json({ message: 'No products found for the given Group ID.' });
//     }
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// const getProductBySize = async (req, res) => {
//   try {
//     const { size } = req.params;
//     const products = await adminService.getProductBySize(size);
//     if (!products.length) {
//       return res.status(404).json({ message: 'No products found for the given Group ID.' });
//     }
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// const getProductByLocation = async (req, res) => {
//   try {
//     const { location } = req.params;
//     const products = await adminService.getProductsByLocation(location);
//     if (!products.length) {
//       return res.status(404).json({ message: 'No products found for the given location.' });
//     }
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// const getProductsByGrossWeight = async (req, res) => {
//   try {
//     const { minWeight, maxWeight } = req.query;

//     const products = await adminService.getProductsByGrossWeight(minWeight, maxWeight);

//     res.status(200).json({
//       success: true,
//       data: products,
//     });
//   } catch (error) {
//     console.error('Error fetching products by gross weight:', error);
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const getProductsByDate = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    const products = await adminService.getProductsByDate(fromDate, toDate);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products by date:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export async function getProductsByGrossWeight(req, res) {
  try {
    const { toWeight } = req.query;
    if (!toWeight) return res.status(400).json({ message: 'toWeight is required' });
    const products = await adminService.getProductsByGrossWeight(toWeight);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by toWeight:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByNetWeight(req, res) {
  try {
    const { netWeight } = req.query;
    if (!netWeight) return res.status(400).json({ message: 'netWeight is required' });
    const products = await adminService.getProductsByNetWeight(netWeight);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by netWeight:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByFineWeight(req, res) {
  try {
    const { fineWeight } = req.query;
    if (!fineWeight) return res.status(400).json({ message: 'fineWeight is required' });
    const products = await adminService.getProductsByFineWeight(fineWeight);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by fineWeight:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByBarCode(req, res) {
  try {
    const { barCode } = req.query;
    if (!barCode) return res.status(400).json({ message: 'barCode is required' });
    const products = await adminService.getProductsByBarCode(barCode);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by barCode:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductByGroupId(req, res) {
  try {
    const { groupName } = req.query;
    if (!groupName) {
      return res.status(400).json({ success: false, message: "Group Name is required." });
    }

    const products = await adminService.getProductsByGroupId(groupName);
    res.json(products);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getProductsByGroupItemId(req, res) {
  try {
    const { itemName } = req.query;
    if (!itemName) return res.status(400).json({ message: 'Item Name is required' });
    const products = await adminService.getProductsByGroupItemId(itemName);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by groupItemId:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByWastage(req, res) {
  try {
    const { wastage } = req.query;
    if (!wastage) return res.status(400).json({ message: 'wastage is required' });
    const products = await adminService.getProductsByWastage(wastage);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by wastage:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByHsnCode(req, res) {
  try {
    const { hsnCode } = req.query;
    if (!hsnCode) return res.status(400).json({ message: 'hsnCode is required' });
    const products = await adminService.getProductsByHsnCode(hsnCode);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by hsnCode:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByGroupName(req, res) {
  try {
    const { group } = req.query;
    if (!group) return res.status(400).json({ message: 'group is required' });
    const products = await adminService.getProductsByGroupName(group);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by group name:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByGoldRate(req, res) {
  try {
    const { goldRate } = req.query;
    if (!goldRate) return res.status(400).json({ message: 'goldRate is required' });
    const products = await adminService.getProductsByGoldRate(goldRate);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by goldRate:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsBySilverRate(req, res) {
  try {
    const { silverRate } = req.query;
    if (!silverRate) return res.status(400).json({ message: 'silverRate is required' });
    const products = await adminService.getProductsBySilverRate(silverRate);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by silverRate:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByAccount(req, res) {
  try {
    const { account } = req.query;
    if (!account) return res.status(400).json({ message: 'account is required' });
    const products = await adminService.getProductsByAccount(account);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by account:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByLabour(req, res) {
  try {
    const { labour } = req.query;
    if (!labour) return res.status(400).json({ message: 'labour is required' });
    const products = await adminService.getProductsByLabour(labour);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by labour:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByExtraRate(req, res) {
  try {
    const { extraRate } = req.query;
    if (!extraRate) return res.status(400).json({ message: 'extraRate is required' });
    const products = await adminService.getProductsByExtraRate(extraRate);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by extraRate:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductByLocation(req, res) {
  try {
    const { location } = req.query;
    if (!location) return res.status(400).json({ message: 'location is required' });
    const products = await adminService.getProductsByLocation(location);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by location:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByPcs(req, res) {
  try {
    const { pcs } = req.query;
    if (!pcs) return res.status(400).json({ message: 'pcs is required' });
    const products = await adminService.getProductsByPcs(pcs);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by pcs:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductByDesign(req, res) {
  try {
    const { design } = req.query;
    if (!design) return res.status(400).json({ message: 'design is required' });
    const products = await adminService.getProductsByDesign(design);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by design:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductBySize(req, res) {
  try {
    const { size } = req.query;
    if (!size) return res.status(400).json({ message: 'size is required' });
    const products = await adminService.getProductsBySize(size);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by size:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByMoti(req, res) {
  try {
    const { moti } = req.query;
    if (!moti) return res.status(400).json({ message: 'moti is required' });
    const products = await adminService.getProductsByMoti(moti);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by moti:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByStone(req, res) {
  try {
    const { stone } = req.query;
    if (!stone) return res.status(400).json({ message: 'stone is required' });
    const products = await adminService.getProductsByStone(stone);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by stone:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByJadatr(req, res) {
  try {
    const { jadatr } = req.query;
    if (!jadatr) return res.status(400).json({ message: 'jadatr is required' });
    const products = await adminService.getProductsByJadatr(jadatr);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by jadatr:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByHuid(req, res) {
  try {
    const { huid } = req.query;
    if (!huid) return res.status(400).json({ message: 'huid is required' });
    const products = await adminService.getProductsByHuid(huid);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by huid:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByHuidRule(req, res) {
  try {
    const { huidRule } = req.query;
    if (!huidRule) return res.status(400).json({ message: 'huidRule is required' });
    const products = await adminService.getProductsByHuidRule(huidRule);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by huidRule:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByHuidCharge(req, res) {
  try {
    const { huidCharge } = req.query;
    if (!huidCharge) return res.status(400).json({ message: 'huidCharge is required' });
    const products = await adminService.getProductsByHuidCharge(huidCharge);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by huidCharge:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByTotalPrice(req, res) {
  try {
    const { totalPrice } = req.query;
    if (!totalPrice) return res.status(400).json({ message: 'totalPrice is required' });
    const products = await adminService.getProductsByTotalPrice(totalPrice);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by totalPrice:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByMarketRateUsed(req, res) {
  try {
    const { marketRateUsed } = req.query;
    if (!marketRateUsed) return res.status(400).json({ message: 'marketRateUsed is required' });
    const products = await adminService.getProductsByMarketRateUsed(marketRateUsed);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by marketRateUsed:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByCalculatedMarketRate(req, res) {
  try {
    const { calculatedMarketRate } = req.query;
    if (!calculatedMarketRate) return res.status(400).json({ message: 'calculatedMarketRate is required' });
    const products = await adminService.getProductsByCalculatedMarketRate(calculatedMarketRate);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by calculatedMarketRate:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByGMEPrice(req, res) {
  try {
    const { GMEPrice } = req.query;
    if (!GMEPrice) return res.status(400).json({ message: 'GMEPrice is required' });
    const products = await adminService.getProductsByGMEPrice(GMEPrice);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by GMEPrice:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByGst(req, res) {
  try {
    const { gst } = req.query;
    if (!gst) return res.status(400).json({ message: 'gst is required' });
    const products = await adminService.getProductsByGst(gst);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by gst:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByFinalPrice(req, res) {
  try {
    const { finalPrice } = req.query;
    if (!finalPrice) return res.status(400).json({ message: 'finalPrice is required' });
    const products = await adminService.getProductsByFinalPrice(finalPrice);
    res.json(products);
  } catch (error) {
    console.error('Error fetching by finalPrice:', error);
    res.status(500).json({ error: error.message });
  }
}


const createNonBarcodeProduct = catchAsync(async (req, res) => {
  try {
    const { groupId, groupItemId, productName, products } = req.body;
    // if (!groupId || !groupItemId || !Array.isArray(products)) {
    //   return res.status(400).json({ success: false, message: "Invalid request data" });
    // }

    const insertedProducts = await adminService.createNonBarcodeProduct(groupId, groupItemId, productName, products);
    res.status(201).json({ success: true, message: "Products inserted successfully", data: insertedProducts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const getNonBarcodeProducts = catchAsync(async (req, res) => {
  const product = await adminService.getNonBarcodeProducts(req.body);
  res.status(httpStatus.OK).send({ product });
});

const getNonBarcodetProductDetails = async (req, res) => {
  try {
    const { productName} = req.query;

    if (!productName) {
      return res.status(400).json({ message: "Missing productName" });
    }

    // Fetch product details from database
    const product = await SPJNonBarcodeProduct.findOne({ productName });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateNonBarcodeProduct = catchAsync(async (req, res) => {
  const product = await adminService.updateNonBarcodeProduct(req.params.id, req.body);
  res.status(httpStatus.OK).send({ product });
});

const deleteNonBarcodeProduct = catchAsync(async (req, res) => {
  const product = await adminService.deleteNonBarcodeProduct(req.params.id);
  res.status(httpStatus.OK).send({ product });
});

const getNonBarcodeProductsById = catchAsync(async (req, res) => {
  const product = await adminService.getNonBarcodeProductsById(req.params.id);
  res.status(httpStatus.OK).send({ product });
});

// const getNonProductsByGrossWeight = catchAsync( async(req, res) => {
//   try {
//     const { toWeight } = req.query;
//     if (!toWeight) return res.status(400).json({ message: 'toWeight is required' });
//     const products = await adminService.getNonProductsByGrossWeight(toWeight);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by toWeight:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const  getNonProductsByNetWeight = catchAsync(async(req, res) => {
//   try {
//     const { netWeight } = req.query;
//     if (!netWeight) return res.status(400).json({ message: 'netWeight is required' });
//     const products = await adminService.getNonProductsByNetWeight(netWeight);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by netWeight:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const getNonProductsByGroupItemId = catchAsync(async (req, res) => {
//   try {
//     const { groupItemId } = req.query;
//     if (!groupItemId) return res.status(400).json({ message: 'groupItemId is required' });
//     const products = await adminService.getNonProductsByGroupItemId(groupItemId);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by groupItemId:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const getNonProductByGroupId = catchAsync(async (req, res) => {
//   try {
//     const { groupId } = req.query;
//     if (!groupId) return res.status(400).json({ message: 'groupId is required' });
//     const products = await adminService.getNonProductsByGroupId(groupId);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by groupId:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const getNonProductsByFineWeight = catchAsync( async (req, res) => {
//   try {
//     const { fineWeight } = req.query;
//     if (!fineWeight) return res.status(400).json({ message: 'fineWeight is required' });
//     const products = await adminService.getNonProductsByFineWeight(fineWeight);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by fineWeight:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const getNonProductsByTotalPrice = catchAsync(async (req, res) => {
//   try {
//     const { totalPrice } = req.query;
//     if (!totalPrice) return res.status(400).json({ message: 'totalPrice is required' });
//     const products = await adminService.getNonProductsByTotalPrice(totalPrice);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by totalPrice:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const  getNonProductByLocation = catchAsync( async (req, res) => {
//   try {
//     const { location } = req.query;
//     if (!location) return res.status(400).json({ message: 'location is required' });
//     const products = await adminService.getNonProductsByLocation(location);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by location:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const getNonProductsByMarketRateUsed = catchAsync( async (req, res) => {
//   try {
//     const { marketRateUsed } = req.query;
//     if (!marketRateUsed) return res.status(400).json({ message: 'marketRateUsed is required' });
//     const products = await adminService.getNonProductsByMarketRateUsed(marketRateUsed);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by marketRateUsed:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const getNonProductsByCalculatedMarketRate = catchAsync(async (req, res) => {
//   try {
//     const { calculatedMarketRate } = req.query;
//     if (!calculatedMarketRate) return res.status(400).json({ message: 'calculatedMarketRate is required' });
//     const products = await adminService.getNonProductsByCalculatedMarketRate(calculatedMarketRate);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by calculatedMarketRate:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const getNonProductsByGMEPrice = catchAsync(async (req, res) => {
//   try {
//     const { GMEPrice } = req.query;
//     if (!GMEPrice) return res.status(400).json({ message: 'GMEPrice is required' });
//     const products = await adminService.getNonProductsByGMEPrice(GMEPrice);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by GMEPrice:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const  getNonProductsByGst = catchAsync(async (req, res) => {
//   try {
//     const { gst } = req.query;
//     if (!gst) return res.status(400).json({ message: 'gst is required' });
//     const products = await adminService.getNonProductsByGst(gst);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by gst:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const getNonProductsByFinalPrice = catchAsync(async (req, res) => {
//   try {
//     const { finalPrice } = req.query;
//     if (!finalPrice) return res.status(400).json({ message: 'finalPrice is required' });
//     const products = await adminService.getNonProductsByFinalPrice(finalPrice);
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching by finalPrice:', error);
//     res.status(500).json({ error: error.message });
//   }
// });



/**
 * Utility function to handle requests and responses
 */
const handleRequest = async (req, res, field) => {
  try {
    const value = req.query[field];
    const products = await adminService.getProductsByField(field, value);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * API Endpoints for different search fields
 */
export const getNonProductsByGrossWeight = async (req, res) => handleRequest(req, res, "toWeight");
export const getNonProductsByNetWeight = async (req, res) => handleRequest(req, res, "netWeight");
export const getNonProductsByFineWeight = async (req, res) => handleRequest(req, res, "fineWeight");
export const getNonProductByGroupId = async (req, res) => handleRequest(req, res, "groupId");
export const getNonProductsByGroupItemId = async (req, res) => handleRequest(req, res, "groupItemId");
export const getNonProductsByHsnCode = async (req, res) => handleRequest(req, res, "hsnCode");
export const getNonProductsByLabour = async (req, res) => handleRequest(req, res, "labour");
export const getNonProductsByExtraRate = async (req, res) => handleRequest(req, res, "extraRate");
export const getNonProductByLocation = async (req, res) => handleRequest(req, res, "location");
export const getNonProductsByPcs = async (req, res) => handleRequest(req, res, "pcs");
export const getNonProductsByFinalPrice = async (req, res) => handleRequest(req, res, "finalPrice");
export const getNonProductsByMarketRateUsed = async (req, res) => handleRequest(req, res, "marketRateUsed");
export const getNonProductsByCalculatedMarketRate = async (req, res) => handleRequest(req, res, "calculatedMarketRate");
export const getNonProductsByGMEPrice = async (req, res) => handleRequest(req, res, "GMEPrice");
export const getNonProductsByGst = async (req, res) => handleRequest(req, res, "gst");
export const getNonProductsByTotalPrice = async (req, res) => handleRequest(req, res, "totalPrice");

const getNonBarcodeProductsByDate = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    const products = await adminService.getNonBarcodeProductsByDate(fromDate, toDate);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products by date:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const createCategory = catchAsync(async (req, res) => {
  const category = await adminService.createCategory(req.body);
  res.status(httpStatus.CREATED).send({ category });
});

const getAllCategories = catchAsync(async (req, res) => {
  const category = await adminService.getAllCategories(req.body);
  res.status(httpStatus.OK).send({ category });
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await adminService.updateCategory(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await adminService.deleteCategory(req.params.id);
  res.status(httpStatus.OK).send({ category });
});

const getCategroyById = catchAsync(async (req, res) => {
  const category = await adminService.getCategroyById(req.params.id);
  res.status(httpStatus.OK).send({ category });
});
const createHUIDRule = catchAsync(async (req, res) => {
  const data = await adminService.createHUIDRule(req.body);
  res.status(httpStatus.CREATED).send({ data });
});

const getHUIDRule = catchAsync(async (req, res) => {
  const data = await adminService.getHUIDRule(req.body);
  res.status(httpStatus.OK).send({ data });
})

const updateHUIDRule = catchAsync(async (req, res) => {
  const data = await adminService.updateHUIDRule(req.params.id, req.body);
  res.status(httpStatus.OK).send({ data });
});

const deleteHUIDRule = catchAsync(async (req, res) => {
  const data = await adminService.deleteHUIDRule(req.params.id);
  res.status(httpStatus.OK).send({ data });
});

const deleteFAQ = catchAsync(async (req, res) => {
  const { question } = req.body;
  const attribute = await adminService.deleteFAQ(req.params.id, question);
  res.status(httpStatus.OK).send({ attribute });
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

const createState = catchAsync(async (req, res) => {
  const stateData = await adminService.createState(req.body);
  res.status(httpStatus.CREATED).send({ stateData });
});

const getState = catchAsync(async (req, res) => {
  const stateData = await adminService.getState(req.body);
  res.status(httpStatus.OK).send({ stateData });
})
const updateState = catchAsync(async (req, res) => {
  const stateData = await adminService.updateState(req.params.id, req.body);
  res.status(httpStatus.OK).send({ stateData });
});

const deleteState = catchAsync(async (req, res) => {
  const stateData = await adminService.deleteState(req.params.id);
  res.status(httpStatus.OK).send({ stateData });
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


const createCity = catchAsync(async (req, res) => {
  const city = await adminService.createCity(req.body);
  res.status(httpStatus.CREATED).send({ city });
});

const getCity = catchAsync(async (req, res) => {
  const city = await adminService.getCity(req.body);
  res.status(httpStatus.OK).send({ city });
});

const getCityByState = catchAsync(async (req, res) => {
  const city = await adminService.getCityByState(req.prams.id, req.body);
  res.status(httpStatus.OK).send({ city})
})
const updateCity = catchAsync(async (req, res) => {
  const city = await adminService.updateCity(req.params.id, req.body);
  res.status(httpStatus.OK).send({ city });
});

const deleteCity = catchAsync(async (req, res) => {
  const city = await adminService.deleteCity(req.params.id);
  res.status(httpStatus.OK).send({ city });
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

const createCustomer = catchAsync(async (req, res) => {
  const customer = await adminService.createCustomer(req.body);
  res.status(httpStatus.CREATED).send({ customer });
});

const getCustomer = catchAsync(async (req, res) => {
  const customer = await adminService.getCustomer(req.body);
  res.status(httpStatus.OK).send({ customer });
});

const getCustomerById = catchAsync(async (req, res) => {
  const customer = await adminService.getCustomerById(req.params.id, req.body);
  res.status(httpStatus.OK).send({ customer });
});


const getCustomerByCity = catchAsync(async (req, res) => {
  const city = await adminService.getCustomerByCity(req.params.id, req.body);
  res.status(httpStatus.OK).send({ city });
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

const updateCustomer = catchAsync(async (req, res) => {
  const customer = await adminService.updateCustomer(req.params.id, req.body);
  res.status(httpStatus.OK).send({ customer });
});

const deleteCustomer = catchAsync(async (req, res) => {
  const customer = await adminService.deleteCustomer(req.params.id);
  res.status(httpStatus.OK).send({ customer, Message: "Delete SuccessFully...!" });
});

const createSerialNo = async (req, res) => {
  try {
    const newSerialNo = await adminService.createSerialNo(req.body);
    res.status(201).json(newSerialNo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSerialNos = async (req, res) => {
  try {
    const serialNos = await adminService.getSerialNos();
    res.status(200).json(serialNos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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

const getAllPurchaseBills = catchAsync(async (req, res) => {
  const bill = await adminService.getAllPurchaseBills(req.body);
  res.status(httpStatus.OK).send({ bill });
});

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
      groupItemId: barcodeData.groupItemId || null,
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

export default {
  createGroup, getGroups, updateGroup, deleteGroup, createGroupItem, getGroupItem, updateGroupItem, deleteGroupItem, createSerialNo, getSerialNos, scanBarcode, getNonBarcodetProductDetails,
  createProduct, getProducts, updateProduct, deleteProduct, getProductsById, getProductsByGroupItemId, getProductByGroupId, getProductsByGrossWeight, getProductsByDate, getProductByLocation, getProductByDesign, getProductBySize, getProductByBarCode, 
  createMarketRate, updateMarketRate, deleteMarketRate, getMarketRate, getMarketRateByCategoryId,createDesign, deleteDesign, updateDesign, getDesign, getDesignByItemId, createHUIDRule, getHUIDRule, fetchAllBarcodes, 
  updateHUIDRule, deleteHUIDRule, deleteSize, updateSize, getSize, getSizeByItemId, createSize, deleteFAQ, getFaqs, getOrderList, getOrderById, createGST, getGST, createBill, 
  getAllBills, getBillById, updateBill, deleteBill, downloadBillsCSV, downloadBillsPDF, createExpeneCategroy, getAllExpenseCategory, getExpenseCategoryById, updateExpenseCategory,
  createWalletAmount, getWalletAmount, updateWalletAmount, deleteWalletAmount, createInfo, getInfo, createItemDetails, getItemDetails, updateItemDetails, deleteItemDetails, deleteExpenseCategory,
  createState, getState, updateState, deleteState, updatePaymentStatus, getUserById, fetchDashboardData,createExpense, getAllExpense, getExpenseByCategoryId, getExpenseById, updateExpense, deleteExpense, 
  createCity, getCity, getCityByState, updateCity, deleteCity, uploadWarranty, validateWarranty, addMultipleWarrantyNumbers, updateOrderStatus, updateShippingStatusService,
  getOrdersByShippingStatus, createLabourRate, getLabourRate, getLabourRateByItem, updateLabourRate, deleteLabourRate, createCustomer, getCustomer, deleteCustomer, updateCustomer, getCustomerById, getCustomerByCity, getCustomerByName,
  createMetal, getMetal, updateMetal, deleteMetal, createUchak, getAllUchak, getUchakById, updateUchak, deleteUchak, createPerGram, getAllPerGram, getPerGramById, updatePerGram, deletePerGram,
  createPercentage, getPercentageById, getAllPercentage, updatePercentage, deletePercentage, createNonBarcodeProduct, getNonBarcodeProducts, getNonBarcodeProductsByDate, getNonBarcodeProductsById,
  updateNonBarcodeProduct, deleteNonBarcodeProduct, createCategory, getCategroyById, getAllCategories, updateCategory,deleteCategory, createRole, getAllRoles, getRoleById, updateRole, deleteRole,
  createRoleUser, getAllRoleUsers, getRoleUserById, updateRoleUser, deleteRoleUser, createNonUchak, getAllNonUchak, getNonUchakById, updateNonUchak, deleteNonUchak, createNonPerGram,
  getAllNonPerGram, getNonPerGramById, updateNonPerGram, deleteNonPerGram, createNonPercentage,  getAllNonPercentage, getNonPercentageById, updateNonPercentage, deleteNonPercentage,
  createPurchaseBill, getPurchaseBillById, getAllPurchaseBills, updatePurchaseBill, deletePurchaseBill, downloadPurchaseBillsCSV, downloadPurchaseBillsPDF, getDaybookReport,
  getProductsByAccount, getProductsByCalculatedMarketRate, getProductsByExtraRate, getProductsByFinalPrice, getProductsByGMEPrice, getProductsByGoldRate, getBarcodeImage,
  getProductsByNetWeight, getProductsByLabour, getProductsByGst, getProductsByHsnCode, getProductsByGroupName, getProductsByHuid, getProductsByHuidCharge, getNonProductByLocation,
  getProductsByHuidRule, getProductsByJadatr, getProductsByMarketRateUsed, getProductsByMoti, getProductsByPcs, getProductsBySilverRate, getNonProductsByGrossWeight, getAllBillById,
  getProductsByWastage, getProductsByStone, getProductsByTotalPrice, getProductsByFineWeight, getNonProductsByCalculatedMarketRate, getNonProductsByFinalPrice, getNonProductsByFineWeight,
  getNonProductsByGMEPrice, getNonProductsByGst, getNonProductsByMarketRateUsed, getNonProductsByNetWeight, getNonProductsByTotalPrice, getNonProductByGroupId, getNonProductsByGroupItemId,
  handleBulkDelete, handleBulkPrint,
}
