import { Schema, model } from 'mongoose';

const popularTagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const PopularTag = model('PopularTag', popularTagSchema);

export default PopularTag;
