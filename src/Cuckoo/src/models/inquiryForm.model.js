import { Schema, model } from 'mongoose';

const inquirySchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "Package"},
    name: String ,
    email: String,
    phoneNumber: String,
    date: String,
    count: Number,
    message: String,
  },
  { timestamps: true }
);

const InquiryForm = model('InquiryForm', inquirySchema);

export default InquiryForm;                                                                
