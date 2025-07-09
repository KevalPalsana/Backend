import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const RotexOTP = mongoose.model('RotexOTP', otpSchema);
export default RotexOTP;

