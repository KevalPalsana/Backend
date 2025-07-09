import mongoose from 'mongoose';

const paymentreceivedSchema = new mongoose.Schema({
  receipt:
  {
    type: Number
  },
  date:
  {
    type: Date,
  },
  center:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  },
  receivedFrom:
  {
    type: String,
    enum: ['Patient', 'Ratecard'],
    default:'Patient'
  },
  patient:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  ratecard:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ratecard',
  },
  amount:
  {
    type: Number,
  },
  paymentMode:
  {
    type: String,
    enum: ['Cash', 'Cheque/NEFT/RTGS', 'Card', 'Wallet', 'Other'],
  },
  cheque:
  {
    type: String
  },
  chequedate:
  {
    type:Date
  },
  paidfrombank:
  {
    type:String
  },
  depositedbank:
  {
    type: String
  },
  swipingmachine:
  {
    type:String
  },
  additionalinfo:
  {
    type:String
  },
  wallet:
  {
    type: String
  },
  otheraccount:
  {
    type: String
  },
  doctor:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  note:
  {
    type: String,
  },
  status:
  {
    type: String,
    enum: ['regular', 'cancel'],
    default: 'regular'
  }
},{timestamps:true});

export default mongoose.model('Paymentreceived', paymentreceivedSchema);

