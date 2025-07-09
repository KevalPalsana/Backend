import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: {type: String},
  icon: {type: String},
});

const InfiService = model('InfiService', serviceSchema);

export default InfiService;
