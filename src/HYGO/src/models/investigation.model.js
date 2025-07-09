import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  type: { type: String },
  medicineName: { type: String },
  dosage: { type: String },
  intake: { type: String },
  timing: { type: String },
  takeTime: { type: String },
  duration: {
    number: { type: Number },
    unit: { type: String },
  },
  quantity: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
  notes: { type: String },
});

const vitalsSchema = new mongoose.Schema({
  height: Number,
  weight: Number,
  bmi: Number,
  pulseRate: Number,
  bloodPressure: {
    systolic: Number,
    diastolic: Number,
  },
  heartRate: Number,
  respiratoryRate: Number,
  spo2: Number,
  temperature: Number,
});

const examinationSchema = new mongoose.Schema({
  generalAppearance: String,
  heent: String,
  cardiovascular: String,
  respiratory: String,
  gastrointestinal: String,
});

const investigationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HYGOPatient",
      required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    doctor: { type: String, required: true },
    appointmentType: {
      type: String,
      enum: ["Consultation", "Check-up", "Follow-up", "Procedure"],
      required: true,
    },
    reasonForVisit: { type: String, required: true },
    notes: { type: String },

    // Vitals & Examination
    vitals: vitalsSchema,
    examination: examinationSchema,

    // History
    history: {
      presentIllness: String,
      pastMedicalHistory: String,
      medications: [String],
      allergies: [String],
      familyHistory: String,
      socialHistory: String,
    },

    // Investigation
    highPriorityTests: [String],
    recommendedTests: [String],
    customTests: [String],
    investigationNotes: { type: String },

    // Diagnosis
    diagnosis: {
      primary: String,
      secondary: [String],
      differential: [String],
    },

    // Treatment Plan
    prescriptions: [prescriptionSchema],

    // Summary
    summary: {
      overallNotes: String,
      followUpRequired: Boolean,
      followUpDate: Date,
    },
  },
  { timestamps: true }
);

// const HYGOInvestigation = mongoose.model("HYGOInvestigation", appointmentSchema);
export default investigationSchema;
