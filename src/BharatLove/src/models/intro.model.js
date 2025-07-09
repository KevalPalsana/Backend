import mongoose from 'mongoose';

const introSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String
});

export const Intro = mongoose.model('Intro', introSchema);
