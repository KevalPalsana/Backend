import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  categoryType: { type: String },
  icon: { type: String },
  // sequence: { type: String },
});

const IconIndustriesCategory = model('IconIndustriesCategory', categorySchema);

export default IconIndustriesCategory;
