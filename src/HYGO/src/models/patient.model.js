import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  fullName: { type: String},
  gender: { type: String },
  age: { type: Number},
  email: { type: String},
  phone: { type: String},
  address: { type: String },
  emergencyContact: { type: String },

  // Medical Info
  healthStatus: { type: String },
  assignedDoctor: { type: String },
  allergies: [{ type: String }],
  medicalConditions: [{ type: String }],
  medicalHistory: { type: String },

  // Additional Info
  insuranceInformation: { type: String },
  additionalNotes: { type: String },
}, { timestamps: true });

// const HYGOPatient = mongoose.model('HYGOPatient', patientSchema);
export default patientSchema;
