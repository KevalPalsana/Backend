import mongoose from 'mongoose';

const smsTransferSchema = new mongoose.Schema({
  transferFrom: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true
  },
  transferTo: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true
  },
  totalBalance: 
  {
    type: Number,
    required: true
  },
  availableForTransfer: 
  {
    type: Number,
    required: true
  },
  sms:
  {
    type:String
  },
  notes: 
  {
    type: String
  }
},{timestamps:true});

export default mongoose.model('SmsTransfer', smsTransferSchema);

