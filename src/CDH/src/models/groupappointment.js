import mongoose from 'mongoose';

const groupappointmentSchema = new mongoose.Schema({
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  treatmentCategory: {
    type: String,
    default: 'TreatmentCategory',
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  timegap:
  {
    type: String,
  },
  duration:
  {
    type: String,
    default: '10 min',
  },
  operatory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operatory',
  },
}, { timestamps: true });

export default mongoose.model('Groupappointment', groupappointmentSchema);
