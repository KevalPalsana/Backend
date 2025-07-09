import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  referralName: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  anniversaryDate: {
    type: Date,
    default: null
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  locality: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  dndStatus: {
    type: Boolean,
    default: false
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

export default mongoose.model('Referral', referralSchema);
