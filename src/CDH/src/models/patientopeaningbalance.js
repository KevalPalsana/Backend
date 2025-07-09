import mongoose from 'mongoose';

const openingBalanceSchema = new mongoose.Schema({
  patient: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  type: 
  {
    type: String,
    enum: ['Receivable', 'Payable'],
    required: true
  },
  openingBalance: 
  {
    type: Number,
    required: true
  },
  notes: 
  {
    type: String,
  }
},{timestamps:true});

export default mongoose.model('OpeningBalance', openingBalanceSchema);

