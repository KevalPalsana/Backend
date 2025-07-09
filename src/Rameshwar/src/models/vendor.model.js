import mongoose from 'mongoose';

const bankDetailsSchema = new mongoose.Schema({
  accountName: { type: String, default: "" },
  accountNumber: { type: String, default: "" },
  ifscCode: { type: String, default: "" },
  bankName: { type: String, default: "" }
}, { _id: false }); 

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  gstNo: { type: String},
  panNo: { type: String },
  pinCode: { type: Number },
  mobileNumber: { type: String },
  email: { type: String },
  bankDetails: { 
    type: bankDetailsSchema, 
    default: {} 
  },
  hsnCode: [{ type: String }],
}, { timestamps: true });

const RameshwarVendor = mongoose.model('RameshwarVendor', vendorSchema);
export default RameshwarVendor;
