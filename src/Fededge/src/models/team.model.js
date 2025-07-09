import { Schema, model } from 'mongoose';

const TeamSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
},
image: {
    type: String,
},
  role: {
    type: String,
    required: true,
  },
 
});

const FededgeTeam = model('FededgeTeam', TeamSchema);

export default FededgeTeam;

