import mongoose from "mongoose";

const generalPractitionerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  countryCode1: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  countryCode2: {
    type: String,
    required: true,
  },
  secondMobile: {
    type: String,
  },
  emailPersonal: {
    type: String,
  },
  emailWork: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  anniversary: {
    type: Date,
    default: null,
  },
  areaCode: {
    type: String,
  },
  landline: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
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
  state: {
    type: String,
  },
  notes: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model("GeneralPractitioner", generalPractitionerSchema);
