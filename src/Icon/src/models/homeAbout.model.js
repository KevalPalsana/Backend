import mongoose from 'mongoose';

const homeAboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String }, 
}, { timestamps: true });

export default mongoose.model('HomeAboutUs', homeAboutSchema);
