import mongoose from 'mongoose';

const pravrutiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
}, {timestamps: true});

const Pravruti = mongoose.model("Pravruti", pravrutiSchema);

export default Pravruti;