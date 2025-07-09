import { Schema, model } from 'mongoose';

const galleryCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const GalleryCategory = model('GalleryCategory', galleryCategorySchema);

export default GalleryCategory;
