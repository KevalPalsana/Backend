import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String },
  address: { type: String },
  panNo: { type: String },
  gstNo: { type: String },
  mobileNumber: { type: String },
  email: { type: String },
}, { timestamps: true });

const RameshwarCustomer = mongoose.model('RameshwarCustomer', customerSchema);
export default RameshwarCustomer;
