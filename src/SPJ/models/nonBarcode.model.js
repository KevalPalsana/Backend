import axios from 'axios'; 
import { Schema, model } from 'mongoose';
import paginate from './plugins/paginate.plugin.js';
import MarketRate from './rate.model.js';
import Group from './category.model.js';

const nonBarcodeProductSchema = new Schema(
  {
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    groupItemId: { type: Schema.Types.ObjectId, ref: "NonBarcodeCategory", required: true },
    productName: { type: String, required: true },
    toWeight: { type: String, required: true },
    lessWeight: { type: String, default: "0" },
    netWeight: { type: String },
    fineWeight: { type: String },
    wastage: { type: String },
    hsnCode: { type: String },
    group: { type: String },
    account: { type: String, default: '' },
    labour: { type: Number, default: 0 },
    extraRate: { type: Schema.Types.Mixed },
    location: { type: String, default: '' },
    pcs: { type: Number, default: 1 },
    design: { type: Schema.Types.ObjectId, ref: "Design" },
    size: { type: Schema.Types.ObjectId, ref: "Size" },
    finalPrice: { type: Number },
    marketRateUsed: { type: Number },
    calculatedMarketRate: { type: Number },
    GMEPrice: { type: Number },
    gst: { type: Number, default: 0 },
    totalPrice: { type: Number },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

/**
 * Fetch product details from API based on productName and toWeight
 */
async function fetchProductDetails(productName, toWeight) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/admin/productDetails?productName=${productName}&toWeight=${toWeight}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

/**
 * Bulk Insert or Update Stock
 */
nonBarcodeProductSchema.statics.bulkInsertProducts = async function (groupId, groupItemId, productName, productsArray) {
  if (!Array.isArray(productsArray) || productsArray.length === 0) {
    throw new Error("productsArray must be a non-empty array.");
  }

  try {
    console.log("🛠️ Starting Bulk Insert Process...");

    let appliedMarketRate = 0;
    const marketRate = await MarketRate.findOne({ categoryId: groupId });

    if (marketRate) {
      appliedMarketRate = parseFloat(marketRate.price || "0");
    }

    let percentage = 100;
    const groupData = await Group.findOne({ _id: groupId });
    if (groupData && groupData.percentage) {
      percentage = parseFloat(groupData.percentage);
    } else {
      console.warn(`No percentage data found for GroupId: ${groupId}. Defaulting to 100%.`);
    }

    let productsToInsert = [];
    let updateOperations = [];

    for (let product of productsArray) {
      console.log("Checking product:", product);

      const existingProduct = await this.findOne({
        groupId,
        groupItemId,
        productName,
      });

      if (existingProduct) {
        console.log("Updating Existing Product:", existingProduct._id);

        existingProduct.pcs += product.pcs || 1;
        existingProduct.toWeight = (
          parseFloat(existingProduct.toWeight) + parseFloat(product.toWeight || 0)
        ).toFixed(2);
        existingProduct.lessWeight = (
          parseFloat(existingProduct.lessWeight) + parseFloat(product.lessWeight || 0)
        ).toFixed(2);
        existingProduct.netWeight = (
          parseFloat(existingProduct.toWeight) - parseFloat(existingProduct.lessWeight)
        ).toFixed(2);

        existingProduct.fineWeight = (parseFloat(existingProduct.netWeight) * (percentage / 100)).toFixed(2);

        existingProduct.marketRateUsed = appliedMarketRate;
        existingProduct.calculatedMarketRate = appliedMarketRate * existingProduct.netWeight;
        existingProduct.finalPrice = existingProduct.calculatedMarketRate + existingProduct.labour;

        if (existingProduct.extraRate) {
          if (typeof existingProduct.extraRate === "number") {
            existingProduct.finalPrice += existingProduct.extraRate;
          } else if (
            typeof existingProduct.extraRate === "string" &&
            existingProduct.extraRate.endsWith("%")
          ) {
            const percentage = parseFloat(existingProduct.extraRate.replace("%", ""));
            existingProduct.finalPrice += (percentage / 100) * existingProduct.finalPrice;
          }
        }

        existingProduct.GMEPrice = existingProduct.calculatedMarketRate + existingProduct.labour + existingProduct.extraRate;
        existingProduct.totalPrice = existingProduct.GMEPrice + existingProduct.gst;

        await existingProduct.save();
        updateOperations.push(existingProduct);
      } else {
        console.log("Creating New Product:", product.productName);

        let netWeight = (parseFloat(product.toWeight) - parseFloat(product.lessWeight || 0)).toFixed(2);

        let newProduct = new this({
          groupId,
          groupItemId,
          productName,
          toWeight: parseFloat(product.toWeight || 0).toFixed(2),
          lessWeight: parseFloat(product.lessWeight || 0).toFixed(2),
          netWeight,
          fineWeight: (parseFloat(netWeight) * (percentage / 100)).toFixed(2),          
          wastage: product.wastage || "",
          hsnCode: product.hsnCode || "",
          group: product.group || "",
          account: product.account || "",
          pcs: product.pcs || 1,
          labour: parseFloat(product.labour || 0),
          extraRate: parseFloat(product.extraRate || 0),
          gst: parseFloat(product.gst || 0),
          location: product.location || "",
          moti: product.moti || 0,
          stone: product.stone || 0,
          jadatr: product.jadatr || 0,
          huid: product.huid || "",
          huidRule: product.huidRule || null,
          huidCharge: product.huidCharge || "0",
          netWeight: (parseFloat(product.toWeight) - parseFloat(product.lessWeight || 0)).toFixed(2),
          marketRateUsed: appliedMarketRate,
          calculatedMarketRate: appliedMarketRate * (parseFloat(product.toWeight) - parseFloat(product.lessWeight || 0)),
        });

        newProduct.finalPrice = newProduct.calculatedMarketRate + newProduct.labour;

        if (newProduct.extraRate) {
          if (typeof newProduct.extraRate === "number") {
            newProduct.finalPrice += newProduct.extraRate;
          } else if (typeof newProduct.extraRate === "string" && newProduct.extraRate.endsWith("%")) {
            const percentage = parseFloat(newProduct.extraRate.replace("%", ""));
            newProduct.finalPrice += (percentage / 100) * newProduct.finalPrice;
          }
        }

        newProduct.GMEPrice = newProduct.calculatedMarketRate + newProduct.labour + newProduct.extraRate;
        newProduct.totalPrice = newProduct.GMEPrice + newProduct.gst;

        productsToInsert.push(newProduct);
      }
    }

    // Log products to insert
    console.log("Products to Insert:", productsToInsert);

    //Insert new products in bulk
    if (productsToInsert.length > 0) {
      const insertedProducts = await this.insertMany(productsToInsert);
      console.log("Successfully Inserted Products:", insertedProducts.length);
    } else {
      console.log("No New Products to Insert.");
    }

    //Update existing products
    await Promise.all(updateOperations);

    return {
      appliedMarketRate,
      insertedProducts: productsToInsert.length,
      updatedProducts: updateOperations.length,
    };
  } catch (error) {
    console.error("Error in bulkInsertProducts:", error.message);
    throw new Error(error.message);
  }
};

nonBarcodeProductSchema.statics.updateStockPrices = async function (categoryId, newMarketRate) {
  try {
      const products = await this.find({ groupId: categoryId });

      for (let product of products) {
          product.marketRateUsed = newMarketRate;
          product.calculatedMarketRate = newMarketRate * parseFloat(product.netWeight || 0);
          product.totalPrice = product.calculatedMarketRate + parseFloat(product.labour || 0);

          if (product.extraRate) {
              if (typeof product.extraRate === 'number') {
                  product.totalPrice += product.extraRate;
              } else if (typeof product.extraRate === 'string' && product.extraRate.endsWith('%')) {
                  const percentage = parseFloat(product.extraRate.replace('%', ''));
                  product.totalPrice += (percentage / 100) * product.totalPrice;
              }
          }

          product.GMEPrice = product.calculatedMarketRate + parseFloat(product.labour || 0) + parseFloat(product.extraRate || 0);
          product.finalPrice = product.GMEPrice + parseFloat(product.gst || 0);

          await product.save();
      }

      console.log(`Updated ${products.length} stock items for market rate change.`);
      return { success: true, message: `${products.length} stock items updated.` };
  } catch (error) {
      console.error("Error updating stock for market rate change:", error);
      return { success: false, error: error.message };
  }
  };

  //   productSchema.statics.updateStockOnLabourChange = async function (groupId, itemId, newRate, labourType) {
//   try {
//     const products = await this.find({ groupId, groupItemId: itemId, labourType });

//     for (let product of products) {
//       let newLabourAmount = 0;

//       if (labourType === "Uchak") {
//         newLabourAmount = newRate;
//       } else if (labourType === "PerGram") {
//         newLabourAmount = newRate * parseFloat(product.netWeight || 0);
//       } else if (labourType === "Percentage") {
//         newLabourAmount = (parseFloat(product.netWeight || 0) * product.marketRateUsed * newRate) / 100;
//       }

//       // ✅ Update stock calculations
//       product.labour = newLabourAmount;
//       product.totalPrice = product.calculatedMarketRate + newLabourAmount;

//       if (product.extraRate) {
//         if (typeof product.extraRate === 'number') {
//           product.totalPrice += product.extraRate;
//         } else if (typeof product.extraRate === 'string' && product.extraRate.endsWith('%')) {
//           const percentage = parseFloat(product.extraRate.replace('%', ''));
//           product.totalPrice += (percentage / 100) * product.totalPrice;
//         }
//       }

//       product.GMEPrice = product.totalPrice;
//       product.finalPrice = product.GMEPrice + product.gst;

//       await product.save();
//     }

//     return { success: true, message: `${products.length} stock items updated.` };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// };

// productSchema.statics.updateStockPricesForLabour = async function (groupId, itemId, newLabourRate, labourType) {
//   try {
//     const products = await this.find({ groupId, groupItemId: itemId, labourType });

//     for (let product of products) {
//       product.labourRate = newLabourRate; // Update Labour Rate

//       // Recalculate Prices
//       product.calculatedMarketRate = product.marketRateUsed * parseFloat(product.netWeight || 0);
//       product.totalPrice = product.calculatedMarketRate + parseFloat(product.labourRate || 0);

//       if (product.extraRate) {
//         if (typeof product.extraRate === 'number') {
//           product.totalPrice += product.extraRate;
//         } else if (typeof product.extraRate === 'string' && product.extraRate.endsWith('%')) {
//           const percentage = parseFloat(product.extraRate.replace('%', ''));
//           product.totalPrice += (percentage / 100) * product.totalPrice;
//         }
//       }

//       product.GMEPrice = product.calculatedMarketRate + parseFloat(product.labourRate || 0) + parseFloat(product.extraRate || 0);
//       product.finalPrice = product.GMEPrice + parseFloat(product.gst || 0);

//       await product.save();
//     }

//     console.log(`Updated ${products.length} stock items for labour rate change.`);
//     return { success: true, message: `${products.length} stock items updated.` };
//   } catch (error) {
//     console.error("Error updating stock for labour rate change:", error);
//     return { success: false, error: error.message };
//   }
// };


nonBarcodeProductSchema.plugin(paginate);
const SPJNonBarcodeProduct = model('SPJNonBarcodeProduct', nonBarcodeProductSchema);
export default SPJNonBarcodeProduct;

