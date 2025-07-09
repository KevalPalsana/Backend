import authService from "../services/auth.service.js";
import tokenService from "../services/token.service.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status" ;

const registerUser = catchAsync(async (req, res) => {
  console.log('req.body', req.body);
  const user = await authService.registerUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const registerAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.register({ email, password });
  res.status(httpStatus.CREATED).send(result);
});

const loginAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  res.status(httpStatus.OK).send(result);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await authService.updateUser(req.params?.userId,req.body);
  res.status(httpStatus.OK).send({ user });
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginWithEmailPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ user, tokens });
});

const getReferPrice = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const referPrice = await authService.getReferralPrice(userId); 
    res.status(httpStatus.OK).send({ success: true, referPrice });
  } catch (error) {
    next(error);
  }
};

const updateReferPrice = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    if (amount === undefined) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Amount is required',
      });
    }

    const updatedReferPrice = await authService.updateReferPrice(userId, amount);

    res.status(httpStatus.OK).json({
      success: true,
      referPrice: updatedReferPrice,
    });
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  const users = await authService.getAllUsers(req.body);
  res.status(httpStatus.OK).send({ users });
};

// const sendOtp = async (req, res, next) => {
//   try {
//     const { mobileNumber } = req.body;

//     if (!mobileNumber || mobileNumber.length !== 10) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid mobile number.",
//       });
//     }

//     const response = await authService.sendOtp(mobileNumber);
//     res.status(200).json({
//       success: true,
//       ...response,
//     });
//   } catch (error) {
//     next(error);
//   }
// }; 


 const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const code = await authService.generateResetCode(email);
  await emailService.sendResetCode(email, code);
  res.status(httpStatus.OK).send({ message: 'Verification code sent to email' });
});

const verifyOtp = catchAsync(async (req, res) => {
  const { email, code } = req.body;
  const valid = await authService.verifyResetCode(email, code);
  if (!valid) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid or expired code' });
  res.status(httpStatus.OK).send({ message: 'Code verified' });
});

 const resetPassword = catchAsync(async (req, res) => {
  const { email, code, newPassword } = req.body;
  await authService.resetPassword(email, code, newPassword);
  res.status(httpStatus.OK).send({ message: 'Password reset successful' });
});
const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    const updatedOrder = await authService.updatePaymentStatusService(orderId, paymentStatus);

    res.status(200).json({
      success: true,
      message: `Payment status updated to ${paymentStatus}.`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error.',
    });
  }
};

  
export default {registerUser,registerAdmin,loginUser,loginAdmin,updateUser, getReferPrice, updateReferPrice, forgotPassword, resetPassword, verifyOtp, updatePaymentStatus, getAllUsers,
  registerAdmin, loginAdmin,
}