import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    primaryName: String,
    secondaryName: String,

    primaryCountryCode: String,
    primaryContactNo: { type: String, required: true },

    secondaryCountryCode: String,
    secondaryContactNo: String,

    personalEmail: String,
    workEmail: String,

    landline1: String,
    landline2: String,

    active: { type: Boolean, default: true },

    tags: [String],
    notes: String,
  },
  { timestamps: true }
);

const CDHContact = mongoose.model('CDHContact', contactSchema);
export default CDHContact;
