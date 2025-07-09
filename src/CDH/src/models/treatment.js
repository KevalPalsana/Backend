import mongoose from 'mongoose';

const treatmentSchema = new mongoose.Schema({
  treatmentName:
  {
    type: String,
    required: true,
  },
  treatmentCategory:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreatmentCategory',
    required: true,
  },
  hsnCode:
  {
    type: String,
  },
  defaultCharges:
  {
    type: Number,
  },
  perunit:
  {
    type: Boolean,
    default: true
  },
  taxRate:
  {
    type: Number,
  },
  Chargesincludetax:
  {
    type: Boolean,
    default: true
  },
  totalCharges:
  {
    type: Number,
  },
  usualNumberOfSittings:
  {
    type: Number,
  },
  treatmentPicture:
  [{
    type: String,
  }],
  labTaskApplicable:
  {
    type: Boolean,
    default: false,
  },
  labDefaultCharges:
  {
    type: Number,
  },
  usualLabReturnDays:
  {
    type: Number,
  },
  warrantyFromLab:
  {
    type: Number,
  },
  chartingicon:
  {
    type: String,
  },
  selectprescription:
  [{
    type:String
  }],
  selectinstruction:
  [{
    type: String
  }],
  hours:
  {
    type: String
  },
  sendSms:
  {
    type: Boolean,
    default: false,
  },
  smstext:
  {
    type: String
  },
  DLTTemplateid:
  {
    type: String
  },
  sendWA:
  {
    type: Boolean,
    default: false,
  },
  WAtext:
  {
    type: String
  },
  image:
  {
    type: String
  },
  days:
  {
    type: String
  },
  sendtreatmentspecificrecallsms:
  {
    type: Boolean,
    default: true,
  },
  recallSMStext:
  {
    type: String
  },
  EmailSubject:
  {
    type: String
  },
  WarrantyToPatient:
  {
    type: String
  },
  Notes:
  {
    type: String
  },
  active:
  {
    type: Boolean,
    default: true,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
  },
},{timestamps:true});

export default mongoose.model('Treatment', treatmentSchema);
