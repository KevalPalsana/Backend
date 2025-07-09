import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema({
  companyname: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model('Insurance', insuranceSchema);
