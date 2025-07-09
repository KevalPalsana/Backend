import mongoose from 'mongoose';

//
// ── Line‑item (branch outward) sub‑schema
//
const branchOutwardItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
    },
    qty: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);


const branchOutwardSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
    },
    outwardType: {
      type: String,
      enum: ['Indent', 'Direct', 'Transfer', 'Other'], // customize enum as needed
    },
    indent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BranchIndent',
    },
    toBranch: {
      type: String,
    },
    department: {
      type: String,
    },
    outwardDate: {
      type: Date,
    },

    items: [branchOutwardItemSchema],

    refNo: {
      type: String,
    },
    vehicleNo: {
      type: String,
    },
    driverName: {
      type: String,
    },
    outwardBy: {
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

export default mongoose.model('BranchOutward', branchOutwardSchema);
