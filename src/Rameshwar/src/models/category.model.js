import mongoose from 'mongoose';

const companyCategorySchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RameshwarInfo',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  adpStock: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

companyCategorySchema.index({ companyId: 1, name: 1 }, { unique: true });

const RameshwarCategory = mongoose.model('RameshwarCategory', companyCategorySchema);
export default RameshwarCategory;
