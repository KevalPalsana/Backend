import mongoose from 'mongoose';

const treatmentNoteSchema = new mongoose.Schema({
  patient:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Patient'
  },
  treatmentDone:
  {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  center:
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Center'
  },
  doctor:
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
  },
  note: {
    type: String,
    default: '',
  },
  saveAsTemplate: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('TreatmentNote', treatmentNoteSchema);


