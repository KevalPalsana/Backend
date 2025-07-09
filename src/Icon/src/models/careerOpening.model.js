import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  Icon: { type: String },
  sequence: { type: String },
});

const IconCategory = model('IconCategory', categorySchema);

export default IconCategory;
