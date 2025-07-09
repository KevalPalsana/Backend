import fs from 'fs/promises';
import { hygoModels } from "../db/hygo.db.js";


const createReminder = async (data) => {
  const reminder = new hygoModels.HYGOReminder(data);
  return await reminder.save();
};

const getRemindersByUser = async (userId) => {
  return await hygoModels.HYGOReminder.find({ userId });
};

const getReminderById = async (id) => {
  return await hygoModels.HYGOReminder.findById(id);
};

const updateReminder = async (id, data) => {
  return await hygoModels.HYGOReminder.findByIdAndUpdate(id, data, { new: true });
};

const deleteReminder = async (id) => {
  return await hygoModels.HYGOReminder.findByIdAndDelete(id);
};

const bookAppointment = async (data) => {
  return await hygoModels.HYGOUserAppointment.create(data);
};

const getAppointmentsByUser = async (userId) => {
  return await hygoModels.HYGOUserAppointment.find({ patientId: userId }).populate('doctor');
};

const getAppointmentById = async (id) => {
  return await hygoModels.HYGOUserAppointment.findById(id).populate('doctor');
};

const updateUser = async (userId, updateData) => {
  return await hygoModels.HYGOUser.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteUser = async (userId) => {
  return await hygoModels.HYGOUser.findByIdAndDelete(userId);
};

const getUserById = async (userId) => {
  const user = await hygoModels.HYGOUser.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const createFolder = async (folderData) => {
  return await new hygoModels.HYGOFolder(folderData).save();
};

const getAllFolders = async () => {
  return await hygoModels.HYGOFolder.find();
};

const getFolderById = async (id) => {
  return await hygoModels.HYGOFolder.findById(id);
};

const updateFolder = async (id, updateData) => {
  return await hygoModels.HYGOFolder.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

const deleteFolder = async (id) => {
  return await hygoModels.HYGOFolder.findByIdAndDelete(id);
};

const uploadFile = async (fileData) => {
  const file = new hygoModels.HYGOFile(fileData);
  return await file.save();
};


export const getAllFiles = async () => {
  return await hygoModels.HYGOFile.find();
};

const getFileById = async (id) => {
  return await hygoModels.HYGOFile.findById(id);
};

const updateFile = async (id, updateData) => {
  return await hygoModels.HYGOFile.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

const replaceFile = async (id, newFilePath) => {
  const file = await hygoModels.HYGOFile.findById(id);
  if (!file) return null;

  // Delete old file from system
  fs.unlinkSync(file.filePath);

  file.filePath = newFilePath;
  return await file.save();
};

const deleteFile = async (id) => {
  const file = await hygoModels.HYGOFile.findById(id);
  if (!file) return null;

  fs.unlinkSync(file.filePath); // remove file from system
  return await file.deleteOne(); // remove from DB
};

export default { createReminder, getReminderById, getRemindersByUser,updateReminder, deleteReminder, bookAppointment, getAppointmentById, getAppointmentsByUser, updateUser, deleteUser, createFolder, getAllFolders, getFolderById, updateFolder, 
  deleteFolder, uploadFile, replaceFile, deleteFile, updateFile,getFileById, getUserById,
};