import { Schema, model } from 'mongoose';
import paginate from './plugins/paginate.plugin.js';
import MarketRate from './rate.model.js';
import bwipjs from 'bwip-js';
import Group from './category.model.js';


const productSchema = new Schema(
  {
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    groupItemId: { type: Schema.Types.ObjectId, ref: "GroupItem", required: true },
    barCode: { type: String, unique: true },
    barcodeImage: { type: String },
    toWeight: { type: String, required: true },
    lessWeight: { type: String, default: "0" },
    netWeight: { type: String },
    fineWeight: { type: String },
    wastage: { type: String },
    hsnCode: { type: String },
    group: { type: String },
    goldRate: { type: String },
    silverRate: { type: String },
    account: { type: String, default: '' },
    labour: { type: String, default: 0 },
    extraRate: { type: Schema.Types.Mixed },
    location: { type: String, default: '' },
    pcs: { type: Number, default: 1 },
    design: { type: Schema.Types.ObjectId, ref: "Design" },
    size: { type: Schema.Types.ObjectId, ref: "Size" },
    moti: { type: Number, default: 0 },
    stone: { type: Number, default: 0 },
    jadatr: { type: Number, default: 0 },
    huid: { type: String, default: '' },
    huidRule: { type: Schema.Types.ObjectId, ref: 'HUIDRule' },
    huidCharge: { type: String, default: "0" },
    totalPrice: { type: Number },
    marketRateUsed: { type: Number },
    calculatedMarketRate: { type: Number },
    GMEPrice: { type: Number },
    gst: { type: Number, default: 0 },
    finalPrice: { type: Number },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

productSchema.statics.bulkInsertProducts = async function (
  groupId,
  groupItemId,
  productsArray,
  prefix = '', 
  suffix = ''  
) {
  if (!Array.isArray(productsArray)) {
    throw new Error("productsArray must be an array of product objects.");
  }

  try {
    let productsToInsert = [];
    let appliedMarketRate = 0;

    const marketRate = await MarketRate.findOne({ categoryId: groupId });

    if (marketRate) {
      appliedMarketRate = parseFloat(marketRate.price || "0");
    }

    let percentage = 100;

    const groupData = await Group.findOne({ _id: groupId });
    if (groupData && groupData.percentage) {
      percentage = parseFloat(groupData.percentage);
    }

    for (let product of productsArray) {
      let newProduct = {
        groupId,
        groupItemId,
        toWeight: product.toWeight || 0,
        lessWeight: product.lessWeight || 0,
        fineWeight: product.fineWeight,
        wastage: product.wastage || "",
        hsnCode: product.hsnCode || "",
        group: product.group || "",
        goldRate: product.goldRate || "",
        silverRate: product.silverRate || "",
        account: product.account || "",
        pcs: product.pcs || 1,
        labour: parseFloat(product.labour || 0),
        extraRate: parseFloat(product.extraRate || 0),
        gst: parseFloat(product.gst || 0),
        size: product.size,
        design: product.design,
        location: product.location || "",
        moti: product.moti || 0,
        stone: product.stone || 0,
        jadatr: product.jadatr || 0,
        huid: product.huid || "",
        huidRule: product.huidRule || null,
        huidCharge: product.huidCharge || "0",
        appliedMarketRate,
      };

      newProduct.netWeight = parseFloat(newProduct.toWeight) - parseFloat(newProduct.lessWeight || 0);

      newProduct.fineWeight = (parseFloat(newProduct.netWeight) * (percentage / 100)).toFixed(2);

      newProduct.marketRateUsed = appliedMarketRate;
      newProduct.calculatedMarketRate = appliedMarketRate * newProduct.netWeight;

      if (appliedMarketRate) {
        newProduct.totalPrice = newProduct.calculatedMarketRate;
      } else {
        newProduct.totalPrice = 0;
      }

      newProduct.totalPrice += newProduct.labour;

      // Generate Unique Barcode
      let isUnique = false;
      while (!isUnique) {
        const randomBarcode = `${prefix}${Math.floor(Math.random() * 90000) + 10000}${suffix}`;
        const existingProduct = await model("SPJProduct").findOne({ barCode: randomBarcode });
        if (!existingProduct) {
          newProduct.barCode = randomBarcode;
          isUnique = true;
        }
      }

      // Generate Barcode Image
      try {
        const barcodeBuffer = await bwipjs.toBuffer({
          bcid: 'code128',
          text: newProduct.barCode,
          scale: 3,
          height: 10,
          includetext: true,
          textxalign: 'center',
        });
        newProduct.barcodeImage = `data:image/png;base64,${barcodeBuffer.toString('base64')}`;
      } catch (err) {
        console.error("Error generating barcode image:", err);
        newProduct.barcodeImage = "";
      }

      if (newProduct.extraRate) {
        if (typeof newProduct.extraRate === 'number') {
          newProduct.totalPrice += newProduct.extraRate;
        } else if (typeof newProduct.extraRate === 'string' && newProduct.extraRate.endsWith('%')) {
          const percentage = parseFloat(newProduct.extraRate.replace('%', ''));
          newProduct.totalPrice += (percentage / 100) * newProduct.totalPrice;
        }
      }

      newProduct.GMEPrice = newProduct.calculatedMarketRate + newProduct.labour + newProduct.extraRate;
      newProduct.finalPrice = newProduct.GMEPrice + newProduct.gst;

      productsToInsert.push(newProduct);
    }

    const insertedProducts = await model('SPJProduct').insertMany(productsToInsert);
    return {
      appliedMarketRate,
      insertedProducts,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

productSchema.statics.updateStockPrices = async function (categoryId, newMarketRate) {
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

productSchema.plugin(paginate);
const SPJProduct = model('SPJProduct', productSchema);
export default SPJProduct;
