import mongoose from 'mongoose';

const smsTemplateSchema = new mongoose.Schema({
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
  tokens: {
    type: [String],
    default: []
  },
  notes: {
    type: String,
  }
});

export default mongoose.model('SMSTemplate', smsTemplateSchema);
