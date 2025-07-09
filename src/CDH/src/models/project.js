import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending']
  },
  notes: {
    type: String
  }
});

export default mongoose.model('Project', projectSchema);
