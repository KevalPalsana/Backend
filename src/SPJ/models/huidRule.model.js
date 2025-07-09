import { Schema, model } from 'mongoose';

const huidRuleSchema = new Schema({
  text: { 
    type: String, 
    required: true, 
},
});

const HUIDRule = model('HUIDRule', huidRuleSchema);

export default HUIDRule;
 