import { Intro } from "../models/intro.model.js";
import { Match } from "../models/match.model.js";
import { Report } from "../models/report.model.js";
import  Subscription  from "../models/subscription.model.js";
import DatingUser from "../models/user.model.js";


const saveUserLocation = async (userId, lat, lng) => {
  const user = await DatingUser.findById(userId);
  if (!user) throw new Error('User not found');

  user.location = {
    type: 'Point',
    coordinates: [lng, lat],
  };
  await user.save();
};

const saveOnboardingData = async (userId, data) => {
  const user = await DatingUser.findById(userId);
  if (!user) throw new Error('User not found');

  Object.assign(user, data);
  await user.save();
};

 const getFilteredUsers = async (filters) => {
  const query = {};

  if (filters.gender) {
    query.gender = filters.gender;
  }

  if (filters.ageMin && filters.ageMax) {
    const currentYear = new Date().getFullYear();
    const birthMin = new Date(currentYear - filters.ageMax, 0, 1);
    const birthMax = new Date(currentYear - filters.ageMin, 11, 31);
    query.birthDate = { $gte: birthMin, $lte: birthMax };
  }

  if (filters.location && filters.distance) {
    query.location = {
      $near: {
        $geometry: { type: 'Point', coordinates: filters.location },
        $maxDistance: filters.distance * 1000,
      },
    };
  }

  return await User.find(query);
};

const getUserById = async (userId) => {
  return await DatingUser.findById(userId);
};

const reportUser = async ({ reportedBy, reportedUser, reason }) => {
  const report = new Report({ reportedBy, reportedUser, reason });
  await report.save();
  return report;
};

const createSubscription = async (data) => {
  const subscription = new Subscription(data);
  await subscription.save();
  return subscription;
};

const recordMatchAction = async ({ userId, targetUserId, type }) => {
  const match = new Match({ userId, targetUserId, type });
  await match.save();
  return match;
};

const updateUserProfile = async (userId, profileData) => {
  const user = await DatingUser.findByIdAndUpdate(userId, profileData, {
    new: true,
    runValidators: true,
  });
  return user;
};

const updateDiscoverySettings = async (userId, settings) => {
  return await DatingUser.findByIdAndUpdate(userId, { discoverySettings: settings }, { new: true });
};

const getAllIntroScreens = async () => {
  return await Intro.find();
};

export default { saveUserLocation, saveOnboardingData, getFilteredUsers, getUserById, reportUser, createSubscription, recordMatchAction, updateUserProfile, updateDiscoverySettings, getAllIntroScreens}