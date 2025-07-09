import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  image: { type: String },
});

const VinayakService = model('VinayakService', serviceSchema);

export default VinayakService;
