import mongoose from 'mongoose';

const ortholimitationSchema = new mongoose.Schema({
  limitaion: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model('Ortholimitation', ortholimitationSchema);
