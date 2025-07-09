import mongoose from 'mongoose';

const kshetraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
}, {timestamps: true});

const Kshetra = mongoose.model("Kshetra", kshetraSchema);

export default Kshetra;