import mongoose from 'mongoose';

const calenderSchema = new mongoose.Schema({
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
  },
  note:
  {
    type:String,
  }
}, { timestamps: true });

export default mongoose.model('Calender', calenderSchema);
