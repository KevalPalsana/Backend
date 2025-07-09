import { Schema, model } from 'mongoose';

const visaInquiryFormSchema = new Schema(
  {
    email: String,
    phoneNumber: String,
    visaId: {type: Schema.Types.ObjectId, ref: "Visa"},
    travellers: Number,
  },
  { timestamps: true }
);

const VisaInquiryForm = model('VisaInquiryForm', visaInquiryFormSchema);

export default VisaInquiryForm;
