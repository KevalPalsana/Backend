import mongoose from 'mongoose';

const assignTaskSchema = new mongoose.Schema(
  {
    poId: { type: mongoose.Schema.Types.ObjectId, ref: 'PONumber', required: true },
    fromCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'RameshwarInfo', required: true },
    toCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'RameshwarInfo', required: true },
    pollQty: { type: Number, required: true },
    startPoll: { type: String, required: true },
    endPoll: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    },
  },
  { timestamps: true }
);

const AssignTask = mongoose.model('AssignTask', assignTaskSchema);

export default AssignTask;
