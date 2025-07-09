import mongoose from 'mongoose';

const returnItemSchema = new mongoose.Schema({
  itemAndBatch: {
    type: String,
  },
  availableQty: {
    type: Number,
  },
  rate: {
    type: Number,
  },
  qty: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  gstPercentage: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
  }
});

const purchaseReturnBillSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
  },
  purchaseInvoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PurchaseInvoice',
  },
  vendorAddress: {
    type: String
  },
  refNo: {
    type: String
  },
  priDate: {
    type: Date,
  },
  items: {
    type: [returnItemSchema],
   },
  remark: {
    type: String
  },
  attachment: {
    type: String
  },
  totalGST: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
}, {timestamps:true});

export default mongoose.model('PurchaseReturnBill', purchaseReturnBillSchema);

