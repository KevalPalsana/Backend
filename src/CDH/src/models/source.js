import mongoose from 'mongoose';

const sourceSchema = new mongoose.Schema({
  sourceName: {
    type: String,
    required: true
  },
  validFrom: {
    type: String,
  },
  validTo: {
    type: String,
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
    default: 'Active'
  },
});

export default mongoose.model('Source', sourceSchema);
