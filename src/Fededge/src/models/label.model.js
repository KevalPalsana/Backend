import { Schema, model } from 'mongoose';

const WhyChooseUsSchema = new Schema({
  title: { type: String, required: true, unique: true },
  text: String,
  icon: String
});

const FededgeWhyChooseUs = model('FededgeWhyChooseUs', WhyChooseUsSchema);

export default FededgeWhyChooseUs;
