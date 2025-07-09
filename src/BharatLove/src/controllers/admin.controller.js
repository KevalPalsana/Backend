import adminService from "../services/admin.service.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from 'http-status';

const getIntroScreens = catchAsync(async (req, res) => {
  const intros = await adminService.getAllIntroScreens();
  res.status(httpStatus.OK).send(intros);
});

const createIntro = catchAsync(async (req, res) => {
  const intro = await adminService.createOrUpdateIntroScreen(req.body);
  res.status(httpStatus.CREATED).send(intro);
});

const deleteIntro = catchAsync(async (req, res) => {
  const intro = await adminService.deleteIntroScreen(req.params.id);
  if (!intro) return res.status(httpStatus.NOT_FOUND).send({ message: 'Intro not found' });
  res.status(httpStatus.OK).send({ message: 'Intro deleted' });
});

const updateIntro = catchAsync(async (req, res) => {
  const intro = await adminService.updateIntroScreen(req.params.id, req.body);
  if (!intro) return res.status(httpStatus.NOT_FOUND).send({ message: 'Intro not found' });
  res.status(httpStatus.OK).send(intro);
});

const getAllUsersAdmin = catchAsync(async (req, res) => {
  const users = await adminService.getAllUsers();
  res.status(httpStatus.OK).send(users);
});

const getUserByIdAdmin = catchAsync(async (req, res) => {
  const user = await adminService.getUserById(req.params.id);
  if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
  res.status(httpStatus.OK).send(user);
});

const getAllMatches = catchAsync(async (req, res) => {
  const interactions = await adminService.getAllInteractions();
  res.status(httpStatus.OK).send(interactions);
});

const getUserInteractions = catchAsync(async (req, res) => {
  const interactions = await adminService.getInteractionsByUser(req.params.userId);
  res.status(httpStatus.OK).send(interactions);
});

const getStarsForUser = catchAsync(async (req, res) => {
  const stars = await adminService.getStarsReceived(req.params.userId);
  res.status(httpStatus.OK).send(stars);
});

 const createSubscription = async (req, res) => {
  try {
    const subscription = await adminService.createSubscription(req.body);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ message: "Failed to create subscription", error: err.message });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await adminService.getAllSubscriptions();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscriptions", error: err.message });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await adminService.getSubscriptionById(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Not found" });
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving subscription", error: err.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const subscription = await adminService.updateSubscription(req.params.id, req.body);
    if (!subscription) return res.status(404).json({ message: "Not found" });
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: "Error updating subscription", error: err.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const result = await adminService.deleteSubscription(req.params.id);
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting subscription", error: err.message });
  }
};


const createAboutus = async (req, res) => {
  try {
    const subscription = await adminService.createAboutus(req.body);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ message: "Failed to create subscription", error: err.message });
  }
};

const getAboutus = async (req, res) => {
  try {
    const subscriptions = await adminService.getAboutus();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscriptions", error: err.message });
  }
};


const createTermConditions = async (req, res) => {
  try {
    const subscription = await adminService.createTermConditions(req.body);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ message: "Failed to create subscription", error: err.message });
  }
};

const getTermConditions = async (req, res) => {
  try {
    const subscriptions = await adminService.getTermConditions();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscriptions", error: err.message });
  }
};


const createPolicy = async (req, res) => {
  try {
    const subscription = await adminService.createPolicy(req.body);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ message: "Failed to create subscription", error: err.message });
  }
};

const getPolicy = async (req, res) => {
  try {
    const subscriptions = await adminService.getPolicy();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscriptions", error: err.message });
  }
};

export default { getIntroScreens, createIntro, deleteIntro, updateIntro, getAllUsersAdmin, getUserByIdAdmin, getAllMatches, getUserInteractions, getStarsForUser,
  createSubscription, getAllSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription, createAboutus, getAboutus, createTermConditions, getTermConditions, createPolicy, getPolicy, 
};