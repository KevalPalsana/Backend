import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import httpStatus from 'http-status';

import DatingUser from '../models/user.model.js';
import { DatingAdmin } from '../models/admin.model.js';
import userService from './user.service.js';
import tokenService from './token.service.js';
import { ApiError } from '../utils/ApiError.js';

dotenv.config({ path: './config.env' });

const registerUser = async ({ email, password }) => {
  const existingUser = await DatingUser.findOne({ email });
  if (existingUser) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new DatingUser({ email, password: hashedPassword });
  await user.save();

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verification Code',
    text: `Your OTP code is: ${otp}`
  });

  return { id: user._id, email: user.email, otp };
};

const loginWithEmailPassword = async (email, password) => {
  const user = await DatingUser.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const updateUser = async (userId, user) => {
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'User ID required');

  const existingUser = await userService.getUserById(userId);
  if (!existingUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  if (user.email) {
    const emailExists = await userService.getUserByEmail(user.email);
    if (emailExists) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
  }

  delete user.password; // Don't allow password updates here

  const allowedFields = ['name', 'email', 'mobileNumber'];
  const isValidUpdate = Object.keys(user).every((key) => allowedFields.includes(key));
  if (!isValidUpdate) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid update fields');

  return await DatingUser.findByIdAndUpdate(userId, user, { new: true });
};

const loginAdmin = async (username, password) => {
  if (!username || !password) throw new ApiError(httpStatus.BAD_REQUEST, 'Username and password are required');

  const admin = await userService.getUserByName(username);
  if (!admin || admin.role !== 'admin') throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  if (!(await admin.isPasswordMatch(password))) throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect credentials');

  const tokens = await tokenService.generateAuthTokens(admin);
  return { success: true, user: admin, tokens, message: 'Logged in successfully!' };
};

const createAdmin = async ({ email, password }) => {
  if (!email || !password) throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password required');

  const existing = await DatingUser.findOne({ email: email.toLowerCase() });
  if (existing) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');

  const newUser = await DatingUser.create({ email: email.toLowerCase(), password });
  return newUser;
};

const generateResetCode = async (email) => {
  const user = await DatingUser.findOne({ email });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const code = Math.floor(1000 + Math.random() * 9000).toString();
  user.resetCode = code;
  user.resetCodeExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Code',
    text: `Your 4-digit password reset code is: ${code}`
  });

  return code;
};

const verifyResetCode = async ({ email, code }) => {
  const user = await DatingUser.findOne({ email });
  if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpires) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired code');
  }

  user.resetCode = undefined;
  user.resetCodeExpires = undefined;
  await user.save();

  return { message: 'OTP verified', userId: user._id };
};

const resetPassword = async (email, code, newPassword) => {
  const user = await DatingUser.findOne({ email, resetCode: code });
  if (!user || user.resetCodeExpires < Date.now()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired code');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;
  await user.save();
};

const getReferralPrice = async (userId) => {
  const user = await DatingUser.findById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  return user.referPrice;
};

const updateReferPrice = async (userId, amount) => {
  const user = await DatingUser.findById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  user.referPrice = amount;
  await user.save();
  return user.referPrice;
};

const findUserByMobileNumber = async (mobileNumber) => {
  return await DatingUser.findOne({ mobileNumber });
};

const getAllUsers = async () => {
  return await DatingUser.find();
};

const generateToken = (id) => {
  return jwt.sign({ id }, "your-secret-key", {
    expiresIn: "1h", 
  });
};

const register = async ({ email, password }) => {
  const admin = await DatingAdmin.create({ email, password });
  const token = generateToken(admin._id);
  return { admin, token };
};

const login = async ({ email, password }) => {
  const admin = await DatingAdmin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  const token = generateToken(admin._id);
  return { admin, token };
};

export default {
  registerUser,
  loginWithEmailPassword,
  updateUser,
  loginAdmin,
  createAdmin,
  getReferralPrice,
  updateReferPrice,
  generateResetCode,
  verifyResetCode,
  resetPassword,
  findUserByMobileNumber,
  getAllUsers,
  register,
  login,
};
