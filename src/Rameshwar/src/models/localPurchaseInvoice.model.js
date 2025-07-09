import mongoose from 'mongoose';
import LocalCategory from './localCategory.model.js';

const localPurchaseBillSchema = new mongoose.Schema(
  {
    quotationNo: { type: String, required: false, unique: false }, 
    date: { type: Date, default: Date.now },
    vendorName: { type: String },
    vendorAddress: { type: String },
    vendorGstNo: { type: String },
    vendorPanNo: { type: String },
    vendorState: { type: String },
    billDate: { type: String },
    billImage: [{ type:String}],
    productImage: [{ type: String}],
    paymentStatus: { type: String, enum: ['paid', 'remaining'], default: 'remaining' },
    products: [
      {
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "LocalCategory" },
        productName: { type: String, required: true },
        totalPckgs: { type: Number, required: true },
        gstRate: { type: Number },
        quantity: { type: String, required: true },
        rate: { type: Number, required: true },
        per: { type: String },
        discount: { type: Number, default: 0 },
        totalAmount: { type: Number },
      },
    ],

    bankDetails: {
      accountName: { type: String },
      accountNumber: { type: String },
      ifscCode: { type: String },
      bankName: { type: String },
      address: { type: String },
    },
    cgstAmount: { type: Number, default: 0 },
    sgstAmount: { type: Number, default: 0 },
    totalTaxAmount: { type: Number, default: 0 },
    roundOff: { type: Number, default: 0 },
    finalTotal: { type: Number, required: true },
    paidAmount: { type: Number, required: true},
    remainingAmount: { type: Number, default: 0},
  },
  { timestamps: true }
);

/** Middleware: Before Saving Invoice, Deduct Stock (Gross Weight & PCS) */
localPurchaseBillSchema.pre("save", async function (next) {
  try {
    for (const product of this.products) {
      const matchedCategory = await LocalCategory.findById(product.categoryId);
      const quantity = Number(product.quantity) || 0;

      // ✅ 1. Update Category stock if exists
      if (matchedCategory) {
        matchedCategory.stock = (matchedCategory.stock || 0) + quantity;
        await matchedCategory.save();
      }

      // ✅ 2. Handle LocalCategory (by productName)
      const rawName = product.productName.trim();
      const normalizedName = rawName.toUpperCase();

      let localCat = await LocalCategory.findOne({
        name: { $regex: new RegExp(`^${rawName}$`, "i") },
      });

      if (localCat) {
        localCat.availableStock += quantity;
        await localCat.save();
      } else {
        localCat = new LocalCategory({
          name: normalizedName,
          availableStock: quantity,
        });
        await localCat.save();
      }
    }

    next();
  } catch (error) {
    console.error("Error updating stocks:", error);
    next(error);
  }
});

const LocalPurchaseBill = mongoose.model('LocalPurchaseBill', localPurchaseBillSchema);

export default LocalPurchaseBill;
