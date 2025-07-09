import mongoose from 'mongoose';

const opdSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true
  },
  totalRooms: {
    type: Number,
    required: true
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true
  }
}, { timestamps: true });

// const HYGOOPD = mongoose.model('HYGOOPD', opdSchema);
export default opdSchema;
