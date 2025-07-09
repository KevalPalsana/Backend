import mongoose from 'mongoose';

const dentalconditionSchema = new mongoose.Schema({
    dentalcondition: {
    type: String,
    required: true
  }
});

export default mongoose.model('Dentalcondition', dentalconditionSchema);
