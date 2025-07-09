import mongoose from 'mongoose';

const sittingNoteTemplateSchema = new mongoose.Schema({
  treatmentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreatmentCategory',
  },
  sittingNoteTemplate: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  }
});

export default mongoose.model('SittingNoteTemplate', sittingNoteTemplateSchema);
