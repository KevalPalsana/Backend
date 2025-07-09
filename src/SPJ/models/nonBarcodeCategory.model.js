import { Schema, model } from 'mongoose';

const nonBarcodeCategorySchema = new Schema({
  itemName: { type: String, required: true, unique: true },
});

const NonBarcodeCategory = model('NonBarcodeCategory', nonBarcodeCategorySchema);

export default NonBarcodeCategory;
