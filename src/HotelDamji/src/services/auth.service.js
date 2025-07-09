/* eslint-disable no-unused-vars */
import userService from './user.service.js';
import { ApiError } from '../utils/ApiError.js';
import { HotelUser } from '../models/user.model.js';
import tokenTypes from '../config/tokens.js';
import httpStatus from "http-status"
import tokenService from './token.service.js';
import jwt from 'jsonwebtoken';

const createNewUser = async (userBody = {}) => {
  const generateReferralCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let referralCode = "";
    for (let i = 0; i < 6; i++) {
      referralCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return referralCode;
  };

  let referralCode;
  let isUnique = false;

  while (!isUnique) {
    referralCode = generateReferralCode();
    const existingCode = await HotelUser.findOne({ referralCode });
    if (!existingCode) {
      isUnique = true;
    }
  }

  if (userBody.referredBy) {
    const referrer = await HotelUser.findOne({ referralCode: userBody.referredBy });
    if (!referrer)
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid referral code");
    referrer.referPrice = (referrer.referPrice || 0) + 10;
    await referrer.save();
  }

  const defaultUser = {
    email: userBody.email || null,
    password: userBody.password || null,
    shippingAddress: userBody.shippingAddress || [],
    referralCode,
    referPrice: 0,
    createdAt: new Date(),
    ...userBody,
  };

  if (defaultUser.shippingAddress.length > 0) {
    defaultUser.shippingAddress = defaultUser.shippingAddress.map((address, index) => ({
      street: address.street || null,
      city: address.city || null,
      state: address.state || null,
      zipCode: address.zipCode || null,
      country: address.country || null,
      isPrimary: index === 0,
    }));
  }

  return HotelUser.create(defaultUser);
};


const findUserByMobileNumber = async (mobileNumber) => {
  return await HotelUser.findOne({ mobileNumber });
};

const createAdmin = async (userBody) => {
  if (!userBody?.email) throw new ApiError(httpStatus.BAD_REQUEST, 'email is required!');
  if (!userBody?.password) throw new ApiError(httpStatus.BAD_REQUEST, 'password is required!');
  const normalizedEmail = userBody.email.toLowerCase();
  const emailExist = await HotelUser.findOne({ email: normalizedEmail })
  if (emailExist) throw new ApiError(httpStatus.BAD_REQUEST, 'email already exist');
  return HotelUser.create(userBody);
};

const updateUser = async (userId, user) => {
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, "HotelUser ID is required!");

  const userNotExist = await userService.getUserById(userId);
  if (!userNotExist) throw new ApiError(httpStatus.NOT_FOUND, "HotelUser not found");

  if (user?.email) {
    const emailExist = await userService.getUserByEmail(user.email);
    if (emailExist && emailExist._id.toString() !== userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
    }
  }

  if (user?.password) {
    delete user.password;
  }

  const updatedUser = await HotelUser.findByIdAndUpdate(userId, user, { new: true, runValidators: true });

  return {
    message: "HotelUser updated successfully",
    name: updatedUser?.name,
    user: updatedUser,
  };
};

const loginUser = async (email, password) => {
  if (!email) throw new ApiError(httpStatus.BAD_REQUEST, 'email is required!');
  if (!password) throw new ApiError(httpStatus.BAD_REQUEST, 'password is required!');
  const user = await userService.getUserByEmail(email);

  console.log('Retrieved User:', user);

  const isMatch = await user?.isPasswordMatch(password);
  console.log('Password Match:', isMatch); 
  if (!isMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
  }
  const tokens = await tokenService.generateAuthTokens(user);
  return { success: true, user, tokens, message: 'Logged in successfully!' };
}



const loginAdmin = async (username, password) => {
  console.log(`username is ${username} password ${password}`)
  if (!username) throw new ApiError(httpStatus.BAD_REQUEST, 'user Name is required!');
  if (!password) throw new ApiError(httpStatus.BAD_REQUEST, 'password is required!');
  const user = await userService.getUserByName(username);

  if (user && user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
  }
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  const tokens = await tokenService.generateAuthTokens(user);
  return { success: true, user, tokens, message: 'Logged in successfully!' };
}


const getReferralPrice = async (userId) => {
  const user = await HotelUser.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'HotelUser not found');
  }
  return user.referPrice;
};

const updateReferPrice = async (userId, amount) => {
  const user = await HotelUser.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'HotelUser not found');
  }

  user.referPrice = amount;
  await user.save();

  return user.referPrice;
};

const otpStore = {};

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

const sendOtp = async (mobileNumber) => {
  if (!mobileNumber) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Mobile number is required!");
  }

  const otp = "123456";
  const otpExpiry = Date.now() + 5 * 60 * 1000;

  otpStore[mobileNumber] = {
    otp,
    expiresAt: otpExpiry,
  };

  console.log(`OTP sent to ${mobileNumber}: ${otp}`);

  let user = await HotelUser.findOne({ mobileNumber });

  if (!user) {
    user = new HotelUser({
      mobileNumber,
      verified: false,
    });
    await user.save();
    console.log(`New user created for mobile number: ${mobileNumber}`);
  }

  return {
    message: "OTP sent successfully.",
    mobileNumber,
    otp,
  };
};


const verifyOtp = async (mobileNumber, inputOtp) => {
  if (!mobileNumber || !inputOtp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Mobile number and OTP are required!");
  }

  const storedOtpData = otpStore[mobileNumber];
  if (!storedOtpData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP not sent or expired.");
  }

  if (inputOtp !== storedOtpData.otp || Date.now() > storedOtpData.expiresAt) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid or expired OTP.");
  }

  delete otpStore[mobileNumber];

  let user = await HotelUser.findOne({ mobileNumber });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "HotelUser not found. Please register first.");
  }

  const token = jwt.sign(
    { userId: user._id, mobileNumber: user.mobileNumber },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  user.verified = true;
  user.tokens = user.tokens || [];
  user.tokens.push({
    token,
    type: "AUTH",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    blacklisted: false,
  });
  await user.save();

  return {
    message: "OTP verified successfully.",
    userId: user._id,
    user,
    token,
  };
};






const getAllUsers = async () => {
  return HotelUser.find();
};

export default {
  createNewUser,
  loginUser,
  updateUser,
  loginAdmin,
  createAdmin,
  getReferralPrice,
  updateReferPrice,
  sendOtp,
  verifyOtp,
  findUserByMobileNumber,
  getAllUsers,
};