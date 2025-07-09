import { Schema, model } from 'mongoose';

const bannerSchema = new Schema({
  image: { 
    type: String, 
    required: true, 
},
});

const InfiBanner = model('InfiBanner', bannerSchema);

export default InfiBanner;
