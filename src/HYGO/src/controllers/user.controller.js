import userService from "../services/user.service.js";
import httpStatus from 'http-status';
import catchAsync from "../utils/catchAsync.js";

 const createReminder = catchAsync(async (req, res) => {
  const reminder = await userService.createReminder(req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'Reminder created successfully',
    data: reminder,
  });
});

const getReminders = catchAsync(async (req, res) => {
  const reminders = await userService.getRemindersByUser(req.params.userId);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Reminders fetched successfully',
    data: reminders,
  });
});

const getReminderById = catchAsync(async (req, res) => {
  const reminder = await userService.getReminderById(req.params.id);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Reminder details',
    data: reminder,
  });
});

const updateReminder = catchAsync(async (req, res) => {
  const updated = await userService.updateReminder(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Reminder updated successfully',
    data: updated,
  });
});

const deleteReminder = catchAsync(async (req, res) => {
  await userService.deleteReminder(req.params.id);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Reminder deleted successfully',
  });
});

const createAppointment = catchAsync(async (req, res) => {
  const appointment = await userService.bookAppointment(req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'Appointment booked successfully',
    data: appointment,
  });
});

export const getAppointments = catchAsync(async (req, res) => {
  const appointments = await userService.getAppointmentsByUser(req.params.userId);
  res.status(httpStatus.OK).json({
    status: true,
    data: appointments,
  });
});

const getAppointment = catchAsync(async (req, res) => {
  const appointment = await userService.getAppointmentById(req.params.id);
  res.status(httpStatus.OK).json({
    status: true,
    data: appointment,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);

  if (!updatedUser) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: false,
      message: 'User not found',
    });
  }

  res.status(httpStatus.OK).json({
    status: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const deletedUser = await userService.deleteUser(req.params.id);

  if (!deletedUser) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: false,
      message: 'User not found',
    });
  }

  res.status(httpStatus.OK).json({
    status: true,
    message: 'User deleted successfully',
  });
});

const createFolder = catchAsync(async (req, res) => {
  const folder = await userService.createFolder(req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'Folder created successfully',
    data: folder
  });
});

const getAllFolders = catchAsync(async (req, res) => {
  const folders = await userService.getAllFolders();
  res.status(httpStatus.OK).json({
    status: true,
    data: folders
  });
});

const getFolder = catchAsync(async (req, res) => {
  const folder = await userService.getFolderById(req.params.id);
  if (!folder) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Folder not found' });
  }
  res.status(httpStatus.OK).json({
    status: true,
    data: folder
  });
});

const updateFolder = catchAsync(async (req, res) => {
  const folder = await userService.updateFolder(req.params.id, req.body);
  if (!folder) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Folder not found' });
  }
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Folder updated successfully',
    data: folder
  });
});

const deleteFolder = catchAsync(async (req, res) => {
  const folder = await userService.deleteFolder(req.params.id);
  if (!folder) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Folder not found' });
  }
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Folder deleted successfully'
  });
});

const postFile = catchAsync(async (req, res) => {
    console.log('Incoming body:', req.body);
  const { fileName, fileType, filePath, fileAccess } = req.body;

  if (!fileName || !fileType || !filePath) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: false,
      message: 'fileName, fileType, and filePath are required.'
    });
  }

  const fileData = {
    fileName,
    fileType,
    filePath,
    fileAccess
  };

  const savedFile = await userService.uploadFile(fileData);

  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'File uploaded successfully',
    data: savedFile
  });
});


const getAllFiles = catchAsync(async (req, res) => {
  const files = await userService.getAllFiles();
  res.status(httpStatus.OK).json({ status: true, data: files });
});

const getFile = catchAsync(async (req, res) => {
  const file = await userService.getFileById(req.params.id);
  if (!file) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'File not found' });
  }
  res.status(httpStatus.OK).json({ status: true, data: file });
});

const updateFile = catchAsync(async (req, res) => {
  const updateData = {
    fileName: req.body.fileName,
    fileType: req.body.fileType,
    fileAccess: JSON.parse(req.body.fileAccess)
  };

  const updatedFile = await userService.updateFile(req.params.id, updateData);

  if (!updatedFile) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'File not found' });
  }

  res.status(httpStatus.OK).json({
    status: true,
    message: 'File metadata updated',
    data: updatedFile
  });
});

const replaceFile = catchAsync(async (req, res) => {
  const replaced = await userService.replaceFile(req.params.id, req.file.path);

  if (!replaced) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'File not found' });
  }

  res.status(httpStatus.OK).json({
    status: true,
    message: 'File replaced successfully',
    data: replaced
  });
});

const deleteFile = catchAsync(async (req, res) => {
  const deleted = await userService.deleteFile(req.params.id);
  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'File not found' });
  }

  res.status(httpStatus.OK).json({
    status: true,
    message: 'File deleted successfully'
  });
});

const handleGetUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export default { postFile, deleteFile, replaceFile, updateFile, getFile, getAllFiles, createReminder, getReminderById, getReminders, updateReminder, deleteReminder,
    createAppointment, getAppointment, getAppointments, updateUser, deleteUser, createFolder, getAllFolders, getFolder, updateFolder, deleteFolder, handleGetUserById,
};