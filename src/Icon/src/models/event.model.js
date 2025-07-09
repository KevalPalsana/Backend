import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  location: { type: String },
  description : { type: String },
  image: { type: String }, 
}, { timestamps: true });

export default mongoose.model('IconEvent', eventSchema);
