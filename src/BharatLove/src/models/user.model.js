import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  gender: String,
  birthDate: Date,
  bio: String,
  telegram: String,
  photos: [String],
  interests: [String],
  lookingFor: String,
  resetCode: String,
  resetCodeExpires: Date,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    }
  },
  discoverySettings: {
    showMe: String,
    distanceUnit: {
      type: String,
      enum: ['Km', 'Mi'],
      default: 'Km'
    },
    distanceRange: Number,
    ageRange: {
      min: Number,
      max: Number
    },
    location: String
  }
});

userSchema.index({ location: '2dsphere' });

const DatingUser = mongoose.model('DatingUser', userSchema);

export default DatingUser;
