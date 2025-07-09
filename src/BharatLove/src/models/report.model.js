import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'DatingUser', required: true },
  reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'DatingUser', required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Report = mongoose.model('Report', reportSchema);