import mongoose from 'mongoose';

const treatmentCategorySchema = new mongoose.Schema({
  treatmentCategory: {
    type: String,
    required: true
  },
  hsnCode: {
    type: String,
  },
  treatmentCategoryColor: {
    type: String,
  },
  appointmentDuration: {
    type: String,
    enum: ['Enable', 'Disable'],
    default: 'Enable'
  },
  smshours:
  {
    type: String
  },
  sendsms: {
    type: Boolean,
    default: false
  },
  smsText: {
    type: String,
  },
  DLTtmplateid:
  {
    type: String
  },
  sendwa: {
    type: Boolean,
    default: false
  },
  waText: {
    type: String,
  },
  image: {
    type: String,
  },
  emailhours:
  {
    type: String
  },
  sendemail: {
    type: Boolean,
    default: false
  },
  emailTemplate: {
    type: String,
  },
  notes:
  {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
  },
});

export default mongoose.model('TreatmentCategory', treatmentCategorySchema);
