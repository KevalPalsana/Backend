import userService from "../services/user.service.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";

const setUserLocation = catchAsync(async (req, res) => {
  const { userId, latitude, longitude } = req.body;
  await userService.saveUserLocation(userId, latitude, longitude);
  res.status(httpStatus.OK).send({ message: 'Location saved' });
});

const submitOnboarding = catchAsync(async (req, res) => {
  const { userId, onboardingData } = req.body;
  await userService.saveOnboardingData(userId, onboardingData);
  res.status(httpStatus.OK).send({ message: 'Onboarding complete' });
});

const getFilteredMatches = catchAsync(async (req, res) => {
  const filters = req.body;
  const users = await userService.getFilteredUsers(filters);
  res.status(httpStatus.OK).send(users);
});

export const getUserProfile = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
  res.status(httpStatus.OK).send(user);
});

const reportUser = catchAsync(async (req, res) => {
  const { reportedBy, reportedUser, reason } = req.body;
  const report = await userService.reportUser({ reportedBy, reportedUser, reason });
  res.status(httpStatus.CREATED).send(report);
});

const createSubscription = catchAsync(async (req, res) => {
  const { userId, plan, price, paymentMethod, status } = req.body;
  const subscription = await userService.createSubscription({
    userId,
    plan,
    price,
    paymentMethod,
    status: status || 'success',
  });
  res.status(httpStatus.CREATED).send({ message: 'Payment successful', subscription });
});

const recordMatchAction = catchAsync(async (req, res) => {
  const { userId, targetUserId, type } = req.body;
  const match = await userService.recordMatchAction({ userId, targetUserId, type });
  res.status(httpStatus.CREATED).send(match);
});

const updateProfile = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const profileData = req.body;

  if (!userId) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'User ID is required' });
  }

  const updatedUser = await userService.updateUserProfile(userId, profileData);

  if (!updatedUser) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
  }

  res.status(httpStatus.OK).send({
    status: 'success',
    message: 'User updated successfully',
    data: updatedUser,
  });
});

const updateDiscoverySettings = catchAsync(async (req, res) => {
  const { userId, discoverySettings } = req.body;
  const user = await userService.updateDiscoverySettings(userId, discoverySettings);
  if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
  res.status(httpStatus.OK).send(user);
});

const getIntroScreens = catchAsync(async (req, res) => {
  const intros = await userService.getAllIntroScreens();
  res.status(httpStatus.OK).send(intros);
});

export default { setUserLocation, submitOnboarding, getFilteredMatches, getUserProfile, reportUser, createSubscription, recordMatchAction, updateProfile, updateDiscoverySettings, getIntroScreens}
