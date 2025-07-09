import mongoose from 'mongoose';
import GroupItem from './subCategory.model.js';
import SPJNonBarcodeProduct from './nonBarcode.model.js';
import SPJProduct from './product.model.js';

const purchaseBillSchema = new mongoose.Schema(
  {
    serialNo: { type: mongoose.Schema.Types.ObjectId, ref: 'SerialNo' },
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: 'products.autoRef'
        },
        autoRef: { 
          type: String,
          default: function () {
            return this.productId ? 'SPJNonBarcodeProduct' : 'SPJProduct';
          }
        },
        productName: { type: String },  
        hsnCode: { type: Number },
        gstRate: { type: Number },
        grossWeight: { type: Number }, 
        netWeight: { type: Number }, 
        pcs: { type: Number }, 
        rate: { type: Number },
        labour: { type: Number, default: 0 },
        labourRate: { type: Number, default: 0 },
        extraRs: { type: Number, default: 0 },
        totalPrice: { type: Number },
        amount: { type: Number, default: 0 },
      },
    ],
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Info" },
    billType: { type: String, enum: ['estimate', 'tax'] },
    billNo: { type: Number },
    date: { type: String },
    totalPrice: { type: Number },
    discount: { type: Number, default: 0 },
    discountPrice: { type: Number },
    discountAmount: { type: Number, default: 0 },
    total: { type: Number },
    selectType: { type: String, enum: ['in', 'out'] },
    cgstAmount: { type: Number, default: 0 },
    sgstAmount: { type: Number, default: 0 },
    gstAmount: { type: Number, default: 0 },
    roundOff: { type: Number, default: 0 },
    cashPayment: { type: Number, default: 0},
    finalAmount: { type: Number, default: 0 },
    paymentType: { type: String, enum: ['cash', 'online'] },
    type: { type: String, default: 'purchase' },
  },
  { timestamps: true }
);

/** Middleware: Before Saving Invoice, Deduct Stock (Gross Weight & PCS) */
purchaseBillSchema.pre('save', async function (next) {
  try {
    let grandTotal = 0;

    for (const product of this.products) {
      let productData;

      product.pcs = Number(product.pcs) || 0; 


      if (mongoose.Types.ObjectId.isValid(product.productId)) {
        productData = await SPJProduct.findById(product.productId);
        if (productData) {
          product.autoRef = "SPJProduct"; 
        }
      }

      if (!productData && mongoose.Types.ObjectId.isValid(product.productId)) {
        productData = await SPJNonBarcodeProduct.findById(product.productId);
        if (productData) {
          product.autoRef = "SPJNonBarcodeProduct"; 
          
          /** Deduct Gross Weight and PCS from Stock */
          if (productData.toWeight < product.grossWeight) {
            throw new Error(
              `Not enough stock for ${product.productName}. Available Weight: ${productData.toWeight}, Requested: ${product.grossWeight}`
            );
          }

          if (productData.pcs < product.pcs) {
            throw new Error(
              `Not enough PCS for ${product.productName}. Available PCS: ${productData.pcs}, Requested: ${product.pcs}`
            );
          }

          productData.toWeight -= product.grossWeight;
          productData.pcs -= product.pcs;
          await productData.save();
        }
      }

      if (!productData) {
        throw new Error(`Product with ID ${product.productId} not found`);
      }

      const subtotal = product.totalPrice || 0;
      product.amount = subtotal; 
      grandTotal += subtotal; 
    }

    next();
  } catch (error) {
    next(error);
  } 
});

purchaseBillSchema.post('save', async function (doc, next) {
  try {
    for (const product of doc.products) {
      if (product.autoRef === "SPJProduct") {
        await SPJProduct.findByIdAndDelete(product.productId);
        console.log(`Deleted SPJProduct with ID: ${product.productId}`);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const PurchaseBill = mongoose.model('PurchaseBill', purchaseBillSchema);

export default PurchaseBill;
