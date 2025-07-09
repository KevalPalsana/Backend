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

const InfiFaq = model('infiFaq', faqSchema);

export default InfiFaq;
