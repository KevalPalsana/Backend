import mongoose from 'mongoose';

const sourcetypeSchema = new mongoose.Schema({
  name: 
  {
    type: String,
    required: true
  },
  active:
  {
    type: Boolean,
    default: true
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
  },
},{timestamps:true});

export default mongoose.model('Sourcetype', sourcetypeSchema);
