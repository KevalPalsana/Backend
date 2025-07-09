import { Schema, model } from 'mongoose';

const achievementSchema = new Schema({
  counting: { 
    type: String, 
    required: true, 
    unique: true 
},
  name: {
    type: String,
  }
});

const Achievement = model('Achievement', achievementSchema);

export default Achievement;
