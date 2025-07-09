import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: {type: String},
  icon: {type: String},
});

const IconService = model('IconService', serviceSchema);

export default IconService;
