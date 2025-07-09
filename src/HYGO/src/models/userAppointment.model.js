import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true }
});

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'HYGODoctor', required: true },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  mode: { type: String, enum: ['InPerson', 'Online'], required: true },
  appointmentDate: { type: Date, required: true },
  timeSlot: timeSlotSchema,
  purpose: { type: String },
  symptoms: { type: String },
  consultationFee: { type: Number },
  isFollowUp: { type: Boolean, default: false }
}, { timestamps: true });

// const HYGOUserAppointment = mongoose.model('HYGOUserAppointment', appointmentSchema);
export default timeSlotSchema;
