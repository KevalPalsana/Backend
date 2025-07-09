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

const IconCompanyInfo = model('IconCompanyInfo', infoSchema);

export default IconCompanyInfo;
