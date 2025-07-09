import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  profile: {
    type: String,
  },
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Center",
    // required: true
  },
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  middleName: {
    type: String,
  },
  surname: {
    type: String,
  },
  suffix: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Transgender", "Unknown"],
  },
  dateOfBirth: {
    type: String,


  },
  countrycode1: {
    type: String,
  },
  mobile1: {
    type: Number,
  },
  countrycode2: {
    type: String,
  },
  mobile2: {
    type: Number,
  },
  emailidPersonal: {
    type: String,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  emailidWork: {
    type: String,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  role: {
    type: String,
    default: "Doctor",
  },
  accountant: {
    type: Boolean,
    default: false,
  },
  marketing: {
    type: Boolean,
    default: false,
  },
  telecaller: {
    type: Boolean,
    default: false,
  },
  experience: {
    type: String,
  },
  qualification: {
    type: String,
  },
  speciality: {
    type: String,
  },
  regnNo: {
    type: Number,
  },
  regnAuthority: {
    type: String,
  },
  staffColor: {
    type: String,
  },
  quicknotecolor: {
    type: String,
  },
  allowedtoseeappointments: {
    type: String,
  },
  shortName: {
    type: String,
  },
  sendappointmentSummary: {
    type: Boolean,
    default: false,
  },
  appointmentSummarySMS: {
    type: String,
  },
  appointmentSummarEmail: {
    type: String,
  },
  defaultViews: {
    type: String,
  },
  stackview: {
    type: Boolean,
    default: false,
  },
  showindoctorview: {
    type: Boolean,
    default: false,
  },
  consultant: {
    type: Boolean,
    default: false,
  },
  orthodontist: {
    type: Boolean,
    default: false,
  },
  sequenceNumber: {
    type: String,
  },
  showinclinicProfile: {
    type: Boolean,
    default: false,
  },
  selfDescription: {
    type: String,
  },
  sotes: {
    type: String,
  },
  delete: {
    type: Boolean,
    default: false,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model("Doctor", doctorSchema);