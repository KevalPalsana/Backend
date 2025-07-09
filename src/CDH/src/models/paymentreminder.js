import mongoose from 'mongoose';

const paymentreminderSchema = new mongoose.Schema({
  date:
  {
    type: Date,
  },
  Center:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  },
  amount:
  {
    type: Number,
  },
  patient:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  paymentMode:
  {
    type: String,
    enum: ['Cash', 'Cheque/NEFT/RTGS', 'Card', 'Wallet', 'Other'],
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
  printreceipt:
  {
    type:Boolean,
    default: false
  },
},{timestamps:true});

export default mongoose.model('Paymentreminder', paymentreminderSchema);

