import { Schema, model } from 'mongoose';

const keyAchievementSchema = new Schema({
  counting: { 
    type: String, 
    required: true, 
    unique: true 
},
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
});

const KeyAchievement = model('KeyAchievement', keyAchievementSchema);

export default KeyAchievement;
