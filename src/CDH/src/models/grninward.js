import mongoose from 'mongoose';


const grninwardItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
    },
    batchNo: {
      type: String,
    },
    expiryDate: Date,
    rate: {
      type: Number,
    },
    qty: {
      type: Number,
    },
  },
  { _id: false }
);

const grninwardSchema = new mongoose.Schema(
  {
    inwardType: {
      type: String,
      enum: ['PO', 'Direct', 'Return', 'Transfer', 'Other'], 
    },
    inwardDate: {
      type: Date,
    },
    invoiceDate: {
      type: Date,
    },
    invoiceNo: {
      type: String,
    },

    items: [grninwardItemSchema],

    vehicleNo: {
      type: String,
    },
    driverName: {
      type: String,
    },
    inwardBy: {
      type: String,
    },
    remark: {
      type: String,
    },

    attachment: {
      type: String, 
    },
  },
  { timestamps: true }
);

export default mongoose.model('Grninward', grninwardSchema);
