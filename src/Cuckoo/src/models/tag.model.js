import { Schema, model } from 'mongoose';

const tagSchema = new Schema({
  tagName: { type: String, required: true, unique: true },
});

const CuckooTag = model('CuckooTag', tagSchema);

export default CuckooTag;
