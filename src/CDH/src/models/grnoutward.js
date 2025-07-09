import mongoose from 'mongoose';

const GRNOutwardSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
    },
    clinicIndent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BranchIndent',
        required: true,
    },
    department: {
      type: String,
    },
    outwardDate: {
      type: Date,
    },
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

export default mongoose.model('GRNOutward', GRNOutwardSchema);
