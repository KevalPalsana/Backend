import mongoose from 'mongoose';


const branchInwardItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
    },
    batchNo: {
      type: String,
    },
    qty: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);


const branchInwardSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
    },
    inwardType: {
      type: String,
      enum: ['PO', 'Direct', 'Transfer', 'Other'], // match your dropdown
    },
    clinicIndent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BranchIndent',
      required: true,
    },
    department: {
      type: String,
    },

    inwardDate: {
      type: Date,
    },

    items: [branchInwardItemSchema],

    refNo: {
      type: String,
    },
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

export default mongoose.model('BranchInward', branchInwardSchema);
