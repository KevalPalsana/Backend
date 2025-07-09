import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true},
});

const InfiCategory = model('InfiCategory', categorySchema);

export default InfiCategory;
