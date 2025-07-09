import { Schema, model } from 'mongoose';

const inquirySchema = new Schema(
  {
    name: String ,
    email: String,
    phone: String,
    date: String,
    count: Number,
    address: String,
    message: String,
  },
  { timestamps: true }
);

const CustomerForm = model('CustomerForm', inquirySchema);

export default CustomerForm;                                                                
