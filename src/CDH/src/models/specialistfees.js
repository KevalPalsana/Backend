import mongoose from 'mongoose';

const specialistFeeSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  remunerationBasis: {
    type: String,
    required: true
  },
  remuneration: {
    type: String,
    required: true
  },
  remunerationInsurance: {
    type: String,
    required: true
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model('SpecialistFee', specialistFeeSchema);
