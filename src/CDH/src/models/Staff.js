import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    profile:
    {
        type: String
    },
    centerid:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center",
        // required: true
    },
    title:
    {
        type: String,
    },
    name:
    {
        type: String,
    },
    middleName:
    {
        type: String,
    },
    surname:
    {
        type: String,
    },
    suffix:
    {
        type: String,
    },
    gender:
    {
        type: String,
        enum: ["Male", "Female", "Transgender", "Unknown"],
    },
    dateofBirth:
    {
        type: Date,
    },
    countrycode1:
    {
        type: String
    },
    mobile1:
    {
        type: Number,
    },
    countrycode2:
    {
        type: String,
    },
    mobile2:
    {
        type: Number,
    },
    emailidPersonal:
    {
        type: String
    },
    emailidWork:
    {
        type: String,
    },
    role:
    {
        type: String,
    },
    accountant:
    {
        type: Boolean,
        default: false,
    },
    marketing:
    {
        type: Boolean,
        default: false,
    },
    telecaller:
    {
        type: Boolean,
        default: false,
    },
    experience:
    {
        type: String
    },
    qualification:
    {
        type: String
    },
    speciality:
    {
        type: String
    },
    regnNo:
    {
        type: Number
    },
    regnAuthority:
    {
        type: String
    },
    active: 
    {
        type: Boolean,
        default: true,
    },
    staffColor:
    {
        type: String
    },
    quicknotecolor:
    {
        type: String
    },
    allowedtoseeappointments:
    {
        type: String
    },
    shortName:
    {
        type: String
    },
    sendappointmentSummary:
    {
        type: Boolean,
        default: false,
    },
    appointmentSummarySMS:
    {
        type: String
    },
    appointmentSummarEmail:
    {
        type: String
    },
    defaultViews:
    {
        type: String,
    },
    stackview: 
    {
        type: Boolean,
        default: false,
    },
    sequenceNumber:
    {
        type: Number
    },
    showinclinicProfile: 
    {
        type: Boolean,
        default: false,
    },
    selfDescription:
    {
        type: String
    },
    notes:
    {
        type: String
    },
    delete: 
    {
        type: Boolean,
        default: false,
    },
    status:
    {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
})

export default mongoose.model('Staff', staffSchema);