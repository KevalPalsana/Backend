import mongoose from 'mongoose';

const waTemplateSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true
  },
  folder: {
    type: String,
  },
  message: {
    type: String,
    required: true
  },
  image:
  {
    type:String
  },
  tokens: {
    type: [String],
    default: []
  },
  notes: {
    type: String,
  }
});

export default mongoose.model('WATemplate', waTemplateSchema);
