import mongoose from 'mongoose';

const fileNoteSchema = new mongoose.Schema({
  folder: {
    type: String,   
  },
  noteTitle: {
    type: String,
  },
  noteContent: {
    type: String,
  },
  teeth: {
    type: String,
  },
  files: {
    type: String,
  }
}, { timestamps: true });

export default mongoose.model('FileNote', fileNoteSchema);

