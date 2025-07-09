import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['like', 'dislike', 'star'], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Match = mongoose.model('Match', matchSchema);
