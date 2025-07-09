import mongoose from 'mongoose';

const whyChooseUsSchema = new mongoose.Schema({
  icon: { type: String},
  image: { type: String},
  title: { type: String},
  description: { type: String},
  },
  { timestamps: true }
);

const ChhapiaWhyChooseUs = mongoose.model('ChhapiaWhyChooseUs', whyChooseUsSchema);
export default ChhapiaWhyChooseUs;
