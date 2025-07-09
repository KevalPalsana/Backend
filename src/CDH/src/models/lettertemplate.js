import mongoose from 'mongoose';

const lettertenplateSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tokens: {
    type: [String],
    default: []
  },
  notes: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('Lettertenplate', lettertenplateSchema);
