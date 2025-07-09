import { Schema, model } from 'mongoose';

const aboutUsSchema = new Schema({
title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  entries: [
    {
      category: { type: String, required: true },
      icon: { type: String, required: true },
      description: { type: String }, 
    }
  ]
}, { timestamps: true });

const AboutUsMainPage = model('AboutUsMainPage', aboutUsSchema);

export default AboutUsMainPage;
