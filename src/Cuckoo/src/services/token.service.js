import jwt from 'jsonwebtoken';
import moment from 'moment';
import CuckooToken  from '../models/token.model.js';
import  tokenTypes  from '../config/tokens.js';
const { sign, verify } = jwt;
/**
 * Generate token
 * @param {CuckooUser} user
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (user, expires, type, secret = process.env.ACCESS_TOKEN_SECRET) => {
  const payload = {
    sub: user.id,
    username: user.username || '',
    email: user.email || '',
    role: user.role,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<CuckooToken>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await CuckooToken.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<CuckooToken>}
 */
const verifyToken = async (token, type) => {
  const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
  const tokenDoc = await CuckooToken.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('CuckooToken not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {CuckooUser} user
 * @returns {Promise<Object>}
 */

const generateAuthTokens = async (user) => {

  const accessTokenExpiryDuration = moment.duration(process.env.ACCESS_TOKEN_EXPIRY).add(1, 'days');;
  const accessTokenExpires = moment().add(accessTokenExpiryDuration);
  console.log("accessTokenExpires", accessTokenExpires);

  const accessToken = generateToken(user, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpiryDuration = moment.duration(process.env.ACCESS_TOKEN_EXPIRY).add(6, 'days');
  const refreshTokenExpires = moment().add(refreshTokenExpiryDuration);
  const refreshToken = generateToken(user, refreshTokenExpires, "refresh");
  await saveToken(refreshToken, user.id, refreshTokenExpires, "refresh");

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
// const generateResetPasswordToken = async (email) => {
//   const user = await getUserByEmail(email);
//   if (!user) {
//     throw new ApiError(NOT_FOUND, 'No users found with this email');
//   }
//   const expires = moment().add(_jwt.resetPasswordExpirationMinutes, 'minutes');
//   const resetPasswordToken = generateToken(user, expires, tokenTypes.RESET_PASSWORD);
//   await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
//   return resetPasswordToken;
// };

/**
 * Generate verify email token
 * @param {CuckooUser} user
 * @returns {Promise<string>}
 */
// const generateVerifyEmailToken = async (user) => {
//   const expires = moment().add(_jwt.verifyEmailExpirationMinutes, 'minutes');
//   const verifyEmailToken = generateToken(user, expires, tokenTypes.VERIFY_EMAIL);
//   await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
//   return verifyEmailToken;
// };

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  // generateResetPasswordToken,
  // generateVerifyEmailToken,
};
