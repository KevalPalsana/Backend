// import mongoose from 'mongoose';

// const appointmentSeriesSchema = new mongoose.Schema({
//   center: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Center',
//   },
//   patient: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Patient',
//   },
//   doctor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Doctor',
//   },
//   treatmentCategory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'TreatmentCategory',
//   },
//   appointmentseries:
//   {
//     type:String
//   },
//   operatory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Operatory',
//   },
//   date: {
//     type: Date,
//   },
//   time: {
//     type: String,
//   },
//   status:
//   {
//     type: String,
//     enum: ['Active', 'Inactive'],
//     default: 'Active'
//   },
// }, { timestamps: true });

// export default mongoose.model('AppointmentSeries', appointmentSeriesSchema);
import mongoose from 'mongoose';

const appointmentSeriesSchema = new mongoose.Schema({
  appointmentseries: {
    type: String,
    required: true
  },
  referenceDate: {
    type: String,
  },
  treatmentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TreatmentCategory"
  },
  notes: {
    type: String
  },
  numberOfAppointments: {
    type: Number
  },
  visits: [ 
    {
      gap: String,
      unit: String,
      duration: String,
      notes: String,
    }
  ],
  remindertime:{
      type: String, 
    },
    selecttime: {
      type: String
    },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('AppointmentSeries', appointmentSeriesSchema);
