import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SPJUser',
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

const SPJToken = mongoose.model('SPJToken', tokenSchema);

export default SPJToken;
