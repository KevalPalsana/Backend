import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String },
  // sequence: { type: String },
});

const IconProductUSP = model('IconProductUSP', productSchema);

export default IconProductUSP;
