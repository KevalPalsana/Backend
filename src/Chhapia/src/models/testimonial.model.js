import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  image: { type: String }, // path or filename
}, {
  timestamps: true,
});

export default mongoose.model('ChhapiaTestimonial', testimonialSchema);
