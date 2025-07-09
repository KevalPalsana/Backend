import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true
  },
  treatments: [
    {
      treatmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treatment', // optional if you want to populate later
        required: true
      },
      charges: {
        type: Number,
        required: true
      },
      tax: {
        type: Number,
        default: 0.00
      }
    }
  ],
  notes: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: true,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model('CDHPackage', packageSchema);
