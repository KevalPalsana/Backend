import mongoose from 'mongoose';

const fileAccessSchema = new mongoose.Schema({
  DelegateFileType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HYGOUser',
    required: true
  },
  AccessfileID: {
    type: [String],
    enum: ['View', 'Insert', 'Edit', 'Delete'],
    required: true
  }
});

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  filePath: { type: String, required: true },
  fileAccess: [fileAccessSchema]
}, { timestamps: true });

// const HYGOFile = mongoose.model('HYGOFile', fileSchema);
export default fileAccessSchema;
