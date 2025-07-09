import mongoose from 'mongoose';

const homeAboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tag: { type: String },
  metaKeyword: { type: String },
  metaDescription: { type: String },
}, { timestamps: true });

export default mongoose.model('HomeContact', homeAboutSchema);
