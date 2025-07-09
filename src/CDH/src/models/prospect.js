import mongoose from 'mongoose';

const crmProspectSchema = new mongoose.Schema({
  salutation: {
    type: String,
  },
  first_name: {
    type: String,
    required: true
  },
  middle_names: {
    type: String
  },
  surname: {
    type: String
  },
  suffix: {
    type: String
  },
  center: {
    type: mongoose.Schema.Types.ObjectId,
        ref: "Center"
  },
  phone_country_code: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  secondary_country_code: {
    type: String
  },
  secondary_phone_number: {
    type: String
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Invalid email format']
  },
  dob_type: {
    type: String,
    enum: ['dob', 'age'],
    required: true
  },
  date_of_birth: {
    type: Date
  },
  age: {
    type: Number,
    min: 0
  },
  locality: {
    type: String
  },
  group_name: {
    type: String
  },
  channel: {
     type: mongoose.Schema.Types.ObjectId,
        ref: 'Source'
  },
  campaign: {
    type: String
  },
  created_at: {
    type: Date,
    default: () => new Date()
  }
});

// Custom validation for dob_type
crmProspectSchema.pre('validate', function (next) {
  if (this.dob_type === 'dob' && !this.date_of_birth) {
    this.invalidate('date_of_birth', 'Date of birth is required when dob_type is "dob"');
  }
  if (this.dob_type === 'age' && (this.age === undefined || this.age === null)) {
    this.invalidate('age', 'Age is required when dob_type is "age"');
  }
  next();
});

const CRMProspect = mongoose.model('CRMProspect', crmProspectSchema);

export default CRMProspect;