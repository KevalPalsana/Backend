import mongoose from 'mongoose';

const recurringTaskSchema = new mongoose.Schema({
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  },
  recurringTaskName: {
    type: String,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  frequency: {
    type: String, 
    enum: ['Daily', 'Weekly', 'Monthly'],
  },
  dayOfWeek: {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String, 
  },
  dueDateSameAsTaskDate: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: String,
  },
  dnd: {
    type: Boolean,
    default: false,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  notes: {
    type: String,
  },
  status:
  {
    type: String,
    enum:['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

export default mongoose.model('RecurringTask', recurringTaskSchema);
