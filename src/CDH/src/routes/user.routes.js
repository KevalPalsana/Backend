import express from "express";
import userController from "../controllers/user.controller.js";
import checkBlockingWindow from "../middleware/blockingtime.js";
const router = express.Router();

router.post('/register',  userController.registeruser);
router.post('/login',userController.loginuser);
router.get('/', userController.getuser);
router.get('/user/:id', userController.getuserbyid);
router.put('/:id', userController.updateuser);
router.delete('/:id', userController.deleteuser);

router.post('/counter',  userController.createCounter);

router.post('/clinic',  userController.createClinic);
router.get('/clinic', userController.getClinics);
router.get('/clinicsearchname', userController.searchnameClinics);
router.get('/clinicsearchdate', userController.searchdateClinics);
router.get('/clinic/:id', userController.getClinicById);
router.put('/clinic/:id',  userController.updateClinic);
router.delete('/clinic/:id',  userController.deleteClinic);
router.get('/clinicstatus', userController.getClinicstatus);
router.get('/clinicexcel', userController.generateExcelClinic);
router.get('/clinicpdf', userController.generatePdfClinic);
 

router.post('/center', userController.createCenter);
router.get('/center', userController.getCenters);
router.get('/centersearchname', userController.searchnameCenters);
router.get('/centersearchdate', userController.searchdateCenters);
router.get('/center/:id', userController.getCenterById);
router.put('/center/:id', userController.updateCenter);
router.delete('/center/:id', userController.deleteCenter);
router.get('/centerstatus', userController.getCenterstatus);
router.get('/centerexcel', userController.generateExcelCenter);
router.get('/centerpdf', userController.generatePdfCenter);

router.post('/doctor',  userController.createDoctor);
router.get('/doctor', userController.getDoctors);
router.get('/doctorsearchname', userController.searchnameDoctors);
router.get('/doctorsearchdate', userController.searchdateDoctors);
router.get('/doctor/:id', userController.getDoctorById);
router.put('/doctor/:id',  userController.updateDoctor);
router.delete('/doctor/:id',  userController.deleteDoctor);
router.get('/doctorstatus', userController.getDoctorstatus);
router.get('/doctorexcel', userController.generateExcelDoctor);
router.get('/doctorpdf', userController.generatePdfDoctor);

router.post('/staff',  userController.createStaff);
router.get('/staff',  userController.getStaffs);
router.get('/staffsearchname', userController.searchnameStaffs);
router.get('/staffsearchdate', userController.searchdateStaffs);
router.get('/staff/:id',  userController.getStaffById);
router.put('/staff/:id',  userController.updateStaff);
router.delete('/staff/:id',  userController.deleteStaff);
router.get('/staffstatus', userController.getStaffstatus);
router.get('/staffexcel', userController.generateExcelStaff);
router.get('/staffpdf', userController.generatePdfStaff);

router.post('/holiday',  userController.createHoliday);
router.get('/holiday', userController.getHolidays);
router.get('/holidaysearchname', userController.searchnameHolidays);
router.get('/holidaysearchdate', userController.searchdateHolidays);
router.get('/holiday/:id', userController.getHolidayById);
router.put('/holiday/:id',  userController.updateHoliday);
router.delete('/holiday/:id',  userController.deleteHoliday);
router.get('/holidaystatus', userController.getHolidaystatus);
router.get('/holidayexcel', userController.generateExcelHoliday);
router.get('/holidaypdf', userController.generatePdfHoliday);

router.post('/operatory',  userController.createOperatory);
router.get('/operatory', userController.getOperatorys);
router.get('/operatorysearchname', userController.searchnameOperatorys);
router.get('/operatorysearchdate', userController.searchdateOperatorys);
router.get('/operatory/:id', userController.getOperatoryById);
router.put('/operatory/:id',  userController.updateOperatory);
router.delete('/operatory/:id',  userController.deleteOperatory);

router.post('/gallery',  userController.createGallery);
router.get('/gallery', userController.getGallerys);
router.get('/gallerysearchname', userController.searchnameGallerys);
router.get('/gallerysearchdate', userController.searchdateGallerys);
router.get('/gallery/:id', userController.getGalleryById);
router.put('/gallery/:id',  userController.updateGallery);
router.delete('/gallery/:id',  userController.deleteGallery);

router.post('/appointment',  userController.createAppointmentseries);
router.get('/appointment', userController.getAppointmentseries);
router.get('/appointmentsearchname', userController.searchnameAppointmentseries);
router.get('/appointmentsearchdate', userController.searchdateAppointmentseries);
router.get('/appointment/:id', userController.getAppointmentseriesById);
router.put('/appointment/:id',  userController.updateAppointmentseries);
router.delete('/appointment/:id',  userController.deleteAppointmentseries);
router.get('/appointmentstatus', userController.getAppointmentseriesstatus);
router.get('/appointmentexcel', userController.generateExcelAppointmentseries);
router.get('/appointmentpdf', userController.generatePdfAppointmentseries);

router.post('/project',  userController.createProject);
router.get('/project', userController.getProjects);
router.get('/projectsearchname', userController.searchnameProjects);
router.get('/projectsearchdate', userController.searchdateProjects);
router.get('/project/:id', userController.getProjectById);
router.put('/project/:id',  userController.updateProject);
router.delete('/project/:id',  userController.deleteProject);

router.post('/bankaccount',  userController.createBankaccount);
router.get('/bankaccount',  userController.getBankaccounts);
router.get('/bankaccountsearchname', userController.searchnameBankaccounts);
router.get('/bankaccountsearchdate', userController.searchdateBankaccounts);
router.get('/bankaccount/:id', userController.getBankaccountById);
router.put('/bankaccount/:id', userController.updateBankaccount);
router.delete('/bankaccount/:id',userController.deleteBankaccount);
router.get('/bankaccountstatus', userController.getBankaccountstatus);
router.get('/bankaccountexcel', userController.generateExcelBankaccount);
router.get('/bankaccountpdf', userController.generatePdfBankaccount);

router.post('/cardswipingmachine',  userController.createCardswipingmachine);
router.get('/cardswipingmachine', userController.getCardswipingmachines);
router.get('/cardswipingmachinesearchname', userController.searchnameCardswipingmachines);
router.get('/cardswipingmachinesearchdate', userController.searchdateCardswipingmachines);
router.get('/cardswipingmachine/:id', userController.getCardswipingmachineById);
router.put('/cardswipingmachine/:id', userController.updateCardswipingmachine);
router.delete('/cardswipingmachine/:id', userController.deleteCardswipingmachine);
router.get('/cardswipingmachinestatus', userController.getCardswipingmachinestatus);
router.get('/cardswipingmachineexcel', userController.generateExcelCardswipingmachine);
router.get('/cardswipingmachinepdf', userController.generatePdfCardswipingmachine);

router.post('/cash',  userController.createCash);
router.get('/cash', userController.getCashs);
router.get('/cashsearchname', userController.searchnameCashs);
router.get('/cashsearchdate', userController.searchdateCashs);
router.get('/cash/:id',userController.getCashById);
router.put('/cash/:id', userController.updateCash);
router.delete('/cash/:id', userController.deleteCash);
router.get('/cashstatus', userController.getCashstatus);
router.get('/cashexcel', userController.generateExcelCash);
router.get('/cashpdf', userController.generatePdfCash);

router.post('/creditcard', userController.createCreditcard);
router.get('/creditcard', userController.getCreditcards);
router.get('/creditcardsearchname', userController.searchnameCreditcards);
router.get('/creditcardsearchdate', userController.searchdateCreditcards);
router.get('/creditcard/:id',userController.getCreditcardById);
router.put('/creditcard/:id',userController.updateCreditcard);
router.delete('/creditcard/:id',userController.deleteCreditcard);
router.get('/creditcardstatus', userController.getCreditcardstatus);
router.get('/creditcardexcel', userController.generateExcelCreditcard);
router.get('/creditcardpdf', userController.generatePdfCreditcard);

router.post('/wallet',userController.createWallet);
router.get('/wallet', userController.getWallets);
router.get('/walletsearchname', userController.searchnameWallets);
router.get('/walletsearchdate', userController.searchdateWallets);
router.get('/wallet/:id', userController.getWalletById);
router.put('/wallet/:id', userController.updateWallet);
router.delete('/wallet/:id', userController.deleteWallet);
router.get('/walletstatus', userController.getWalletstatus);
router.get('/walletexcel', userController.generateExcelWallet);
router.get('/walletpdf', userController.generatePdfWallet);

router.post('/other',  userController.createOtherpayment);
router.get('/other', userController.getOtherpayments);
router.get('/othersearchname', userController.searchnameOtherpayments);
router.get('/othersearchdate', userController.searchdateOtherpayments);
router.get('/other/:id', userController.getOtherpaymentById);
router.put('/other/:id', userController.updateOtherpayment);
router.delete('/other/:id',  userController.deleteOtherpayment);
router.get('/otherstatus', userController.getOtherpaymentstatus);
router.get('/otherexcel', userController.generateExcelOtherpayment);
router.get('/otherpdf', userController.generatePdfOtherpayment);

router.post('/branding', userController.createBranding);
router.get('/branding', userController.getBrandings);
router.get('/brandingsearchname', userController.searchnameBrandings);
router.get('/brandingsearchdate', userController.searchdateBrandings);
router.get('/branding/:id', userController.getBrandingById);
router.put('/branding/:id', userController.updateBranding);
router.delete('/branding/:id',  userController.deleteBranding);

router.post('/socialmedia', userController.createSocialmedia);
router.get('/socialmedia', userController.getSocialmedias);
router.get('/socialmediasearchname', userController.searchnameSocialmedias);
router.get('/socialmediasearchdate', userController.searchdateSocialmedia);
router.get('/socialmedia/:id', userController.getSocialmediaById);
router.put('/socialmedia/:id',  userController.updateSocialmedia);
router.delete('/socialmedia/:id', userController.deleteSocialmedia);

router.post('/ratecard', userController.createRatecard);
router.get('/ratecard', userController.getRatecards);
router.get('/ratecardsearchname', userController.searchnameRatecards);
router.get('/ratecardsearchdate', userController.searchdateRatecards);
router.get('/ratecard/:id', userController.getRatecardById);
router.put('/ratecard/:id', userController.updateRatecard);
router.delete('/ratecard/:id',userController.deleteRatecard);
router.get('/ratecardstatus', userController.getRatecardstatus);
router.get('/ratecardexcel', userController.generateExcelRatecard);
router.get('/ratecardpdf', userController.generatePdfRatecard);

router.post('/package', userController.createPackage);
router.get('/package', userController.getPackage);
router.get('/packagesearchname', userController.searchnamePackages);
router.get('/packagesearchdate', userController.searchdatePackages);
router.get('/package/:id', userController.getPackageById);
router.put('/package/:id', userController.updatePackage);
router.delete('/package/:id', userController.deletePackage);
router.get('/packagestatus', userController.getPackagestatus);
router.get('/packageexcel', userController.generateExcelPackage);
router.get('/packagepdf', userController.generatePdfPackage);

router.post('/specialistfees', userController.createSpecialistfees);
router.get('/specialistfees', userController.getSpecialistfees);
router.get('/specialistfeessearchname', userController.searchnameSpecialistfees);
router.get('/specialistfeessearchdate', userController.searchdateSpecialistfees);
router.get('/specialistfees/:id', userController.getSpecialistfeesById);
router.put('/specialistfees/:id', userController.updateSpecialistfees);
router.delete('/specialistfees/:id', userController.deleteSpecialistfees);

router.post('/clinicalnotes', userController.createClinicalnotes);
router.get('/clinicalnotes', userController.getClinicalnotes);
router.get('/clinicalnotessearchname', userController.searchnameClinicalnotes);
router.get('/clinicalnotessearchdate', userController.searchdateClinicalnotes);
router.get('/clinicalnotes/:id', userController.getClinicalnotesById);
router.put('/clinicalnotes/:id', userController.updateClinicalnotes);
router.delete('/clinicalnotes/:id', userController.deleteClinicalnotes);
router.get('/clinicalnotesstatus', userController.getClinicalnotesstatus);
router.get('/clinicalnotesexcel', userController.generateExcelClinicalnotes);
router.get('/clinicalnotespdf', userController.generatePdfClinicalnotes);

router.post('/treatmentcategory',  userController.createTreatmentcategory);
router.get('/treatmentcategory', userController.getTreatmentcategory);
router.get('/treatmentcategorysearchname', userController.searchnameTreatmentcategorys);
router.get('/treatmentcategorysearchdate', userController.searchdateTreatmentcategorys);
router.get('/treatmentcategorybymonth', userController.getTreatmentcategoryBymonth);
router.get('/treatmentcategory/:id', userController.getTreatmentcategoryById);
router.put('/treatmentcategory/:id',  userController.updateTreatmentcategory);
router.delete('/treatmentcategory/:id',  userController.deleteTreatmentcategory);
router.get('/treatmentcategorystatus', userController.getTreatmentcategorystatus);
router.get('/treatmentcategoryexcel', userController.generateExcelTreatmentcategory);
router.get('/treatmentcategorypdf', userController.generatePdfTreatmentcategory);

router.post('/treatment',  userController.createTreatment);
router.get('/treatment', userController.getTreatment);
router.get('/treatmentsearchname', userController.searchnameTreatments);
router.get('/treatmentsearchdate', userController.searchdateTreatments);
router.get('/treatmentbymonth', userController.getTreatmentBymonth);
router.get('/treatment/:id', userController.getTreatmentById);
router.put('/treatment/:id',  userController.updateTreatment);
router.delete('/treatment/:id',  userController.deleteTreatment);
router.get('/treatmentstatus', userController.getTreatmentstatus);
router.get('/treatmentexcel', userController.generateExcelTreatment);
router.get('/treatmentpdf', userController.generatePdfTreatment);

router.post('/sitting', userController.createSittingnote);
router.get('/sitting', userController.getSittingnote);
router.get('/sittingsearchname', userController.searchnameSittingnotes);
router.get('/sittingsearchdate', userController.searchdateSittingnotes);
router.get('/sitting/:id', userController.getSittingnoteById);
router.put('/sitting/:id', userController.updateSittingnote);
router.delete('/sitting/:id', userController.deleteSittingnote);
router.get('/sittingstatus', userController.getSittingnotestatus);
router.get('/sittingexcel', userController.generateExcelSittingnote);
router.get('/sittingpdf', userController.generatePdfSittingnote);

router.post('/drug', userController.createDrug);
router.get('/drug', userController.getDrug);
router.get('/drugsearchname', userController.searchnameDrugs);
router.get('/drugsearchdate', userController.searchdateDrugs);
router.get('/drug/:id', userController.getDrugById);
router.put('/drug/:id', userController.updateDrug);
router.delete('/drug/:id', userController.deleteDrug);
router.get('/drugstatus', userController.getDrugstatus);
router.get('/drugexcel', userController.generateExcelDrug);
router.get('/drugpdf', userController.generatePdfDrug);

router.post('/instruction', userController.createInstruction);
router.get('/instruction', userController.getInstruction);
router.get('/instructionsearchname', userController.searchnameInstructions);
router.get('/instructionsearchdate', userController.searchdateInstructions);
router.get('/instruction/:id', userController.getInstructionById);
router.put('/instruction/:id', userController.updateInstruction);
router.delete('/instruction/:id', userController.deleteInstruction);
router.get('/instructionstatus', userController.getInstructionstatus);
router.get('/instructionexcel', userController.generateExcelInstruction);
router.get('/instructionpdf', userController.generatePdfInstruction);

router.post('/insurance',  userController.createInsurance);
router.get('/insurance', userController.getInsurance);
router.get('/insurancesearchname', userController.searchnameInsurances);
router.get('/insurancesearchdate', userController.searchdateInsurances);
router.get('/insurance/:id', userController.getInsuranceById);
router.put('/insurance/:id',  userController.updateInsurance);
router.delete('/insurance/:id',  userController.deleteInsurance);
router.get('/insurancestatus', userController.getInsurancestatus);
router.get('/insuranceexcel', userController.generateExcelInsurance);
router.get('/insurancepdf', userController.generatePdfInsurance);

router.post('/prescription', userController.createPrescription);
router.get('/prescription', userController.getPrescription);
router.get('/prescriptionsearchname', userController.searchnamePrescriptions);
router.get('/prescriptionsearchdate', userController.searchdatePrescriptions);
router.get('/prescription/:id', userController.getPrescriptionById);
router.put('/prescription/:id', userController.updatePrescription);
router.delete('/prescription/:id', userController.deletePrescription);
router.get('/prescriptionstatus', userController.getPrescriptionstatus);
router.get('/prescriptionexcel', userController.generateExcelPrescription);
router.get('/prescriptionpdf', userController.generatePdfPrescription);

router.post('/orthogoal', userController.createOrthogoal);
router.get('/orthogoal', userController.getOrthogoals);
router.get('/orthogoalsearchname', userController.searchnameOrthogoals);
router.get('/orthogoalsearchdate', userController.searchdateOrthogoals);
router.get('/orthogoal/:id', userController.getOrthogoalById);
router.put('/orthogoal/:id', userController.updateOrthogoal);
router.delete('/orthogoal/:id', userController.deleteOrthogoal);
router.get('/orthogoalstatus', userController.getOrthogoalstatus);
router.get('/orthogoalexcel', userController.generateExcelOrthogoal);
router.get('/orthogoalpdf', userController.generatePdfOrthogoal);

router.post('/ortholimitation', userController.createOrtholimitation);
router.get('/ortholimitation', userController.getOrtholimitations);
router.get('/ortholimitationsearchname', userController.searchnameOrtholimitations);
router.get('/ortholimitationsearchdate', userController.searchdateOrtholimitations);
router.get('/ortholimitation/:id', userController.getOrtholimitationById);
router.put('/ortholimitation/:id', userController.updateOrtholimitation);
router.delete('/ortholimitation/:id', userController.deleteOrtholimitation);
router.get('/ortholimitationstatus', userController.getOrtholimitationstatus);
router.get('/ortholimitationexcel', userController.generateExcelOrtholimitation);
router.get('/ortholimitationpdf', userController.generatePdfOrtholimitation);

router.post('/medicalcondition',  userController.createMedicalcondition);
router.get('/medicalcondition', userController.getMedicalconditions);
router.get('/medicalconditionsearchname', userController.searchnameMedicalconditions);
router.get('/medicalconditionsearchdate', userController.searchdateMedicalconditions);
router.get('/medicalcondition/:id', userController.getMedicalconditionById);
router.put('/medicalcondition/:id',  userController.updateMedicalcondition);
router.delete('/medicalcondition/:id',  userController.deleteMedicalcondition);

router.post('/dentalcondition',  userController.createDentalcondition);
router.get('/dentalcondition', userController.getDentalconditions);
router.get('/dentalconditionsearchname', userController.searchnameDentalconditions);
router.get('/dentalconditionsearchdate', userController.searchdateDentalconditions);
router.get('/dentalcondition/:id', userController.getDentalconditionById);
router.put('/dentalcondition/:id',  userController.updateDentalcondition);
router.delete('/dentalcondition/:id',  userController.deleteDentalcondition);

router.post('/patientgroup',  userController.createPatientgroup);
router.get('/patientgroup', userController.getPatientgroups);
router.get('/patientgroupsearchname', userController.searchnamePatientgroups);
router.get('/patientgroupsearchdate', userController.searchdatePatientgroups);
router.get('/patientgroup/:id', userController.getPatientgroupById);
router.put('/patientgroup/:id',  userController.updatePatientgroup);
router.delete('/patientgroup/:id',  userController.deletePatientgroup);
router.get('/patientgroupstatus', userController.getPatientgroupstatus);
router.get('/patientgroupexcel', userController.generateExcelPatientgroup);
router.get('/patientgrouppdf', userController.generatePdfPatientgroup);

router.post('/source',  userController.createSource);
router.get('/source', userController.getSources);
router.get('/sourcesearchname', userController.searchnameSources);
router.get('/sourcesearchdate', userController.searchdateSources);
router.get('/sourcebymonth', userController.getSourceBymonth);
router.get('/source/:id', userController.getSourceById);
router.put('/source/:id',  userController.updateSource);
router.delete('/source/:id',  userController.deleteSource);
router.get('/sourcestatus', userController.getSourcestatus);
router.get('/sourceexcel', userController.generateExcelSource);
router.get('/sourcepdf', userController.generatePdfSource);

router.post('/sourcetype',  userController.createSourcetype);
router.get('/sourcetype', userController.getSourcetypes);
router.get('/sourcetypesearchname', userController.searchnameSourcetypes);
router.get('/sourcetypesearchdate', userController.searchdateSourcetypes);
router.get('/sourcetypebymonth', userController.getSourcetypeBymonth);
router.get('/sourcetype/:id', userController.getSourcetypeById);
router.put('/sourcetype/:id',  userController.updateSourcetype);
router.delete('/sourcetype/:id',  userController.deleteSourcetype);
router.get('/sourcetypestatus', userController.getSourcetypestatus);
router.get('/sourcetypeexcel', userController.generateExcelSourcetype);
router.get('/sourcetypepdf', userController.generatePdfSourcetype);

router.post('/refferal',  userController.createRefferal);
router.get('/refferal', userController.getRefferals);
router.get('/refferalsearchname', userController.searchnameRefferals);
router.get('/refferalsearchdate', userController.searchdateRefferals);
router.get('/refferal/:id', userController.getRefferalById);
router.put('/refferal/:id',  userController.updateRefferal);
router.delete('/refferal/:id',  userController.deleteRefferal);
router.get('/refferalstatus', userController.getRefferalstatus);
router.get('/refferalexcel', userController.generateExcelRefferal);
router.get('/refferalpdf', userController.generatePdfRefferal);

router.post('/generalpractitioner',  userController.createGeneralpractitioner);
router.get('/generalpractitioner', userController.getGeneralpractitioners);
router.get('/generalpractitionersearchname', userController.searchnameGeneralpractitioners);
router.get('/generalpractitionersearchdate', userController.searchdateGeneralpractitioners);
router.get('/generalpractitioner/:id', userController.getGeneralpractitionerById);
router.put('/generalpractitioner/:id',  userController.updateGeneralpractitioner);
router.delete('/generalpractitioner/:id',  userController.deleteGeneralpractitioner);
router.get('/generalpractitionerstatus', userController.getGeneralpractitionerstatus);
router.get('/generalpractitionerexcel', userController.generateExcelGeneralpractitioner);
router.get('/generalpractitionerpdf', userController.generatePdfGeneralpractitioner);

router.post('/emaildomain',  userController.createEmaildomain);
router.get('/emaildomain', userController.getEmaildomains);
router.get('/emaildomainsearchname', userController.searchnameEmaildomains);
router.get('/emaildomainsearchdate', userController.searchdateEmaildomains);
router.get('/emaildomain/:id', userController.getEmaildomainById);
router.put('/emaildomain/:id',  userController.updateEmaildomain);
router.delete('/emaildomain/:id',  userController.deleteEmaildomain);

router.post('/smstemplate',  userController.createSMStemplate);
router.get('/smstemplate', userController.getSMStemplates);
router.get('/smstemplatesearchname', userController.searchnameSMStemplates);
router.get('/smstemplatesearchdate', userController.searchdateSMStemplates);
router.get('/smstemplate/:id', userController.getSMStemplateById);
router.put('/smstemplate/:id',  userController.updateSMStemplate);
router.delete('/smstemplate/:id',  userController.deleteSMStemplate);
router.get('/smstemplatestatus', userController.getSMStemplatestatus);
router.get('/smstemplateexcel', userController.generateExcelSMStemplate);
router.get('/smstemplatepdf', userController.generatePdfSMStemplate);

router.post('/watemplate',  userController.createWATemplate);
router.get('/watemplate', userController.getWATemplates);
router.get('/watemplatesearchname', userController.searchnameWATemplates);
router.get('/watemplatesearchdate', userController.searchdateWATemplates);
router.get('/watemplate/:id', userController.getWATemplateById);
router.put('/watemplate/:id',  userController.updateWATemplate);
router.delete('/watemplate/:id',  userController.deleteWATemplate);
router.get('/watemplatestatus', userController.getWATemplatestatus);
router.get('/watemplateexcel', userController.generateExcelWATemplate);
router.get('/watemplatepdf', userController.generatePdfWATemplate);

router.post('/emailtemplate',  userController.createEmailtemplate);
router.get('/emailtemplate', userController.getEmailtemplates);
router.get('/emailtemplatesearchname', userController.searchnameEmailtemplates);
router.get('/emailtemplatesearchdate', userController.searchdateEmailtemplates);
router.get('/emailtemplate/:id', userController.getEmailtemplateById);
router.put('/emailtemplate/:id',  userController.updateEmailtemplate);
router.delete('/emailtemplate/:id',  userController.deleteEmailtemplate);
router.get('/emailtemplatestatus', userController.getEmailtemplatestatus);
router.get('/emailtemplateexcel', userController.generateExcelEmailtemplate);
router.get('/emailtemplatepdf', userController.generatePdfEmailtemplate);

router.post('/lettertemplate',  userController.createLettertemplate);
router.get('/lettertemplate', userController.getLettertemplates);
router.get('/lettertemplatesearchname', userController.searchnameLettertemplates);
router.get('/lettertemplatesearchdate', userController.searchdateLettertemplates);
router.get('/lettertemplate/:id', userController.getLettertemplateById);
router.put('/lettertemplate/:id',  userController.updateLettertemplate);
router.delete('/lettertemplate/:id',  userController.deleteLettertemplate);
router.get('/lettertemplatestatus', userController.getLettertemplatestatus);
router.get('/lettertemplateexcel', userController.generateExcelLettertemplate);
router.get('/lettertemplatepdf', userController.generatePdfLettertemplate);

router.post('/vendor',  userController.createVendor);
router.get('/vendor', userController.getVendors);
router.get('/vendorsearchname', userController.searchnameVendors);
router.get('/vendorsearchdate', userController.searchdateVendors);
router.get('/vendor/:id', userController.getVendorById);
router.put('/vendor/:id',  userController.updateVendor);
router.delete('/vendor/:id',  userController.deleteVendor);
router.get('/vendorstatus', userController.getVendorstatus);
router.get('/vendorexcel', userController.generateExcelVendor);
router.get('/vendorpdf', userController.generatePdfVendor);

router.post('/inventorycategory',  userController.createInventorycategory);
router.get('/inventorycategory', userController.getInventorycategorys);
router.get('/inventorycategorysearchname', userController.searchnameInventorycategorys);
router.get('/inventorycategorysearchdate', userController.searchdateInventorycategorys);
router.get('/inventorycategory/:id', userController.getInventorycategoryById);
router.put('/inventorycategory/:id',  userController.updateInventorycategory);
router.delete('/inventorycategory/:id',  userController.deleteInventorycategory);
router.get('/inventorycategorystatus', userController.getInventorycategorystatus);
router.get('/inventorycategoryexcel', userController.generateExcelInventorycategory);
router.get('/inventorycategorypdf', userController.generatePdfInventorycategory);

router.post('/inventoryitem',  userController.createInventoryitem);
router.get('/inventoryitem', userController.getInventoryitems);
router.get('/inventoryitemsearchname', userController.searchnameInventoryitems);
router.get('/inventoryitemsearchdate', userController.searchdateInventoryitems);
router.get('/inventoryitem/:id', userController.getInventoryitemById);
router.put('/inventoryitem/:id',  userController.updateInventoryitem);
router.delete('/inventoryitem/:id',  userController.deleteInventoryitem);
router.get('/inventoryitemstatus', userController.getInventoryitemstatus);
router.get('/inventoryitemexcel', userController.generateExcelInventoryitem);
router.get('/inventoryitempdf', userController.generatePdfInventoryitem);

router.post('/account',  userController.createAccount);
router.get('/account', userController.getAccounts);
router.get('/accountsearchname', userController.searchnameAccounts);
router.get('/accountsearchdate', userController.searchdateAccounts);
router.get('/account/:id', userController.getAccountById);
router.put('/account/:id',  userController.updateAccount);
router.delete('/account/:id',  userController.deleteAccount);
router.get('/accountstatus', userController.getAccountstatus);
router.get('/accountexcel', userController.generateExcelAccount);
router.get('/accountpdf', userController.generatePdfAccount);

router.post('/patient',userController.createPatient);
router.post('/:id/invoice',userController.addInvoiceToPatient);
router.get('/patient', userController.getPatients);
router.get('/patientsearchname', userController.searchnamePatients);
router.get('/patientsearchdate', userController.searchdatePatients);
router.get('/patientbymonth', userController.getPatientBymonth);
router.get('/patient/:id', userController.getPatientById);
router.put('/patient/:id',  userController.updatePatient);
router.post("/patient/:patientId/treatmentdone", userController.addMultipleTreatmentDone);
router.put('/patient/:patientid/treatmentdone/:treatmentid',  userController.updateTreatmentDone);
router.delete('/patient/:patientid/treatmentdone/:treatmentid',  userController.deleteTreatmentDone);
router.delete('/patient/:id',  userController.deletePatient);
router.get('/patienttotalbyratecard', userController.getTotalPatientsByRateCard);
router.get('/patienttotalbysourcetype', userController.getTotalPatientsBySourcetype);
router.get('/patienttotalbysource', userController.getTotalPatientsBySource);
router.get('/patienttotalbygroup', userController.getTotalPatientsByGroup);

router.post('/doctorunavaibility',  userController.createDoctorunavaibility);
router.get('/doctorunavaibility', userController.getDoctorunavaibilitys);
router.get('/doctorunavaibilitysearchname', userController.searchnameDoctorunavaibilitys);
router.get('/doctorunavaibilitysearchdate', userController.searchdateDoctorunavaibilitys);
router.get('/doctorunavaibility/:id', userController.getDoctorunavaibilityById);
router.put('/doctorunavaibility/:id',  userController.updateDoctorunavaibility);
router.delete('/doctorunavaibility/:id',  userController.deleteDoctorunavaibility);

router.post('/creditnote',  userController.createCreditnote);
router.get('/creditnote', userController.getCreditnotes);
router.get('/creditnotesearchname', userController.searchnameCreditnotes);
router.get('/creditnotesearchdate', userController.searchdateCreditnotes);
router.get('/creditnote/:id', userController.getCreditnoteById);
router.put('/creditnote/:id',  userController.updateCreditnote);
router.delete('/creditnote/:id',  userController.deleteCreditnote);

router.post('/paymentreceived',  userController.createPaymentreceived);
router.get('/paymentreceived', userController.getPaymentreceiveds);
router.get('/paymentreceivedsearchname', userController.searchnamePaymentreceiveds);
router.get('/paymentreceivedsearchdate', userController.searchdatePaymentreceiveds);
router.get('/paymentreceived/:id', userController.getPaymentreceivedById);
router.get('/paymentreceivedbypatient/:patient', userController.getPaymentreceivedBypatientid);
router.put('/paymentreceived/:id',  userController.updatePaymentreceived);
router.delete('/paymentreceived/:id',  userController.deletePaymentreceived);


router.post('/paymentreminder',  userController.createPaymentreminder);
router.get('/paymentreminder', userController.getPaymentreminders);
router.get('/paymentreminder/:id', userController.getPaymentreminderById);
router.get('/paymentreminderbypatient/:patient', userController.getPaymentreminderBypatientid);
router.put('/paymentreminder/:id',  userController.updatePaymentreminder);
router.delete('/paymentreminder/:id',  userController.deletePaymentreminder);

router.post('/paymentmade',  userController.createPaymentMade);
router.get('/paymentmade', userController.getPaymentMades);
router.get('/paymentmadesearchname', userController.searchnamePaymentMades);
router.get('/paymentmadesearchdate', userController.searchdatePaymentMades);
router.get('/paymentmade/:id', userController.getPaymentMadeById);
router.put('/paymentmade/:id',  userController.updatePaymentMade);
router.delete('/paymentmade/:id',  userController.deletePaymentMade);

router.post('/cashbanktransaction',  userController.createCashBankTransaction);
router.get('/cashbanktransaction', userController.getCashBankTransactions);
router.get('/cashbanktransactionsearchname', userController.searchnameCashBankTransactions);
router.get('/cashbanktransactionsearchdate', userController.searchdateCashBankTransactions);
router.get('/cashbanktransaction/:id', userController.getCashBankTransactionById);
router.put('/cashbanktransaction/:id',  userController.updateCashBankTransaction);
router.delete('/cashbanktransaction/:id',  userController.deleteCashBankTransaction);

router.post('/journalentry',  userController.createJournalentry);
router.get('/journalentry', userController.getJournalentrys);
router.get('/journalentrysearchname', userController.searchnameJournalentrys);
router.get('/journalentrysearchdate', userController.searchdateJournalentrys);
router.get('/journalentry/:id', userController.getJournalentryById);
router.put('/journalentry/:id',  userController.updateJournalentry);
router.delete('/journalentry/:id',  userController.deleteJournalentry);

router.post('/patientopeaningbalance',  userController.createPatientopeaningbalance);
router.get('/patientopeaningbalance', userController.getPatientopeaningbalances);
router.get('/patientopeaningbalancesearchname', userController.searchnamePatientopeaningbalances);
router.get('/patientopeaningbalancesearchdate', userController.searchdatePatientopeaningbalances);
router.get('/patientopeaningbalance/:id', userController.getPatientopeaningbalanceById);
router.put('/patientopeaningbalance/:id',  userController.updatePatientopeaningbalance);
router.delete('/patientopeaningbalance/:id',  userController.deletePatientopeaningbalance);

router.post('/inventorypurchase',  userController.createInventorypurchase);
router.get('/inventorypurchase', userController.getInventorypurchases);
router.get('/inventorypurchasesearchname', userController.searchnameInventorypurchases);
router.get('/inventorypurchasesearchdate', userController.searchdateInventorypurchases);
router.get('/inventorypurchase/:id', userController.getInventorypurchaseById);
router.put('/inventorypurchase/:id',  userController.updateInventorypurchase);
router.delete('/inventorypurchase/:id',  userController.deleteInventorypurchase);

router.post('/inventoryconsume',  userController.createInventoryconsume);
router.get('/inventoryconsume', userController.getInventoryconsumes);
router.get('/inventoryconsumesearchname', userController.searchnameInventoryconsumes);
router.get('/inventoryconsumesearchdate', userController.searchdateInventoryconsumes);
router.get('/inventoryconsume/:id', userController.getInventoryconsumeById);
router.put('/inventoryconsume/:id',  userController.updateInventoryconsume);
router.delete('/inventoryconsume/:id',  userController.deleteInventoryconsume);

router.post('/inventorytransfer',  userController.createInventorytransfer);
router.get('/inventorytransfer', userController.getInventorytransfers);
router.get('/inventorytransfersearchname', userController.searchnameInventorytransfers);
router.get('/inventorytransfersearchdate', userController.searchdateInventorytransfers);
router.get('/inventorytransfer/:id', userController.getInventorytransferById);
router.put('/inventorytransfer/:id',  userController.updateInventorytransfer);
router.delete('/inventorytransfer/:id',  userController.deleteInventorytransfer);

router.post('/lab',  userController.createLab);
router.get('/lab', userController.getLabs);
router.get('/labsearchname', userController.searchnameLabs);
router.get('/labsearchdate', userController.searchdateLabs);
router.get('/lab/:id', userController.getLabById);
router.put('/lab/:id',  userController.updateLab);
router.delete('/lab/:id',  userController.deleteLab);   

router.post('/labbill',  userController.createLabbill);
router.get('/labbill', userController.getLabbills);
router.get('/labbillsearchname', userController.searchnameLabbills);
router.get('/labbillsearchdate', userController.searchdateLabbills);
router.get('/labbill/:id', userController.getLabbillById);
router.put('/labbill/:id',  userController.updateLabbill);
router.delete('/labbill/:id',  userController.deleteLabbill);  

router.post('/labworkgive',  userController.createLabworkgive);
router.get('/labworkgive', userController.getLabworkgives);
router.get('/labworkgivesearchname', userController.searchnameLabworkgives);
router.get('/labworkgivesearchdate', userController.searchdateLabworkgives);
router.get('/labworkgive/:id', userController.getLabworkgiveById);  
router.put('/labworkgive/:id',  userController.updateLabworkgive);
router.delete('/labworkgive/:id',  userController.deleteLabworkgive);  

router.post('/labworkrecieve',  userController.createLabworkrecieve);
router.get('/labworkrecieve', userController.getLabworkrecieves);
router.get('/labworkrecievesearchname', userController.searchnameLabworkrecieves);
router.get('/labworkrecievesearchdate', userController.searchdateLabworkrecieves);
router.get('/labworkrecieve/:id', userController.getLabworkrecieveById);
router.put('/labworkrecieve/:id',  userController.updateLabworkrecieve);
router.delete('/labworkrecieve/:id',  userController.deleteLabworkrecieve);  

router.post('/smstransfer',  userController.createSmstransfer);
router.get('/smstransfer', userController.getSmstransfers);
router.get('/smstransfersearchname', userController.searchnameSmstransfers);
router.get('/smstransfersearchdate', userController.searchdateSmstransfers);
router.get('/smstransfer/:id', userController.getSmstransferById);
router.put('/smstransfer/:id',  userController.updateSmstransfer);
router.delete('/smstransfer/:id',  userController.deleteSmstransfer);  

router.post('/Personvisit',  userController.createPersonvisit);
router.get('/Personvisit', userController.getPersonvisits);
router.get('/Personvisitsearchname', userController.searchnamePersonvisits);
router.get('/Personvisitsearchdate', userController.searchdatePersonvisits);
router.get('/Personvisit/:id', userController.getPersonvisitById);
router.put('/Personvisit/:id',  userController.updatePersonvisit);
router.delete('/Personvisit/:id', userController.deletePersonvisit);  
router.put('/updateduepayment/:id', userController.updateDuePayment);

router.get('/loggedinnotvisited', userController.getPatientsLoggedInButNotVisitedClinic);
router.get('/visitedlatest', userController.getPatientsWithLatestClinicVisit);
router.get('/visitcompleted', userController.getPatientsWithCompletedClinicVisit);

router.post('/purchaseorder',  userController.createPurchaseorder);
router.get('/purchaseorder', userController.getPurchaseorders);
router.get('/purchaseorder/:id', userController.getPurchaseorderById);
router.put('/purchaseorder/:id',  userController.updatePurchaseorder);
router.delete('/purchaseorder/:id',  userController.deletePurchaseorder);

router.post('/purchaseInvoice',  userController.createPurchaseInvoice);
router.get('/purchaseInvoice', userController.getPurchaseInvoices);
router.get('/purchaseInvoice/:id', userController.getPurchaseInvoiceById);
router.put('/purchaseInvoice/:id',  userController.updatePurchaseInvoice);
router.delete('/purchaseInvoice/:id',  userController.deletePurchaseInvoice);

router.post('/grninward',  userController.createGrninward);
router.get('/grninward', userController.getGrninwards);
router.get('/grninward/:id', userController.getGrninwardById);
router.put('/grninward/:id',  userController.updateGrninward);
router.delete('/grninward/:id',  userController.deleteGrninward);

router.post('/grnoutward',  userController.createGrnoutward);
router.get('/grnoutward', userController.getGrnoutwards);
router.get('/grnoutward/:id', userController.getGrnoutwardById);
router.put('/grnoutward/:id',  userController.updateGrnoutward);
router.delete('/grnoutward/:id',  userController.deleteGrnoutward);

router.post('/branchindent',  userController.createBranchindent);
router.get('/branchindent', userController.getBranchindents);
router.get('/branchindent/:id', userController.getBranchindentById);
router.put('/branchindent/:id',  userController.updateBranchindent);
router.delete('/branchindent/:id',  userController.deleteBranchindent);

router.post('/branchinward',  userController.createBranchinward);
router.get('/branchinward', userController.getBranchinwards);
router.get('/branchinward/:id', userController.getBranchinwardById);
router.put('/branchinward/:id',  userController.updateBranchinward);
router.delete('/branchinward/:id',  userController.deleteBranchinward);

router.post('/branchoutward',  userController.createBranchoutward);
router.get('/branchoutward', userController.getBranchoutwards);
router.get('/branchoutward/:id', userController.getBranchoutwardById);
router.put('/branchoutward/:id',  userController.updateBranchoutward);
router.delete('/branchoutward/:id',  userController.deleteBranchoutward);

router.post('/purchasepayment',  userController.createPurchasepayment);
router.get('/purchasepayment', userController.getPurchasepayments);
router.get('/purchasepayment/:id', userController.getPurchasepaymentById);
router.put('/purchasepayment/:id',  userController.updatePurchasepayment);
router.delete('/purchasepayment/:id',  userController.deletePurchasepayment);

router.post('/purchasereturnbill',  userController.createPurchasereturnbill);
router.get('/purchasereturnbill', userController.getPurchasereturnbills);
router.get('/purchasereturnbill/:id', userController.getPurchasereturnbillById);
router.put('/purchasereturnbill/:id',  userController.updatePurchasereturnbill);
router.delete('/purchasereturnbill/:id',  userController.deletePurchasereturnbill);

router.post('/purchasereturnpayment',  userController.createPurchasereturnpayment);
router.get('/purchasereturnpayment', userController.getPurchasereturnpayments);
router.get('/purchasereturnpayment/:id', userController.getPurchasereturnpaymentById);
router.put('/purchasereturnpayment/:id',  userController.updatePurchasereturnpayment);
router.delete('/purchasereturnpayment/:id',  userController.deletePurchasereturnpayment);

router.post('/openingstock',  userController.createOpeningstock);
router.get('/openingstock', userController.getOpeningstocks);
router.get('/openingstock/:id', userController.getOpeningstockById);
router.put('/openingstock/:id',  userController.updateOpeningstock);
router.delete('/openingstock/:id',  userController.deleteOpeningstock);

router.post('/time', userController.selecttime);
router.post('/user', userController.userdetail);
router.post('/payment', userController.createPayment);
router.put('/payment', userController.verifyPayment);
// router.post('/:paymentid', userController.resendnotification);
router.post('/payment/blocking', userController.blockingtime);
router.get('/test', checkBlockingWindow, (req, res) => {
    res.status(200).json({ message: 'Access granted' });
  });
router.get('/filter', userController.fetchReceiptsWithTotals);

router.get('/practice-filter', userController.getPracticeSummary);

router.get('/doctor-summary', userController.fetchDoctorTreatmentSummary);

router.get("/treatment-category-summary", userController.fetchTreatmentCategorySummary);

router.get("/treatment-summary", userController.fetchTreatmentSummary);

router.get("/ratecard-summary", userController.fetchRateCardSummary);

router.get("/group-summary", userController.fetchGroupSummary);

router.get("/source-summary", userController.fetchSourceSummary);

router.get('/source-type-summary', userController.getSourceTypeSummary);

router.get('/summary', userController.getSourceAndTypeSummary);

router.get('/receipt', userController.getReceiptsByFilter);

router.get('/dailyactivity', userController.getdailyactivityByFilter);

router.get('/dartreports', userController.getDARTreportsByFilter);

router.get('/prospect', userController.getProspectByFilter);

router.get('/patientsummery', userController.getPatientsummeryByFilter);

router.get('/patientlist', userController.getPatientlistByFilter);

router.get('/patientcontact', userController.getPatientcontactByFilter);

router.get('/patientbirthday', userController.getPatientbirthdayByFilter);

router.get('/patientanniversary', userController.getPatientanniversaryByFilter);

router.get('/referral', userController.getReferralsByFilter);

router.get('/patientperiod', userController.getpatientsperiodByFilter);

router.get('/nevervisited', userController.getNevervisitedpatientByFilter);

router.get('/appointmentschedule', userController.getappointmentscheduleByFilter);

router.get('/appointmentbooked', userController.getappointmentbookedByFilter);

router.get('/treatmentdone', userController.getTreatmentdoneByFilter);

router.get('/treatmentplans', userController.getTreatmentplansByFilter);

router.get('/conversion', userController.getConversionByFilter);

router.get('/patienttreatment', userController.getpatienttreatmentByFilter);

router.get('/prescription', userController.getprescriptionByFilter);

router.get('/patientreceivables', userController.getpatientreceivablesByFilter);

router.get('/ratecardreceivables', userController.getratecardreceivablesByFilter);

router.get('/vendorpayables', userController.getvendorpayablesByFilter);

router.get('/daybook', userController.getdaybookByFilter);

router.get('/voucherlist', userController.getvoucherlistByFilter);

router.get('/task', userController.getTasksByFilter);

router.get('/filterdoctorunavaibility', userController.getDoctorUnavailabilitySummary);

router.post('/opening-balance', userController.saveOpeningBalance);
router.get('/opening-balance/:patientId', userController.getOpeningBalanceByPatient);

router.post('/contact', userController.createContact);
router.get('/contacts', userController.getAllContacts);
router.get('/contact/:id', userController.getContact);
router.put('/contact/:id', userController.updateContact);
router.delete('/contact/:id', userController.deleteContact);
router.get('/contact/by-name/:name', userController.getContactByName);

router.get('/consulted/:centerId', userController.getConsultedPatients);
router.get('/treatmentplanlist/:centerId', userController.fetchTreatmentPlanList);
router.get('/patients/in-progress/:centerId', userController.getInProgressPatients);
router.get('/patients/recall/:centerId', userController.getRecallPatients);
router.get('/patients/prospect/:centerId', userController.getProspectPatient);

router.post('/prospect', userController.createProspect);
router.get('/prospects', userController.getAllProspects);
router.get('/prospect/:id', userController.getProspectById);
router.put('/prospect/:id', userController.updateProspect);
router.delete('/prospect/:id', userController.deleteProspect);


router.post('/newfolder',  userController.createNewfolder);
router.get('/newfolder', userController.getNewfolders);
router.get('/newfolder/:id', userController.getNewfolderById);
router.put('/newfolder/:id',  userController.updateNewfolder);
router.delete('/newfolder/:id',  userController.deleteNewfolder);

router.post('/uploaddoc',  userController.createUploaddoc);
router.get('/uploaddoc', userController.getUploaddocs);
router.get('/uploaddoc/:id', userController.getUploaddocById);
router.put('/uploaddoc/:id',  userController.updateUploaddoc);
router.delete('/uploaddoc/:id',  userController.deleteUploaddoc);

export default router;