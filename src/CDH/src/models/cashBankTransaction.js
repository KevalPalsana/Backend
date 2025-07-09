import mongoose from 'mongoose';

const cashBankTransactionSchema = new mongoose.Schema({
  date:
  {
    type: Date,
   
  },
  transactionType:
  {
    type: String,
    enum: ['Withdrawal', 'Deposit', 'Transfer'],
   
  },
  bank:
  {
    type: String,
   
  },
  tranferbankfrom:
  {
    type: String,
   
  },
  tranferbankto:
  {
    type: String,
   
  },
  chequeRefNo:
  {
    type: String,
   
  },
  chequeRefDate:
  {
    type: Date,
  },
  tranferamount:
  {
    type: Number,
   
  },
  amount:
  {
    type: Number,
   
  },
  note:
  {
    type: String,
  }
},{timestamps:true});

export default mongoose.model('CashBankTransaction', cashBankTransactionSchema);

