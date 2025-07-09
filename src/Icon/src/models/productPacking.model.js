import { Schema, model } from 'mongoose';

const packingSchema = new Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String },
  sequence: { type: String },
});

const IconProductPacking = model('IconProductPacking', packingSchema);

export default IconProductPacking;
