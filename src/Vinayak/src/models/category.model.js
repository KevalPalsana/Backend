import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const VinayakCategory = model('VinayakCategory', categorySchema);

export default VinayakCategory;
