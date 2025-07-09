import { Intro } from "../models/intro.model.js";
import { Match } from "../models/match.model.js";
import Subscription from "../models/subscription.model.js";
import DatingUser from "../models/user.model.js";
import Aboutus from "../models/aboutus.js";
import TermConditions from "../models/term&conditions.js";
import Policy from "../models/policy.js";

const getAllIntroScreens = async () => {
  return await Intro.find();
};

const createOrUpdateIntroScreen = async (data) => {
  const existing = await Intro.findOne();
  if (existing) {
    return await Intro.findByIdAndUpdate(existing._id, data, { new: true });
  }
  return await Intro.create(data);
};

const deleteIntroScreen = async (id) => {
  return await Intro.findByIdAndDelete(id);
};

const updateIntroScreen = async (id, data) => {
  return await Intro.findByIdAndUpdate(id, data, { new: true });
};

const getAllUsers = async () => {
  return await DatingUser.find();
};

const getUserById = async (id) => {
  return await DatingUser.findById(id);
};

const getAllInteractions = async () => {
  return await Match.find().populate('fromUser toUser');
};

const getInteractionsByUser = async (userId) => {
  return await Match.find({ fromUser: userId }).populate('toUser');
};

const getStarsReceived = async (userId) => {
  return await Match.find({ toUser: userId, type: 'star' }).populate('fromUser');
};

const createSubscription = async (data) => {
  return await Subscription.create(data);
};

const getAllSubscriptions = async () => {
  return await Subscription.find().sort({ createdAt: -1 });
};

const getSubscriptionById = async (id) => {
  return await Subscription.findById(id);
};

const updateSubscription = async (id, data) => {
  return await Subscription.findByIdAndUpdate(id, data, { new: true });
};

const deleteSubscription = async (id) => {
  return await Subscription.findByIdAndDelete(id);
};

const createAboutus = async (data) => {
  const existing = await Aboutus.findOne();
  if (existing) {
    return await Aboutus.findByIdAndUpdate(existing._id, data, { new: true });
  } else {
    return await Aboutus.create(data);
  }
};

const getAboutus = async()=>{
  return await Aboutus.find();
}

const createTermConditions = async (data) => {
  const existing = await TermConditions.findOne();
  if (existing) {
    return await TermConditions.findByIdAndUpdate(existing._id, data, { new: true });
  } else {
    return await TermConditions.create(data);
  }
};

const getTermConditions = async()=>{
  return await TermConditions.find();
}

const createPolicy = async (data) => {
  const existing = await Policy.findOne();
  if (existing) {
    return await Policy.findByIdAndUpdate(existing._id, data, { new: true });
  } else {
    return await Policy.create(data);
  }
};

const getPolicy = async()=>{
  return await Policy.find();
}


export default { getAllIntroScreens, createOrUpdateIntroScreen, deleteIntroScreen, updateIntroScreen, getAllUsers, getUserById, getAllInteractions, getInteractionsByUser, getStarsReceived,
  createSubscription, getAllSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription, createAboutus, getAboutus, createTermConditions, getTermConditions, createPolicy, getPolicy, 
}