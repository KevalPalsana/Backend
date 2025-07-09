import { Schema, model } from 'mongoose';

const stateSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
},
});

const State = model('State', stateSchema);

export default State;
