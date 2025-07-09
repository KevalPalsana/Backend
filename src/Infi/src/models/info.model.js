import { Schema, model } from 'mongoose';


const infoSchema = Schema(
  {
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const InfiCompanyInfo = model('InfiCompanyInfo', infoSchema);

export default InfiCompanyInfo;
