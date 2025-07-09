import { Schema, model } from 'mongoose';

const passportInquiryFormSchema = new Schema(
  {
    email: String,
    phone: String,
  },
  { timestamps: true }
);

const PassPortInquiryForm = model('PassPortInquiryForm', passportInquiryFormSchema);

export default PassPortInquiryForm;
