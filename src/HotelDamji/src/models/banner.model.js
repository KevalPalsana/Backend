import { Schema, model } from 'mongoose';

const bannerSchema = new Schema({
  image: { type: String, required: true},
});

const BasaltBanner = model('BasaltBanner', bannerSchema);

export default BasaltBanner;