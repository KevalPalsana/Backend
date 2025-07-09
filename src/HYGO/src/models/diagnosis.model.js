// models/Diagnosis.js
import mongoose from 'mongoose';

const diagnosisSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HYGOAppointment',
    required: true,
  },
  currentDiagnosis: String,
  pastDiagnosis: String,
  conditions: [String],
  allergies: [String],
}, { timestamps: true });

// const HYGOAppointmentDiagnosis = mongoose.model('HYGOAppointmentDiagnosis', diagnosisSchema);
export default diagnosisSchema;
