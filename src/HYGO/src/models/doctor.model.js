import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  specialty: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  biography: String,
  experience: String,
  certifications: [String], 
  languages: [String],
  location: String,
  workingHours: [
    {
      day: String,
      slots: [String],
    },
  ],
  contact: {
    phone: String,
    email: String,
  },
});

export default DoctorSchema;
