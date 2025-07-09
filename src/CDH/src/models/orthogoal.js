import mongoose from 'mongoose';

const orthoGoalSchema = new mongoose.Schema({
  goal: {
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

export default mongoose.model('OrthoGoal', orthoGoalSchema);
