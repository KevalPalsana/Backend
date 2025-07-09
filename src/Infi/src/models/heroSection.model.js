import { Schema, model } from 'mongoose';

const heroSectionSchema = new Schema({
  image: { 
    type: String, 
    required: true, 
},
});

const InfiHeroSection = model('InfiHeroSection', heroSectionSchema);

export default InfiHeroSection;
