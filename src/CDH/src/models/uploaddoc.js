import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
  teeth: {
    type: String,
  },
  note: {
    type: String,
  },
  files: String,
},{timestamps:true});

export default mongoose.model('Upload', uploadSchema);
