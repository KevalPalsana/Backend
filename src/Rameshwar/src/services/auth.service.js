/* eslint-disable no-unused-vars */
import userService from './user.service.js';
import {ApiError} from '../utils/ApiError.js';
import { RameshwarUser} from '../models/user.model.js';
import httpStatus from "http-status"
import tokenService from './token.service.js';
import jwt from 'jsonwebtoken';
import bcrypt  from 'bcrypt';
import RameshwarRoleUser from '../models/roleUser.model.js';

const otpStore = {};

// const createNewUser = async ({ name, email, mobileNumber }) => {
//     const isMobileTaken = await RameshwarUser.isMobileNumberTaken(mobileNumber);
//   if (isMobileTaken) {
//     throw new Error("Mobile number already registered.");
//   } 

//   const newUser = new RameshwarUser({ name, email, mobileNumber });
//   await newUser.save();

//   return {
//     message: 'User registered successfully.',
//     user: { id: newUser._id, name, email, mobileNumber },
//   };
// };


const createNewUser = async ({ name, email, mobileNumber, role, companyId }) => {
  const isMobileTaken = await RameshwarUser.isMobileNumberTaken(mobileNumber);
  if (isMobileTaken) {
    throw new Error("Mobile number already registered.");
  }

  if (role === 'manager') {
    if (!companyId) throw new Error("Company ID is required for manager.");
    
    const company = await RameshwarInfo.findById(companyId);
    if (!company) throw new Error("Invalid company ID.");
  }

  const newUser = new RameshwarUser({ name, email, mobileNumber, role, companyId });
  await newUser.save();

  return {
    message: 'User registered successfully.',
    user: {
      id: newUser._id,
      name,
      email,
      mobileNumber,
      role: newUser.role,
      companyId: newUser.companyId,
    },
  };
};


 const findUserByMobileNumber = async (mobileNumber) => {
  return await RameshwarUser.findOne({ mobileNumber }); 
};

const createAdmin = async (userBody) => {
  if (!userBody?.email) throw new ApiError(httpStatus.BAD_REQUEST, 'email is required!');
  if (!userBody?.password) throw new ApiError(httpStatus.BAD_REQUEST, 'password is required!');
  const normalizedEmail = userBody.email.toLowerCase();
  const emailExist = await RameshwarUser.findOne({email:normalizedEmail})
  if (emailExist) throw new ApiError(httpStatus.BAD_REQUEST, 'email already exist');
   return RameshwarUser.create(userBody);
 };

 const updateUser = async (userId, user) => {
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, "RameshwarUser ID is required!");

  const userNotExist = await userService.getUserById(userId); // Ensure this is awaited
  if (!userNotExist) throw new ApiError(httpStatus.NOT_FOUND, "RameshwarUser not found");

  if (user?.email) {
    const emailExist = await userService.getUserByEmail(user?.email);
    if (emailExist) throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
  }

  if (user?.password) delete user?.password;

  const allowedUpdates = ["name", "email", "mobileNumber"];
  const updates = Object.keys(user);

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid update fields!");
  }

  console.log("Filtered RameshwarUser for Update:", user);
  const updatedUser = await RameshwarUser.findByIdAndUpdate(userId, user, { new: true });
  return {
    message: "RameshwarUser updated successfully",
    name: updatedUser?.name,
    user: updatedUser
  };  
};

const loginUser = async (name, password) => {
  try {
    console.log("Received Name:", name);

    if (!name || !password) {
      throw new Error("Name and password are required.");
    }

    const user = await RameshwarUser.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (!user) {
      throw new Error("User not found.");
    }
    console.log("Fetched User:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Provided Password:", password);
    console.log("Stored Hashed Password:", user.password);
    console.log("Password Match Status:", isPasswordValid);
    
  
    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.ACCESS_TOKEN_SECRET,    
      { expiresIn: "7d" }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    return {
      message: "Login successful.",
      user: userResponse,
      token,
    };
  } catch (error) {
    console.error("Login Error:", error.message);
    throw new Error(error.message);
  }
};

const loginAdmin  = async(name,password) => {
  console.log(`name is ${name} password ${password}`)
  if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'user Name is required!');
  if (!password) throw new ApiError(httpStatus.BAD_REQUEST, 'password is required!');
  const user = await userService.getUserByName(name);

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
    const user = await RameshwarUser.findById(userId);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'RameshwarUser not found');
    }
    return user.referPrice;
  };

  const updateReferPrice = async (userId, amount) => {
    const user = await RameshwarUser.findById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RameshwarUser not found');
    }
  
    user.referPrice = amount;
    await user.save();
  
    return user.referPrice;
  };

  
  const sendOtp = async (mobileNumber) => {
    if (!mobileNumber) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Mobile number is required!");
    }
  
    const defaultOtp = "12345"; 
    const isDefaultOtpEnabled = true;
    const otp = isDefaultOtpEnabled
      ? defaultOtp
      : Math.floor(10000 + Math.random() * 90000).toString(); 
  
    const otpExpiry = Date.now() + 5 * 60 * 1000; 
  
    // Store OTP in memory
    otpStore[mobileNumber] = {
      otp,
      expiresAt: otpExpiry,
    };
  
    console.log("OTP Store After Generation:", otpStore);
  
    let user = await RameshwarUser.findOne({ mobileNumber });
    if (!user) {
      user = new RameshwarUser({ mobileNumber, verified: false });
      await user.save();
    }
  
    console.log(`Generated OTP for ${mobileNumber}: ${otp}`);
    return { message: "OTP sent successfully.", otp };
  };
  
  

  const verifyOtp = async ({ mobileNumber, otp }) => {
    console.log("Mobile Number in verifyOtp:", mobileNumber);
    console.log("Provided OTP:", otp);
  
    if (!mobileNumber || !otp) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Mobile number and OTP are required!");
    }
  
    const storedOtpData = otpStore[mobileNumber];
    console.log("Stored OTP Data:", storedOtpData);
  
    if (!storedOtpData) {
      throw new ApiError(httpStatus.BAD_REQUEST, "OTP not sent or expired.");
    }
  
    if (otp !== storedOtpData.otp) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid OTP.");
    }
  
    if (Date.now() > storedOtpData.expiresAt) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Expired OTP.");
    }
  
    delete otpStore[mobileNumber];
  
    return {
      message: "OTP verified successfully.",
      mobileNumber, 
    };
  };

  const setPassword = async ({ mobileNumber, password, confirmPassword }) => {
    console.log("Mobile Number in setPassword:", mobileNumber);
  
    if (!mobileNumber || !password || !confirmPassword) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Mobile number, password, and confirm password are required!");
    }
  
    if (password !== confirmPassword) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Password and confirm password do not match!");
    }
  
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await RameshwarUser.findOneAndUpdate(
      { mobileNumber },
      { password: hashedPassword, verified: true },
      { new: true }
    );
  
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }
  
    const userResponse = user.toObject();
    delete userResponse.password;
  
    return {
      message: "Password set successfully.",
      user: userResponse,
    };
  };

  const getAllUsers  = async () => {
    return RameshwarUser.find(); 
  };
  
  const findUserByNameService = async (name) => {
    try {
      const user = await RameshwarRoleUser.findOne({ name })
        .populate("roleId")
        .populate("companyId");
  
      return user;
    } catch (error) {
      console.error("Error finding user by name:", error);
      throw new Error("Failed to fetch user.");
    }
  };


  const validatePasswordService = async (enteredPassword, userPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword);
  };/** */

  const generateTokenService = (user) => {
    return jwt.sign(
      { userId: user._id, role: user.roleId?.roleName },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );
  };
  
  

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */

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
  setPassword,
  findUserByNameService,
  validatePasswordService,
  generateTokenService,
};