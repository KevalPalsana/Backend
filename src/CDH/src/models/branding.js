import mongoose from 'mongoose';

const brandingSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    // required: true
  },
  smsSenderId: {
    type: String,
    // required: true
  },

  emailSenderName: {
    type: String,
    // required: true
  },
  replyToEmail: {
    type: String,
    // required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },

  contactNumber: {
    type: String,
    // required: true
  },
  ccEmail: {
    type: String,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  smsBalanceAlertCount: {
    type: Number,
    default: 50
  },
  includePortalLinkInSMS: {
    type: Boolean,
    default: false
  },
  confirmationSMS: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Branding', brandingSchema);
