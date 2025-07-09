import { Schema, model } from 'mongoose';

const menuCategorySchema = new Schema({
  name: { type: String, required: true},
});

const HotelMenuCategory = model('HotelMenuCategory', menuCategorySchema);

export default HotelMenuCategory;
