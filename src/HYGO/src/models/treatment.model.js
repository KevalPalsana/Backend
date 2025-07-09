// models/Treatment.js
import mongoose from 'mongoose';

const treatmentSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HYGOAppointment',
    required: true,
  },
  medicineName: String,
  dosage: String,
  type: String,
  intake: String,
  timing: String,
  takeTime: String,
  duration: String,
  quantity: Number,
  startDate: Date,
  endDate: Date,
  notes: String,
}, { timestamps: true });

// const HYGOAppointmentTreatment = mongoose.model('HYGOAppointmentTreatment', treatmentSchema);
export default treatmentSchema;
