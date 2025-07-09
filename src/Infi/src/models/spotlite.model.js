import { Schema, model } from 'mongoose';

const spotlightSchema = new Schema({
  name: { 
    type: String, 
},
image: {
    type: String,
},
  description: {
    type: String,
  },
  link: { type: String}
 
});

const InfiSpotlite = model('InfiSpotlite', spotlightSchema);

export default InfiSpotlite;

