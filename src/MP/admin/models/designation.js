import mongoose from 'mongoose';

const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
}, {timestamps: true});

const Designation = mongoose.model("Designation", designationSchema);

export default Designation;