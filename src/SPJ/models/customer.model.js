import { Schema, model } from 'mongoose';

const customerDetailsSchema = new Schema({
  name: { type: String, required: true},
  address: { type: String},
  // city: { type: Schema.Types.ObjectId, ref: "City"},
  city: { type: String},
  phone: {type: Number},
  panNo: {type: Number},
  GST: { type: String},
  BD: { type: String},
  AD: { type: String},
  RefName: { type: String},
  photo: { type: String},
  adharCard: { type: Number},
  // state: { type: Schema.Types.ObjectId, ref: "State"},
  state: { type: String},
  pinCode: { type: Number},
  mobileNumber: { type: String},
  email: { type: String},
});

const Customer = model('Customer', customerDetailsSchema);

export default Customer;
