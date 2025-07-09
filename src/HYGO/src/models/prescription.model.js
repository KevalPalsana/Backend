import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'HYGOUser', required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  notes: String,
  validTill: Date,
  nextVisitDate: Date,

  pills: [{
    medicines: {
      medicineName: String,
      medicineType: String
    },
    dosage: String,
    intake: String,
    Meal: String,
    Time: [String],
    duration: {
      value: Number,
      unit: String
    },
    startDate: Date,
    endDate: Date,
    quantity: Number,
    mobileNumber: [String]
  }],

  history: [{
    chiefComplaint: String,
    historyOfPresentIllness: String,
    pastMedicalHistory: String,
    personalHistory: String,
    familyHistory: String,
    observationFinding: String
  }],

  vitals: [{
    height: Number,
    weight: Number,
    bmi: Number,
    pulseRate: Number,
    bloodPressure: [{
      systolic: Number,
      diastolic: Number
    }],
    heartRate: Number,
    respiratoryRate: Number,
    spo2: Number,
    temperature: Number
  }],

  physicalExamination: [{
    generalAppearance: String,
    heent: String,
    cardiovascular: String,
    respiratory: String,
    gastrointestinal: String
  }],

  investigation: [{
    suggestedTests: [String],
    uploadedReports: [String]
  }],

  diagnosisDetails: [{
    currentConditions: [String],
    currentDiagnosis: String,
    pastDiagnosis: String,
    allergies: [String]
  }],

  summary: [{
    summaryNotes: String,
    doctorSignature: String
  }]
}, { timestamps: true });

// const HYGOPrescription = mongoose.model('HYGOPrescription', prescriptionSchema);
export default prescriptionSchema;
