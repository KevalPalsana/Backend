import { Schema, model } from 'mongoose';

const faqSchema = new Schema({
  question: { 
    type: String, 
    required: true, 
    unique: true 
},
  answer: {
    type: String,
    required: true,
  }
});

const FededgeFaq = model('FededgeFaq', faqSchema);

export default FededgeFaq;
