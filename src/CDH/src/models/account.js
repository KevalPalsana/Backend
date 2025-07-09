import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  accountName:
   {
    type: String,
    required: true,
  },
  accountGroup: 
  {
    type: String,
    required: true
  },
  searchWords:
   {
    type: String,
  },
  notes:
   {
    type: String,
  },
  active:
  {
    type: Boolean,

  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
},{timestamps:true});

export default mongoose.model('Account', accountSchema);
