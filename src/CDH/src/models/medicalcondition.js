import mongoose from 'mongoose';

const medicalconditionSchema = new mongoose.Schema({
    medicalcondition: {
    type: String,
    required: true
  }
});

export default mongoose.model('Medicalcondition', medicalconditionSchema);
