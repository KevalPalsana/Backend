/* eslint-disable no-unused-vars */
import userService from './user.service.js';
import { ApiError } from '../utils/ApiError.js';
import tokenTypes from '../config/tokens.js';
import httpStatus from "http-status"
import tokenService from './token.service.js';
import jwt from 'jsonwebtoken';
import { RotexUser } from '../models/user.model.js';
import { sendWhatsappOTP } from '../utils/WP-Message.js';

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
    const existingCode = await RotexUser.findOne({ referralCode });
    if (!existingCode) {
      isUnique = true;
    }
  }

  if (userBody.referredBy) {
    const referrer = await RotexUser.findOne({ referralCode: userBody.referredBy });
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

  return RotexUser.create(defaultUser);
};


const findUserByMobileNumber = async (mobileNumber) => {
  return await RotexUser.findOne({ mobileNumber });
};

const createAdmin = async (userBody) => {
  if (!userBody?.email) throw new ApiError(httpStatus.BAD_REQUEST, 'email is required!');
  if (!userBody?.password) throw new ApiError(httpStatus.BAD_REQUEST, 'password is required!');
  const normalizedEmail = userBody.email.toLowerCase();
  const emailExist = await RotexUser.findOne({ email: normalizedEmail })
  if (emailExist) throw new ApiError(httpStatus.BAD_REQUEST, 'email already exist');
  return RotexUser.create(userBody);
};

const updateUser = async (userId, user) => {
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, "RotexUser ID is required!");

  const userNotExist = await userService.getUserById(userId);
  if (!userNotExist) throw new ApiError(httpStatus.NOT_FOUND, "RotexUser not found");

  if (user?.email) {
    const emailExist = await userService.getUserByEmail(user.email);
    if (emailExist && emailExist._id.toString() !== userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
    }
  }

  if (user?.password) {
    delete user.password;
  }

  const updatedUser = await RotexUser.findByIdAndUpdate(userId, user, { new: true, runValidators: true });

  return {
    message: "RotexUser updated successfully",
    name: updatedUser?.name,
    user: updatedUser,
  };
};

const checkRewardStatus = async (userId) => {
  const user = await RotexUser.findById(userId);
  return user.hasClaimedReward;
};

const claimReward = async (userId) => {
  const user = await RotexUser.findById(userId);
  if (user.hasClaimedReward) {
    throw new Error("Already claimed");
  }
  user.hasClaimedReward = true;
  await user.save();
  return 200;
};


const loginUser = async (email, password) => {
  if (!email) throw new ApiError(httpStatus.BAD_REQUEST, 'email is required!');
  if (!password) throw new ApiError(httpStatus.BAD_REQUEST, 'password is required!');
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  const tokens = await tokenService.generateAuthTokens(user);
  return { success: true, user, tokens, message: 'Logged in successfully!' };
}


const loginAdmin = async (email, password) => {
  console.log(`email is ${email} password ${password}`)
  if (!email) throw new ApiError(httpStatus.BAD_REQUEST, 'user Name is required!');
  if (!password) throw new ApiError(httpStatus.BAD_REQUEST, 'password is required!');
  const user = await userService.getUserByEmail(email);

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
  const user = await RotexUser.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'RotexUser not found');
  }
  return user.referPrice;
};

const updateReferPrice = async (userId, amount) => {
  const user = await RotexUser.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RotexUser not found');
  }

  user.referPrice = amount;
  await user.save();

  return user.referPrice;
};


  const generateOtp = () => Math.floor(100000 + Math.random() * 900000); 

const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes

export const sendOtp = async (mobileNumber) => {
  if (!mobileNumber) throw new Error("Mobile number is required.");

  let user = await RotexUser.findOne({ mobileNumber });

  if (!user) {
    user = await RotexUser.create({
      mobileNumber,
      verified: false,
      subscribedToOffers: true,
    });
  }

  const otp = generateOtp();

  user.otp = {
    code: otp,
    expiresAt: new Date(Date.now() + OTP_EXPIRY),
  };

  await user.save();

  console.log("OTP stored in DB for:", mobileNumber, user.otp);

  await sendWhatsappOTP({ name: "User", to: mobileNumber, otp });

  return {
    success: true,
    message: "OTP sent successfully.",
    otp,
    userId: user._id,
  };
};

// const sendOtp = async (mobileNumber) => {
//   if (!mobileNumber) throw new Error("Mobile number is required.");

//   let user = await RotexUser.findOne({ mobileNumber });

//   if (!user) {
//     user = await RotexUser.create({
//       mobileNumber,
//       verified: false,
//       subscribedToOffers: true,
//     });
//   }

//   const otp = generateOtp();
//   const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

//   user.otp = { code: otp, expiresAt };
//   await user.save();

//   console.log("OTP Stored for:", mobileNumber, "OTP:", otp);

//   await sendWhatsappOTP({ name: "User", to: mobileNumber, otp });

//   return {
//     success: true,
//     message: "OTP sent successfully.",
//     otp,
//     userId: user._id,
//   };
// };


  const updateAdminProfile = async (adminId, updateData) => {
    const admin = await RotexUser.findById(adminId);
    if (!admin) throw new Error("Admin not found");
  
    Object.keys(updateData).forEach((key) => {
      if (key === "shippingAddress") {
        admin.shippingAddress = updateData.shippingAddress;
      } else {
        admin[key] = updateData[key];
      }
    });
  
    await admin.save();
    return admin;
  };

 const verifyOtp = async (mobileNumber, inputOtp) => {
  console.log('mobileNumber', mobileNumber);
  console.log('inputOtp', inputOtp);
  if (!mobileNumber || !inputOtp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Mobile number and OTP are required.");
  }

  const user = await RotexUser.findOne({ mobileNumber });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found. Please register first.");
  }

  if (!user.otp || !user.otp.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP not sent or has expired.");
  }

  if (Date.now() > new Date(user.otp.expiresAt).getTime()) {
    throw new ApiError(httpStatus.BAD_REQUEST, "OTP has expired.");
  }

  if (user.otp.code !== inputOtp) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid OTP.");
  }

  // Generate token
  const token = jwt.sign(
    { userId: user._id, mobileNumber: user.mobileNumber },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  user.verified = true;
  user.otp = undefined; // Clear OTP
  user.tokens = user.tokens || [];
  user.tokens.push({
    token,
    type: "AUTH",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    blacklisted: false,
  });

  await user.save();

  return {
    success: true,
    message: "OTP verified successfully.",
    userId: user._id,
    user,
    token,
  };
};

const getAllUsers = async () => {
  return RotexUser.find();
};

const getAdminProfileService = async () => {
  const admin = await RotexUser.findOne({ role: "admin" }).select("-password");
  return admin;
};


/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
// const logout = async (refreshToken) => {
//   const refreshTokenDoc = await findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
//   if (!refreshTokenDoc) {
//     throw new ApiError(NOT_FOUND, 'Not found');
//   }
//   await refreshTokenDoc.remove();
// };

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
  updateAdminProfile,
  getAdminProfileService, checkRewardStatus, claimReward,
};