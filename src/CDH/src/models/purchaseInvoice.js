import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  item: {
    type: String,
  },
  rate: {
    type: Number,
  },
  qty: {
    type: Number,
    default: 1
  },
  discountPercent: {
    type: Number,
    default: 0
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  gstPercent: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  }
});

const purchaseInvoiceSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
  },
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PurchaseOrder', 
  },
  vendorAddress: {
    type: String
  },
  refNo: {
    type: String
  },
  piDate: {
    type: Date,
  },
  items: [itemSchema],
  vendorInvoiceNo: {
    type: String
  },
  remark: {
    type: String
  },
  attachment: {
    type: String
  },
  total: {
    type: Number,
    required: true
  },
  totalGST: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
},{timestamps:true});

export default mongoose.model('PurchaseInvoice', purchaseInvoiceSchema);

