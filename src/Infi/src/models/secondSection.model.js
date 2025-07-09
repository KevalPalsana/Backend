import { Schema, model } from 'mongoose';

const secondSectionSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  image: String
});

const InfiSecondSection = model('InfiSecondSection', secondSectionSchema);

export default InfiSecondSection;
