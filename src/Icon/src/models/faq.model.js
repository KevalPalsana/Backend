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
  },
  image: {
    type: String,
  },
});

const IconFaq = model('iconFaq', faqSchema);

export default IconFaq;
