import mongoose from 'mongoose';

const openingBalanceSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, unique: true },
    type: { type: String, enum: ['receivable', 'payable'], required: true },
    amount: { type: Number, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('CDHOpeningBalance', openingBalanceSchema);
