import mongoose from 'mongoose';

const ratecardSchema = new mongoose.Schema({
  ratecardName: {
    type: String,
    required: true
  },
  patientLabel: {
    type: String
  },
  notes: {
    type: String
  },
  billable: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  associateWithInsurance: {
    type: Boolean,
    default: false
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model('Ratecard', ratecardSchema);
