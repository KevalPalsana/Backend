import jwt from 'jsonwebtoken';
import { compareOTP, generateOTP, hashOTP } from '../utils/otp.js';
import { sendWhatsappOTP } from '../utils/WP-Message.js';
import { hygoModels } from '../db/hygo.db.js';

const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret";
const JWT_EXPIRES_IN = "7d";

const findUserByEmail = async (email) => {
  return await hygoModels.HYGOUser.findOne({ email });
};

const sendOtp = async (mobile) => {
  const otp = generateOTP();
  const otpHash = hashOTP(otp);
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  let user = await hygoModels.HYGOUser.findOne({ mobile });
  if (!user) user = await hygoModels.HYGOUser.create({ mobile });

  user.otpHash = otpHash;
  user.otpExpires = otpExpires;
  await user.save();

  const sendResult = await sendWhatsappOTP({ to: mobile, otp });

  if (!sendResult.success) {
    throw new Error(sendResult.message || "Failed to send WhatsApp OTP");
  }
};

// Verify OTP and return JWT
const verifyOtp = async (mobile, otp) => {
const user = await hygoModels.HYGOUser.findOne({ mobile });

  if (!user) {
    throw new Error("User not found");
  }

  const now = Date.now();
  const isExpired = !user.otpExpires || user.otpExpires.getTime() < now;
  const isValid = compareOTP(otp, user.otpHash);

  if (!isValid || isExpired) {
    throw new Error("Invalid or expired OTP");
  }

  // Clear OTP fields after verification
  user.otpHash = undefined;
  user.otpExpires = undefined;
  await user.save();

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, mobile: user.mobile },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    success: true,
    message: "OTP verified successfully",
    token,
    user: {
      id: user._id,
      name: user.name || null,
      mobile: user.mobile,
    },
  };
};

export default {
  findUserByEmail,
  sendOtp,
  verifyOtp,
};
