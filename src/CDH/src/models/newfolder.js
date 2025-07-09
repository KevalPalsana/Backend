import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
    folder: {
        type: String,
        required: true
    }
});

export default mongoose.model('Folder', folderSchema);
