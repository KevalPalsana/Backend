import { Schema, model } from 'mongoose';

const razorPaySchema = new Schema({
  key: { type: String, required: true},
  secret: { type: String},
});

const RazorPay = model('RazorPay', razorPaySchema);

export default RazorPay;
