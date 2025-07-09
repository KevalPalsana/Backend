import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

const HotelCategory = model('HotelCategory', categorySchema);

export default HotelCategory;
