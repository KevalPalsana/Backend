import { Schema, model } from 'mongoose';

const whatWeDoSchema = new Schema({
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

const WhatWeDoMain = model('WhatWeDoMain', whatWeDoSchema);

export default WhatWeDoMain;
