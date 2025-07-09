import { Schema, model } from 'mongoose';

const offerSchema = new Schema({
  image: { type: String, required: true},
  name: { type: String},
});

const Offer = model('Offer', offerSchema);

export default Offer;
