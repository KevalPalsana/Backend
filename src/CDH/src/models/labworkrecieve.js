import mongoose from 'mongoose';

const labWorkRecieveSchema = new mongoose.Schema({
  center:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true
  },
  lab:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: true
  },
  Recieveby:
  {
    type: String,
    required: true
  },
},{timestamps:true});

export default mongoose.model('LabWorkRecieve', labWorkRecieveSchema);

