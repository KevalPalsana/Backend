import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

const RotexCategory = model('RotexCategory', categorySchema);

export default RotexCategory;
