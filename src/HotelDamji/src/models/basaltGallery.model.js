import { Schema, model } from 'mongoose';

const gallerySchema = new Schema({
  image: { type: String, required: true},
});

const BasaltGallery = model('BasaltGallery', gallerySchema);

export default BasaltGallery;
