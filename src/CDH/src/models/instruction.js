import mongoose from 'mongoose';

const instructionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model('Instruction', instructionSchema);
