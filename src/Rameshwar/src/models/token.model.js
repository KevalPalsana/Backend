import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RameshwarUser',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const RameshwarToken = mongoose.model('RameshwarToken', tokenSchema);

export default RameshwarToken;
