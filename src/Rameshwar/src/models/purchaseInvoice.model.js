import mongoose from 'mongoose';
import RameshwarCategory from './category.model.js';

const paymentSchema = new mongoose.Schema({
  paymentDate: Date,
  amountPaid: Number
}, { _id: false });

const returnSchema = new mongoose.Schema({
  returnDate: Date,
  returnAmount: Number,
  commission: Number,
  note: String
}, { _id: false });

const purchaseBillSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'RameshwarVendor' },
  date: { type: Date, default: Date.now },
  billDate: String,
  billNo: String,

  termsOfPayment: String,
  dispatchedThrough: String,
  vehicleNo: String,
  dispatchedDocNo: String,
  buyerAddress: String,
  billImage: [String],
  productImage: [String],
  paymentStatus: { type: String, enum: ['paid', 'remaining'], default: 'remaining' },
  billType: { type: String, enum: ['actual', 'adp'], default: 'actual' },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    address: String,
  },
  products: [
    {
      categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      productName: String,
      totalPckgs: Number,
      hsnSac: String,
      gstRate: Number,
      quantity: Number,
      rate: Number,
      per: String,
      discount: { type: Number, default: 0 },
      totalAmount: Number,
      rateType: { type: String, enum: [' Basic Rate', ' With Gst Rate'], default: ' Basic Rate' },
    },
  ],
  paymentHistory: [paymentSchema],
  returnAndCommissionHistory: [returnSchema],
  cgstAmount: Number,
  sgstAmount: Number,
  totalTaxAmount: Number,
  roundOff: Number,
  finalTotal: Number,
  paidAmount: Number,
  remainingAmount: Number
}, { timestamps: true });

const RameshwarPurchaseBill = mongoose.model('RameshwarPurchaseBill', purchaseBillSchema);
export default RameshwarPurchaseBill;