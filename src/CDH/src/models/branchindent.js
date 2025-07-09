import mongoose from 'mongoose';

const indentItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
    },
    unit: {
      type: String,
    },
    availableQty: {
      type: Number,
    },
    consumptionAvg: {
      type: Number,
    },
    qty: {
      type: Number,
    },
    remark: {
      type: String,
    },
  },
  { _id: false }
);


const branchIndentSchema = new mongoose.Schema(
  {
    fromBranch: {
      type: String,
    },
    toBranch: {
      type: String,
    },
    indentType: {
      type: String,
    },
    indentDate: {
      type: Date,
    },
    department: {
      type: String,
    },
    employee: {
      type: String,
    },
    items: [indentItemSchema],
    remark: {
      type: String,
    },
    attachment: {
      type: String, 
    },
  },
  { timestamps: true }
);

export default mongoose.model('BranchIndent', branchIndentSchema);
