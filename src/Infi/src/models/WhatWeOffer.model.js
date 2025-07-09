import { Schema, model } from 'mongoose';

const WhatWeOfferSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
},
image: {
    type: String,
},
  description: {
    type: String,
    required: true,
  },
 
});

const InfiWhatWeOffer = model('InfiWhatWeOffer', WhatWeOfferSchema);

export default InfiWhatWeOffer;

