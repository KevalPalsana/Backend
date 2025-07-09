import { CDHBooking } from "../models/booking.model.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import path from "path";
import nodemailer from "nodemailer";
import Appointment from "../models/appointment.js";
import Time from "../models/time.js";
import Payment from "../models/payment.js";
import sendmail from '../config/email.js';
import whatapp from "../config/whatapp.js";
// import { sendMQTTNotification, client } from "../config/mqttClient.js";
import Blockingtime from "../models/blockingtime.js";
import Clinic from '../models/clinic.js';
import Center from "../models/center.js";
import Doctor from "../models/doctor.js";
import Staff from "../models/Staff.js";
import Holiday from "../models/holiday.js";
import Operatory from "../models/operatory.js";
import Gallery from "../models/gallery.js";
import Appointmentseries from "../models/appointmentseries.js";
import Groupappointment from "../models/groupappointment.js";
import Project from "../models/project.js";
import Bankaccount from "../models/bankaccount.js";
import Cardswipingmachine from "../models/cardswipingmachine.js";
import Cash from "../models/cash.js";
import Creditcard from "../models/creditcard.js";
import Wallet from "../models/wallet.js";
import Otherpayment from "../models/otherpayment.js";
import Branding from "../models/branding.js";
import Socialmedia from "../models/socialmedia.js";
import Ratecard from "../models/ratecard.js";
import Package from "../models/package.js";
import Specialistfees from "../models/specialistfees.js";
import Clinicalnotes from "../models/clinicalnotes.js";
import Treatementcategory from "../models/treatmentcategory.js";
import Treatement from "../models/treatment.js";
import Sittingnote from "../models/sittingnote.js";
import Drug from "../models/drug.js";
import Instruction from "../models/instruction.js";
import Insurance from "../models/insurance.js";
import Prescription from "../models/prescription .js";
import Orthogoal from "../models/orthogoal.js";
import Ortholimitation from "../models/ortholimitation.js";
import Medicalcondition from "../models/medicalcondition.js";
import Dentalcondition from "../models/dentalcondition.js";
import Patientgroup from "../models/patientgroup.js";
import Source from "../models/source.js";
import Refferal from "../models/refferal.js";
import Generalpractitioner from "../models/generalpractitioner.js";
import Emaildomain from "../models/emaildomain.js";
import SMStemplate from "../models/SMStemplate.js";
import WATemplate from "../models/WATemplate.js";
import Emailtemplate from "../models/emailtemplate.js";
import Lettertemplate from "../models/lettertemplate.js";
import Singletask from "../models/singletask.js";
import Recurringtask from "../models/recurringtask.js";
import Showoncalender from "../models/showoncalender.js";
import Treatmentnote from "../models/treatmentnote.js";
import Filenote from "../models/filenote.js";
import Patient from "../models/patient.js";
import mongoose from "mongoose";
import Sourcetype from "../models/sourcetype.js";
import InventoryCategory from "../models/inventorycategory.js";
import Inventoryitem from "../models/inventoryitem.js";
import Vendor from "../models/vendor.js";
import Account from "../models/account.js";

dotenv.config({ path: path.resolve(process.cwd(), 'config.env') });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_abc123",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "testsecret123"
});

const createBookingService = async (data) => {
  return await CDHBooking.create(data);
};

const getAllBookingsService = async () => {
  return await CDHBooking.find().populate("userId");
};

const getBookingByIdService = async (id) => {
  return await CDHBooking.findById(id).populate("userId");
};

const updateBookingService = async (id, updateData) => {
  return await CDHBooking.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteBookingService = async (id) => {
  return await CDHBooking.findByIdAndDelete(id);
};


export const createRazorpayOrder = async (amount) => {
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options);
  return order;
};


const createAppointmentService = async (data) => {
  const newAppointment = await Appointment.create(data);
  await sendEmail(data);
  return newAppointment;
};

const getAllAppointmentsService = async () => {
  return await Appointment.find().sort({ createdAt: -1 });
};

const getAppointmentByIdService = async (id) => {
  return await Appointment.find({ patient: id });
};

const updateAppointmentService = async (id, data) => {
  return await Appointment.findByIdAndUpdate(id, data, { new: true });
};

const deleteAppointmentService = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};

const sendEmail = async (formData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "misba.grafizen@gmail.com",
      pass: "lbowqmlbxuinfaai",
    },
  });

  const {
    name,
    email,
    phone,
    city,
    treatment = [],
    timeSlot,
    hasReports,
    userCity,
  } = formData;

  const mailOptions = {
    from: "misba.grafizen@gmail.com",
    to: "internationalcdh@gmail.com",
    subject: "New Dental Consultation Booking",
    html: `
      <h2>🦷 New Appointment Booking</h2>
      <table style="font-size: 15px; border-collapse: collapse;">
        <tr><td><strong>Full Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
        <tr><td><strong>User's City:</strong></td><td>${userCity}</td></tr>
        <tr><td><strong>Preferred Dental City:</strong></td><td>${city}</td></tr>
        <tr><td><strong>Preferred Time Slot:</strong></td><td>${timeSlot}</td></tr>
        <tr><td><strong>Has Reports:</strong></td><td>${hasReports}</td></tr>
        <tr><td><strong>Treatment Selected:</strong></td><td>${treatment.join(", ")}</td></tr>
      </table>
      <br />
      <p>📞 Please follow up with the patient for confirmation and further coordination.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};



// const selecttime = async(data)=>{
//     return await Time.create(data);
// };

// const userdetail = async(data)=>{
// console.log('data', data)
//     return await User.create(data);
// };

// const createPayment = async (timeid, userid, amount) => {
//     const order = await razorpay.orders.create({
//         amount: amount, 
//         currency: 'INR',
//         receipt: `booking_rcptid_${Date.now()}`
//     });

//     const booking = await Payment.create({
//         timeid,
//         userid,
//         amount,
//         bookingid: order.id,
//         currency: order.currency,
//         receipt: order.receipt,
//     });

//     return { booking, order };
// };

// const verifyPayment = async (orderid) => {  
//     const booking = await Payment.findOneAndUpdate(
//       { bookingid: orderid },
//       { paymentStatus: 'confirmed' },
//       { new: true }
//     );
//     const user = await User.findOne({_id:booking.userid})
//     const time = await Time.findOne({_id:booking.timeid})

//     if (!booking) {
//       throw new Error('Booking not found for the given order ID');
//     }
//     if(booking.paymentStatus === 'confirmed'){      
//         const topic = 'notification'
//         const message = ` Name: ${user.name}\n time: ${time.time}\n date: ${time.date}`;
//         await sendmail.sendemailnotification(
//             [user.email],
//             "Booking confirm",
//             message
//           );
//         // sendMQTTNotification(topic,message);
//        await whatapp.sendWhatsAppNotification('+919313758653', `Booking confirm \n${message}`)
//       }
//     return booking;
//   };  


// const resendnotification = async (paymentid) => {  
//     const booking = await Payment.findById(paymentid);

//     const user = await User.findOne({_id:booking.userid})
//     const time = await Time.findOne({_id:booking.timeid})

//     if (!booking) {
//       throw new Error('Booking not found for the given order ID');
//     }
//     if(booking.paymentStatus === 'confirmed'){      
//         const topic = 'notification'
//         const message = ` Name: ${user.name}\n time: ${time.time}\n date: ${time.date}`;
//         await sendmail.sendemailnotification(
//             [user.email],
//             "Booking confirm",
//             message
//           );
//         // sendMQTTNotification(topic,message);
//        await whatapp.sendWhatsAppNotification('+919313758653', `Booking confirm \n${message}`)
//       }
//     return booking;
//   };  


// const blockingtime = async(data)=>{
//     return await Blockingtime.create(data);
// }


const createClinic = async (data) => {
  return await Clinic.create(data);
}

const getClinics = async () => {
  return await Clinic.find();
}

const getClinicById = async (id) => {
  return await Clinic.findById(id);
}

const updateClinic = async (id, data) => {
  return await Clinic.findByIdAndUpdate(id, data, { new: true });
}

const deleteClinic = async (id) => {
  return await Clinic.findByIdAndDelete(id);
}

const createCenter = async (data) => {
  return await Center.create(data);
}

const getCenters = async () => {
  return await Center.find();
}

const getCenterById = async (id) => {
  return await Center.findById(id);
}

const updateCenter = async (id, data) => {
  return await Center.findByIdAndUpdate(id, data, { new: true });
}

const deleteCenter = async (id) => {
  return await Center.findByIdAndDelete(id);
}

const createDoctor = async (data) => {
  return await Doctor.create(data);
}

const getDoctors = async () => {
  return await Doctor.find();
}

const getDeletedDoctors = async () => {
  return await Doctor.find({delete:true});
}

const getDoctorById = async (id) => {
  return await Doctor.findById(id);
}

const updateDoctor = async (id, data) => {
  return await Doctor.findByIdAndUpdate(id, data, { new: true });
}

const deleteDoctor = async (id) => {
  return await Doctor.findByIdAndDelete(id);
}

const createStaff = async (data) => {
  return await Staff.create(data);
}

const getStaffs = async () => {
  return await Staff.find();
}

const getDeletedStaffs = async () => {
  return await Staff.find({delete:true});
}

const getStaffById = async (id) => {
  return await Staff.findById(id);
}

const updateStaff = async (id, data) => {
  return await Staff.findByIdAndUpdate(id, data, { new: true });
}

const deleteStaff = async (id) => {
  return await Staff.findByIdAndDelete(id);
}

const createHoliday = async (data) => {
  return await Holiday.create(data);
}

const getHolidays = async () => {
  return await Holiday.find();
}

const getHolidayById = async (id) => {
  return await Holiday.findById(id);
}

const updateHoliday = async (id, data) => {
  return await Holiday.findByIdAndUpdate(id, data, { new: true });
}

const deleteHoliday = async (id) => {
  return await Holiday.findByIdAndDelete(id);
}

const createOperatory = async (data) => {
  return await Operatory.create(data);
}

const getOperatorys = async () => {
  return await Operatory.find();
}

const getOperatoryById = async (id) => {
  return await Operatory.findById(id);
}

const updateOperatory = async (id, data) => {
  return await Operatory.findByIdAndUpdate(id, data, { new: true });
}

const deleteOperatory = async (id) => {
  return await Operatory.findByIdAndDelete(id);
}

const createGallery = async (data) => {
  return await Gallery.create(data);
}

const getGallerys = async () => {
  return await Gallery.find();
}

const getGalleryById = async (id) => {
  return await Gallery.findById(id);
}

const updateGallery = async (id, data) => {
  return await Gallery.findByIdAndUpdate(id, data, { new: true });
}

const deleteGallery = async (id) => {
  return await Gallery.findByIdAndDelete(id);
}

const createAppointmentseries = async (data) => {
  return await Appointmentseries.create(data);
}

const getAppointmentseries = async () => {
  return await Appointmentseries.find();
}

const getAppointmentseriesById = async (id) => {
  return await Appointmentseries.findById(id);
}

const updateAppointmentseries = async (id, data) => {
  return await Appointmentseries.findByIdAndUpdate(id, data, { new: true });
}

const deleteAppointmentseries = async (id) => {
  return await Appointmentseries.findByIdAndDelete(id);
}

const createGroupappointment = async (data) => {
  return await Groupappointment.create(data);
}

const getGroupappointments = async () => {
  return await Groupappointment.find();
}

const getGroupappointmentById = async (id) => {
  return await Groupappointment.findById(id);
}

const updateGroupappointment = async (id, data) => {
  return await Groupappointment.findByIdAndUpdate(id, data, { new: true });
}

const deleteGroupappointment = async (id) => {
  return await Groupappointment.findByIdAndDelete(id);
}

const createProject = async (data) => {
  return await Project.create(data);
}

const getProjects = async () => {
  return await Project.find();
}

const getProjectById = async (id) => {
  return await Project.findById(id);
}

const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, { new: true });
}

const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
}

const createBankaccount = async (data) => {
  return await Bankaccount.create(data);
}

const getBankaccounts = async () => {
  return await Bankaccount.find();
}

const getBankaccountById = async (id) => {
  return await Bankaccount.findById(id);
}

const updateBankaccount = async (id, data) => {
  return await Bankaccount.findByIdAndUpdate(id, data, { new: true });
}

const deleteBankaccount = async (id) => {
  return await Bankaccount.findByIdAndDelete(id);
}

const createCardswipingmachine = async (data) => {
  return await Cardswipingmachine.create(data);
}

const getCardswipingmachines = async () => {
  return await Cardswipingmachine.find().populate("linkedBankAccount");
}

const getCardswipingmachineById = async (id) => {
  return await Cardswipingmachine.findById(id).populate("linkedBankAccount");
}

const updateCardswipingmachine = async (id, data) => {
  return await Cardswipingmachine.findByIdAndUpdate(id, data, { new: true });
}

const deleteCardswipingmachine = async (id) => {
  return await Cardswipingmachine.findByIdAndDelete(id);
}

const createCash = async (data) => {
  return await Cash.create(data);
}

const getCashs = async () => {
  return await Cash.find();
}

const getCashById = async (id) => {
  return await Cash.findById(id);
}

const updateCash = async (id, data) => {
  return await Cash.findByIdAndUpdate(id, data, { new: true });
}

const deleteCash = async (id) => {
  return await Cash.findByIdAndDelete(id);
}

const createCreditcard = async (data) => {
  return await Creditcard.create(data);
}

const getCreditcards = async () => {
  return await Creditcard.find();
}

const getCreditcardById = async (id) => {
  return await Creditcard.findById(id);
}

const updateCreditcard = async (id, data) => {
  return await Creditcard.findByIdAndUpdate(id, data, { new: true });
}

const deleteCreditcard = async (id) => {
  return await Creditcard.findByIdAndDelete(id);
}

const createWallet = async (data) => {
  return await Wallet.create(data);
}

const getWallets = async () => {
  return await Wallet.find();
}

const getWalletById = async (id) => {
  return await Wallet.findById(id);
}

const updateWallet = async (id, data) => {
  return await Wallet.findByIdAndUpdate(id, data, { new: true });
}

const deleteWallet = async (id) => {
  return await Wallet.findByIdAndDelete(id);
}

const createOtherpayment = async (data) => {
  return await Otherpayment.create(data);
}

const getOtherpayments = async () => {
  return await Otherpayment.find();
}

const getOtherpaymentById = async (id) => {
  return await Otherpayment.findById(id);
}

const updateOtherpayment = async (id, data) => {
  return await Otherpayment.findByIdAndUpdate(id, data, { new: true });
}

const deleteOtherpayment = async (id) => {
  return await Otherpayment.findByIdAndDelete(id);
}

const createBranding = async (data) => {
  return await Branding.create(data);
}

const getBrandings = async () => {
  return await Branding.find();
}

const getBrandingById = async (id) => {
  return await Branding.findById(id);
}

const updateBranding = async (id, data) => {
  return await Branding.findByIdAndUpdate(id, data, { new: true });
}

const deleteBranding = async (id) => {
  return await Branding.findByIdAndDelete(id);
}

const createSocialmedia = async (data) => {
  return await Socialmedia.create(data);
}

const getSocialmedias = async () => {
  return await Socialmedia.find();
}

const getSocialmediaById = async (id) => {
  return await Socialmedia.findById(id);
}

const updateSocialmedia = async (id, data) => {
  return await Socialmedia.findByIdAndUpdate(id, data, { new: true });
}

const deleteSocialmedia = async (id) => {
  return await Socialmedia.findByIdAndDelete(id);
}

const createRatecard = async (data) => {
  return await Ratecard.create(data);
}

const getRatecards = async () => {
  return await Ratecard.find();
}

const getRatecardById = async (id) => {
  return await Ratecard.findById(id);
}

const updateRatecard = async (id, data) => {
  return await Ratecard.findByIdAndUpdate(id, data, { new: true });
}

const deleteRatecard = async (id) => {
  return await Ratecard.findByIdAndDelete(id);
}

const createPackage = async (data) => {
  return await Package.create(data);
}

const getPackage = async () => {
  return await Package.find();
}

const getPackageById = async (id) => {
  return await Package.findById(id);
}

const updatePackage = async (id, data) => {
  return await Package.findByIdAndUpdate(id, data, { new: true });
}

const deletePackage = async (id) => {
  return await Package.findByIdAndDelete(id);
}

const createSpecialistfees = async (data) => {
  return await Specialistfees.create(data);
}

const getSpecialistfees = async () => {
  return await Specialistfees.find();
}

const getSpecialistfeesById = async (id) => {
  return await Specialistfees.findById(id);
}

const updateSpecialistfees = async (id, data) => {
  return await Specialistfees.findByIdAndUpdate(id, data, { new: true });
}

const deleteSpecialistfees = async (id) => {
  return await Specialistfees.findByIdAndDelete(id);
}

const createClinicalnotes = async (data) => {
  return await Clinicalnotes.create(data);
}

const getClinicalnotes = async () => {
  return await Clinicalnotes.find();
}

const getClinicalnotesById = async (id) => {
  return await Clinicalnotes.findById(id);
}

const updateClinicalnotes = async (id, data) => {
  return await Clinicalnotes.findByIdAndUpdate(id, data, { new: true });
}

const deleteClinicalnotes = async (id) => {
  return await Clinicalnotes.findByIdAndDelete(id);
}

const createTreatementcategory = async (data) => {
  return await Treatementcategory.create(data);
}

const getTreatementcategory = async () => {
  return await Treatementcategory.find();
}

const getTreatementcategoryById = async (id) => {
  return await Treatementcategory.findById(id);
}

const updateTreatementcategory = async (id, data) => {
  return await Treatementcategory.findByIdAndUpdate(id, data, { new: true });
}

const deleteTreatementcategory = async (id) => {
  return await Treatementcategory.findByIdAndDelete(id);
}

const createSittingnote = async (data) => {
  return await Sittingnote.create(data);
}

const getSittingnote = async () => {
  return await Sittingnote.find();
}

const getSittingnoteById = async (id) => {
  return await Sittingnote.findById(id);
}

const updateSittingnote = async (id, data) => {
  return await Sittingnote.findByIdAndUpdate(id, data, { new: true });
}

const deleteSittingnote = async (id) => {
  return await Sittingnote.findByIdAndDelete(id);
}

const createDrug = async (data) => {
  return await Drug.create(data);
}

const getDrug = async () => {
  return await Drug.find();
}

const getDrugById = async (id) => {
  return await Drug.findById(id);
}

const updateDrug = async (id, data) => {
  return await Drug.findByIdAndUpdate(id, data, { new: true });
}

const deleteDrug = async (id) => {
  return await Drug.findByIdAndDelete(id);
}

const createInstruction = async (data) => {
  return await Instruction.create(data);
}

const getInstruction = async () => {
  return await Instruction.find();
}

const getInstructionById = async (id) => {
  return await Instruction.findById(id);
}

const updateInstruction = async (id, data) => {
  return await Instruction.findByIdAndUpdate(id, data, { new: true });
}

const deleteInstruction = async (id) => {
  return await Instruction.findByIdAndDelete(id);
}

const createInsurance = async (data) => {
  return await Insurance.create(data);
}

const getInsurance = async () => {
  return await Insurance.find();
}

const getInsuranceById = async (id) => {
  return await Insurance.findById(id);
}

const updateInsurance = async (id, data) => {
  return await Insurance.findByIdAndUpdate(id, data, { new: true });
}

const deleteInsurance = async (id) => {
  return await Insurance.findByIdAndDelete(id);
}

const createPrescription = async (data) => {
  return await Prescription.create(data);
}

const getPrescription = async () => {
  return await Prescription.find();
}

const getPrescriptionById = async (id) => {
  return await Prescription.findById(id);
}

const updatePrescription = async (id, data) => {
  return await Prescription.findByIdAndUpdate(id, data, { new: true });
}

const deletePrescription = async (id) => {
  return await Prescription.findByIdAndDelete(id);
}

const createOrthogoal = async (data) => {
  return await Orthogoal.create(data);
}

const getOrthogoals = async () => {
  return await Orthogoal.find();
}

const getOrthogoalById = async (id) => {
  return await Orthogoal.findById(id);
}

const updateOrthogoal = async (id, data) => {
  return await Orthogoal.findByIdAndUpdate(id, data, { new: true });
}

const deleteOrthogoal = async (id) => {
  return await Orthogoal.findByIdAndDelete(id);
}

const createOrtholimitation = async (data) => {
  return await Ortholimitation.create(data);
}

const getOrtholimitations = async () => {
  return await Ortholimitation.find();
}

const getOrtholimitationById = async (id) => {
  return await Ortholimitation.findById(id);
}

const updateOrtholimitation = async (id, data) => {
  return await Ortholimitation.findByIdAndUpdate(id, data, { new: true });
}

const deleteOrtholimitation = async (id) => {
  return await Ortholimitation.findByIdAndDelete(id);
}

const createMedicalcondition = async (data) => {
  return await Medicalcondition.create(data);
}

const getMedicalconditions = async () => {
  return await Medicalcondition.find();
}

const getMedicalconditionById = async (id) => {
  return await Medicalcondition.findById(id);
}

const updateMedicalcondition = async (id, data) => {
  return await Medicalcondition.findByIdAndUpdate(id, data, { new: true });
}

const deleteMedicalcondition = async (id) => {
  return await Medicalcondition.findByIdAndDelete(id);
}

const createDentalcondition = async (data) => {
  return await Dentalcondition.create(data);
}

const getDentalconditions = async () => {
  return await Dentalcondition.find();
}

const getDentalconditionById = async (id) => {
  return await Dentalcondition.findById(id);
}

const updateDentalcondition = async (id, data) => {
  return await Dentalcondition.findByIdAndUpdate(id, data, { new: true });
}

const deleteDentalcondition = async (id) => {
  return await Dentalcondition.findByIdAndDelete(id);
}

const createPatientgroup = async (data) => {
  return await Patientgroup.create(data);
}

const getPatientgroups = async () => {
  return await Patientgroup.find();
}

const getPatientgroupById = async (id) => {
  return await Patientgroup.findById(id);
}

const updatePatientgroup = async (id, data) => {
  return await Patientgroup.findByIdAndUpdate(id, data, { new: true });
}

const deletePatientgroup = async (id) => {
  return await Patientgroup.findByIdAndDelete(id);
}

const createSource = async (data) => {
  return await Source.create(data);
}

const getSources = async () => {
  return await Source.find();
}

const getSourceById = async (id) => {
  return await Source.findById(id);
}

const updateSource = async (id, data) => {
  return await Source.findByIdAndUpdate(id, data, { new: true });
}

const deleteSource = async (id) => {
  return await Source.findByIdAndDelete(id);
}

const createRefferal = async (data) => {
  return await Refferal.create(data);
}

const getRefferals = async () => {
  return await Refferal.find();
}

const getRefferalById = async (id) => {
  return await Refferal.findById(id);
}

const updateRefferal = async (id, data) => {
  return await Refferal.findByIdAndUpdate(id, data, { new: true });
}

const deleteRefferal = async (id) => {
  return await Refferal.findByIdAndDelete(id);
}

const createGeneralpractitioner = async (data) => {
  return await Generalpractitioner.create(data);
}

const getGeneralpractitioners = async () => {
  return await Generalpractitioner.find();
}

const getGeneralpractitionerById = async (id) => {
  return await Generalpractitioner.findById(id);
}

const updateGeneralpractitioner = async (id, data) => {
  return await Generalpractitioner.findByIdAndUpdate(id, data, { new: true });
}

const deleteGeneralpractitioner = async (id) => {
  return await Generalpractitioner.findByIdAndDelete(id);
}

const createEmaildomain = async (data) => {
  return await Emaildomain.create(data);
}

const getEmaildomains = async () => {
  return await Emaildomain.find();
}

const getEmaildomainById = async (id) => {
  return await Emaildomain.findById(id);
}

const updateEmaildomain = async (id, data) => {
  return await Emaildomain.findByIdAndUpdate(id, data, { new: true });
}

const deleteEmaildomain = async (id) => {
  return await Emaildomain.findByIdAndDelete(id);
}

const createSMStemplate = async (data) => {
  return await SMStemplate.create(data);
}

const getSMStemplates = async () => {
  return await SMStemplate.find();
}

const getSMStemplateById = async (id) => {
  return await SMStemplate.findById(id);
}

const updateSMStemplate = async (id, data) => {
  return await SMStemplate.findByIdAndUpdate(id, data, { new: true });
}

const deleteSMStemplate = async (id) => {
  return await SMStemplate.findByIdAndDelete(id);
}

const createWATemplate = async (data) => {
  return await WATemplate.create(data);
}

const getWATemplates = async () => {
  return await WATemplate.find();
}

const getWATemplateById = async (id) => {
  return await WATemplate.findById(id);
}

const updateWATemplate = async (id, data) => {
  return await WATemplate.findByIdAndUpdate(id, data, { new: true });
}

const deleteWATemplate = async (id) => {
  return await WATemplate.findByIdAndDelete(id);
}

const createEmailtemplate = async (data) => {
  return await Emailtemplate.create(data);
}

const getEmailtemplates = async () => {
  return await Emailtemplate.find();
}

const getEmailtemplateById = async (id) => {
  return await Emailtemplate.findById(id);
}

const updateEmailtemplate = async (id, data) => {
  return await Emailtemplate.findByIdAndUpdate(id, data, { new: true });
}

const deleteEmailtemplate = async (id) => {
  return await Emailtemplate.findByIdAndDelete(id);
}

const createLettertemplate = async (data) => {
  return await Lettertemplate.create(data);
}

const getLettertemplates = async () => {
  return await Lettertemplate.find();
}

const getLettertemplateById = async (id) => {
  return await Lettertemplate.findById(id);
}

const updateLettertemplate = async (id, data) => {
  return await Lettertemplate.findByIdAndUpdate(id, data, { new: true });
}

const deleteLettertemplate = async (id) => {
  return await Lettertemplate.findByIdAndDelete(id);
}

const createSingletask = async (data) => {
  return await Singletask.create(data);
}

const getSingletasks = async () => {
  return await Singletask.find();
}

const getSingletaskById = async (id) => {
  return await Singletask.findById(id);
}

const updateSingletask = async (id, data) => {
  return await Singletask.findByIdAndUpdate(id, data, { new: true });
}

const deleteSingletask = async (id) => {
  return await Singletask.findByIdAndDelete(id);
}

const createRecurringtask = async (data) => {
  return await Recurringtask.create(data);
}

const getRecurringtasks = async () => {
  return await Recurringtask.find();
}

const getRecurringtaskById = async (id) => {
  return await Recurringtask.findById(id);
}

const updateRecurringtask = async (id, data) => {
  return await Recurringtask.findByIdAndUpdate(id, data, { new: true });
}

const deleteRecurringtask = async (id) => {
  return await Recurringtask.findByIdAndDelete(id);
}


const createShowoncalender = async (data) => {
  return await Showoncalender.create(data);
}

const getShowoncalenders = async () => {
  return await Showoncalender.find();
}

const getShowoncalenderById = async (id) => {
  return await Showoncalender.findById(id);
}

const updateShowoncalender = async (id, data) => {
  return await Showoncalender.findByIdAndUpdate(id, data, { new: true });
}

const deleteShowoncalender = async (id) => {
  return await Showoncalender.findByIdAndDelete(id);
}


const createTreatmentnote = async (data) => {
  const treatmentnote = await Treatmentnote.create(data);
  const { patient, treatmentDone } = data;

  if (mongoose.Types.ObjectId.isValid(patient) && mongoose.Types.ObjectId.isValid(treatmentDone)) {
      await Patient.findOneAndUpdate(
          {
              _id: patient,
              "treatmentdone._id": treatmentDone
          },
          {
              $set: {
                  "treatmentdone.$.treatmentStatus": "inprogress"
              }
          }
      );
  }
  return treatmentnote;
}

const getTreatmentnotes = async () => {
  return await Treatmentnote.find();
}

const updateTreatmentnote = async (id, data) => {
  return await Treatmentnote.findByIdAndUpdate(id, data, { new: true });
}

const deleteTreatmentnote = async (id) => {
  return await Treatmentnote.findByIdAndDelete(id);
}

const createFilenote = async (data) => {
  return await Filenote.create(data);
}

const getFilenotes = async () => {
  return await Filenote.find();
}

const updateFilenote = async (id, data) => {
  return await Filenote.findByIdAndUpdate(id, data, { new: true });
}

const deleteFilenote = async (id) => {
  return await Filenote.findByIdAndDelete(id);
}

const getCenterByFilter = async ({status}) => {
  const query = {};
  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Center.find(query)

  return data;
};

const getDoctorByFilter = async ({center, status}) => {
  const query = {
    delete: { $ne: true },
  };

if (center && center !== 'All') {
  query.centerId = center;
}

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Doctor.find(query)

  return data;
};

const getStaffByFilter = async ({center, status}) => {
  const query = {
    delete: { $ne: true },
  };

if (center && center !== 'All') {
  query.centerid = center;
}

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Staff.find(query)

  return data;
};

const getOperatoryByFilter = async ({status}) => {
  const query = {};
  
  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Operatory.find(query)

  return data;
};

const getAppointmentseriesByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Appointmentseries.find(query).populate('treatmentCategory')

  return data;
};

const getBankaccountByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Bankaccount.find(query)

  return data;
};

const getCardswipingmachineByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Cardswipingmachine.find(query).populate('linkedBankAccount')

  return data;
};

const getCashByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Cash.find(query)

  return data;
};

const getCreditcardByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Creditcard.find(query)

  return data;
};

const getWalletByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Wallet.find(query)

  return data;
};

const getOtherpaymentByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Otherpayment.find(query)

  return data;
};

const getRatecardByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Ratecard.find(query)

  return data;
};

const getPackageByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Package.find(query).populate('treatments.treatmentId')

  return data;
};

const getSpecialistfeesByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Specialistfees.find(query)

  return data;
};

const getClinicalnotesByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Clinicalnotes.find(query)

  return data;
};

const getTreatementcategoryByFilter = async ({status, search}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }
  if (search && search.trim() !== '') {
    query.treatmentCategory = { $regex: search.trim(), $options: 'i' }; // case-insensitive search
  }

  const data = await Treatementcategory.find(query)

  return data;
};

const getTreatementByFilter = async ({status, search}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }
  if (search && search.trim() !== '') {
    query.treatmentName = { $regex: search.trim(), $options: 'i' }; // case-insensitive search
  }

  const data = await Treatement.find(query).populate('treatmentCategory')

  return data;
};

const getDrugByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Drug.find(query)

  return data;
};

const getInstructionByFilter = async ({status, search}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }
  if (search && search.trim() !== '') {
    query.name = { $regex: search.trim(), $options: 'i' }; // case-insensitive search
  }

  const data = await Instruction.find(query)

  return data;
};

const getInsuranceByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Insurance.find(query)

  return data;
};

const getOrthogoalByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Orthogoal.find(query)

  return data;
};

const getOrtholimitationByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Ortholimitation.find(query)

  return data;
};

const getPatientgroupByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Patientgroup.find(query)

  return data;
};

const getSourceByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Source.find(query)

  return data;
};

const getSourcetypeByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Sourcetype.find(query)

  return data;
};

const getRefferalByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Refferal.find(query)

  return data;
};

const getGeneralpractitionerByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Generalpractitioner.find(query)

  return data;
};

const getVendorByFilter = async ({status}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Vendor.find(query)

  return data;
};

const getInventoryCategoryByFilter = async ({status, search}) => {
  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }
  if (search && search.trim() !== '') {
    query.inventoryCategory = { $regex: search.trim(), $options: 'i' }; // case-insensitive search
  }

  const data = await InventoryCategory.find(query)

  return data;
};

const getInventoryitemByFilter = async ({inventoryItem, status, search}) => {
  const query = {};

if (inventoryItem && inventoryItem !== 'All') {
  query.inventoryItem = inventoryItem;
}
if (search && search.trim() !== '') {
  query.inventoryItem = { $regex: search.trim(), $options: 'i' }; // case-insensitive search
}
  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Inventoryitem.find(query).populate('inventoryItemCategory')

  return data;
};

const getAccountByFilter = async ({accountGroup, status}) => {
  const query = {};

if (accountGroup && accountGroup !== 'all') {
  query.accountGroup = accountGroup;
}

  if (status && status !== 'All') {
    query.status = status;
  }

  const data = await Account.find(query)

  return data;
};

export default {
  createBookingService, getBookingByIdService, getAllBookingsService, updateBookingService, deleteBookingService, createRazorpayOrder,
  createAppointmentService, getAllAppointmentsService, getAppointmentByIdService, updateAppointmentService, deleteAppointmentService, sendEmail,
  createClinic, getClinics, getClinicById, updateClinic, deleteClinic, createCenter, getCenters, getCenterById, updateCenter, deleteCenter,
  createDoctor, getDoctors, getDeletedDoctors, getDoctorById, updateDoctor, deleteDoctor, createStaff, getStaffs, getDeletedStaffs, getStaffById, updateStaff, deleteStaff,
  createHoliday, getHolidays, getHolidayById, updateHoliday, deleteHoliday, createOperatory, getOperatorys, getOperatoryById, updateOperatory, deleteOperatory,
  createGallery, getGallerys, getGalleryById, updateGallery, deleteGallery, createAppointmentseries, getAppointmentseries, getAppointmentseriesById, updateAppointmentseries, deleteAppointmentseries,
  createGroupappointment, getGroupappointments, getGroupappointmentById, updateGroupappointment, deleteGroupappointment,
  createProject, getProjects, getProjectById, updateProject, deleteProject, createBankaccount, getBankaccounts, getBankaccountById, updateBankaccount, deleteBankaccount,
  createCardswipingmachine, getCardswipingmachines, getCardswipingmachineById, updateCardswipingmachine, deleteCardswipingmachine, createCash, getCashs, getCashById, updateCash, deleteCash,
  createCreditcard, getCreditcards, getCreditcardById, updateCreditcard, deleteCreditcard, createWallet, getWallets, getWalletById, updateWallet, deleteWallet,
  createOtherpayment, getOtherpayments, getOtherpaymentById, updateOtherpayment, deleteOtherpayment, createBranding, getBrandings, getBrandingById, updateBranding, deleteBranding,
  createSocialmedia, getSocialmedias, getSocialmediaById, updateSocialmedia, deleteSocialmedia, createRatecard, getRatecards, getRatecardById, updateRatecard, deleteRatecard,
  createPackage, getPackage, getPackageById, updatePackage, deletePackage, createSpecialistfees, getSpecialistfees, getSpecialistfeesById, updateSpecialistfees, deleteSpecialistfees,
  createClinicalnotes, getClinicalnotes, getClinicalnotesById, updateClinicalnotes, deleteClinicalnotes, createTreatementcategory, getTreatementcategory, getTreatementcategoryById, updateTreatementcategory, deleteTreatementcategory,
  createSittingnote, getSittingnote, getSittingnoteById, updateSittingnote, deleteSittingnote, createDrug, getDrug, getDrugById, updateDrug, deleteDrug, createInstruction, getInstruction, getInstructionById, updateInstruction, deleteInstruction,
  createInsurance, getInsurance, getInsuranceById, updateInsurance, deleteInsurance, createPrescription, getPrescription, getPrescriptionById, updatePrescription, deletePrescription, 
  createOrthogoal, getOrthogoals, getOrthogoalById, updateOrthogoal, deleteOrthogoal, createOrtholimitation, getOrtholimitations, getOrtholimitationById, updateOrtholimitation, deleteOrtholimitation,
   createMedicalcondition, getMedicalconditions, getMedicalconditionById, updateMedicalcondition, deleteMedicalcondition, createDentalcondition, getDentalconditions, getDentalconditionById, updateDentalcondition, deleteDentalcondition, 
   createPatientgroup, getPatientgroups, getPatientgroupById, updatePatientgroup, deletePatientgroup, createSource, getSources, getSourceById, updateSource, deleteSource, createRefferal, getRefferals, getRefferalById, updateRefferal, deleteRefferal, 
   createGeneralpractitioner, getGeneralpractitioners, getGeneralpractitionerById, updateGeneralpractitioner, deleteGeneralpractitioner, createEmaildomain, getEmaildomains, getEmaildomainById, updateEmaildomain, deleteEmaildomain,
    createSMStemplate, getSMStemplates, getSMStemplateById, updateSMStemplate, deleteSMStemplate, createWATemplate, getWATemplates, getWATemplateById, updateWATemplate, deleteWATemplate,
     createEmailtemplate, getEmailtemplates, getEmailtemplateById, updateEmailtemplate, deleteEmailtemplate, createLettertemplate, getLettertemplates, getLettertemplateById, updateLettertemplate, deleteLettertemplate,
     createSingletask, getSingletasks, getSingletaskById, updateSingletask, deleteSingletask, 
     createRecurringtask, getRecurringtasks, getRecurringtaskById, updateRecurringtask, deleteRecurringtask, 
     createShowoncalender, getShowoncalenders, getShowoncalenderById, updateShowoncalender, deleteShowoncalender, 
     createTreatmentnote, getTreatmentnotes, updateTreatmentnote, deleteTreatmentnote, 
     createFilenote, getFilenotes, updateFilenote, deleteFilenote, 
     getCenterByFilter, getDoctorByFilter, getStaffByFilter, getOperatoryByFilter, getAppointmentseriesByFilter, 
     getBankaccountByFilter, getCardswipingmachineByFilter, getCashByFilter, getCreditcardByFilter, getWalletByFilter, getOtherpaymentByFilter, 
     getRatecardByFilter, getPackageByFilter, getSpecialistfeesByFilter, getClinicalnotesByFilter, getTreatementcategoryByFilter, getTreatementByFilter, getDrugByFilter, getInstructionByFilter, getInsuranceByFilter, 
     getOrthogoalByFilter, getOrtholimitationByFilter, getPatientgroupByFilter, getSourceByFilter, getSourcetypeByFilter, getRefferalByFilter, getGeneralpractitionerByFilter, 
     getVendorByFilter, getInventoryCategoryByFilter, getInventoryitemByFilter, getAccountByFilter, 
};