import { Schema, model } from 'mongoose';

const ourCoreSchema = new Schema({
  image: { 
    type: String, 
    required: true, 
},
  description: {
    type: String,
  }
});

const InfiOurCore = model('InfiOurCore', ourCoreSchema);

export default InfiOurCore;
