import mongoose from 'mongoose';

const bankAccountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true
  },
  branch: {
    type: String
  },
  city: {
    type: String
  },
  accountNumber: {
    type: String
  },
  accountName: {
    type: String
  },
  ifscCode: {
    type: String
  },
  Active: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
}, { timestamps: true });

export default mongoose.model('BankAccount', bankAccountSchema);
