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

const IconSpotlite = model('IconSpotlite', spotlightSchema);

export default IconSpotlite;

