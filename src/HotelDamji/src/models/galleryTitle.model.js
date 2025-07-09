import { Schema, model } from 'mongoose';

const galleryTitleSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const GalleryTitle = model('GalleryTitle', galleryTitleSchema);

export default GalleryTitle;
