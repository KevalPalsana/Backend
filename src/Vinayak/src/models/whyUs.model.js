import { Schema, model } from 'mongoose';

const whyUsSchema = new Schema({
      category: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String }, 
      title: { type: String},
}, { timestamps: true });

const WhyUs = model('WhyUs', whyUsSchema);

export default WhyUs;
