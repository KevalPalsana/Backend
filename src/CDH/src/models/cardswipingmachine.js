import mongoose from 'mongoose';

const cardSwipingMachineSchema = new mongoose.Schema({
  machineName: {
    type: String,
    required: true
  },
  issuedBy: {
    type: String
  },
  linkedBankAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankAccount',
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
}, { timestamps: true });

export default mongoose.model('CardSwipingMachine', cardSwipingMachineSchema);
