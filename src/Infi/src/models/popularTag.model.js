import { Schema, model } from 'mongoose';

const popularTagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const InfiPopularTag = model('InfiPopularTag', popularTagSchema);

export default InfiPopularTag;
