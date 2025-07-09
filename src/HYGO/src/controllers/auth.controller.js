import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import authService from '../services/auth.service.js';

const requestOtp = catchAsync(async (req, res) => {
  const { mobile } = req.body;
  console.log('mobile', mobile)

  if (!mobile) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'Mobile number is required' });
  }

  const result = await authService.sendOtp( mobile );

  res
    .status(httpStatus.OK)
    .send({ message: 'OTP sent via WhatsApp (valid 5 min)', ...result });
});

const verifyOtp = catchAsync(async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'Mobile and OTP are required' });
  }

  const result = await authService.verifyOtp( mobile, otp );

  res.status(httpStatus.OK).send(result); 
});

export default { requestOtp, verifyOtp };
