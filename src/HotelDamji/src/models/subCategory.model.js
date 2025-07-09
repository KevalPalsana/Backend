import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  categoryId: { type: Schema.Types.ObjectId, ref: 'HotelCategory', required: true }
});

const HotelSubCategory = model('HotelSubCategory', subCategorySchema);

export default HotelSubCategory;
