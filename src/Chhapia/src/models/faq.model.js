import mongoose from 'mongoose';


const faqSchama = new mongoose.Schema(
  {
   question: { type: String},
   answer: { type: String},
  },
  { timestamps: true }
);

export default mongoose.model('ChhapiaFaq', faqSchama);
