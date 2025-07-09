import mongoose from 'mongoose';

const calculationSchema = new mongoose.Schema(
  {
    name: { type: String},
    count: { type: String},
  },
  { timestamps: true }
);

export default mongoose.model('ChhapiaCalculation', calculationSchema);
