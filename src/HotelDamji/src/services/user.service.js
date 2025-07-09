import { HotelUser } from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';
import httpStatus from "http-status"
/**
 * Create a new user
 * @param {Object} userBody
 * @returns {Promise<HotelUser>}
 */


const loginUser  = async(username,password) => {
  if (username) throw new ApiError(httpStatus.BAD_REQUEST, 'user Name is required!');
  if (password) throw new ApiError(httpStatus.BAD_REQUEST, 'password is required!');
  const user = await userService.getUserByName(data.usern);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  const tokens = await tokenService.generateAuthTokens(user);
  return { success: true, user, tokens, message: 'Logged in successfully!' };
}
  
  const getUserById = async (id) => {
    const user = await HotelUser.findById(id);
    return user;
  };

  /**
 * Get user by email
 * @param {string} email
 * @returns {Promise<HotelUser>}
 */
const getUserByEmail = async (email) => {
    return HotelUser.findOne({ email }).exec();
  };

const getUserByName = async (username) => {
    return HotelUser.findOne({ username });
  };


  

  export default {getUserByName, getUserByEmail,};
