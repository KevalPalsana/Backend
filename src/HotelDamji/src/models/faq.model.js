import { Schema, model } from 'mongoose';

const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true},

});

const BasaltFAQ = model('BasaltFAQ', faqSchema);

export default BasaltFAQ;