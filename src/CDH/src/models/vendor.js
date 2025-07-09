import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  stdCode: String,
  landline: String,
  otherPhone: String,

  primaryTitle: String,
  primaryContactName: String,
  countryCode1: String,
  mobile: String,
  emailPersonal: String,

  secondaryTitle: String,
  secondaryContactName: String,
  countryCode2: String,
  secondMobile: String,
  emailWork: String,

  isLab: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  specialInstructions: String,
  paymentTerms: String,
  notes: String,

  additionalInfo: String,
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);
