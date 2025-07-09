import mongoose from 'mongoose';

const folderAccessSchema = new mongoose.Schema({
  DelegateFolderAuthID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HYGOUser',
    required: true
  },
  AccessFolderID: {
    type: [String],
    enum: ['Insert', 'View', 'Edit', 'Delete'],
    required: true
  }
});

const folderSchema = new mongoose.Schema(
  {
    folderName: { type: String, required: true },
    folderAccess: [folderAccessSchema]
  },
  { timestamps: true }
);

// const HYGOFolder = mongoose.model('HYGOFolder', folderSchema);
export default folderAccessSchema;
