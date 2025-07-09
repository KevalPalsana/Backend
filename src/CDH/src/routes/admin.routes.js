import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import checkBlockingWindow from "../middleware/blockingtime.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/booking", adminController.createBooking);
router.get("/bookings", adminController.getAllBookings);

router.route("/booking/:id")
.get(adminController.getBookingById)
.put(adminController.updateBooking)
.delete(adminController.deleteBooking);

router.post("/payment/create-order", adminController.createOrder);

router.post("/appointment", adminController.createAppointment);
router.get("/appointment", adminController.getAllAppointments);
router.get("/appointment/:id", adminController.getAppointmentById);
router.put("/appointment/:id", adminController.updateAppointment);
router.delete("/appointment/:id", adminController.deleteAppointment);

router.post('/clinic', upload.array('images', 5), adminController.createClinic);
router.get('/clinic', adminController.getClinics);
router.get('/clinic/:id', adminController.getClinicById);
router.put('/clinic/:id', upload.array('images', 5), adminController.updateClinic);
router.delete('/clinic/:id', adminController.deleteClinic);

router.post('/center', adminController.createCenter);
router.get('/center', adminController.getCenters);
router.get('/center/:id', adminController.getCenterById);
router.put('/center/:id', adminController.updateCenter);
router.delete('/center/:id', adminController.deleteCenter);

router.post('/doctor', upload.single('Profile'), adminController.createDoctor);
router.get('/doctor', adminController.getDoctors);
router.get('/deleteddoctor', adminController.getDeletedDoctors);
router.get('/doctor/:id', adminController.getDoctorById);
router.put('/doctor/:id', upload.single('Profile'), adminController.updateDoctor);
router.delete('/doctor/:id', adminController.deleteDoctor);

router.post('/staff', upload.single('Profile'), adminController.createStaff);
router.get('/staff', adminController.getStaffs);
router.get('/deletedstaff', adminController.getDeletedStaffs);
router.get('/staff/:id', adminController.getStaffById);
router.put('/staff/:id', upload.single('Profile'), adminController.updateStaff);
router.delete('/staff/:id', adminController.deleteStaff);

router.post('/holiday', adminController.createHoliday);
router.get('/holiday', adminController.getHolidays);
router.get('/holiday/:id', adminController.getHolidayById);
router.put('/holiday/:id', adminController.updateHoliday);
router.delete('/holiday/:id', adminController.deleteHoliday);

router.post('/operatory', adminController.createOperatory);
router.get('/operatory', adminController.getOperatorys);
router.get('/operatory/:id', adminController.getOperatoryById);
router.put('/operatory/:id', adminController.updateOperatory);
router.delete('/operatory/:id', adminController.deleteOperatory);

router.post('/gallery', adminController.createGallery);
router.get('/gallery', adminController.getGallerys);
router.get('/gallery/:id', adminController.getGalleryById);
router.put('/gallery/:id', adminController.updateGallery);
router.delete('/gallery/:id', adminController.deleteGallery);

router.post('/appointmentseries', adminController.createAppointmentseries);
router.get('/appointmentseries', adminController.getAppointmentseries);
router.get('/appointmentseries/:id', adminController.getAppointmentseriesById);
router.put('/appointmentseries/:id', adminController.updateAppointmentseries);
router.delete('/appointmentseries/:id', adminController.deleteAppointmentseries);

router.post('/groupappointment', adminController.createGroupappointment);
router.get('/groupappointment', adminController.getGroupappointments);
router.get('/groupappointment/:id', adminController.getGroupappointmentById);
router.put('/groupappointment/:id', adminController.updateGroupappointment);
router.delete('/groupappointment/:id', adminController.deleteGroupappointment);

router.post('/project', adminController.createProject);
router.get('/project', adminController.getProjects);
router.get('/project/:id', adminController.getProjectById);
router.put('/project/:id', adminController.updateProject);
router.delete('/project/:id', adminController.deleteProject);

router.post('/bankaccount', adminController.createBankaccount);
router.get('/bankaccount', adminController.getBankaccounts);
router.get('/bankaccount/:id', adminController.getBankaccountById);
router.put('/bankaccount/:id', adminController.updateBankaccount);
router.delete('/bankaccount/:id', adminController.deleteBankaccount);

router.post('/cardswipingmachine', adminController.createCardswipingmachine);
router.get('/cardswipingmachine', adminController.getCardswipingmachines);
router.get('/cardswipingmachine/:id', adminController.getCardswipingmachineById);
router.put('/cardswipingmachine/:id', adminController.updateCardswipingmachine);
router.delete('/cardswipingmachine/:id', adminController.deleteCardswipingmachine);

router.post('/cash', adminController.createCash);
router.get('/cash', adminController.getCashs);
router.get('/cash/:id', adminController.getCashById);
router.put('/cash/:id', adminController.updateCash);
router.delete('/cash/:id', adminController.deleteCash);

router.post('/creditcard', adminController.createCreditcard);
router.get('/creditcard', adminController.getCreditcards);
router.get('/creditcard/:id', adminController.getCreditcardById);
router.put('/creditcard/:id', adminController.updateCreditcard);
router.delete('/creditcard/:id', adminController.deleteCreditcard);

router.post('/wallet', adminController.createWallet);
router.get('/wallet', adminController.getWallets);
router.get('/wallet/:id', adminController.getWalletById);
router.put('/wallet/:id', adminController.updateWallet);
router.delete('/wallet/:id', adminController.deleteWallet);

router.post('/other', adminController.createOtherpayment);
router.get('/other', adminController.getOtherpayments);
router.get('/other/:id', adminController.getOtherpaymentById);
router.put('/other/:id', adminController.updateOtherpayment);
router.delete('/other/:id', adminController.deleteOtherpayment);

router.post('/branding', adminController.createBranding);
router.get('/branding', adminController.getBrandings);
router.get('/branding/:id', adminController.getBrandingById);
router.put('/branding/:id', adminController.updateBranding);
router.delete('/branding/:id', adminController.deleteBranding);

router.post('/socialmedia', adminController.createSocialmedia);
router.get('/socialmedia', adminController.getSocialmedias);
router.get('/socialmedia/:id', adminController.getSocialmediaById);
router.put('/socialmedia/:id', adminController.updateSocialmedia);
router.delete('/socialmedia/:id', adminController.deleteSocialmedia);

router.post('/ratecard', adminController.createRatecard);
router.get('/ratecard', adminController.getRatecards);
router.get('/ratecard/:id', adminController.getRatecardById);
router.put('/ratecard/:id', adminController.updateRatecard);
router.delete('/ratecard/:id', adminController.deleteRatecard);

router.post('/package', adminController.createPackage);
router.get('/package', adminController.getPackage);
router.get('/package/:id', adminController.getPackageById);
router.put('/package/:id', adminController.updatePackage);
router.delete('/package/:id', adminController.deletePackage);

router.post('/specialistfees', adminController.createSpecialistfees);
router.get('/specialistfees', adminController.getSpecialistfees);
router.get('/specialistfees/:id', adminController.getSpecialistfeesById);
router.put('/specialistfees/:id', adminController.updateSpecialistfees);
router.delete('/specialistfees/:id', adminController.deleteSpecialistfees);

router.post('/clinicalnotes', adminController.createClinicalnotes);
router.get('/clinicalnotes', adminController.getClinicalnotes);
router.get('/clinicalnotes/:id', adminController.getClinicalnotesById);
router.put('/clinicalnotes/:id', adminController.updateClinicalnotes);
router.delete('/clinicalnotes/:id', adminController.deleteClinicalnotes);

router.post('/treatement', adminController.createTreatementcategory);
router.get('/treatement', adminController.getTreatementcategory);
router.get('/treatement/:id', adminController.getTreatementcategoryById);
router.put('/treatement/:id', adminController.updateTreatementcategory);
router.delete('/treatement/:id', adminController.deleteTreatementcategory);

router.post('/sitting', adminController.createSittingnote);
router.get('/sitting', adminController.getSittingnote);
router.get('/sitting/:id', adminController.getSittingnoteById);
router.put('/sitting/:id', adminController.updateSittingnote);
router.delete('/sitting/:id', adminController.deleteSittingnote);

router.post('/insurance', adminController.createInsurance);
router.get('/insurance', adminController.getInsurance);
router.get('/insurance/:id', adminController.getInsuranceById);
router.put('/insurance/:id', adminController.updateInsurance);
router.delete('/insurance/:id', adminController.deleteInsurance);

router.post('/prescription', adminController.createPrescription);
router.get('/prescription', adminController.getPrescription);
router.get('/prescription/:id', adminController.getPrescriptionById);
router.put('/prescription/:id', adminController.updatePrescription);
router.delete('/prescription/:id', adminController.deletePrescription);

router.post('/orthogoal', adminController.createOrthogoal);
router.get('/orthogoal', adminController.getOrthogoals);
router.get('/orthogoal/:id', adminController.getOrthogoalById);
router.put('/orthogoal/:id', adminController.updateOrthogoal);
router.delete('/orthogoal/:id', adminController.deleteOrthogoal);

router.post('/ortholimitation', adminController.createOrtholimitation);
router.get('/ortholimitation', adminController.getOrtholimitations);
router.get('/ortholimitation/:id', adminController.getOrtholimitationById);
router.put('/ortholimitation/:id', adminController.updateOrtholimitation);
router.delete('/ortholimitation/:id', adminController.deleteOrtholimitation);

router.post('/medicalcondition', adminController.createMedicalcondition);
router.get('/medicalcondition', adminController.getMedicalconditions);
router.get('/medicalcondition/:id', adminController.getMedicalconditionById);
router.put('/medicalcondition/:id', adminController.updateMedicalcondition);
router.delete('/medicalcondition/:id', adminController.deleteMedicalcondition);

router.post('/dentalcondition', adminController.createDentalcondition);
router.get('/dentalcondition', adminController.getDentalconditions);
router.get('/dentalcondition/:id', adminController.getDentalconditionById);
router.put('/dentalcondition/:id', adminController.updateDentalcondition);
router.delete('/dentalcondition/:id', adminController.deleteDentalcondition);

router.post('/patientgroup', adminController.createPatientgroup);
router.get('/patientgroup', adminController.getPatientgroups);
router.get('/patientgroup/:id', adminController.getPatientgroupById);
router.put('/patientgroup/:id', adminController.updatePatientgroup);
router.delete('/patientgroup/:id', adminController.deletePatientgroup);

router.post('/source', adminController.createSource);
router.get('/source', adminController.getSources);
router.get('/source/:id', adminController.getSourceById);
router.put('/source/:id', adminController.updateSource);
router.delete('/source/:id', adminController.deleteSource);

router.post('/refferal', adminController.createRefferal);
router.get('/refferal', adminController.getRefferals);
router.get('/refferal/:id', adminController.getRefferalById);
router.put('/refferal/:id', adminController.updateRefferal);
router.delete('/refferal/:id', adminController.deleteRefferal);

router.post('/generalpractitioner', adminController.createGeneralpractitioner);
router.get('/generalpractitioner', adminController.getGeneralpractitioners);
router.get('/generalpractitioner/:id', adminController.getGeneralpractitionerById);
router.put('/generalpractitioner/:id', adminController.updateGeneralpractitioner);
router.delete('/generalpractitioner/:id', adminController.deleteGeneralpractitioner);

router.post('/emaildomain', adminController.createEmaildomain);
router.get('/emaildomain', adminController.getEmaildomains);
router.get('/emaildomain/:id', adminController.getEmaildomainById);
router.put('/emaildomain/:id', adminController.updateEmaildomain);
router.delete('/emaildomain/:id', adminController.deleteEmaildomain);

router.post('/smstemplate', adminController.createSMStemplate);
router.get('/smstemplate', adminController.getSMStemplates);
router.get('/smstemplate/:id', adminController.getSMStemplateById);
router.put('/smstemplate/:id', adminController.updateSMStemplate);
router.delete('/smstemplate/:id', adminController.deleteSMStemplate);

router.post('/watemplate', upload.single('Profile'), adminController.createWATemplate);
router.get('/watemplate', adminController.getWATemplates);
router.get('/watemplate/:id', adminController.getWATemplateById);
router.put('/watemplate/:id', upload.single('Profile'), adminController.updateWATemplate);
router.delete('/watemplate/:id', adminController.deleteWATemplate);


router.post('/emailtemplate', adminController.createEmailtemplate);
router.get('/emailtemplate', adminController.getEmailtemplates);
router.get('/emailtemplate/:id', adminController.getEmailtemplateById);
router.put('/emailtemplate/:id', adminController.updateEmailtemplate);
router.delete('/emailtemplate/:id', adminController.deleteEmailtemplate);

router.post('/lettertemplate', adminController.createLettertemplate);
router.get('/lettertemplate', adminController.getLettertemplates);
router.get('/lettertemplate/:id', adminController.getLettertemplateById);
router.put('/lettertemplate/:id', adminController.updateLettertemplate);
router.delete('/lettertemplate/:id', adminController.deleteLettertemplate);

router.post('/singletask', adminController.createSingletask);
router.get('/singletask', adminController.getSingletasks);
router.get('/singletask/:id', adminController.getSingletaskById);
router.put('/singletask/:id', adminController.updateSingletask);
router.delete('/singletask/:id', adminController.deleteSingletask);

router.post('/recurringtask', adminController.createRecurringtask);
router.get('/recurringtask', adminController.getRecurringtasks);
router.get('/recurringtask/:id', adminController.getRecurringtaskById);
router.put('/recurringtask/:id', adminController.updateRecurringtask);
router.delete('/recurringtask/:id', adminController.deleteRecurringtask);

router.post('/showoncalender', adminController.createShowoncalender);
router.get('/showoncalender', adminController.getShowoncalenders);
router.get('/showoncalender/:id', adminController.getShowoncalenderById);
router.put('/showoncalender/:id', adminController.updateShowoncalender);
router.delete('/showoncalender/:id', adminController.deleteShowoncalender);

router.post('/treatmentnote', adminController.createTreatmentnote);
router.get('/treatmentnote', adminController.getTreatmentnotes);
router.put('/treatmentnote/:id', adminController.updateTreatmentnote);
router.delete('/treatmentnote/:id', adminController.deleteTreatmentnote);

router.post('/filenote', adminController.createFilenote);
router.get('/filenote', adminController.getFilenotes);
router.put('/filenote/:id', adminController.updateFilenote);
router.delete('/filenote/:id', adminController.deleteFilenote);

router.get('/centerfilter', adminController.getCenterByFilter);

router.get('/doctorfilter', adminController.getDoctorByFilter);

router.get('/stafffilter', adminController.getStaffByFilter);

router.get('/operatoryfilter', adminController.getOperatoryByFilter);

router.get('/appointmentseriesfilter', adminController.getAppointmentseriesByFilter);

router.get('/bankaccountfilter', adminController.getBankaccountByFilter);

router.get('/cardswipingmachinefilter', adminController.getCardswipingmachineByFilter);

router.get('/cashfilter', adminController.getCashByFilter);

router.get('/creditcardfilter', adminController.getCreditcardByFilter);

router.get('/walletfilter', adminController.getWalletByFilter);

router.get('/otherpaymentfilter', adminController.getOtherpaymentByFilter);

router.get('/ratecardfilter', adminController.getRatecardByFilter);

router.get('/packagefilter', adminController.getPackageByFilter);

router.get('/specialistfeefilter', adminController.getSpecialistfeesByFilter);

router.get('/clinicalnotesfilter', adminController.getClinicalnotesByFilter);

router.get('/treatmentcategoryfilter', adminController.getTreatementcategoryByFilter);

router.get('/treatmentfilter', adminController.getTreatementByFilter);

router.get('/drugfilter', adminController.getDrugByFilter);

router.get('/instructionfilter', adminController.getInstructionByFilter);

router.get('/insurancefilter', adminController.getInsuranceByFilter);

router.get('/orthogoalfilter', adminController.getOrthogoalByFilter);

router.get('/ortholimitationfilter', adminController.getOrtholimitationByFilter);

router.get('/patientgroupfilter', adminController.getPatientgroupByFilter);

router.get('/sourcefilter', adminController.getSourceByFilter);

router.get('/sourcetypefilter', adminController.getSourcetypeByFilter);

router.get('/refferalfilter', adminController.getRefferalByFilter);

router.get('/generalpractitionerfilter', adminController.getGeneralpractitionerByFilter);

router.get('/vendorfilter', adminController.getVendorByFilter);

router.get('/inventorycategoryfilter', adminController.getInventoryCategoryByFilter);

router.get('/inventoryitemfilter', adminController.getInventoryitemByFilter);

router.get('/accountfilter', adminController.getAccountByFilter);



router.post('/time', adminController.selecttime); 
router.post('/user', adminController.userdetail);
router.post('/payment', adminController.createPayment);
router.put('/payment', adminController.verifyPayment);
router.post('/:paymentid', adminController.resendnotification);
router.post('/payment/blocking', adminController.blockingtime);
router.get('/test', checkBlockingWindow, (req, res) => {
    res.status(200).json({ message: 'Access granted' });
  });


export default router;
