import { Schema, model } from 'mongoose';

const calculationSchema = new Schema({
  icon: { 
    type: String, 
},
  number: {
    type: String,
  },
  description: {
    type: String,
    },
});

const InfiCalculationSection = model('InfiCalculationSection', calculationSchema);

export default InfiCalculationSection;
