import mongoose from 'mongoose';

const doctorUnavailabilitySchema = new mongoose.Schema({
  doctorid:[
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  unavailableFrom:
  {
    type: Date,
    
  },
  unavailableFromTime:
  {
    type: String,
    
  },
  upTo:
  {
    type: Date,
    
  },
  upToTime:
  {
    type: String,
    
  },
  reason:
  {
    type: String,
    
  },
  description:
  {
    type: String,
  },
  status:
  {
    type:String,
    enum:['active', 'inactive'],
    default:'active'
  }
},{timestamps:true});

export default mongoose.model('DoctorUnavailability', doctorUnavailabilitySchema);
