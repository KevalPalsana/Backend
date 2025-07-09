import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema({
  onlineAppointmentRequestLink: {
    type: String,
    required: true
  },
  onlineAppointmentBookingLink: {
    type: String,
    required: true
  },
  facebookPageLink: {
    type: String,
    required: true
  },
  instagramPageLink: {
    type: String,
    required: true
  },
  googleReviewPageLink: {
    type: String,
    required: true
  },
  justDialLink: {
    type: String,
    required: true
  },
  otherLink: {
    type: String,
    default: ''
  }
});

export default mongoose.model('SocialMediaIntegration', socialMediaSchema);
