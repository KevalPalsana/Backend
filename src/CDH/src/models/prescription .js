import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true
  },
  medicines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drug'
    }
  ],
  notes: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('Prescription', prescriptionSchema);
