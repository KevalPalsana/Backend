import { Schema, model } from 'mongoose';

const calculationSchema = new Schema({
  image: { type: String},
  count: String,
  name: String,
});

const Calculation = model('Calculation', calculationSchema);

export default Calculation;
