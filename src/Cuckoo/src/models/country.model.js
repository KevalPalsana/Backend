import { Schema, model } from 'mongoose';

const countrySchema = new Schema({
  countryName: { type: String, required: true, unique: true },
  normalIcon: String,
  activeIcon: String,
});

const Country = model('Country', countrySchema);

export default Country;
