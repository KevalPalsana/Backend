import mongoose from 'mongoose';

const patientGroupSchema = new mongoose.Schema({
  patientGroupName: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
  discountOnLabTreatments: {
    type: Boolean,
    default: false
  },
  discountOnConsultantTreatments: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model('PatientGroup', patientGroupSchema);
