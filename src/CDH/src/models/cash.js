import mongoose from 'mongoose';

const cashSchema = new mongoose.Schema({
  cash: {
    type: String,
    required: true
  },
  searchwords:
  {
      type: String
  },
  active:
  {
      type: Boolean,
      default: false,
  },
  default:
  {
      type: Boolean,
      default: false,
  },
  notes: {
    type: String,
    default: ''
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
},{timestamps:true});

export default mongoose.model('Cash', cashSchema);
