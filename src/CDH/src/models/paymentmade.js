import mongoose from 'mongoose';

const paymentMadeSchema = new mongoose.Schema({
  date:
  {
    type: Date,
   
  },
  center:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
   
  },
  image:
  {
    type: String
  },
  madeTo:
  {
    type: String,
    enum: ['vendor', 'doctorStaff', 'expenseAccount'],
   
  },
  vendor:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
   
  },
  doctor:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
   
  },
  account:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
   
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
  amount:
  {
    type: Number,
   
  },
  note:
  {
    type: String,
  },
  printPayment:
  {
    type: Boolean,
    default: false
  }
},{timestamps:true});

export default mongoose.model('PaymentMade', paymentMadeSchema);

