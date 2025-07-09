import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, trim: true },
    mobile: { type: String, required: true, unique: true },
    alternativeMobile: { type: String, default: null },
    email: { type: String, lowercase: true, trim: true },

    // OTP Handling
    otpHash: String,
    otpExpires: Date,

    // Personal Info
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
    dateOfBirth: { type: Date },
    age: { type: Number }, // You can calculate this on save if needed

    // Location Info
    country: { type: String },
    state: { type: String },
    city: { type: String },

    // Medical Info
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },

    // Health Conditions
    chronicDiseases: [{ type: String }],
    allergies: [{ type: String }],
  },
  { timestamps: true }
);
 

// const HYGOUser = mongoose.model('HYGOUser', userSchema);
export default userSchema;

