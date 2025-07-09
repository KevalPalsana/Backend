import { Schema, model } from 'mongoose';

const gallerySchema = new Schema({
  image: { 
    type: String, 
    required: true, 
},
});

const InfiGallery = model('InfiGallery', gallerySchema);

export default InfiGallery;
