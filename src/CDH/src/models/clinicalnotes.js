import mongoose from 'mongoose';

const clinicalNotesSchema = new mongoose.Schema({
  clinicalNotesType: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  remark: {
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
},{timestamps:true});

export default mongoose.model('ClinicalNotes', clinicalNotesSchema);
