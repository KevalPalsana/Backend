import { Schema, model } from 'mongoose';

const bankSchema = new Schema({
  holderName: { type: String, required: true },  
  accountNo: { type: String, required: true }, 
  accountType: { type: String, enum: ['saving', 'current', 'od', 'cc', 'others'], default: 'saving' }, 
  bankName: { type: String }, 
  IFSCCode: { type: String }, 
  bankAddress: { type: String } 
});

const folderSchema = new Schema({
  name: { type: String, required: true },
  images: [
    {
      url: { type: String, required: true },
      name: { type: String },
    }
  ],
});



const infoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "RameshwarUser", required: true },
  firmName: { type: String, required: true }, 
  firmType: { type: String, required: true },  
  address: { type: String, required: true },  
  state: { type: String, required: true },
  city: { type: String, required: true },  
  pinCode: { type: String, required: true }, 
  gstNumber: { type: String },
  panNumber: { type: String },  
  banks: [bankSchema], 
  financialYearStart: { type: String },
  termsConditions: { type: String }, 
  invoicePrefix: { type: String }, 
  invoiceNumber: { type: String }, 
  document: [ { type: String }],
  folders: [folderSchema],
});

const RameshwarInfo = model('RameshwarInfo', infoSchema);

export default RameshwarInfo;
