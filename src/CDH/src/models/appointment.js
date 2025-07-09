import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  methods: {
    type: [String],
    validate: {
      validator: (arr) => arr.every(v => ['SMS/WA', 'Email'].includes(v)),
      message: 'Invalid notification method'
    }
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Appointment Confirmation to doctor',
      'Appointment Confirmation to patient',
      'Appointment Reminder - to doctor',
      'Appointment Reminder - to patient',
      'Pre treatment instruction to patient',
      'Appointment final reminder to patient'
    ]
  },
  day: {
    type: String,
    enum: ['Same_Day', 'Previous_Day'],
    required: function () {
      return ['Appointment Reminder - to doctor', 'Appointment Reminder - to patient'].includes(this.type);
    }
  },
  time: {
    type: String,
    required: function () {
      return ['Appointment Reminder - to doctor', 'Appointment Reminder - to patient'].includes(this.type);
    }
  },  
});



const appointmentSchema = new mongoose.Schema({
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  operatory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operatory',
  },
  treatmentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreatmentCategory',
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  duration: {
    type: String,
    default: '10 min',
  },
  notes: {
    type: String,
    default: '',
  },
  status:{
    type:String,
    enum:['schedule', 'cancel'],
    default: 'schedule'
  },
  notifications: [notificationSchema]
}, {
  timestamps: true,
});

export default mongoose.model('Appointment', appointmentSchema);

