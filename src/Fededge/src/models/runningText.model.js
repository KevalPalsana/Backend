import { Schema, model } from 'mongoose';

const runningTextSchema = new Schema({
  text: { 
    type: String, 
    required: true, 
},
});

const RunningText = model('RunningText', runningTextSchema);

export default RunningText;
