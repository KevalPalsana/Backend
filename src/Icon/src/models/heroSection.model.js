import { Schema, model } from 'mongoose';

const heroSectionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
  },
}, { timestamps: true });

const IconHeroSection = model('IconHeroSection', heroSectionSchema);

export default IconHeroSection;
