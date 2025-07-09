import mongoose from 'mongoose';

const homeAboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, 
}, { timestamps: true });

export default mongoose.model('IconBanner', homeAboutSchema);
