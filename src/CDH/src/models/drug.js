import mongoose from 'mongoose';

const drugSchema = new mongoose.Schema({
  drugCode: {
    type: String,
  },
  drugName: {
    type: String,
    required: true
  },
  drugType: {
    type: String,
    required: true
  },
  strength: {
    type: String,
  },
  morningQty: {
    type: Number,
    default: 0
  },
  noonQty: {
    type: Number,
    default: 0
  },
  nightQty: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
  },
  calculateTotalQty: {
    type: Boolean,
    default: false
  },
  totalQty: {
    type: Number,
    default: 0
  },
  food: {
    type: String,
  },
  instruction: {
    type: String,
  },
  composition: {
    type: String,
  },
  routeOfAdmin: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String,
  },
  remark: {
    type: String,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model('Drug', drugSchema);
