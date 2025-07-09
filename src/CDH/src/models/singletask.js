import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  },
  taskTitle: {
    type: String,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  date: {
    type: Date,
  },
  startTime: {
    type: String, 
  },
  endTime: {
    type: String,
  },
  assignedto:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Doctor'
  },
  dueDate: {
    type: Date,
  },
  dueTime: {
    type: String,
  },
  disallowAppointments: {
    type: Boolean,
    default: false,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  allDay: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum:['New', 'In_Progress', 'Done', 'Cancel']
  },
  note:
  {
    type:String,
  }
}, { timestamps: true });

export default mongoose.model('Singletask', taskSchema);
