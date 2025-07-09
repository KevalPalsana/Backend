import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  date:
  {
    type: Date,
    
  },
  center:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    
  },
  debitAccountType:
  {
    type: String,
    enum: ['Doctor/Staff', 'Vendor', 'Account'],
    
  },
  Doctor1:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    
  },
  vendor1:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
   
  },
  account1:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
   
  },
  creditAccountType:
  {
    type: String,
    enum: ['Doctor/Staff', 'Vendor', 'Account'],
    
  },
  Doctor2:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    
  },
  vendor2:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
   
  },
  account2:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
   
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

export default mongoose.model('JournalEntry', journalEntrySchema);