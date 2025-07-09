import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';

const router = Router();

router
  .route('/patient')
  .post(adminController.createPatient)
  .get(adminController.getAllPatients);

router
  .route('/patient/:id')
  .get(adminController.getPatientById)
  .put(adminController.updatePatientById)
  .delete(adminController.deletePatientById);

router
  .route('/doctor')
  .post(adminController.createDoctor)
  .get(adminController.getAllDoctors);

router
  .route('/doctor/:id')
  .get(adminController.getDoctorById)
  .put(adminController.updateDoctorById)
  .delete(adminController.deleteDoctorById);

router
  .route('/setting/:userId')
  .post(adminController.createOrUpdateSettings)
  .get(adminController.getSettingsByUser)
  .delete(adminController.deleteSettingsByUser);

  
router
  .route('/appointment')
  .post(adminController.createAppointment)
  .get(adminController.getAppointments);

router.get("/appointments", adminController.getFilterAppointments);

router
  .route('/clinic')
  .post(adminController.createClinic)
  .get(adminController.getAllClinics);

router
  .route('/clinic/:id')
  .get(adminController.getClinic)
  .put(adminController.updateClinic)
  .delete(adminController.deleteClinic );

router.post('/opd/:clinicId', adminController.createOPD);
router.get('/opd', adminController.getAllOPDs);
router.get('/opd/:id', adminController.getOPDById);
router.put('/opd/:id', adminController.updateOPD);
router.delete('/opd/:id', adminController.deleteOPD);

router
  .route('/department')
  .post(adminController.createDepartment)
  .get(adminController.getAllDepartments);

router
  .route('/department/:id')
  .get(adminController.getDepartmentById)
  .put(adminController.updateDepartment)
  .delete(adminController.deleteDepartment);

router
  .route('/service')
  .post(adminController.createService)
  .get(adminController.getAllServices);

router
  .route('/service/:id')
  .get(adminController.getServiceById)
  .put(adminController.updateService)
  .delete(adminController.deleteService);
  
router.post('/prescription/create/:doctorId', adminController.createPrescription);
router.get('/prescription', adminController.getAllPrescriptions);
router.get('/prescription/:id', adminController.getPrescriptionById);

export default router;
