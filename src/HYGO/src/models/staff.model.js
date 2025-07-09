import mongoose from 'mongoose';

const qualificationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String,
  certificates: String // File URL as string
});

const availabilitySchema = new mongoose.Schema({
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  day: String,
  from: String,
  to: String
});

const bankDetailsSchema = new mongoose.Schema({
  accountHolderName: String,
  accountNumber: String,
  ifscCode: String,
  bankName: String,
  branch: String
});

const staffSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  dateOfBirth: Date,
  email: String,
  phone: String,
  alternativePhone: String,
  staffRole: { type: String, enum: ['Doctor', 'Nurse', 'Admin'] },
  specializations: String,
  registrationNumber: String,
  experience: Number,
  languagesSpoken: String,
  bio: String,
  consultationFee: Number,
  virtualConsultationLink: String,
  aadhaarNumber: String,
  panNumber: String,
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  qualifications: [qualificationSchema],
  bankDetails: bankDetailsSchema,
  password: String,
  status: { type: String, default: 'Active' },
  scheduleType: String,
  isAvailableNow: Boolean,
  isVerified: Boolean,
  availability: [availabilitySchema],
  
  // FILE PATHS AS STRINGS
  profileImage: String,
  aadhaarFile: String,
  panFile: String,
  bankDocumentFile: String,
  licenseDocuments: String
}, { timestamps: true });

// const HYGOStaff = mongoose.model('HYGOStaff', staffSchema);
export default staffSchema;
