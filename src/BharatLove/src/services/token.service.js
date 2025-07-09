import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' }); 

 const generateAuthTokens = (user) => {
  const accessToken = jwt.sign(
    { sub: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { sub: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return {
    access: { token: accessToken, expires: Date.now() + 15 * 60 * 1000 },
    refresh: { token: refreshToken, expires: Date.now() + 7 * 24 * 60 * 60 * 1000 },
  };
};

export default {generateAuthTokens}