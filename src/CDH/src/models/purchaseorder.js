import mongoose from 'mongoose';

const purchaseOrderItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
    },
    rate: {
      type: Number,
    },
    lastRate: {
      type: Number,
      default: 0,
    },
    qty: {
      type: Number,
      default: 1,
    },
    lastQty: {
      type: Number,
      default: 0,
    },
    lastPODate: {
        type: Date,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    gstPercent: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
    },
  }, 
);


const purchaseOrderSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    vendorAddress: {
        String
    },

    poDate: {
      type: Date,
    },
    refNo: 
    {
        type: String
    },          

    items: [purchaseOrderItemSchema],

    deliveryLocation: String,
    deliveryTime: Date,    
    paymentMode: {
      type: String,
      enum: ['IN', 'OUT', 'CASH', 'BANK', 'CARD', 'UPI', 'OTHER'],
      default: 'IN',
    },

    remark: String,

    attachment: String,     

    total: {
      type: Number,
      required: true,
    },
    totalGST: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  }, {timestamps: true});

export default mongoose.model('PurchaseOrder', purchaseOrderSchema);
