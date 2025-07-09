import { Router } from 'express';
import userController from '../controllers/user.controller.js';


const router = Router();

router.post('/reminders', userController.createReminder);

router.get('/reminders/:userId', userController.getReminders);

router
  .route('/reminder/:id')
  .get(userController.getReminderById)
  .put(userController.updateReminder)
  .delete(userController.deleteReminder);

router
  .route("/user/:id")
  .put(userController.updateUser)
  .get(userController.handleGetUserById)
  .delete(userController.deleteUser); 

router.post('/appointment', userController.createAppointment);
router.get('/appointments/:userId', userController.getAppointments);
router.get('/appointment/:id', userController.getAppointment);

router
  .route('/folder/:id')
  .put(userController.updateFolder)
  .get(userController.getFolder)
  .delete(userController.deleteFolder);

  
router
  .route('/folder')
  .post(userController.createFolder)
  .get(userController.getAllFolders);

router.post('/file/:folderId', userController.postFile);
router.get('/file', userController.getAllFiles);
router.get('/file/:id', userController.getFile);
router.put('/file/:id', userController.updateFile); 
router.put('/file/replace/:id',userController.replaceFile); 
router.delete('/file/:id', userController.deleteFile);

export default router;
