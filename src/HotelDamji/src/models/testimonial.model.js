import { Schema, model } from 'mongoose';

const testimonialSchema = new Schema({
  name: { type: String, required: true, unique: true },
  rating: { type: String},
  description: { type: String},
  profileImage: { type: String},
  images: [{ type: String}],
});

const BasaltTestimonial = model('BasaltTestimonial', testimonialSchema);

export default BasaltTestimonial;