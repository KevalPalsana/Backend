import { Schema, model } from 'mongoose';

const gellarySchema = new Schema({
  image: { type: String, required: true, unique: true },
});

const GellaryImage = model('GellaryImage', gellarySchema);

export default GellaryImage;
