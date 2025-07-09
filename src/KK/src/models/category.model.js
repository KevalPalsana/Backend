import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String},
});

const KKCategory = model('KKCategory', categorySchema);

export default KKCategory;
