import mongoose from 'mongoose';

const creditNoteSchema = new mongoose.Schema({
  date:
  {
    type: Date,
     
  },
  center:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  },
  doctor:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
     
  },
  patientcenter:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
     
  },
  description:
  {
    type: String,
  },
  amount:
  {
    type: Number,
     
  },
  note:
  {
    type: String,
  },
  voucherStatus:
  {
    type: String,
    enum: ['Regular', 'Discounted', 'Refunded'],
    default: 'Regular'
  },
},{timestamps:true});

export default mongoose.model('CreditNote', creditNoteSchema);
