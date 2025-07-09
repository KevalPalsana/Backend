import jwt from "jsonwebtoken";
import { CDHUser } from "../models/user.model.js";
const secret = "secretKey";
import Excel from 'exceljs';
import PDF from 'pdfkit';
import { CDHAdmin } from "../models/admin.model.js";
import Time from "../models/time.js";
import CDHPayment from "../models/payment.js";
import Razorpay from 'razorpay'
import dotenv from "dotenv";
import sendmail from '../config/email.js';
import whatapp from "../config/whatapp.js";
import Blockingtime from "../models/blockingtime.js";
import Clinic from '../models/clinic.js';
import Center from "../models/center.js";
import Doctor from "../models/doctor.js";
import Staff from "../models/Staff.js";
import Holiday from "../models/holiday.js";
import Operatory from "../models/operatory.js";
import Gallery from "../models/gallery.js";
import Appointmentseries from "../models/appointmentseries.js";
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
import Treatmentcategory from "../models/treatmentcategory.js";
import Treatment from "../models/treatment.js";
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
import Sourcetype from "../models/sourcetype.js";
import Refferal from "../models/refferal.js";
import Generalpractitioner from "../models/generalpractitioner.js";
import Emaildomain from "../models/emaildomain.js";
import SMStemplate from "../models/SMStemplate.js";
import WATemplate from "../models/WATemplate.js";
import Emailtemplate from "../models/emailtemplate.js";
import Lettertemplate from "../models/lettertemplate.js";
import Vendor from "../models/vendor.js";
import Inventorycategory from "../models/inventorycategory.js";
import Inventoryitem from "../models/inventoryitem.js";
import Account from "../models/account.js";
import Patient from "../models/patient.js";
import Doctorunavaibility from "../models/doctorunavaibility.js";
import Creditnote from "../models/creditnote.js";
import Paymentreceived from "../models/paymentreceived.js";
import Paymentreminder from "../models/paymentreminder.js";
import PaymentMade from "../models/paymentmade.js";
import CashBankTransaction from "../models/cashBankTransaction.js";
import Journalentry from "../models/journalentry.js";
import Patientopeaningbalance from "../models/patientopeaningbalance.js";
import Inventorypurchase from "../models/inventorypurchase.js";
import Inventoryconsume from "../models/inventoryconsume.js";
import Inventorytransfer from "../models/inventorytransfer.js";
import Lab from "../models/lab.js";
import Labbill from "../models/labbill.js";
import Labworkgive from "../models/labworkgive.js";
import Labworkrecieve from "../models/labworkrecieve.js";
import Smstransfer from "../models/smstransfer.js";
import Personvisit from "../models/personvisit.js";
import insurance from "../models/insurance.js";
import Purchaseorder from "../models/purchaseorder.js";
import PurchaseInvoice from "../models/purchaseInvoice.js";
import Grninward from "../models/grninward.js";
import Grnoutward from "../models/grnoutward.js";
import Branchindent from "../models/branchindent.js";
import Branchinward from "../models/branchinward.js";
import Branchoutward from "../models/branchoutward.js";
import Purchasepayment from "../models/purchasepayment.js";
import Purchasereturnbill from "../models/purchasereturnbill.js";
import Purchasereturnpayment from "../models/purchasereturnpayment.js";
import Openingstock from "../models/openingstock.js";
import patient from "../models/patient.js";
import Appointment from "../models/appointment.js";
import Counter from "../models/counter.js";
import Recurringtask from "../models/recurringtask.js";
import Singletask from "../models/singletask.js";
import CDHOpeningBalance from "../models/openingBalance.model.js"
import CDHContact from "../models/contact.model.js";
import mongoose from "mongoose";
import CRMProspect from "../models/prospect.js";
import { flatten } from 'flat';
import Newfolder from "../models/newfolder.js";
import Uploaddoc from "../models/uploaddoc.js";


dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const selecttime = async (data) => {
  return await Time.create(data);
};

const userdetail = async (data) => {
  return await CDHUser.create(data);
};


const getDateRange = (filterType) => {
  const now = new Date();
  let startDate, endDate;

  switch (filterType) {
    case 'today':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      endDate = new Date(now.setHours(23, 59, 59, 999));
      break;
    case 'yesterday':
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      startDate = new Date(yesterday.setHours(0, 0, 0, 0));
      endDate = new Date(yesterday.setHours(23, 59, 59, 999));
      break;
    case 'current_month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      break;
    case 'last_month':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;
    case 'current_quarter':
      const quarter = Math.floor((now.getMonth()) / 3);
      startDate = new Date(now.getFullYear(), quarter * 3, 1);
      endDate = new Date(now.getFullYear(), quarter * 3 + 3, 0, 23, 59, 59, 999);
      break;
    default:
      throw new Error("Invalid filterType");
  }

  return { startDate, endDate };
};


const createPayment = async (timeid, userid, amount) => {
  const order = await razorpay.orders.create({
    amount: amount,
    currency: 'INR',
    receipt: `booking_rcptid_${Date.now()}`
  });

  const booking = await CDHPayment.create({
    timeid,
    userid,
    amount,
    bookingid: order.id,
    currency: order.currency,
    receipt: order.receipt,
  });

  return { booking, order };
};

const verifyPayment = async (orderid) => {
  const booking = await CDHPayment.findOneAndUpdate(
    { bookingid: orderid },
    { paymentStatus: 'confirmed' },
    { new: true }
  );
  const user = await CDHUser.findOne({ _id: booking.userid })
  const time = await Time.findOne({ _id: booking.timeid })

  if (!booking) {
    throw new Error('Booking not found for the given order ID');
  }
  if (booking.paymentStatus === 'confirmed') {
    const topic = 'notification'
    const message = ` Name: ${user.name}\n time: ${time.time}\n date: ${time.date}`;
    await sendmail.sendemailnotification(
      [user.email],
      "Booking confirm",
      message
    );
    await whatapp.sendWhatsAppNotification('+919313758653', `Booking confirm \n${message}`)
  }
  return booking;
};


const resendnotification = async (paymentid) => {
  if (!mongoose.Types.ObjectId.isValid(paymentid)) {
    throw new Error('Invalid payment ID');
  }

  const booking = await CDHPayment.findById(paymentid);

  if (!booking) {
    throw new Error('Booking not found for the given payment ID');
  }

  const user = await CDHUser.findById(booking.userid);
  const time = await Time.findById(booking.timeid);

  if (booking.paymentStatus === 'confirmed') {
    const message = `Name: ${user.name}\nTime: ${time.time}\nDate: ${time.date}`;
    await sendmail.sendemailnotification([user.email], "Booking Confirmed", message);
    await whatapp.sendWhatsAppNotification('+919313758653', `Booking confirm \n${message}`);
  }

  return booking;
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "7d" });
};

const registeruser = async (name, email, password, role) => {
  const existingUser = await CDHAdmin.findOne({ email });
  if (existingUser) {
    return { message: 'email already registered' };
  }

  const newUser = new CDHAdmin({ name, email, password, role });
  await newUser.save();
  const token = generateToken(newUser);
  return { token, newUser };
};

const loginuser = async (email, password, res) => {
  const newuser = await CDHAdmin.findOne({ email });

  if (!newuser) {
    throw new Error('invalid user');
  }

  const isMatch = await newuser.matchPassword(password);

  if (!isMatch) {
    throw new Error('invalid password');
  }

  const token = generateToken(newuser);
  res.cookie('token', token);
  return token;
};

const getuser = async () => {
  return await CDHAdmin.find();
}

const getuserbyid = async (id) => {
  return await CDHAdmin.findById(id);
};

const updateuser = async (id, data) => {
  const user = await CDHAdmin.findByIdAndUpdate(id, data, { new: true })
  return user;
};

const deleteuser = async (id) => {
  return await CDHAdmin.findByIdAndDelete(id);
};

const blockingtime = async (data) => {
  return await Blockingtime.create(data);
}


const createCounter = async (data) => {
  const existing = await Counter.findOne({ name: data.name });
  if (existing) {
    throw new Error(`Counter with name '${data.name}' already exists`);
  }
  return await Counter.create(data);
}

const createClinic = async (data) => {
  return await Clinic.create(data);
}

const getClinics = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Clinic.find().sort({ createdAt: sortOrder });
}

const searchnameClinics = async (name) => {
  if (!name) throw new Error("name is required");

  return await Clinic.find({
    clinicName: { $regex: name, $options: "i" }
  });
};

const searchdateClinics = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Clinic.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getClinicById = async (id) => {
  return await Clinic.findById(id);
}

const updateClinic = async (id, data) => {
  return await Clinic.findByIdAndUpdate(id, data, { new: true });
}

const deleteClinic = async (id) => {
  return await Clinic.findByIdAndDelete(id);
}

const getClinicstatus = async (status) => {
  return await Clinic.find({ status: status });
}

const generateExcelClinic = async (res) => {
  const clinic = await Clinic.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Clinic');
  worksheet.columns = Object.keys(clinic[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  clinic.forEach((clinic) => {
    worksheet.addRow(clinic.toObject());
  });

  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Clinic.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfClinic = async (res) => {
  const clinic = await Clinic.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Clinic.pdf`);
  doc.pipe(res);
  doc.text('Clinic Data', { align: 'center' });

  clinic.forEach((clinic, index) => {
    doc.fontSize(12).text(`Clinic #${index + 1}`);
    doc.text(`Clinic Name: ${clinic.clinicName}`);
    doc.text(`Owner: ${clinic.ownerName}`);
    doc.text(`Website: ${clinic.website}`);
    doc.text(`Tagline: ${clinic.tagline}`);
    doc.text(`Status: ${clinic.status}`);
    doc.text(`Slot Duration: ${clinic.calenderslotDuration}`);
    doc.text(`Appointment Duration: ${clinic.appointmentDuration}`);
    doc.text(`Teeth Numbering: ${clinic.teethNumberingSystem}`);
    doc.text(`Custom Patient ID: ${clinic.customPatientId}`);
    doc.text(`Allow Voucher: ${clinic.allowVoucher}`);
    doc.moveDown();
  });
  doc.end();
};


const createCenter = async (data) => {
  return await Center.create(data);
}

const getCenters = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Center.find().sort({ createdAt: sortOrder });
}

const searchnameCenters = async (name) => {
  if (!name) throw new Error("name is required");

  return await Center.find({
    centerName: { $regex: name, $options: "i" }
  });
};

const searchdateCenters = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Center.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getCenterById = async (id) => {
  return await Center.findById(id);
}

const updateCenter = async (id, data) => {
  return await Center.findByIdAndUpdate(id, data, { new: true });
}

const deleteCenter = async (id) => {
  return await Center.findByIdAndDelete(id);
}


const getCenterstatus = async (status) => {
  return await Center.find({ status: status });
}

const generateExcelCenter = async (res) => {
  try {
    const rawCenters = await Center.find().lean();

    if (!rawCenters.length) {
      return res.status(404).json({ message: 'No centers found' });
    }

    const centers = rawCenters.map(doc => {
      const flat = flatten(doc, { safe: true });
    
      Object.keys(flat).forEach(key => {
        if (flat[key] === null || flat[key] === undefined || flat[key] === '') {
          flat[key] = '-';
        }
      });
    
      return flat;
    });
    

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Centers');

    worksheet.columns = [
      { header: 'Center Name', key: 'centerName', width: 25 },
      { header: 'Short Name', key: 'shortName', width: 25 },
      { header: 'Address Line 1', key: 'address1', width: 25 },
      { header: 'Address Line 2', key: 'address2', width: 25 },
      { header: 'City', key: 'city', width: 25 },
      { header: 'State', key: 'state', width: 25 },
      { header: 'Zip Code', key: 'zipCode', width: 25 },
      { header: 'Area Code', key: 'areaCode', width: 25 },
      { header: 'Top Color', key: 'topColor', width: 25 },
      { header: 'GSTIN', key: 'gstIn', width: 25 },
      { header: 'Landline', key: 'landline', width: 25 },
      { header: 'Rate Card', key: 'ratecard', width: 25 },
      { header: 'Registration No.', key: 'registration', width: 25 },
      { header: 'Primary Email', key: 'emailId', width: 25 },
      { header: 'Mobile Number', key: 'mobile', width: 25 },
      { header: 'Country Code', key: 'ForEmailandMessage.countycode', width: 25 },
      { header: 'Contact Number', key: 'ForEmailandMessage.contactNo', width: 25 },
      { header: 'Message Email', key: 'ForEmailandMessage.emailId', width: 25 },
      { header: 'CC Email', key: 'ForEmailandMessage.ccEmailid', width: 25 },
      { header: 'Sender Name', key: 'ForEmailandMessage.emailSendName', width: 25 },
      { header: 'Working Hour Line 1', key: 'Workinghours.tex1', width: 25 },
      { header: 'Working Hour Line 2', key: 'Workinghours.tex2', width: 25 },
      { header: 'Working Hour Line 3', key: 'Workinghours.tex3', width: 25 },
      { header: 'Google Map Link', key: 'googleMapLink', width: 25 },
      { header: 'Include Map Link', key: 'includeMapLink', width: 25 },
      { header: 'Instamojo Private Key', key: 'instamojoPrivatekey', width: 25 },
      { header: 'Instamojo Auth Token', key: 'instamojoAuthtoken', width: 25 },
      { header: 'Instamojo Mobile', key: 'instamojoMobile', width: 25 },
      { header: 'Cashfree Payment Link', key: 'cashfreePaymentLink', width: 25 },
      { header: 'Longitude', key: 'geolocationLongitude', width: 25 },
      { header: 'Latitude', key: 'geolocationLatitude', width: 25 },
      { header: 'Notes', key: 'notes', width: 25 },
      { header: 'Active Status', key: 'active', width: 25 },
    ];
    

    worksheet.addRows(centers);
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    });
    

    const buffer = await workbook.xlsx.writeBuffer(); // ✅ generates valid Excel

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=\"Center.xlsx\"');

    res.end(buffer); 
  } catch (err) {
    console.error('Excel download error:', err);
    res.status(500).send('Error generating Excel');
  }
};


const generatePdfCenter = async (res) => {
  const center = await Center.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Center.pdf`);
  doc.pipe(res);
  doc.text('Center Data', { align: 'center' });

  center.forEach((center, index) => {
    doc.fontSize(12).text(`Center #${index + 1}`);
    doc.text(`Center Name: ${center.centerName}`);
    doc.text(`Short Name: ${center.shortName}`);
    doc.text(`Address: ${center.Address}, ${center.Locality}, ${center.city}, ${center.state}, ${center.ZipCode}`);
    doc.text(`Email: ${center.Emailid}`);
    doc.text(`Mobile: ${center.Mobile}`);
    doc.text(`Map Link: ${center.Googlemaplink}`);
    doc.text(`Notes: ${center.Notes}`);
    doc.moveDown();
  });
  doc.end();
};


const createDoctor = async (data) => {
  return await Doctor.create(data);
}

const getDoctors = async (order) => {
  return await Doctor.find().populate('centerId');
}

const searchnameDoctors = async (name) => {
  if (!name) throw new Error("name is required");

  return await Doctor.find({
    Name: { $regex: name, $options: "i" }
  });
};

const searchdateDoctors = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Doctor.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getDoctorById = async (id) => {
  return await Doctor.findById(id);
}

const updateDoctor = async (id, data) => {
  return await Doctor.findByIdAndUpdate(id, data, { new: true });
}

const deleteDoctor = async (id) => {
  return await Doctor.findByIdAndDelete(id);
}

const getDoctorstatus = async (status) => {
  return await Doctor.find({ status: status });
}

// const generateExcelDoctor = async (res) => {
//   const doctor = await Doctor.find()
//   const workbook = new Excel.Workbook();
//   const worksheet = workbook.addWorksheet('Doctor');
//   worksheet.columns = Object.keys(doctor[0].toObject()).map((key) => ({
//     header: key,
//     key,
//     width: 25,
//   }));

//   doctor.forEach((doctor) => {
//     worksheet.addRow(doctor.toObject());
//   });

//   res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//   res.attachment('Doctor.xlsx');
//   await workbook.xlsx.write(res);
//   res.end();

// };

const generateExcelDoctor = async (res) => {
  try {
    const rawDoctors = await Doctor.find().populate('centerId', 'centerName').lean();

    if (!rawDoctors.length) {
      return res.status(404).json({ message: 'No doctors found' });
    }

    const doctors = rawDoctors.map(doc => {
      const flat = flatten(doc, { safe: true });

      for (let key in flat) {
        if (flat[key] === null || flat[key] === undefined || flat[key] === "") {
          flat[key] = "-";
        }
      }

      return flat;
    });

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Doctors');

    worksheet.columns = [
      { header: 'Profile Image', key: 'profile', width: 25 },
      { header: 'Center Name', key: 'centerId.centerName', width: 25 },
      { header: 'Title', key: 'title', width: 25 },
      { header: 'First Name', key: 'name', width: 25 },
      { header: 'Middle Name', key: 'middleName', width: 25 },
      { header: 'Surname', key: 'surname', width: 25 },
      { header: 'Suffix', key: 'suffix', width: 25 },
      { header: 'Gender', key: 'gender', width: 25 },
      { header: 'Date of Birth', key: 'dateOfBirth', width: 25 },
      { header: 'Country Code 1', key: 'countrycode1', width: 25 },
      { header: 'Mobile 1', key: 'mobile1', width: 25 },
      { header: 'Country Code 2', key: 'countrycode2', width: 25 },
      { header: 'Mobile 2', key: 'mobile2', width: 25 },
      { header: 'Personal Email', key: 'emailidPersonal', width: 30 },
      { header: 'Work Email', key: 'emailidWork', width: 30 },
      { header: 'Role', key: 'role', width: 20 },
      { header: 'Accountant', key: 'accountant', width: 15 },
      { header: 'Marketing', key: 'marketing', width: 15 },
      { header: 'Telecaller', key: 'telecaller', width: 15 },
      { header: 'Experience', key: 'experience', width: 25 },
      { header: 'Qualification', key: 'qualification', width: 25 },
      { header: 'Speciality', key: 'speciality', width: 25 },
      { header: 'Registration No.', key: 'regnNo', width: 25 },
      { header: 'Registration Authority', key: 'regnAuthority', width: 25 },
      { header: 'Staff Color', key: 'staffColor', width: 25 },
      { header: 'Quick Note Color', key: 'quicknotecolor', width: 25 },
      { header: 'Appointment View Access', key: 'allowedtoseeappointments', width: 30 },
      { header: 'Short Name', key: 'shortName', width: 25 },
      { header: 'Send Appointment Summary', key: 'sendappointmentSummary', width: 30 },
      { header: 'Appointment Summary SMS', key: 'appointmentSummarySMS', width: 30 },
      { header: 'Appointment Summary Email', key: 'appointmentSummarEmail', width: 30 },
      { header: 'Default View', key: 'defaultViews', width: 25 },
      { header: 'Stack View Enabled', key: 'stackview', width: 20 },
      { header: 'Show In Doctor View', key: 'showindoctorview', width: 20 },
      { header: 'Consultant', key: 'consultant', width: 15 },
      { header: 'Orthodontist', key: 'orthodontist', width: 15 },
      { header: 'Sequence Number', key: 'sequenceNumber', width: 25 },
      { header: 'Show In Clinic Profile', key: 'showinclinicProfile', width: 30 },
      { header: 'Self Description', key: 'selfDescription', width: 40 },
      { header: 'Notes', key: 'sotes', width: 40 },
      { header: 'Active', key: 'active', width: 15 },
    ];

    worksheet.addRows(doctors);

    // Center all cells
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Doctor.xlsx"');
    res.end(buffer);
  } catch (err) {
    console.error('Doctor Excel generation failed:', err);
    res.status(500).send('Error generating Excel file');
  }
};

const generatePdfDoctor = async (res) => {
  const doctor = await Doctor.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Doctor.pdf`);
  doc.pipe(res);
  doc.text('Doctor Data', { align: 'center' });

  doctor.forEach((doctor, index) => {
    doc.fontSize(12).text(`Doctor ${index + 1}:`)
      .text(`Name: ${doctor.Title} ${doctor.Name} ${doctor.Surname}`)
      .text(`Gender: ${doctor.Gender}`)
      .text(`Center: ${doctor.Centerid?.centerName || "N/A"}`)
      .text(`Email: ${doctor.EmailidWork || "N/A"}`)
      .text(`Speciality: ${doctor.Speciality || "N/A"}`)
      .text(`Experience: ${doctor.Experience || "N/A"}`)
      .moveDown();
  });
  doc.end();
};

const createStaff = async (data) => {
  return await Staff.create(data);
}

const getStaffs = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Staff.find().sort({ createdAt: sortOrder });
}

const searchnameStaffs = async (name) => {
  if (!name) throw new Error("name is required");

  return await Staff.find({
    Name: { $regex: name, $options: "i" }
  });
};

const searchdateStaffs = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Staff.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getStaffById = async (id) => {
  return await Staff.findById(id);
}

const updateStaff = async (id, data) => {
  return await Staff.findByIdAndUpdate(id, data, { new: true });
}

const deleteStaff = async (id) => {
  return await Staff.findByIdAndDelete(id);
}

const getStaffstatus = async (status) => {
  return await Staff.find({ status: status });
}

const generateExcelStaff = async (res) => {
  const staff = await Staff.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Staff');
  worksheet.columns = Object.keys(staff[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  staff.forEach((staff) => {
    worksheet.addRow(staff.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Staff.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfStaff = async (res) => {
  const staff = await Staff.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Staff.pdf`);
  doc.pipe(res);
  doc.text('Staff Data', { align: 'center' });

  staff.forEach((staff, index) => {
    doc.fontSize(12).text(`Staff ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${staff.Title || ""} ${staff.Name || ""} ${staff.MiddleName || ""} ${staff.Surname || ""}`)
      .text(`Gender: ${staff.Gender || "N/A"}`)
      .text(`Date of Birth: ${staff.DateofBirth || "N/A"}`)
      .text(`Mobile 1: ${staff.Countrycode1 || ""} ${staff.Mobile1 || ""}`)
      .text(`Mobile 2: ${staff.Countrycode2 || ""} ${staff.Mobile2 || ""}`)
      .text(`Email (Personal): ${staff.EmailidPersonal || "N/A"}`)
      .text(`Email (Work): ${staff.EmailidWork || "N/A"}`)
      .text(`Center: ${staff.Centerid?.centerName || "N/A"}`)
      .text(`Role: ${staff.Role || "N/A"}`)
      .text(`Speciality: ${staff.Speciality || "N/A"}`)
      .text(`Qualification: ${staff.Qualification || "N/A"}`)
      .text(`Experience: ${staff.Experience || "N/A"}`)
      .text(`Active: ${staff.Active ? "Yes" : "No"}`)
      .text(`Accountant: ${staff.Accountant ? "Yes" : "No"}`)
      .text(`Marketing: ${staff.Marketing ? "Yes" : "No"}`)
      .text(`Telecaller: ${staff.Telecaller ? "Yes" : "No"}`)
      .moveDown(1);
  });
  doc.end();
};

const createHoliday = async (data) => {
  return await Holiday.create(data);
}

const getHolidays = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Holiday.find().sort({ createdAt: sortOrder });
}

const searchnameHolidays = async (name) => {
  if (!name) throw new Error("name is required");

  return await Holiday.find({
    HolidayReason: { $regex: name, $options: "i" }
  });
};

const searchdateHolidays = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Holiday.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getHolidayById = async (id) => {
  return await Holiday.findById(id);
}

const updateHoliday = async (id, data) => {
  return await Holiday.findByIdAndUpdate(id, data, { new: true });
}

const deleteHoliday = async (id) => {
  return await Holiday.findByIdAndDelete(id);
}

const getHolidaystatus = async (status) => {
  return await Holiday.find({ status: status });
}

const generateExcelHoliday = async (res) => {
  const holiday = await Holiday.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Holiday');
  worksheet.columns = Object.keys(holiday[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  holiday.forEach((holiday) => {
    worksheet.addRow(holiday.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Holiday.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfHoliday = async (res) => {
  const holiday = await Holiday.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Holiday.pdf`);
  doc.pipe(res);
  doc.text('Holiday Data', { align: 'center' });

  holiday.forEach((holiday, index) => {
    doc.fontSize(12).text(`Holiday ${index + 1}:`, { underline: true });
    doc
      .text(`Reason: ${holiday.HolidayReason}`)
      .text(`Date: ${holiday.Date}`)
      .text(`Recurring: ${holiday.RecurringHoliday ? "Yes" : "No"}`)
      .text(`Status: ${holiday.status}`)
      .text(`Notes: ${holiday.Notes || "N/A"}`)
      .moveDown(1);
  });
  doc.end();
};

const createOperatory = async (data) => {
  return await Operatory.create(data);
}

const getOperatorys = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Operatory.find().sort({ createdAt: sortOrder });
}

const searchnameOperatorys = async (name) => {
  if (!name) throw new Error("name is required");

  return await Operatory.find({
    OperatoryName: { $regex: name, $options: "i" }
  });
};

const searchdateOperatorys = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Operatory.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


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

const getGallerys = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Gallery.find().sort({ createdAt: sortOrder });
}

const searchnameGallerys = async (name) => {
  if (!name) throw new Error("name is required");

  return await Gallery.find({
    Title: { $regex: name, $options: "i" }
  });
};

const searchdateGallerys = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Gallery.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

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

const getAppointmentseries = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Appointmentseries.find().sort({ createdAt: sortOrder })
}

const searchnameAppointmentseries = async (name) => {
  if (!name) throw new Error("name is required");

  return await Appointmentseries.find({
    appointmentSeriesName: { $regex: name, $options: "i" }
  });
};

const searchdateAppointmentseries = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Appointmentseries.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getAppointmentseriesById = async (id) => {
  return await Appointmentseries.findById(id);
}

const updateAppointmentseries = async (id, data) => {
  return await Appointmentseries.findByIdAndUpdate(id, data, { new: true });
}

const deleteAppointmentseries = async (id) => {
  return await Appointmentseries.findByIdAndDelete(id);
}

const getAppointmentseriesstatus = async (status) => {
  return await Appointmentseries.find({ status: status });
}

const generateExcelAppointmentseries = async (res) => {
  const appointmentseries = await Appointmentseries.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Appointmentseries');
  worksheet.columns = Object.keys(appointmentseries[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  appointmentseries.forEach((appointmentseries) => {
    worksheet.addRow(appointmentseries.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Appointmentseries.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfAppointmentseries = async (res) => {
  const appointmentseries = await Appointmentseries.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Appointmentseries.pdf`);
  doc.pipe(res);
  doc.text('Appointmentseries Data', { align: 'center' });

  appointmentseries.forEach((series, index) => {
    doc.fontSize(12).text(`Appointment Series ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${series.appointmentSeriesName}`)
      .text(`Reference Date: ${series.referenceDate ? new Date(series.referenceDate).toLocaleDateString() : "N/A"}`)
      .text(`Treatment Category: ${series.treatmentCategory || "Not Specified"}`)
      .text(`Notes: ${series.notes || "N/A"}`)
      .text(`Number of Appointments: ${series.numberOfAppointments || "N/A"}`)
      .text(`Visits: ${series.visits?.length ? series.visits.join(", ") : "None"}`)
      .text(`Reminder: Send On: ${series.reminder?.sendOn || "N/A"}, Time: ${series.reminder?.time || "N/A"}`)
      .text(`Status: ${series.status || "Inactive"}`)
      .moveDown(1);
  });
  doc.end();
};

const createProject = async (data) => {
  return await Project.create(data);
}

const getProjects = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Project.find().sort({ createdAt: sortOrder });
}

const searchnameProjects = async (name) => {
  if (!name) throw new Error("name is required");

  return await Project.find({
    projectName: { $regex: name, $options: "i" }
  });
};

const searchdateProjects = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Project.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


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

const getBankaccounts = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Bankaccount.find().sort({ createdAt: sortOrder });
}

const searchnameBankaccounts = async (name) => {
  if (!name) throw new Error("name is required");

  return await Bankaccount.find({
    bankName: { $regex: name, $options: "i" }
  });
};

const searchdateBankaccounts = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Bankaccount.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getBankaccountById = async (id) => {
  return await Bankaccount.findById(id);
}

const updateBankaccount = async (id, data) => {
  return await Bankaccount.findByIdAndUpdate(id, data, { new: true });
}

const deleteBankaccount = async (id) => {
  return await Bankaccount.findByIdAndDelete(id);
}

const getBankaccountstatus = async (status) => {
  return await Bankaccount.find({ status: status });
}

const generateExcelBankaccount = async (res) => {
  const bankaccount = await Bankaccount.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Bankaccount');
  worksheet.columns = Object.keys(bankaccount[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  bankaccount.forEach((bankaccount) => {
    worksheet.addRow(bankaccount.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Bankaccount.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfBankaccount = async (res) => {
  const bankaccount = await Bankaccount.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Bankaccount.pdf`);
  doc.pipe(res);
  doc.text('Bankaccount Data', { align: 'center' });

  bankaccount.forEach((account, index) => {
    doc.fontSize(12).text(`Bank Account ${index + 1}:`, { underline: true });
    doc
      .text(`Bank Name: ${account.bankName}`)
      .text(`Branch: ${account.branch || "N/A"}`)
      .text(`City: ${account.city || "N/A"}`)
      .text(`Account Number: ${account.accountNumber || "N/A"}`)
      .text(`Account Name: ${account.accountName || "N/A"}`)
      .text(`IFSC/Routing Number: ${account.ifscOrRoutingNumber || "N/A"}`)
      .text(`Active: ${account.Active ? "Yes" : "No"}`)
      .text(`Notes: ${account.notes || "N/A"}`)
      .text(`Status: ${account.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createCardswipingmachine = async (data) => {
  return await Cardswipingmachine.create(data);
}

const getCardswipingmachines = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Cardswipingmachine.find().sort({ createdAt: sortOrder }).populate('linkedBankAccount');
}

const searchnameCardswipingmachines = async (name) => {
  if (!name) throw new Error("name is required");

  return await Cardswipingmachine.find({
    machineName: { $regex: name, $options: "i" }
  });
};

const searchdateCardswipingmachines = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Cardswipingmachine.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getCardswipingmachineById = async (id) => {
  return await Cardswipingmachine.findById(id);
}

const updateCardswipingmachine = async (id, data) => {
  return await Cardswipingmachine.findByIdAndUpdate(id, data, { new: true });
}

const deleteCardswipingmachine = async (id) => {
  return await Cardswipingmachine.findByIdAndDelete(id);
}

const getCardswipingmachinestatus = async (status) => {
  return await Cardswipingmachine.find({ status: status });
}

const generateExcelCardswipingmachine = async (res) => {
  const cardswipingmachine = await Cardswipingmachine.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Cardswipingmachine');
  worksheet.columns = Object.keys(cardswipingmachine[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  cardswipingmachine.forEach((cardswipingmachine) => {
    worksheet.addRow(cardswipingmachine.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Cardswipingmachine.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfCardswipingmachine = async (res) => {
  const cardswipingmachine = await Cardswipingmachine.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Cardswipingmachine.pdf`);
  doc.pipe(res);
  doc.text('Cardswipingmachine Data', { align: 'center' });

  cardswipingmachine.forEach((machine, index) => {
    doc.fontSize(12).text(`Machine ${index + 1}:`, { underline: true });
    doc
      .text(`Machine Name: ${machine.machineName}`)
      .text(`Issued By: ${machine.issuedBy || "N/A"}`)
      .text(`Linked Bank Account: ${machine.linkedBankAccount?.bankName || "N/A"}`)
      .text(`Active: ${machine.Active ? "Yes" : "No"}`)
      .text(`Notes: ${machine.notes || "N/A"}`)
      .text(`Status: ${machine.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createCash = async (data) => {
  return await Cash.create(data);
}

const getCashs = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Cash.find().sort({ createdAt: sortOrder });
}

const searchnameCashs = async (name) => {
  if (!name) throw new Error("name is required");

  return await Cash.find({
    cash: { $regex: name, $options: "i" }
  });
};

const searchdateCashs = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Cash.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getCashById = async (id) => {
  return await Cash.findById(id);
}

const updateCash = async (id, data) => {
  return await Cash.findByIdAndUpdate(id, data, { new: true });
}

const deleteCash = async (id) => {
  return await Cash.findByIdAndDelete(id);
}

const getCashstatus = async (status) => {
  return await Cash.find({ status: status });
}

const generateExcelCash = async (res) => {
  const cash = await Cash.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Cash');
  worksheet.columns = Object.keys(cash[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  cash.forEach((cash) => {
    worksheet.addRow(cash.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Cash.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfCash = async (res) => {
  const cash = await Cash.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Cash.pdf`);
  doc.pipe(res);
  doc.text('Cash Data', { align: 'center' });

  cash.forEach((cashItem, index) => {
    doc.fontSize(12).text(`Cash Entry ${index + 1}:`, { underline: true });
    doc
      .text(`Cash: ${cashItem.cash}`)
      .text(`searchwords: ${cashItem.searchwords || "N/A"}`)
      .text(`Active: ${cashItem.Active ? "Yes" : "No"}`)
      .text(`Default: ${cashItem.Default ? "Yes" : "No"}`)
      .text(`Notes: ${cashItem.notes || "N/A"}`)
      .text(`Status: ${cashItem.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createCreditcard = async (data) => {
  return await Creditcard.create(data);
}

const getCreditcards = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Creditcard.find().sort({ createdAt: sortOrder });
}

const searchnameCreditcards = async (name) => {
  if (!name) throw new Error("name is required");

  return await Creditcard.find({
    creditcard: { $regex: name, $options: "i" }
  });
};

const searchdateCreditcards = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Creditcard.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getCreditcardById = async (id) => {
  return await Creditcard.findById(id);
}

const updateCreditcard = async (id, data) => {
  return await Creditcard.findByIdAndUpdate(id, data, { new: true });
}

const deleteCreditcard = async (id) => {
  return await Creditcard.findByIdAndDelete(id);
}

const getCreditcardstatus = async (status) => {
  return await Creditcard.find({ status: status });
}

const generateExcelCreditcard = async (res) => {
  const creditcard = await Creditcard.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Creditcard');
  worksheet.columns = Object.keys(creditcard[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  creditcard.forEach((creditcard) => {
    worksheet.addRow(creditcard.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Creditcard.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfCreditcard = async (res) => {
  const creditcard = await Creditcard.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Creditcard.pdf`);
  doc.pipe(res);
  doc.text('Creditcard Data', { align: 'center' });

  creditcard.forEach((card, index) => {
    doc.fontSize(12).text(`Credit Card ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${card.creditcard}`)
      .text(`searchwords: ${card.searchwords || "N/A"}`)
      .text(`Active: ${card.Active ? "Yes" : "No"}`)
      .text(`Default: ${card.Default ? "Yes" : "No"}`)
      .text(`Notes: ${card.notes || "N/A"}`)
      .text(`Status: ${card.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createWallet = async (data) => {
  return await Wallet.create(data);
}

const getWallets = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Wallet.find().sort({ createdAt: sortOrder });
}

const searchnameWallets = async (name) => {
  if (!name) throw new Error("name is required");

  return await Wallet.find({
    wallet: { $regex: name, $options: "i" }
  });
};

const searchdateWallets = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Wallet.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getWalletById = async (id) => {
  return await Wallet.findById(id);
}

const updateWallet = async (id, data) => {
  return await Wallet.findByIdAndUpdate(id, data, { new: true });
}

const deleteWallet = async (id) => {
  return await Wallet.findByIdAndDelete(id);
}

const getWalletstatus = async (status) => {
  return await Wallet.find({ status: status });
}

const generateExcelWallet = async (res) => {
  const wallet = await Wallet.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Wallet');
  worksheet.columns = Object.keys(wallet[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  wallet.forEach((wallet) => {
    worksheet.addRow(wallet.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Wallet.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfWallet = async (res) => {
  const wallet = await Wallet.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Wallet.pdf`);
  doc.pipe(res);
  doc.text('Wallet Data', { align: 'center' });

  wallet.forEach((wallet, index) => {
    doc.fontSize(12).text(`Wallet ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${wallet.wallet}`)
      .text(`searchwords: ${wallet.searchwords || "N/A"}`)
      .text(`Active: ${wallet.Active ? "Yes" : "No"}`)
      .text(`Default: ${wallet.Default ? "Yes" : "No"}`)
      .text(`Notes: ${wallet.notes || "N/A"}`)
      .text(`Status: ${wallet.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createOtherpayment = async (data) => {
  return await Otherpayment.create(data);
}

const getOtherpayments = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Otherpayment.find().sort({ createdAt: sortOrder });
}

const searchnameOtherpayments = async (name) => {
  if (!name) throw new Error("name is required");

  return await Otherpayment.find({
    other: { $regex: name, $options: "i" }
  });
};

const searchdateOtherpayments = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Otherpayment.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


const getOtherpaymentById = async (id) => {
  return await Otherpayment.findById(id);
}

const updateOtherpayment = async (id, data) => {
  return await Otherpayment.findByIdAndUpdate(id, data, { new: true });
}

const deleteOtherpayment = async (id) => {
  return await Otherpayment.findByIdAndDelete(id);
}

const getOtherpaymentstatus = async (status) => {
  return await Otherpayment.find({ status: status });
}

const generateExcelOtherpayment = async (res) => {
  const otherpayment = await Otherpayment.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Otherpayment');
  worksheet.columns = Object.keys(otherpayment[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  otherpayment.forEach((otherpayment) => {
    worksheet.addRow(otherpayment.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Otherpayment.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfOtherpayment = async (res) => {
  const otherpayment = await Otherpayment.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Otherpayment.pdf`);
  doc.pipe(res);
  doc.text('Otherpayment Data', { align: 'center' });

  otherpayment.forEach((other, index) => {
    doc.fontSize(12).text(`Other ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${other.other}`)
      .text(`searchwords: ${other.Searchwords || "N/A"}`)
      .text(`Active: ${other.Active ? "Yes" : "No"}`)
      .text(`Default: ${other.Default ? "Yes" : "No"}`)
      .text(`Status: ${other.status}`)
      .text(`Notes: ${other.notes || "N/A"}`)
      .moveDown(1);
  });
  doc.end();
};

const createBranding = async (data) => {
  return await Branding.create(data);
}

const getBrandings = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Branding.find().sort({ createdAt: sortOrder });
}

const searchnameBrandings = async (name) => {
  if (!name) throw new Error("name is required");

  return await Branding.find({
    clinicName: { $regex: name, $options: "i" }
  });
};

const searchdateBrandings = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Branding.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


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

const getSocialmedias = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Socialmedia.find().sort({ createdAt: sortOrder });
}


const searchnameSocialmedias = async (name) => {
  if (!name) throw new Error("name is required");
  const regexQuery = { $regex: name, $options: "i" };
  return await Socialmedia.find({
    $or: [
      { onlineAppointmentRequestLink: regexQuery },
      { onlineAppointmentBookingLink: regexQuery },
      { facebookPageLink: regexQuery },
      { instagramPageLink: regexQuery },
      { googleReviewPageLink: regexQuery },
      { justDialLink: regexQuery },
      { otherLink: regexQuery }
    ]
  });
};

const searchdateSocialmedia = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Socialmedia.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};


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

const getRatecards = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Ratecard.find().sort({ createdAt: sortOrder });
}

const searchnameRatecards = async (name) => {
  if (!name) throw new Error("name is required");

  return await Ratecard.find({
    ratecardName: { $regex: name, $options: "i" }
  });
};

const searchdateRatecards = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Ratecard.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getRatecardById = async (id) => {
  return await Ratecard.findById(id);
}

const updateRatecard = async (id, data) => {
  return await Ratecard.findByIdAndUpdate(id, data, { new: true });
}

const deleteRatecard = async (id) => {
  return await Ratecard.findByIdAndDelete(id);
}

const getRatecardstatus = async (status) => {
  return await Ratecard.find({ status: status });
}

const generateExcelRatecard = async (res) => {
  const ratecard = await Ratecard.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Ratecard');
  worksheet.columns = Object.keys(ratecard[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  ratecard.forEach((ratecard) => {
    worksheet.addRow(ratecard.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Ratecard.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfRatecard = async (res) => {
  const ratecard = await Ratecard.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Ratecard.pdf`);
  doc.pipe(res);
  doc.text('Ratecard Data', { align: 'center' });

  ratecard.forEach((ratecard, index) => {
    doc.fontSize(12).text(`Ratecard ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${ratecard.ratecardName}`)
      .text(`Patient Label: ${ratecard.patientLabel || "N/A"}`)
      .text(`Notes: ${ratecard.notes || "N/A"}`)
      .text(`Billable: ${ratecard.billable ? "Yes" : "No"}`)
      .text(`Active: ${ratecard.active ? "Yes" : "No"}`)
      .text(`Associated with Insurance: ${ratecard.associateWithInsurance ? "Yes" : "No"}`)
      .text(`Status: ${ratecard.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createPackage = async (data) => {
  return await Package.create(data);
}

const getPackage = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Package.find().sort({ createdAt: sortOrder });
}

const searchnamePackages = async (name) => {
  if (!name) throw new Error("name is required");

  return await Package.find({
    packageName: { $regex: name, $options: "i" }
  });
};

const searchdatePackages = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Package.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getPackageById = async (id) => {
  return await Package.findById(id);
}

const updatePackage = async (id, data) => {
  return await Package.findByIdAndUpdate(id, data, { new: true });
}

const deletePackage = async (id) => {
  return await Package.findByIdAndDelete(id);
}

const getPackagestatus = async (status) => {
  return await Package.find({ status: status });
}

const generateExcelPackage = async (res) => {
  const packages = await Package.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Package');
  worksheet.columns = Object.keys(packages[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  packages.forEach((packages) => {
    worksheet.addRow(packages.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Package.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfPackage = async (res) => {
  const packages = await Package.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Package.pdf`);
  doc.pipe(res);
  doc.text('Package Data', { align: 'center' });

  packages.forEach((pkg, index) => {
    doc.fontSize(12).text(`Package ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${pkg.packageName}`)
      .text(`Notes: ${pkg.notes || "N/A"}`)
      .text(`Status: ${pkg.status}`)
      .moveDown(0.5)
      .fontSize(11)
      .text("Treatments:", { underline: true });

    pkg.treatments.forEach((treatment, i) => {
      doc
        .text(`  ${i + 1}. Treatment Name: ${treatment.treatmentName}`)
        .text(`     Charges: ₹${treatment.charges}`)
        .text(`     Tax: ${treatment.tax}%`)
        .moveDown(0.3);
    });

    doc.moveDown(1);
  });
  doc.end();
};

const createSpecialistfees = async (data) => {
  return await Specialistfees.create(data);
}

const getSpecialistfees = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Specialistfees.find().sort({ createdAt: sortOrder });
}

const searchnameSpecialistfees = async (name) => {
  if (!name) throw new Error("name is required");

  return await Specialistfees.find({
    doctorName: { $regex: name, $options: "i" }
  });
};

const searchdateSpecialistfees = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Specialistfees.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

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

const getClinicalnotes = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Clinicalnotes.find().sort({ createdAt: sortOrder });
}

const searchnameClinicalnotes = async (name) => {
  if (!name) throw new Error("name is required");

  return await Clinicalnotes.find({
    clinicalNotesType: { $regex: name, $options: "i" }
  });
};

const searchdateClinicalnotes = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Clinicalnotes.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getClinicalnotesById = async (id) => {
  return await Clinicalnotes.findById(id);
}

const updateClinicalnotes = async (id, data) => {
  return await Clinicalnotes.findByIdAndUpdate(id, data, { new: true });
}

const deleteClinicalnotes = async (id) => {
  return await Clinicalnotes.findByIdAndDelete(id);
}

const getClinicalnotesstatus = async (status) => {
  return await Clinicalnotes.find({ status: status });
}

const generateExcelClinicalnotes = async (res) => {
  const clinicalnotes = await Clinicalnotes.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Clinicalnotes');
  worksheet.columns = Object.keys(clinicalnotes[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  clinicalnotes.forEach((clinicalnotes) => {
    worksheet.addRow(clinicalnotes.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Clinicalnotes.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfClinicalnotes = async (res) => {
  const clinicalnotes = await Clinicalnotes.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Clinicalnotes.pdf`);
  doc.pipe(res);
  doc.text('Clinicalnotes Data', { align: 'center' });

  clinicalnotes.forEach((note, index) => {
    doc.fontSize(12).text(`Clinical Note ${index + 1}:`, { underline: true });
    doc
      .text(`Type: ${note.clinicalNotesType}`)
      .text(`Notes: ${note.notes}`)
      .text(`Remark: ${note.remark || "N/A"}`)
      .text(`Active: ${note.active ? "Yes" : "No"}`)
      .text(`Status: ${note.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createTreatmentcategory = async (data) => {
  return await Treatmentcategory.create(data);
}

const getTreatmentcategory = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Treatmentcategory.find().sort({ createdAt: sortOrder });
}

const searchnameTreatmentcategorys = async (name) => {
  if (!name) throw new Error("name is required");

  return await Treatmentcategory.find({
    treatmentCategory: { $regex: name, $options: "i" }
  });
};

const searchdateTreatmentcategorys = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Treatmentcategory.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getTreatmentcategoryBymonth = async (month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);
  return await Treatmentcategory.find({
    createdAt: { $gte: start, $lte: end }
  })
}

const getTreatmentcategoryById = async (id) => {
  return await Treatmentcategory.findById(id);
}

const updateTreatmentcategory = async (id, data) => {
  return await Treatmentcategory.findByIdAndUpdate(id, data, { new: true });
}

const deleteTreatmentcategory = async (id) => {
  return await Treatmentcategory.findByIdAndDelete(id);
}

const getTreatmentcategorystatus = async (status) => {
  return await Treatmentcategory.find({ status: status });
}

const generateExcelTreatmentcategory = async (res) => {
  const Treatmentcategory = await Treatmentcategory.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Treatmentcategory');
  worksheet.columns = Object.keys(Treatmentcategory[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  Treatmentcategory.forEach((Treatmentcategory) => {
    worksheet.addRow(Treatmentcategory.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Treatmentcategory.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfTreatmentcategory = async (res) => {
  const Treatmentcategory = await Treatmentcategory.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Treatmentcategory.pdf`);
  doc.pipe(res);
  doc.text('Treatmentcategory Data', { align: 'center' });

  Treatmentcategory.forEach((cat, index) => {
    doc.fontSize(12).text(`Category ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${cat.treatmentCategory}`)
      .text(`HSN Code: ${cat.hsnCode || "N/A"}`)
      .text(`Color: ${cat.treatmentCategoryColor || "N/A"}`)
      .text(`Appointment Duration: ${cat.appointmentDuration}`)
      .text(`SMS Hours: ${cat.smshours || "N/A"}`)
      .text(`Send SMS: ${cat.sendsms ? "Yes" : "No"}`)
      .text(`SMS Text: ${cat.smsText || "N/A"}`)
      .text(`DLT Template ID: ${cat.DLTtmplateid || "N/A"}`)
      .text(`Send WhatsApp: ${cat.sendwa ? "Yes" : "No"}`)
      .text(`WhatsApp Text: ${cat.waText || "N/A"}`)
      .text(`Image: ${cat.image || "N/A"}`)
      .text(`Email Hours: ${cat.emailhours || "N/A"}`)
      .text(`Send Email: ${cat.sendemail ? "Yes" : "No"}`)
      .text(`Email Template: ${cat.emailTemplate || "N/A"}`)
      .text(`Notes: ${cat.notes || "N/A"}`)
      .text(`Active: ${cat.active ? "Yes" : "No"}`)
      .text(`Status: ${cat.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createTreatment = async (data) => {
  return await Treatment.create(data);
}

const getTreatment = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Treatment.find().sort({ createdAt: sortOrder }).populate('treatmentCategory');
}

const searchnameTreatments = async (name) => {
  if (!name) throw new Error("name is required");

  return await Treatment.find({
    treatmentName: { $regex: name, $options: "i" }
  });
};

const searchdateTreatments = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Treatment.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getTreatmentBymonth = async (month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);
  return await Treatment.find({
    createdAt: { $gte: start, $lte: end }
  })
}

const getTreatmentById = async (id) => {
  return await Treatment.findById(id);
}

const updateTreatment = async (id, data) => {
  return await Treatment.findByIdAndUpdate(id, data, { new: true });
}

const deleteTreatment = async (id) => {
  return await Treatment.findByIdAndDelete(id);
}

const getTreatmentstatus = async (status) => {
  return await Treatment.find({ status: status });
}

const generateExcelTreatment = async (res) => {
  const treatment = await Treatment.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Treatment');
  worksheet.columns = Object.keys(treatment[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  treatment.forEach((treatment) => {
    worksheet.addRow(treatment.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Treatment.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfTreatment = async (res) => {
  const treatment = await Treatment.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Treatment.pdf`);
  doc.pipe(res);
  doc.text('Treatment Data', { align: 'center' });

  treatment.forEach((t, index) => {
    doc.fontSize(12).text(`Treatment ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${t.treatmentName}`)
      .text(`Category: ${t.treatmentCategory?.treatmentCategory || "N/A"}`)
      .text(`HSN Code: ${t.hsnCode || "N/A"}`)
      .text(`Default Charges: ₹${t.defaultCharges || 0}`)
      .text(`Per Unit: ${t.perunit ? "Yes" : "No"}`)
      .text(`Tax Rate: ${t.taxRate || 0}%`)
      .text(`Total Charges: ₹${t.totalCharges || 0}`)
      .text(`Sittings: ${t.usualNumberOfSittings || "N/A"}`)
      .text(`Lab Task Applicable: ${t.labTaskApplicable ? "Yes" : "No"}`)
      .text(`Lab Charges: ₹${t.labDefaultCharges || 0}`)
      .text(`Lab Return Days: ${t.usualLabReturnDays || "N/A"}`)
      .text(`Lab Warranty: ${t.warrantyFromLab || "N/A"} days`)
      .text(`Charting Icon: ${t.chartingicon || "N/A"}`)
      .text(`Send SMS: ${t.sendSms ? "Yes" : "No"}`)
      .text(`SMS Text: ${t.smstext || "N/A"}`)
      .text(`DLT Template ID: ${t.DLTTemplateid || "N/A"}`)
      .text(`Send WA: ${t.sendWA ? "Yes" : "No"}`)
      .text(`WA Text: ${t.WAtext || "N/A"}`)
      .text(`Image: ${t.image || "N/A"}`)
      .text(`Send Recall SMS: ${t.sendtreatmentspecificrecallsms ? "Yes" : "No"}`)
      .text(`Recall SMS Text: ${t.recallSMStext || "N/A"}`)
      .text(`Email Subject: ${t.EmailSubject || "N/A"}`)
      .text(`Warranty to Patient: ${t.WarrantyToPatient || "N/A"}`)
      .text(`Notes: ${t.Notes || "N/A"}`)
      .text(`Active: ${t.active ? "Yes" : "No"}`)
      .text(`Status: ${t.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createSittingnote = async (data) => {
  return await Sittingnote.create(data);
}

const getSittingnote = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Sittingnote.find().sort({ createdAt: sortOrder }).populate('treatmentCategory');
}

const searchnameSittingnotes = async (name) => {
  if (!name) throw new Error("name is required");

  return await Sittingnote.find({
    sittingNoteTemplate: { $regex: name, $options: "i" }
  });
};

const searchdateSittingnotes = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Sittingnote.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getSittingnoteById = async (id) => {
  return await Sittingnote.findById(id);
}

const updateSittingnote = async (id, data) => {
  return await Sittingnote.findByIdAndUpdate(id, data, { new: true });
}

const deleteSittingnote = async (id) => {
  return await Sittingnote.findByIdAndDelete(id);
}

const getSittingnotestatus = async (status) => {
  return await Sittingnote.find({ status: status });
}

const generateExcelSittingnote = async (res) => {
  const sittingnote = await Sittingnote.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sittingnote');
  worksheet.columns = Object.keys(sittingnote[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  sittingnote.forEach((sittingnote) => {
    worksheet.addRow(sittingnote.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Sittingnote.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfSittingnote = async (res) => {
  const sittingnote = await Sittingnote.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Sittingnote.pdf`);
  doc.pipe(res);
  doc.text('Sittingnote Data', { align: 'center' });

  sittingnote.forEach((t, index) => {
    doc.fontSize(12).text(`Template ${index + 1}:`, { underline: true });
    doc
      .text(`Treatment Category: ${t.treatmentCategory}`)
      .text(`Template: ${t.sittingNoteTemplate}`)
      .text(`Notes: ${t.notes || "N/A"}`)
      .text(`Status: ${t.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createDrug = async (data) => {
  return await Drug.create(data);
}

const getDrug = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Drug.find().sort({ createdAt: sortOrder });
}

const searchnameDrugs = async (name) => {
  if (!name) throw new Error("name is required");

  return await Drug.find({
    drugName: { $regex: name, $options: "i" }
  });
};

const searchdateDrugs = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Drug.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getDrugById = async (id) => {
  return await Drug.findById(id);
}

const updateDrug = async (id, data) => {
  return await Drug.findByIdAndUpdate(id, data, { new: true });
}

const deleteDrug = async (id) => {
  return await Drug.findByIdAndDelete(id);
}

const getDrugstatus = async (status) => {
  return await Drug.find({ status: status });
}

const generateExcelDrug = async (res) => {
  const drug = await Drug.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Drug');
  worksheet.columns = Object.keys(drug[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  drug.forEach((drug) => {
    worksheet.addRow(drug.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Drug.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfDrug = async (res) => {
  const drug = await Drug.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Drug.pdf`);
  doc.pipe(res);
  doc.text('Drug Data', { align: 'center' });

  drug.forEach((drug, index) => {
    doc.fontSize(12).text(`Drug ${index + 1}:`, { underline: true });
    doc
      .text(`Code: ${drug.drugCode || "N/A"}`)
      .text(`Name: ${drug.drugName}`)
      .text(`Type: ${drug.drugType}`)
      .text(`Strength: ${drug.strength || "N/A"}`)
      .text(`Morning Qty: ${drug.morningQty}`)
      .text(`Noon Qty: ${drug.noonQty}`)
      .text(`Night Qty: ${drug.nightQty}`)
      .text(`Duration: ${drug.duration || "N/A"}`)
      .text(`Total Qty: ${drug.totalQty}`)
      .text(`Calculate Total Qty: ${drug.calculateTotalQty ? "Yes" : "No"}`)
      .text(`Food: ${drug.food || "N/A"}`)
      .text(`Instruction: ${drug.instruction || "N/A"}`)
      .text(`Composition: ${drug.composition || "N/A"}`)
      .text(`Route of Administration: ${drug.routeOfAdmin}`)
      .text(`Active: ${drug.active ? "Yes" : "No"}`)
      .text(`Notes: ${drug.notes || "N/A"}`)
      .text(`Remark: ${drug.remark || "N/A"}`)
      .text(`Status: ${drug.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createInstruction = async (data) => {
  return await Instruction.create(data);
}

const getInstruction = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Instruction.find().sort({ createdAt: sortOrder });
}

const searchnameInstructions = async (name) => {
  if (!name) throw new Error("name is required");

  return await Instruction.find({
    name: { $regex: name, $options: "i" }
  });
};

const searchdateInstructions = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Instruction.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getInstructionById = async (id) => {
  return await Instruction.findById(id);
}

const updateInstruction = async (id, data) => {
  return await Instruction.findByIdAndUpdate(id, data, { new: true });
}

const deleteInstruction = async (id) => {
  return await Instruction.findByIdAndDelete(id);
}

const getInstructionstatus = async (status) => {
  return await Instruction.find({ status: status });
}

const generateExcelInstruction = async (res) => {
  const instruction = await Instruction.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Instruction');
  worksheet.columns = Object.keys(instruction[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  instruction.forEach((instruction) => {
    worksheet.addRow(instruction.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Instruction.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfInstruction = async (res) => {
  const instruction = await Instruction.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Instruction.pdf`);
  doc.pipe(res);
  doc.text('Instruction Data', { align: 'center' });

  instruction.forEach((instruction, index) => {
    doc.fontSize(12).text(`Instruction ${index + 1}:`, { underline: true });
    doc
      .text(`Name: ${instruction.name}`)
      .text(`Text: ${instruction.text}`)
      .text(`Notes: ${instruction.notes || "N/A"}`)
      .text(`Status: ${instruction.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createInsurance = async (data) => {
  return await Insurance.create(data);
}

const getInsurance = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Insurance.find().sort({ createdAt: sortOrder });
}

const searchnameInsurances = async (name) => {
  if (!name) throw new Error("name is required");

  return await Insurance.find({
    name: { $regex: name, $options: "i" }
  });
};

const searchdateInsurances = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await insurance.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getInsuranceById = async (id) => {
  return await Insurance.findById(id);
}

const updateInsurance = async (id, data) => {
  return await Insurance.findByIdAndUpdate(id, data, { new: true });
}

const deleteInsurance = async (id) => {
  return await Insurance.findByIdAndDelete(id);
}

const getInsurancestatus = async (status) => {
  return await Insurance.find({ status: status });
}

const generateExcelInsurance = async (res) => {
  const insurance = await Insurance.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Insurance');
  worksheet.columns = Object.keys(insurance[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  insurance.forEach((insurance) => {
    worksheet.addRow(insurance.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Insurance.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfInsurance = async (res) => {
  const insurance = await Insurance.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Insurance.pdf`);
  doc.pipe(res);
  doc.text('Insurance Data', { align: 'center' });

  insurance.forEach((insurance, index) => {
    doc.fontSize(12).text(`Insurance ${index + 1}:`, { underline: true });
    doc
      .text(`Company Name: ${insurance.companyname || "N/A"}`)
      .text(`Name: ${insurance.name}`)
      .text(`Notes: ${insurance.notes || "N/A"}`)
      .text(`Status: ${insurance.status}`)
      .moveDown(1);
  });
  doc.end();
};

const createPrescription = async (data) => {
  return await Prescription.create(data);
}

const getPrescription = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Prescription.find().sort({ createdAt: sortOrder });
}

const searchnamePrescriptions = async (name) => {
  if (!name) throw new Error("name is required");

  return await Prescription.find({
    templateName: { $regex: name, $options: "i" }
  });
};

const searchdatePrescriptions = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Prescription.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getPrescriptionById = async (id) => {
  return await Prescription.findById(id);
}

const updatePrescription = async (id, data) => {
  return await Prescription.findByIdAndUpdate(id, data, { new: true });
}

const deletePrescription = async (id) => {
  return await Prescription.findByIdAndDelete(id);
}

const getPrescriptionstatus = async (status) => {
  return await Prescription.find({ status: status });
}

const generateExcelPrescription = async (res) => {
  const prescription = await Prescription.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Prescription');
  worksheet.columns = Object.keys(prescription[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  prescription.forEach((prescription) => {
    worksheet.addRow(prescription.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Prescription.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfPrescription = async (res) => {
  const prescription = await Prescription.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Prescription.pdf`);
  doc.pipe(res);
  doc.text('Prescription Data', { align: 'center' });

  prescription.forEach((ratecard, index) => {
    doc.fontSize(14).text(`Template ${index + 1}: ${prescription.templateName}`, { underline: true });

    doc.fontSize(12).text(`Status: ${prescription.status}`);
    doc.text(`Active: ${prescription.active ? "Yes" : "No"}`);
    doc.text(`Notes: ${prescription.notes || "N/A"}`);
    doc.text(`Medicines:`);

    if (prescription.medicines.length === 0) {
      doc.text("  - None").moveDown(1);
    } else {
      prescription.medicines.forEach((med, i) => {
        doc.text(`  ${i + 1}. ${med.drugName} (${med.strength || "No strength"}) - ${med.drugType}`);
      });
      doc.moveDown(1);
    }
  });
  doc.end();
};

const createOrthogoal = async (data) => {
  return await Orthogoal.create(data);
}

const getOrthogoals = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Orthogoal.find().sort({ createdAt: sortOrder });
}

const searchnameOrthogoals = async (name) => {
  if (!name) throw new Error("name is required");

  return await Orthogoal.find({
    goal: { $regex: name, $options: "i" }
  });
};

const searchdateOrthogoals = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Orthogoal.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getOrthogoalById = async (id) => {
  return await Orthogoal.findById(id);
}

const updateOrthogoal = async (id, data) => {
  return await Orthogoal.findByIdAndUpdate(id, data, { new: true });
}

const deleteOrthogoal = async (id) => {
  return await Orthogoal.findByIdAndDelete(id);
}

const getOrthogoalstatus = async (status) => {
  return await Orthogoal.find({ status: status });
}

const generateExcelOrthogoal = async (res) => {
  const orthogoal = await Orthogoal.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Orthogoal');
  worksheet.columns = Object.keys(orthogoal[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  orthogoal.forEach((orthogoal) => {
    worksheet.addRow(orthogoal.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Orthogoal.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfOrthogoal = async (res) => {
  const orthogoal = await Orthogoal.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Orthogoal.pdf`);
  doc.pipe(res);
  doc.text('Orthogoal Data', { align: 'center' });

  orthogoal.forEach((goal, index) => {
    doc.fontSize(14).text(`Goal ${index + 1}: ${goal.goal}`, { underline: true });
    doc.fontSize(12).text(`Status: ${goal.status}`);
    doc.text(`Active: ${goal.active ? "Yes" : "No"}`);
    doc.text(`Notes: ${goal.notes || "N/A"}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createOrtholimitation = async (data) => {
  return await Ortholimitation.create(data);
}

const getOrtholimitations = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Ortholimitation.find().sort({ createdAt: sortOrder });
}

const searchnameOrtholimitations = async (name) => {
  if (!name) throw new Error("name is required");

  return await Ortholimitation.find({
    limitaion: { $regex: name, $options: "i" }
  });
};

const searchdateOrtholimitations = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Ortholimitation.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getOrtholimitationById = async (id) => {
  return await Ortholimitation.findById(id);
}

const updateOrtholimitation = async (id, data) => {
  return await Ortholimitation.findByIdAndUpdate(id, data, { new: true });
}

const deleteOrtholimitation = async (id) => {
  return await Ortholimitation.findByIdAndDelete(id);
}

const getOrtholimitationstatus = async (status) => {
  return await Ortholimitation.find({ status: status });
}

const generateExcelOrtholimitation = async (res) => {
  const ortholimitation = await Ortholimitation.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Ortholimitation');
  worksheet.columns = Object.keys(ortholimitation[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  ortholimitation.forEach((ortholimitation) => {
    worksheet.addRow(ortholimitation.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Ortholimitation.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfOrtholimitation = async (res) => {
  const ortholimitation = await Ortholimitation.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Ortholimitation.pdf`);
  doc.pipe(res);
  doc.text('Ortholimitation Data', { align: 'center' });

  ortholimitation.forEach((limitation, index) => {
    doc.fontSize(14).text(`Limitation ${index + 1}: ${limitation.limitation}`, { underline: true });
    doc.fontSize(12).text(`Status: ${limitation.status}`);
    doc.text(`Active: ${limitation.active ? "Yes" : "No"}`);
    doc.text(`Notes: ${limitation.notes || "N/A"}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createMedicalcondition = async (data) => {
  return await Medicalcondition.create(data);
}

const getMedicalconditions = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Medicalcondition.find().sort({ createdAt: sortOrder });
}

const searchnameMedicalconditions = async (name) => {
  if (!name) throw new Error("name is required");

  return await Medicalcondition.find({
    medicalcondition: { $regex: name, $options: "i" }
  });
};

const searchdateMedicalconditions = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Medicalcondition.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

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

const getDentalconditions = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Dentalcondition.find().sort({ createdAt: sortOrder });
}

const searchnameDentalconditions = async (name) => {
  if (!name) throw new Error("name is required");

  return await Dentalcondition.find({
    dentalcondition: { $regex: name, $options: "i" }
  });
};

const searchdateDentalconditions = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Dentalcondition.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

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

const getPatientgroups = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Patientgroup.find().sort({ createdAt: sortOrder });
}

const searchnamePatientgroups = async (name) => {
  if (!name) throw new Error("name is required");

  return await Patientgroup.find({
    patientGroupName: { $regex: name, $options: "i" }
  });
};

const searchdatePatientgroups = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Patientgroup.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getPatientgroupById = async (id) => {
  return await Patientgroup.findById(id);
}

const updatePatientgroup = async (id, data) => {
  return await Patientgroup.findByIdAndUpdate(id, data, { new: true });
}

const deletePatientgroup = async (id) => {
  return await Patientgroup.findByIdAndDelete(id);
}

const getPatientgroupstatus = async (status) => {
  return await Patientgroup.find({ status: status });
}

const generateExcelPatientgroup = async (res) => {
  const patientgroup = await Patientgroup.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Patientgroup');
  worksheet.columns = Object.keys(patientgroup[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  patientgroup.forEach((patientgroup) => {
    worksheet.addRow(patientgroup.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Patientgroup.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfPatientgroup = async (res) => {
  const patientgroup = await Patientgroup.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Patientgroup.pdf`);
  doc.pipe(res);
  doc.text('Patientgroup Data', { align: 'center' });

  patientgroup.forEach((group, index) => {
    doc.fontSize(14).text(`Patient Group ${index + 1}: ${group.patientGroupName}`, { underline: true });
    doc.fontSize(12).text(`Status: ${group.status}`);
    doc.text(`Active: ${group.active ? "Yes" : "No"}`);
    doc.text(`Discount on Lab Treatments: ${group.discountOnLabTreatments ? "Yes" : "No"}`);
    doc.text(`Discount on Consultant Treatments: ${group.discountOnConsultantTreatments ? "Yes" : "No"}`);
    doc.text(`Notes: ${group.notes || "N/A"}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createSource = async (data) => {
  return await Source.create(data);
}

const getSources = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Source.find().sort({ createdAt: sortOrder });
}

const searchnameSources = async (name) => {
  if (!name) throw new Error("name is required");

  return await Source.find({
    sourceName: { $regex: name, $options: "i" }
  });
};

const searchdateSources = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Source.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getSourceBymonth = async (month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);
  return await Source.find({
    createdAt: { $gte: start, $lte: end }
  })
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

const getSourcestatus = async (status) => {
  return await Source.find({ status: status });
}

const generateExcelSource = async (res) => {
  const source = await Source.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Source');
  worksheet.columns = Object.keys(source[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  source.forEach((source) => {
    worksheet.addRow(source.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Source.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfSource = async (res) => {
  const source = await Source.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Source.pdf`);
  doc.pipe(res);
  doc.text('Source Data', { align: 'center' });

  source.forEach((source, index) => {
    doc.fontSize(14).text(`Source ${index + 1}: ${source.sourceName}`, { underline: true });
    doc.fontSize(12).text(`Status: ${source.status}`);
    doc.text(`Valid From: ${new Date(source.validFrom).toLocaleDateString()}`);
    doc.text(`Valid To: ${new Date(source.validTo).toLocaleDateString()}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createSourcetype = async (data) => {
  return await Sourcetype.create(data);
}

const getSourcetypes = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Sourcetype.find().sort({ createdAt: sortOrder });
}

const searchnameSourcetypes = async (name) => {
  if (!name) throw new Error("name is required");

  return await Sourcetype.find({
    sourcetypeName: { $regex: name, $options: "i" }
  });
};

const searchdateSourcetypes = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Sourcetype.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getSourcetypeBymonth = async (month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);
  return await Sourcetype.find({
    createdAt: { $gte: start, $lte: end }
  })
}

const getSourcetypeById = async (id) => {
  return await Sourcetype.findById(id);
}

const updateSourcetype = async (id, data) => {
  return await Sourcetype.findByIdAndUpdate(id, data, { new: true });
}

const deleteSourcetype = async (id) => {
  return await Sourcetype.findByIdAndDelete(id);
}

const getSourcetypestatus = async (status) => {
  return await Sourcetype.find({ status: status });
}

const generateExcelSourcetype = async (res) => {
  const sourcetype = await Sourcetype.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sourcetype');
  worksheet.columns = Object.keys(sourcetype[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  sourcetype.forEach((sourcetype) => {
    worksheet.addRow(sourcetype.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Sourcetype.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfSourcetype = async (res) => {
  const sourcetype = await Sourcetype.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Sourcetype.pdf`);
  doc.pipe(res);
  doc.text('Sourcetype Data', { align: 'center' });

  sourcetype.forEach((sourcetype, index) => {
    doc.fontSize(14).text(`Source Type ${index + 1}: ${sourcetype.sourcetypeName}`, { underline: true });
    doc.fontSize(12).text(`Status: ${sourcetype.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createRefferal = async (data) => {
  return await Refferal.create(data);
}

const getRefferals = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Refferal.find().sort({ createdAt: sortOrder });
}

const searchnameRefferals = async (name) => {
  if (!name) throw new Error("name is required");

  return await Refferal.find({
    referralName: { $regex: name, $options: "i" }
  });
};

const searchdateRefferals = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Refferal.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getRefferalById = async (id) => {
  return await Refferal.findById(id);
}

const updateRefferal = async (id, data) => {
  return await Refferal.findByIdAndUpdate(id, data, { new: true });
}

const deleteRefferal = async (id) => {
  return await Refferal.findByIdAndDelete(id);
}

const getRefferalstatus = async (status) => {
  return await Refferal.find({ status: status });
}

const generateExcelRefferal = async (res) => {
  const refferal = await Refferal.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Refferal');
  worksheet.columns = Object.keys(refferal[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  refferal.forEach((refferal) => {
    worksheet.addRow(refferal.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Refferal.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfRefferal = async (res) => {
  const refferal = await Refferal.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Refferal.pdf`);
  doc.pipe(res);
  doc.text('Refferal Data', { align: 'center' });

  refferal.forEach((referral, index) => {
    doc.fontSize(14).text(`Referral ${index + 1}: ${referral.referralName}`, { underline: true });
    doc.fontSize(12).text(`Mobile: ${referral.mobile}`);
    doc.text(`Email: ${referral.emailId || "N/A"}`);
    doc.text(`Status: ${referral.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createGeneralpractitioner = async (data) => {
  return await Generalpractitioner.create(data);
}

const getGeneralpractitioners = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Generalpractitioner.find().sort({ createdAt: sortOrder });
}

const searchnameGeneralpractitioners = async (name) => {
  if (!name) throw new Error("name is required");

  return await Generalpractitioner.find({
    name: { $regex: name, $options: "i" }
  });
};

const searchdateGeneralpractitioners = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Generalpractitioner.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getGeneralpractitionerById = async (id) => {
  return await Generalpractitioner.findById(id);
}

const updateGeneralpractitioner = async (id, data) => {
  return await Generalpractitioner.findByIdAndUpdate(id, data, { new: true });
}

const deleteGeneralpractitioner = async (id) => {
  return await Generalpractitioner.findByIdAndDelete(id);
}

const getGeneralpractitionerstatus = async (status) => {
  return await Generalpractitioner.find({ status: status });
}

const generateExcelGeneralpractitioner = async (res) => {
  const generalpractitioner = await Generalpractitioner.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Generalpractitioner');
  worksheet.columns = Object.keys(generalpractitioner[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  generalpractitioner.forEach((generalpractitioner) => {
    worksheet.addRow(generalpractitioner.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Generalpractitioner.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfGeneralpractitioner = async (res) => {
  const generalpractitioner = await Generalpractitioner.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Generalpractitioner.pdf`);
  doc.pipe(res);
  doc.text('Generalpractitioner Data', { align: 'center' });

  generalpractitioner.forEach((practitioner, index) => {
    doc.fontSize(14).text(`General Practitioner ${index + 1}: ${practitioner.name}`, { underline: true });
    doc.fontSize(12).text(`Mobile: ${practitioner.mobile}`);
    doc.text(`Email (Personal): ${practitioner.emailPersonal || "N/A"}`);
    doc.text(`Email (Work): ${practitioner.emailWork || "N/A"}`);
    doc.text(`Date of Birth: ${practitioner.dateOfBirth || "N/A"}`);
    doc.text(`Address: ${practitioner.addressLine || "N/A"}`);
    doc.text(`City: ${practitioner.city || "N/A"}`);
    doc.text(`State: ${practitioner.state || "N/A"}`);
    doc.text(`Zip Code: ${practitioner.zipCode || "N/A"}`);
    doc.text(`Status: ${practitioner.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createEmaildomain = async (data) => {
  return await Emaildomain.create(data);
}

const getEmaildomains = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Emaildomain.find().sort({ createdAt: sortOrder });
}

const searchnameEmaildomains = async (name) => {
  if (!name) throw new Error("name is required");

  return await Emaildomain.find({
    emaildomain: { $regex: name, $options: "i" }
  });
};

const searchdateEmaildomains = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Emaildomain.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

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

const getSMStemplates = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await SMStemplate.find().sort({ createdAt: sortOrder });
}

const searchnameSMStemplates = async (name) => {
  if (!name) throw new Error("name is required");

  return await SMStemplate.find({
    templateName: { $regex: name, $options: "i" }
  });
};

const searchdateSMStemplates = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await SMStemplate.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getSMStemplateById = async (id) => {
  return await SMStemplate.findById(id);
}

const updateSMStemplate = async (id, data) => {
  return await SMStemplate.findByIdAndUpdate(id, data, { new: true });
}

const deleteSMStemplate = async (id) => {
  return await SMStemplate.findByIdAndDelete(id);
}

const getSMStemplatestatus = async (status) => {
  return await SMStemplate.find({ status: status });
}

const generateExcelSMStemplate = async (res) => {
  const smstemplate = await SMStemplate.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('SMStemplate');
  worksheet.columns = Object.keys(smstemplate[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  smstemplate.forEach((smstemplate) => {
    worksheet.addRow(smstemplate.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('SMStemplate.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfSMStemplate = async (res) => {
  const smstemplate = await SMStemplate.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=SMStemplate.pdf`);
  doc.pipe(res);
  doc.text('SMStemplate Data', { align: 'center' });

  smstemplate.forEach((template, index) => {
    doc.fontSize(14).text(`Template ${index + 1}: ${template.templateName}`, { underline: true });
    doc.fontSize(12).text(`Folder: ${template.folder || 'N/A'}`);
    doc.text(`Message: ${template.message}`);
    doc.text(`Tokens: ${template.tokens.length > 0 ? template.tokens.join(', ') : 'None'}`);
    doc.text(`Notes: ${template.notes || 'N/A'}`);
    doc.text(`Status: ${template.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createWATemplate = async (data) => {
  return await WATemplate.create(data);
}

const getWATemplates = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await WATemplate.find().sort({ createdAt: sortOrder });
}

const searchnameWATemplates = async (name) => {
  if (!name) throw new Error("name is required");

  return await WATemplate.find({
    templateName: { $regex: name, $options: "i" }
  });
};

const searchdateWATemplates = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await WATemplate.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getWATemplateById = async (id) => {
  return await WATemplate.findById(id);
}

const updateWATemplate = async (id, data) => {
  return await WATemplate.findByIdAndUpdate(id, data, { new: true });
}

const deleteWATemplate = async (id) => {
  return await WATemplate.findByIdAndDelete(id);
}

const getWATemplatestatus = async (status) => {
  return await WATemplate.find({ status: status });
}

const generateExcelWATemplate = async (res) => {
  const waTemplate = await WATemplate.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('WATemplate');
  worksheet.columns = Object.keys(waTemplate[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  waTemplate.forEach((waTemplate) => {
    worksheet.addRow(waTemplate.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('WATemplate.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfWATemplate = async (res) => {
  const waTemplate = await WATemplate.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=WATemplate.pdf`);
  doc.pipe(res);
  doc.text('WATemplate Data', { align: 'center' });

  waTemplate.forEach((template, index) => {
    doc.fontSize(14).text(`Template ${index + 1}: ${template.templateName}`, { underline: true });
    doc.fontSize(12).text(`Folder: ${template.folder || 'N/A'}`);
    doc.text(`Message: ${template.message}`);

    if (template.image) {
      doc.text(`Image URL: ${template.image}`);
    } else {
      doc.text('Image: None');
    }

    doc.text(`Tokens: ${template.tokens.length > 0 ? template.tokens.join(', ') : 'None'}`);
    doc.text(`Notes: ${template.notes || 'N/A'}`);
    doc.text(`Status: ${template.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createEmailtemplate = async (data) => {
  return await Emailtemplate.create(data);
}

const getEmailtemplates = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Emailtemplate.find().sort({ createdAt: sortOrder });
}

const searchnameEmailtemplates = async (name) => {
  if (!name) throw new Error("name is required");

  return await Emailtemplate.find({
    templateName: { $regex: name, $options: "i" }
  });
};

const searchdateEmailtemplates = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Emailtemplate.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getEmailtemplateById = async (id) => {
  return await Emailtemplate.findById(id);
}

const updateEmailtemplate = async (id, data) => {
  return await Emailtemplate.findByIdAndUpdate(id, data, { new: true });
}

const deleteEmailtemplate = async (id) => {
  return await Emailtemplate.findByIdAndDelete(id);
}

const getEmailtemplatestatus = async (status) => {
  return await Emailtemplate.find({ status: status });
}

const generateExcelEmailtemplate = async (res) => {
  const emailtemplate = await Emailtemplate.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Emailtemplate');
  worksheet.columns = Object.keys(emailtemplate[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  emailtemplate.forEach((emailtemplate) => {
    worksheet.addRow(emailtemplate.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Emailtemplate.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfEmailtemplate = async (res) => {
  const emailtemplate = await Emailtemplate.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Emailtemplate.pdf`);
  doc.pipe(res);
  doc.text('Emailtemplate Data', { align: 'center' });

  emailtemplate.forEach((template, index) => {
    doc.fontSize(14).text(`Template ${index + 1}: ${template.templateName}`, { underline: true });
    doc.fontSize(12).text(`Subject: ${template.subject}`);
    doc.text(`Body: ${template.body}`);
    doc.text(`Tokens: ${template.tokens.length > 0 ? template.tokens.join(', ') : 'None'}`);
    doc.text(`Notes: ${template.notes || 'N/A'}`);
    doc.text(`Status: ${template.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createLettertemplate = async (data) => {
  return await Lettertemplate.create(data);
}

const getLettertemplates = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Lettertemplate.find().sort({ createdAt: sortOrder });
}

const searchnameLettertemplates = async (name) => {
  if (!name) throw new Error("name is required");

  return await Lettertemplate.find({
    templateName: { $regex: name, $options: "i" }
  });
};

const searchdateLettertemplates = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Lettertemplate.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getLettertemplateById = async (id) => {
  return await Lettertemplate.findById(id);
}

const updateLettertemplate = async (id, data) => {
  return await Lettertemplate.findByIdAndUpdate(id, data, { new: true });
}

const deleteLettertemplate = async (id) => {
  return await Lettertemplate.findByIdAndDelete(id);
}

const getLettertemplatestatus = async (status) => {
  return await Lettertemplate.find({ status: status });
}

const generateExcelLettertemplate = async (res) => {
  const lettertemplate = await Lettertemplate.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Lettertemplate');
  worksheet.columns = Object.keys(lettertemplate[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  lettertemplate.forEach((lettertemplate) => {
    worksheet.addRow(lettertemplate.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Ratecard.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfLettertemplate = async (res) => {
  const lettertemplate = await Lettertemplate.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Lettertemplate.pdf`);
  doc.pipe(res);
  doc.text('Lettertemplate Data', { align: 'center' });

  lettertemplate.forEach((template, index) => {
    doc.fontSize(14).text(`Template ${index + 1}: ${template.templateName}`, { underline: true });
    doc.fontSize(12).text(`Subject: ${template.subject}`);
    doc.text(`Body: ${template.body}`);
    doc.text(`Tokens: ${template.tokens.length > 0 ? template.tokens.join(', ') : 'None'}`);
    doc.text(`Notes: ${template.notes || 'N/A'}`);
    doc.text(`Status: ${template.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createVendor = async (data) => {
  return await Vendor.create(data);
}

const getVendors = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Vendor.find().sort({ createdAt: sortOrder });
}

const searchnameVendors = async (name) => {
  if (!name) throw new Error("name is required");

  return await Vendor.find({
    organizationName: { $regex: name, $options: "i" }
  });
};

const searchdateVendors = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Vendor.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getVendorById = async (id) => {
  return await Vendor.findById(id);
}

const updateVendor = async (id, data) => {
  return await Vendor.findByIdAndUpdate(id, data, { new: true });
}

const deleteVendor = async (id) => {
  return await Vendor.findByIdAndDelete(id);
}

const getVendorstatus = async (status) => {
  return await Vendor.find({ status: status });
}

const generateExcelVendor = async (res) => {
  const vendor = await Vendor.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Vendor');
  worksheet.columns = Object.keys(vendor[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  vendor.forEach((vendor) => {
    worksheet.addRow(vendor.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Vendor.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfVendor = async (res) => {
  const vendor = await Vendor.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Vendor.pdf`);
  doc.pipe(res);
  doc.text('Vendor Data', { align: 'center' });

  vendor.forEach((vendor, index) => {
    doc.fontSize(14).text(`Vendor ${index + 1}: ${vendor.organizationName}`, { underline: true });
    doc.fontSize(12).text(`Primary Contact: ${vendor.primaryContactName}`);
    doc.text(`Primary Contact Mobile: ${vendor.primaryContactMobile}`);
    doc.text(`Email: ${vendor.emailWork || vendor.emailPersonal || 'N/A'}`);
    doc.text(`Secondary Contact: ${vendor.secondaryContactName || 'N/A'}`);
    doc.text(`Secondary Contact Mobile: ${vendor.secondaryContactMobile || 'N/A'}`);
    doc.text(`Landline: ${vendor.landline || 'N/A'}`);
    doc.text(`Other Phone: ${vendor.otherPhone || 'N/A'}`);
    doc.text(`Special Instructions: ${vendor.specialInstructions || 'None'}`);
    doc.text(`CDHPayment Terms: ${vendor.paymentTerms || 'N/A'}`);
    doc.text(`Status: ${vendor.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createInventorycategory = async (data) => {
  return await Inventorycategory.create(data);
}

const getInventorycategorys = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Inventorycategory.find().sort({ createdAt: sortOrder });
}

const searchnameInventorycategorys = async (name) => {
  if (!name) throw new Error("name is required");

  return await Inventorycategory.find({
    name: { $regex: name, $options: "i" }
  });
};

const searchdateInventorycategorys = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Inventorycategory.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getInventorycategoryById = async (id) => {
  return await Inventorycategory.findById(id);
}

const updateInventorycategory = async (id, data) => {
  return await Inventorycategory.findByIdAndUpdate(id, data, { new: true });
}

const deleteInventorycategory = async (id) => {
  return await Inventorycategory.findByIdAndDelete(id);
}

const getInventorycategorystatus = async (status) => {
  return await Inventorycategory.find({ status: status });
}

const generateExcelInventorycategory = async (res) => {
  const inventorycategory = await Inventorycategory.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Inventorycategory');
  worksheet.columns = Object.keys(inventorycategory[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  inventorycategory.forEach((inventorycategory) => {
    worksheet.addRow(inventorycategory.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Inventorycategory.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfInventorycategory = async (res) => {
  const inventorycategory = await Inventorycategory.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Inventorycategory.pdf`);
  doc.pipe(res);
  doc.text('Inventorycategory Data', { align: 'center' });

  inventorycategory.forEach((category, index) => {
    doc.fontSize(14).text(`Category ${index + 1}: ${category.name}`, { underline: true });
    doc.fontSize(12).text(`Notes: ${category.notes || 'N/A'}`);
    doc.text(`Status: ${category.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createInventoryitem = async (data) => {
  return await Inventoryitem.create(data);
}

const getInventoryitems = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Inventoryitem.find().sort({ createdAt: sortOrder }).populate('inventoryItemCategory');
}

const searchnameInventoryitems = async (name) => {
  if (!name) throw new Error("name is required");

  return await Inventoryitem.find({
    itemName: { $regex: name, $options: "i" }
  });
};

const searchdateInventoryitems = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Inventoryitem.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getInventoryitemById = async (id) => {
  return await Inventoryitem.findById(id);
}

const updateInventoryitem = async (id, data) => {
  return await Inventoryitem.findByIdAndUpdate(id, data, { new: true });
}

const deleteInventoryitem = async (id) => {
  return await Inventoryitem.findByIdAndDelete(id);
}

const getInventoryitemstatus = async (status) => {
  return await Inventoryitem.find({ status: status });
}

const generateExcelInventoryitem = async (res) => {
  const inventoryitem = await Inventoryitem.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Inventoryitem');
  worksheet.columns = Object.keys(inventoryitem[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  inventoryitem.forEach((inventoryitem) => {
    worksheet.addRow(inventoryitem.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Inventoryitem.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfInventoryitem = async (res) => {
  const inventoryitem = await Inventoryitem.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Inventoryitem.pdf`);
  doc.pipe(res);
  doc.text('Inventoryitem Data', { align: 'center' });

  inventoryitem.forEach((item, index) => {
    doc.fontSize(14).text(`Item ${index + 1}: ${item.itemName}`, { underline: true });
    doc.fontSize(12).text(`Category: ${item.category.name}`);
    doc.text(`Preferred Brands: ${item.preferredBrands.join(', ') || 'N/A'}`);
    doc.text(`HSN Code: ${item.hsnCode || 'N/A'}`);
    doc.text(`Tax Rate: ${item.taxRate}%`);
    doc.text(`Unit of Measure: ${item.unitOfMeasureCode || 'N/A'} - ${item.unitOfMeasureDescription || 'N/A'}`);
    doc.text(`Notes: ${item.notes || 'N/A'}`);
    doc.text(`Status: ${item.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createAccount = async (data) => {
  return await Account.create(data);
}

const getAccounts = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Account.find().sort({ createdAt: sortOrder });
}

const searchnameAccounts = async (name) => {
  if (!name) throw new Error("name is required");

  return await Account.find({
    accountName: { $regex: name, $options: "i" }
  });
};

const searchdateAccounts = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Account.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getAccountById = async (id) => {
  return await Account.findById(id);
}

const updateAccount = async (id, data) => {
  return await Account.findByIdAndUpdate(id, data, { new: true });
}

const deleteAccount = async (id) => {
  return await Account.findByIdAndDelete(id);
}

const getAccountstatus = async (status) => {
  return await Account.find({ status: status });
}

const generateExcelAccount = async (res) => {
  const account = await Account.find()
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Account');
  worksheet.columns = Object.keys(account[0].toObject()).map((key) => ({
    header: key,
    key,
    width: 25,
  }));

  account.forEach((account) => {
    worksheet.addRow(account.toObject());
  });
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('Account.xlsx');
  await workbook.xlsx.write(res);
  res.end();

};

const generatePdfAccount = async (res) => {
  const account = await Account.find();
  const doc = new PDF();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Account.pdf`);
  doc.pipe(res);
  doc.text('Account Data', { align: 'center' });

  account.forEach((account, index) => {
    doc.fontSize(14).text(`Account ${index + 1}: ${account.accountName}`, { underline: true });
    doc.fontSize(12).text(`Account Group: ${account.accountGroup}`);
    doc.text(`search Words: ${account.searchWords || 'N/A'}`);
    doc.text(`Notes: ${account.notes || 'N/A'}`);
    doc.text(`Status: ${account.status}`);
    doc.moveDown(1);
  });
  doc.end();
};

const createPatient = async (data) => {
  return await Patient.create(data);
}

const getPatients = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Patient.find()
    .populate("treatmentdone.treatment")
    .populate('center')
    .populate('doctor')
    .populate('appointment')
    .populate('group')
    .populate('rateCard')
    .populate('Sourcetype')
    .populate('Source')
    .populate('generalPractitioner')
    .populate("allergicToDrugs")
    .sort({ createdAt: sortOrder });
}

const searchnamePatients = async (name) => {
  if (!name) throw new Error("name is required");

  return await Patient.find({
    patientID: { $regex: name, $options: "i" }
  });
};

const searchdatePatients = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Patient.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getPatientBymonth = async (month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);
  return await Patient.find({
    createdAt: { $gte: start, $lte: end }
  })
}

const getPatientById = async (id) => {
  return await Patient.findById(id)
    .populate("treatmentOn.treatments.treatment")
    .populate("treatmentdone.treatment")
    .populate('center')
    .populate('doctor')
    .populate('appointment')
    .populate('group')
    .populate('rateCard')
    .populate('Sourcetype')
    .populate('Source')
    .populate('generalPractitioner')
    .populate("allergicToDrugs")
}

const addInvoiceToPatient = async (patientId, invoiceData) => {
  const counter = await Counter.findOneAndUpdate(
    { name: 'invoice' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  invoiceData.receipt = counter.seq;
  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }

  patient.invoice.push(invoiceData);

  await patient.save();

  return patient;
};


const updatePatient = async (id, data) => {
  const updateQuery = {};
  if (data.clinic && data.clinic?.length > 0) {

    updateQuery.$push = updateQuery.$push || {};
    updateQuery.$push.clinic = { $each: data.clinic };
  }
  if (data.treatmentOn && data.treatmentOn?.length > 0) {

    updateQuery.$push = updateQuery.$push || {};
    updateQuery.$push.treatmentOn = { $each: data.treatmentOn };
  }
  if (data.treatmentdone && data.treatmentdone?.length > 0) {

    updateQuery.$push = updateQuery.$push || {};
    updateQuery.$push.treatmentdone = { $each: data.treatmentdone };
  }
  if (Object.keys(updateQuery)?.length > 0) {
    return await Patient.findByIdAndUpdate(id, updateQuery, { new: true });
  } else {
    return await Patient.findByIdAndUpdate(id, data, { new: true });
  }
}

const addMultipleTreatmentDone = async (patientId, treatments) => {
  const patient = await Patient.findById(patientId);
  if (!patient) throw new Error("Patient not found");

  treatments.forEach(treatment => {
    patient.treatmentdone.push(treatment); // pushing new treatment(s)
  });

  await patient.save();
  return patient.treatmentdone;
};

const updateTreatmentDoneById = async (patientid, treatmentid, updatedFields) => {
  console.log('patientid', patientid)
  console.log('treatmentid', treatmentid)
  console.log('updatedFields', updatedFields)
  try {
    const updateData = Object.fromEntries(
      Object.entries(updatedFields).map(([key, value]) => [`treatmentdone.$[elem].${key}`, value])
    );

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientid,
      {
        $set: updateData
      },
      {
        new: true,
        arrayFilters: [{ 'elem._id': new mongoose.Types.ObjectId(treatmentid) }],
      }
    );

    return updatedPatient;
  } catch (error) {
    throw error;
  }
};

const deleteTreatmentDone = async (patientid, treatmentid) => {
  return await Patient.findByIdAndUpdate(
    patientid,
    {
      $pull: {
        treatmentdone: { _id: treatmentid }
      }
    },
    { new: true }
  );
};

const deletePatient = async (id) => {
  return await Patient.findByIdAndDelete(id);
}

const getTotalPatientsByRateCard = async () => {

  const result = await Ratecard.aggregate([
    {
      $lookup: {
        from: 'patients',
        localField: '_id',
        foreignField: 'rateCard',
        as: 'patients'
      }
    },
    {
      $project: {
        _id: 0,
        rateCardName: '$ratecardName',
        totalPatients: { $size: '$patients' }
      }
    }
  ]);
  return result;
}

const getTotalPatientsBySourcetype = async () => {

  const result = await Sourcetype.aggregate([
    {
      $lookup: {
        from: 'patients',
        localField: '_id',
        foreignField: 'Sourcetype',
        as: 'patients'
      }
    },
    {
      $project: {
        _id: 0,
        SourceTypeName: '$sourcetypeName',
        totalPatients: { $size: '$patients' }
      }
    }
  ]);
  return result;
}

const getTotalPatientsBySource = async () => {

  const result = await Source.aggregate([
    {
      $lookup: {
        from: 'patients',
        localField: '_id',
        foreignField: 'Source',
        as: 'patients'
      }
    },
    {
      $project: {
        _id: 0,
        SourceName: '$sourceName',
        totalPatients: { $size: '$patients' }
      }
    }
  ]);
  return result;
}

const getTotalPatientsByGroup = async () => {

  const result = await Patientgroup.aggregate([
    {
      $lookup: {
        from: 'patients',
        localField: '_id',
        foreignField: 'group',
        as: 'patients'
      }
    },
    {
      $project: {
        _id: 0,
        GroupName: '$patientGroupName',
        totalPatients: { $size: '$patients' }
      }
    }
  ]);
  return result;
}


const createDoctorunavaibility = async (data) => {
  return await Doctorunavaibility.create(data);
}

const getDoctorunavaibilitys = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Doctorunavaibility.find().sort({ createdAt: sortOrder });
}

const searchnameDoctorunavaibilitys = async (name) => {
  if (!name) throw new Error("name is required");

  return await Doctorunavaibility.find({
    doctorId: { $regex: name, $options: "i" }
  });
};

const searchdateDoctorunavaibilitys = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Doctorunavaibility.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getDoctorunavaibilityById = async (id) => {
  return await Doctorunavaibility.findById(id);
}

const updateDoctorunavaibility = async (id, data) => {
  return await Doctorunavaibility.findByIdAndUpdate(id, data, { new: true });
}

const deleteDoctorunavaibility = async (id) => {
  return await Doctorunavaibility.findByIdAndDelete(id);
}

const createCreditnote = async (data) => {
  return await Creditnote.create(data);
}

const getCreditnotes = async (from, to, voucherStatus, center, doctor, order) => {
  if (!name) throw new Error("name is required");

  if (from && to) {
    query.date = { $gte: new Date(from), $lte: new Date(to) };
  }
  if (voucherStatus) {
    query.status = voucherStatus;
  }
  if (center) {
    query.center = center;
  }
  if (doctor) {
    query.doctor = doctor;
  }
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Creditnote.find({
    clinicName: { $regex: name, $options: "i" }
  }).sort({ createdAt: sortOrder });
}

const searchnameCreditnotes = async (name) => {
  if (!name) throw new Error("name is required");

  return await Creditnote.find({
    patientCenter: { $regex: name, $options: "i" }
  });
};

const searchdateCreditnotes = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Creditnote.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getCreditnoteById = async (id) => {
  return await Creditnote.findById(id);
}

const updateCreditnote = async (id, data) => {
  return await Creditnote.findByIdAndUpdate(id, data, { new: true });
}

const deleteCreditnote = async (id) => {
  return await Creditnote.findByIdAndDelete(id);
}
const createPaymentreceived = async (data) => {
  // const { patient, amount, ...rest } = data;

  // const existingPayment = await Paymentreceived.findOne({ patient });

  // if (existingPayment) {
  //   return await Paymentreceived.findByIdAndUpdate(
  //     existingPayment._id,
  //     {
  //       $set: { ...rest },
  //       $inc: { amount: amount },
  //     },
  //     { new: true }
  //   );
  // } else {
  const counter = await Counter.findOneAndUpdate(
    { name: 'paymentreceipt' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  data.receipt = counter.seq;
  return await Paymentreceived.create(data);
  // }
};

const getPaymentreceiveds = async (order) => {
  return await Paymentreceived.find();
}

const searchnamePaymentreceiveds = async (name) => {
  if (!name) throw new Error("name is required");

  return await Paymentreceived.find({
    patient: { $regex: name, $options: "i" }
  });
};

const searchdatePaymentreceiveds = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Paymentreceived.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getPaymentreceivedById = async (id) => {
  return await Paymentreceived.findById(id);
}

const getPaymentreceivedBypatientid = async (patientid, fromDate, toDate, filterType) => {
  let startDate, endDate;
  const query = {patient: patientid}

if (filterType) {
  ({ startDate, endDate } = getDateRange(filterType));
} else if (fromDate && toDate) {
  startDate = new Date(fromDate);
  startDate.setHours(0, 0, 0, 0);
  endDate = new Date(toDate);
  endDate.setHours(23, 59, 59, 999);
}
if (startDate && endDate) {
  query.date = { $gte: startDate, $lte: endDate };
}

  return await Paymentreceived.find(query).populate('center').populate('doctor');
}

const updatePaymentreceived = async (id, data) => {
  return await Paymentreceived.findByIdAndUpdate(id, data, { new: true });
}

const deletePaymentreceived = async (id) => {
  return await Paymentreceived.findByIdAndDelete(id);
}



const createPaymentreminder = async (data) => {
  return await Paymentreminder.create(data);
}

const getPaymentreminders = async () => {
  return await Paymentreminder.find();
}

const getPaymentreminderById = async (id) => {
  return await Paymentreminder.findById(id);
}

const getPaymentreminderBypatientid = async (patientid) => {
  return await Paymentreminder.find({ patient: patientid });
}

const updatePaymentreminder = async (id, data) => {
  return await Paymentreminder.findByIdAndUpdate(id, data, { new: true });
}

const deletePaymentreminder = async (id) => {
  return await Paymentreminder.findByIdAndDelete(id);
}

const createPaymentMade = async (data) => {
  return await PaymentMade.create(data);
}

const getPaymentMades = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await PaymentMade.find().sort({ createdAt: sortOrder });
}

const searchnamePaymentMades = async (name) => {
  if (!name) throw new Error("name is required");

  return await PaymentMade.find({
    vendor: { $regex: name, $options: "i" }
  });
};

const searchdatePaymentMades = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await PaymentMade.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getPaymentMadeById = async (id) => {
  return await PaymentMade.findById(id);
}

const updatePaymentMade = async (id, data) => {
  return await PaymentMade.findByIdAndUpdate(id, data, { new: true });
}

const deletePaymentMade = async (id) => {
  return await PaymentMade.findByIdAndDelete(id);
}

const createCashBankTransaction = async (data) => {
  return await CashBankTransaction.create(data);
}

const getCashBankTransactions = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await CashBankTransaction.find().sort({ createdAt: sortOrder });
}

const searchnameCashBankTransactions = async (name) => {
  if (!name) throw new Error("name is required");

  return await CashBankTransaction.find({
    chequeRefNo: { $regex: name, $options: "i" }
  });
};

const searchdateCashBankTransactions = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await CashBankTransaction.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getCashBankTransactionById = async (id) => {
  return await CashBankTransaction.findById(id);
}

const updateCashBankTransaction = async (id, data) => {
  return await CashBankTransaction.findByIdAndUpdate(id, data, { new: true });
}

const deleteCashBankTransaction = async (id) => {
  return await CashBankTransaction.findByIdAndDelete(id);
}

const createJournalentry = async (data) => {
  return await Journalentry.create(data);
}

const getJournalentrys = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Journalentry.find().sort({ createdAt: sortOrder });
}

const searchnameJournalentrys = async (name) => {
  if (!name) throw new Error("name is required");

  return await Journalentry.find({
    center: { $regex: name, $options: "i" }
  });
};

const searchdateJournalentrys = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Journalentry.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getJournalentryById = async (id) => {
  return await Journalentry.findById(id);
}

const updateJournalentry = async (id, data) => {
  return await Journalentry.findByIdAndUpdate(id, data, { new: true });
}

const deleteJournalentry = async (id) => {
  return await Journalentry.findByIdAndDelete(id);
}

const createPatientopeaningbalance = async (data) => {
  return await Patientopeaningbalance.create(data);
}

const getPatientopeaningbalances = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Patientopeaningbalance.find().sort({ createdAt: sortOrder });
}

const searchnamePatientopeaningbalances = async (name) => {
  if (!name) throw new Error("name is required");

  return await Patientopeaningbalance.find({
    patient: { $regex: name, $options: "i" }
  });
};

const searchdatePatientopeaningbalances = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Patientopeaningbalance.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getPatientopeaningbalanceById = async (id) => {
  return await Patientopeaningbalance.findById(id);
}

const updatePatientopeaningbalance = async (id, data) => {
  return await Patientopeaningbalance.findByIdAndUpdate(id, data, { new: true });
}

const deletePatientopeaningbalance = async (id) => {
  return await Patientopeaningbalance.findByIdAndDelete(id);
}

const createInventorypurchase = async (data) => {
  return await Inventorypurchase.create(data);
}

const getInventorypurchases = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Inventorypurchase.find().sort({ createdAt: sortOrder });
}
 
const searchnameInventorypurchases = async (name) => {
  if (!name) throw new Error("name is required");

  return await Inventorypurchase.find({
    center: { $regex: name, $options: "i" }
  });
};

const searchdateInventorypurchases = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Inventorypurchase.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getInventorypurchaseById = async (id) => {
  return await Inventorypurchase.findById(id);
}

const updateInventorypurchase = async (id, data) => {
  return await Inventorypurchase.findByIdAndUpdate(id, data, { new: true });
}

const deleteInventorypurchase = async (id) => {
  return await Inventorypurchase.findByIdAndDelete(id);
}

const createInventoryconsume = async (data) => {
  return await Inventoryconsume.create(data);
}

const getInventoryconsumes = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Inventoryconsume.find().sort({ createdAt: sortOrder });
}

const searchnameInventoryconsumes = async (name) => {
  if (!name) throw new Error("name is required");

  return await Inventoryconsume.find({
    center: { $regex: name, $options: "i" }
  });
};

const searchdateInventoryconsumes = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Inventoryconsume.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getInventoryconsumeById = async (id) => {
  return await Inventoryconsume.findById(id);
}

const updateInventoryconsume = async (id, data) => {
  return await Inventoryconsume.findByIdAndUpdate(id, data, { new: true });
}

const deleteInventoryconsume = async (id) => {
  return await Inventoryconsume.findByIdAndDelete(id);
}

const createInventorytransfer = async (data) => {
  return await Inventorytransfer.create(data);
}

const getInventorytransfers = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Inventorytransfer.find().sort({ createdAt: sortOrder });
}

const searchnameInventorytransfers = async (name) => {
  if (!name) throw new Error("name is required");

  return await Inventorytransfer.find({
    fromcenter: { $regex: name, $options: "i" }
  });
};

const searchdateInventorytransfers = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Inventorytransfer.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getInventorytransferById = async (id) => {
  return await Inventorytransfer.findById(id);
}

const updateInventorytransfer = async (id, data) => {
  return await Inventorytransfer.findByIdAndUpdate(id, data, { new: true });
}

const deleteInventorytransfer = async (id) => {
  return await Inventorytransfer.findByIdAndDelete(id);
}

const createLab = async (data) => {
  return await Lab.create(data);
}

const getLabs = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Lab.find().sort({ createdAt: sortOrder });
}

const searchnameLabs = async (name) => {
  if (!name) throw new Error("name is required");

  return await Lab.find({
    name: { $regex: name, $options: "i" }
  });
};

const searchdateLabs = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Lab.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getLabById = async (id) => {
  return await Lab.findById(id);
}

const updateLab = async (id, data) => {
  return await Lab.findByIdAndUpdate(id, data, { new: true });
}

const deleteLab = async (id) => {
  return await Lab.findByIdAndDelete(id);
}

const createLabbill = async (data) => {
  return await Labbill.create(data);
}

const getLabbills = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Labbill.find().sort({ createdAt: sortOrder });
}

const searchnameLabbills = async (name) => {
  if (!name) throw new Error("name is required");

  return await Labbill.find({
    lab: { $regex: name, $options: "i" }
  });
};

const searchdateLabbills = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Labbill.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getLabbillById = async (id) => {
  return await Labbill.findById(id);
}

const updateLabbill = async (id, data) => {
  return await Labbill.findByIdAndUpdate(id, data, { new: true });
}

const deleteLabbill = async (id) => {
  return await Labbill.findByIdAndDelete(id);
}

const createLabworkgive = async (data) => {
  return await Labworkgive.create(data);
}

const getLabworkgives = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Labworkgive.find().sort({ createdAt: sortOrder });
}

const searchnameLabworkgives = async (name) => {
  if (!name) throw new Error("name is required");

  return await Labworkgive.find({
    lab: { $regex: name, $options: "i" }
  });
};

const searchdateLabworkgives = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Labworkgive.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getLabworkgiveById = async (id) => {
  return await Labworkgive.findById(id);
}

const updateLabworkgive = async (id, data) => {
  return await Labworkgive.findByIdAndUpdate(id, data, { new: true });
}

const deleteLabworkgive = async (id) => {
  return await Labworkgive.findByIdAndDelete(id);
}

const createLabworkrecieve = async (data) => {
  return await Labworkrecieve.create(data);
}

const getLabworkrecieves = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Labworkrecieve.find().sort({ createdAt: sortOrder });
}

const searchnameLabworkrecieves = async (name) => {
  if (!name) throw new Error("name is required");

  return await Labworkrecieve.find({
    lab: { $regex: name, $options: "i" }
  });
};

const searchdateLabworkrecieves = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Labworkrecieve.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getLabworkrecieveById = async (id) => {
  return await Labworkrecieve.findById(id);
}

const updateLabworkrecieve = async (id, data) => {
  return await Labworkrecieve.findByIdAndUpdate(id, data, { new: true });
}

const deleteLabworkrecieve = async (id) => {
  return await Labworkrecieve.findByIdAndDelete(id);
}

const createSmstransfer = async (data) => {
  return await Smstransfer.create(data);
}

const getSmstransfers = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Smstransfer.find().sort({ createdAt: sortOrder });
}

const searchnameSmstransfers = async (name) => {
  if (!name) throw new Error("name is required");

  return await Smstransfer.find({
    transferFrom: { $regex: name, $options: "i" }
  });
};

const searchdateSmstransfers = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Smstransfer.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getSmstransferById = async (id) => {
  return await Smstransfer.findById(id);
}

const updateSmstransfer = async (id, data) => {
  return await Smstransfer.findByIdAndUpdate(id, data, { new: true });
}

const deleteSmstransfer = async (id) => {
  return await Smstransfer.findByIdAndDelete(id);
}

const createPersonvisit = async (data) => {
  return await Personvisit.create(data);
}

const getPersonvisits = async (order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid sort order. Use 'asc' or 'desc'.");
  }
  return await Personvisit.find()
    .sort({ createdAt: sortOrder })
    .populate({
      path: 'patientid',
      populate: {
        path: 'center',
      },
    })
}

const searchnamePersonvisits = async (name) => {
  if (!name) throw new Error("name is required");

  return await Personvisit.find({
    patientid: { $regex: name, $options: "i" }
  });
};

const searchdatePersonvisits = async (date) => {
  if (!date) throw new Error("Date is required");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return await Personvisit.find({
    createdAt: { $gte: dayStart, $lte: dayEnd }
  });
};

const getPersonvisitById = async (id) => {
  return await Personvisit.findById(id)
    .populate({
      path: 'patientid',
      populate: [
        { path: 'center' },
        { path: 'Sourcetype' },
        { path: 'rateCard' },
        { path: 'group' },
        { path: 'generalPractitioner' }
      ],
    })
}

const updatePersonvisit = async (id, data) => {
  return await Personvisit.findByIdAndUpdate(id, data, { new: true });
}

const deletePersonvisit = async (id) => {
  return await Personvisit.findByIdAndDelete(id);
}

const updateDuePayment = async (id, data) => {
  return await Patient.findByIdAndUpdate(id, data, { new: true });
};

const getPatientsLoggedInButNotVisitedClinic = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const patients = await Patient.find({
    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    // $or: [
    //   { treatmentOn: { $eq: [] } },
    //   { treatmentOn: { $exists: false } }
    // ],
    // $or: [
    //   { treatmentdone: { $eq: [] } },
    //   { treatmentdone: { $exists: false } }
    // ],
    // $or: [
    //   { clinic: { $eq: [] }},
    //   { clinic: { $exists: false } }
    // ]
  })
    .populate('center')
    .sort({ createdAt: -1 });

  return patients;
};

const getPatientsWithLatestClinicVisit = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const patients = await Patient.find({
    createdAt: {
      $lt: startOfMonth,
    },
    treatmentdone: { $ne: [] }
  })
    .populate('center')
    .sort({ 'treatmentdone.createdAt': -1 });

  return patients;
};

const getPatientsWithCompletedClinicVisit = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const patients = await Patient.find({
    createdAt: { $lt: sixMonthsAgo },
    treatmentOn: {
      $not: {
        $elemMatch: {
          createdAt: { $gte: sixMonthsAgo }
        }
      }
    },
    treatmentdone: {
      $not: {
        $elemMatch: {
          createdAt: { $gte: sixMonthsAgo }
        }
      }
    },
    clinic: {
      $not: {
        $elemMatch: {
          createdAt: { $gte: sixMonthsAgo }
        }
      }
    }
  })
    .populate('center')
    .sort({ createdAt: -1 });

  return patients;
};



const createPurchaseorder = async (data) => {
  return await Purchaseorder.create(data);
}

const getPurchaseorders = async () => {
  return await Purchaseorder.find();
}
const getPurchaseorderById = async (id) => {
  return await Purchaseorder.findById(id);
}

const updatePurchaseorder = async (id, data) => {
  return await Purchaseorder.findByIdAndUpdate(id, data, { new: true });
}

const deletePurchaseorder = async (id) => {
  return await Purchaseorder.findByIdAndDelete(id);
}


const createPurchaseInvoice = async (data) => {
  return await PurchaseInvoice.create(data);
}

const getPurchaseInvoices = async () => {
  return await PurchaseInvoice.find();
}
const getPurchaseInvoiceById = async (id) => {
  return await PurchaseInvoice.findById(id);
}

const updatePurchaseInvoice = async (id, data) => {
  return await PurchaseInvoice.findByIdAndUpdate(id, data, { new: true });
}

const deletePurchaseInvoice = async (id) => {
  return await PurchaseInvoice.findByIdAndDelete(id);
}


const createGrninward = async (data) => {
  return await Grninward.create(data);
}

const getGrninwards = async () => {
  return await Grninward.find();
}
const getGrninwardById = async (id) => {
  return await Grninward.findById(id);
}

const updateGrninward = async (id, data) => {
  return await Grninward.findByIdAndUpdate(id, data, { new: true });
}

const deleteGrninward = async (id) => {
  return await Grninward.findByIdAndDelete(id);
}


const createGrnoutward = async (data) => {
  return await Grnoutward.create(data);
}

const getGrnoutwards = async () => {
  return await Grnoutward.find();
}
const getGrnoutwardById = async (id) => {
  return await Grnoutward.findById(id);
}

const updateGrnoutward = async (id, data) => {
  return await Grnoutward.findByIdAndUpdate(id, data, { new: true });
}

const deleteGrnoutward = async (id) => {
  return await Grnoutward.findByIdAndDelete(id);
}

const createBranchindent = async (data) => {
  return await Branchindent.create(data);
}

const getBranchindents = async () => {
  return await Branchindent.find();
}
const getBranchindentById = async (id) => {
  return await Branchindent.findById(id);
}

const updateBranchindent = async (id, data) => {
  return await Branchindent.findByIdAndUpdate(id, data, { new: true });
}

const deleteBranchindent = async (id) => {
  return await Branchindent.findByIdAndDelete(id);
}

const createBranchinward = async (data) => {
  return await Branchinward.create(data);
}

const getBranchinwards = async () => {
  return await Branchinward.find();
}
const getBranchinwardById = async (id) => {
  return await Branchinward.findById(id);
}

const updateBranchinward = async (id, data) => {
  return await Branchinward.findByIdAndUpdate(id, data, { new: true });
}

const deleteBranchinward = async (id) => {
  return await Branchinward.findByIdAndDelete(id);
}

const createBranchoutward = async (data) => {
  return await Branchoutward.create(data);
}

const getBranchoutwards = async () => {
  return await Branchoutward.find();
}
const getBranchoutwardById = async (id) => {
  return await Branchoutward.findById(id);
}

const updateBranchoutward = async (id, data) => {
  return await Branchoutward.findByIdAndUpdate(id, data, { new: true });
}

const deleteBranchoutward = async (id) => {
  return await Branchoutward.findByIdAndDelete(id);
}

const createPurchasepayment = async (data) => {
  return await Purchasepayment.create(data);
}

const getPurchasepayments = async () => {
  return await Purchasepayment.find();
}
const getPurchasepaymentById = async (id) => {
  return await Purchasepayment.findById(id);
}

const updatePurchasepayment = async (id, data) => {
  return await Purchasepayment.findByIdAndUpdate(id, data, { new: true });
}

const deletePurchasepayment = async (id) => {
  return await Purchasepayment.findByIdAndDelete(id);
}


const createPurchasereturnbill = async (data) => {
  return await Purchasereturnbill.create(data);
}

const getPurchasereturnbills = async () => {
  return await Purchasereturnbill.find();
}
const getPurchasereturnbillById = async (id) => {
  return await Purchasereturnbill.findById(id);
}

const updatePurchasereturnbill = async (id, data) => {
  return await Purchasereturnbill.findByIdAndUpdate(id, data, { new: true });
}

const deletePurchasereturnbill = async (id) => {
  return await Purchasereturnbill.findByIdAndDelete(id);
}


const createPurchasereturnpayment = async (data) => {
  return await Purchasereturnpayment.create(data);
}

const getPurchasereturnpayments = async () => {
  return await Purchasereturnpayment.find();
}
const getPurchasereturnpaymentById = async (id) => {
  return await Purchasereturnpayment.findById(id);
}

const updatePurchasereturnpayment = async (id, data) => {
  return await Purchasereturnpayment.findByIdAndUpdate(id, data, { new: true });
}

const deletePurchasereturnpayment = async (id) => {
  return await Purchasereturnpayment.findByIdAndDelete(id);
}

const createOpeningstock = async (data) => {
  return await Openingstock.create(data);
}

const getOpeningstocks = async () => {
  return await Openingstock.find();
}
const getOpeningstockById = async (id) => {
  return await Openingstock.findById(id);
}

const updateOpeningstock = async (id, data) => {
  return await Openingstock.findByIdAndUpdate(id, data, { new: true });
}

const deleteOpeningstock = async (id) => {
  return await Openingstock.findByIdAndDelete(id);
}

const getFilteredPatients = async (filters) => {
  const query = {};

  // Date range filters (from / to)
  if (filters.from && filters.to) {
    query.createdAt = {
      $gte: new Date(filters.from),
      $lte: new Date(filters.to),
    };
  }

  // Predefined Date Options
  if (filters.dateOption) {
    const today = dayjs();
    if (filters.dateOption === 'today') {
      query.createdAt = {
        $gte: today.startOf('day').toDate(),
        $lte: today.endOf('day').toDate(),
      };
    } else if (filters.dateOption === 'yesterday') {
      const yest = today.subtract(1, 'day');
      query.createdAt = {
        $gte: yest.startOf('day').toDate(),
        $lte: yest.endOf('day').toDate(),
      };
    } else if (filters.dateOption === 'current_month') {
      query.createdAt = {
        $gte: today.startOf('month').toDate(),
        $lte: today.endOf('month').toDate(),
      };
    }
  }

  // Direct filters
  if (filters.center) query.center = filters.center;
  if (filters.generalPractitioner) query.generalPractitioner = filters.generalPractitioner;
  if (filters.group) query.group = filters.group;
  if (filters.gender) query.gender = filters.gender;
  if (filters.phoneNumber) query.phoneNumber = new RegExp(filters.phoneNumber, 'i');
  if (filters.firstName) query.firstName = new RegExp(filters.firstName, 'i');
  if (filters.surname) query.surname = new RegExp(filters.surname, 'i');
  if (filters.nationality) query.nationality = new RegExp(filters.nationality, 'i');
  if (filters.bloodGroup) query.bloodGroup = filters.bloodGroup;

  return await Patient.find(query)
    .populate('center')
    .populate('group')
    .populate('generalPractitioner')
    .sort({ createdAt: -1 });
};

// const fetchPracticeSummary = async (filters) => {
//   const {
//     from,
//     to,
//     doctor,
//     treatmentCategory,
//     treatment,
//     rateCard,
//     group,
//     source,
//     sourceType
//   } = filters;

//   const matchStage = {
//     date: {
//       $gte: new Date(from),
//       $lte: new Date(to)
//     }
//   };

//   if (doctor) matchStage.doctor = doctor;
//   if (treatmentCategory) matchStage.treatmentCategory = treatmentCategory;
//   if (treatment) matchStage.treatment = treatment;
//   if (rateCard) matchStage.rateCard = rateCard;
//   if (group) matchStage.group = group;
//   if (source) matchStage.source = source;
//   if (sourceType) matchStage.sourceType = sourceType;

//   const pipeline = [
//     { $match: matchStage },
//     {
//       $group: {
//         _id: '$doctor',
//         treatmentsDone: { $sum: 1 },
//         grossAmount: { $sum: '$grossAmount' },
//         discount: { $sum: '$discount' },
//         chargedToPatient: { $sum: '$chargedToPatient' },
//         labCharges: { $sum: '$labCharges' },
//         remuneration: { $sum: '$remuneration' },
//         netRevenues: { $sum: '$netRevenue' }
//       }
//     },
//     {
//       $project: {
//         doctor: '$_id',
//         _id: 0,
//         treatmentsDone: 1,
//         grossAmount: 1,
//         discount: 1,
//         chargedToPatient: 1,
//         labCharges: 1,
//         remuneration: 1,
//         netRevenues: 1
//       }
//     },
//     { $sort: { treatmentsDone: -1 } }
//   ];

//   const result = await db.collection('practiceActivities').aggregate(pipeline).toArray();
//   return result;
// };

const getDoctorTreatmentSummary = async ({ fromDate, toDate }) => {
  console.log('formDate', fromDate)
  console.log('toDate', toDate)

  const start = new Date(fromDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(toDate);
  end.setHours(23, 59, 59, 999);

  console.log('start', start)
  console.log('end', end)
  const pipeline = [
    {
      $unwind: "$treatmentdone"
    },
    {
      $match: {
        "treatmentdone.createdAt": {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctor",
        foreignField: "_id",
        as: "doctorDetails"
      }
    },
    {
      $unwind: "$doctorDetails"
    },
    {
      $group: {
        _id: "$doctorDetails._id",
        doctorName: { $first: "$doctorDetails.name" },
        treatmentsDone: { $sum: 1 },
        grossAmount: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.total", 0] }
          }
        },
        discount: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.discountAmount", 0] }
          }
        },
        chargedToPatient: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.netAmount", 0] }
          }
        },
        labCharges: { $sum: 0 },
        remuneration: { $sum: 0 }
      }
    },
    {
      $addFields: {
        netRevenue: { $subtract: ["$chargedToPatient", "$labCharges"] }
      }
    },
    {
      $sort: { doctorName: 1 }
    }
  ];

  const summary = await Patient.aggregate(pipeline);

  const footer = summary.reduce(
    (acc, item) => {
      acc.treatmentsDone += item.treatmentsDone;
      acc.grossAmount += item.grossAmount;
      acc.discount += item.discount;
      acc.chargedToPatient += item.chargedToPatient;
      acc.labCharges += item.labCharges;
      acc.remuneration += item.remuneration;
      acc.netRevenue += item.netRevenue;
      return acc;
    },
    {
      treatmentsDone: 0,
      grossAmount: 0,
      discount: 0,
      chargedToPatient: 0,
      labCharges: 0,
      remuneration: 0,
      netRevenue: 0
    }
  );

  return { summary, footer };
};


const getTreatmentCategorySummary = async ({ fromDate, toDate }) => {
  const summary = await Patient.aggregate([
    { $unwind: "$treatmentdone" },
    {
      $match: {
        "treatmentdone.createdAt": {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }
      }
    },

    { $unwind: "$treatmentdone" },

    {
      $lookup: {
        from: "treatments",
        localField: "treatmentdone.treatment",
        foreignField: "_id",
        as: "treatmentInfo"
      }
    },
    { $unwind: "$treatmentInfo" },
    {
      $lookup: {
        from: "treatmentcategories",
        localField: "treatmentInfo.treatmentCategory",
        foreignField: "_id",
        as: "categoryInfo"
      }
    },
    { $unwind: "$categoryInfo" },
    {
      $group: {
        _id: "$categoryInfo._id",
        treatmentCategoryName: { $first: "$categoryInfo.treatmentCategory" },
        treatmentsDone: { $sum: 1 },
        grossAmount: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.total", 0] } }
        },
        discount: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.discountAmount", 0] } }
        },
        chargedToPatient: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.netAmount", 0] } }
        },
        remuneration: { $sum: 0 },
        labCharges: { $sum: 0 }
      }
    },

    {
      $project: {
        _id: 0,
        treatmentCategoryId: "$_id",
        treatmentCategoryName: 1,
        treatmentsDone: 1,
        grossAmount: 1,
        discount: 1,
        chargedToPatient: 1,
        remuneration: 1,
        labCharges: 1,
        netRevenue: { $subtract: ["$chargedToPatient", "$remuneration"] }
      }
    },

    { $sort: { treatmentCategoryName: 1 } }
  ]);

  // Calculate footer totals
  const footer = summary.reduce(
    (acc, cur) => {
      acc.treatmentsDone += cur.treatmentsDone || 0;
      acc.grossAmount += cur.grossAmount || 0;
      acc.discount += cur.discount || 0;
      acc.chargedToPatient += cur.chargedToPatient || 0;
      acc.remuneration += cur.remuneration || 0;
      acc.labCharges += cur.labCharges || 0;
      return acc;
    },
    {
      treatmentsDone: 0,
      grossAmount: 0,
      discount: 0,
      chargedToPatient: 0,
      remuneration: 0,
      labCharges: 0
    }
  );

  footer.netRevenue = footer.chargedToPatient - footer.remuneration;

  return { summary, footer };
};


const getTreatmentSummary = async ({ fromDate, toDate }) => {
  const summary = await Patient.aggregate([
    { $unwind: "$treatmentdone" },

    {
      $match: {
        "treatmentdone.createdAt": {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }
      }
    },

    {
      $lookup: {
        from: "treatments",
        localField: "treatmentdone.treatment",
        foreignField: "_id",
        as: "treatmentInfo"
      }
    },
    { $unwind: "$treatmentInfo" },

    {
      $group: {
        _id: "$treatmentInfo.treatmentName",
        treatmentsDone: { $sum: 1 },
        grossAmount: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.total", 0] }
          }
        },
        discount: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.discountAmount", 0] }
          }
        },
        chargedToPatient: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.netAmount", 0] }
          }
        },
        labCharges: { $sum: 0 }, // replace if applicable
        remuneration: { $sum: 0 } // replace if applicable
      }
    },

    {
      $project: {
        _id: 0,
        treatment: "$_id",
        treatmentsDone: 1,
        grossAmount: 1,
        discount: 1,
        chargedToPatient: 1,
        labCharges: 1,
        remuneration: 1,
        netRevenues: { $subtract: ["$chargedToPatient", "$remuneration"] }
      }
    },

    { $sort: { treatment: 1 } }
  ]);

  const footer = summary.reduce(
    (acc, cur) => {
      acc.treatmentsDone += cur.treatmentsDone || 0;
      acc.grossAmount += cur.grossAmount || 0;
      acc.discount += cur.discount || 0;
      acc.chargedToPatient += cur.chargedToPatient || 0;
      acc.remuneration += cur.remuneration || 0;
      acc.labCharges += cur.labCharges || 0;
      return acc;
    },
    {
      treatmentsDone: 0,
      grossAmount: 0,
      discount: 0,
      chargedToPatient: 0,
      remuneration: 0,
      labCharges: 0
    }
  );

  footer.netRevenues = footer.chargedToPatient - footer.remuneration;

  return { summary, footer };
};

const getRateCardSummary = async ({ fromDate, toDate }) => {
  const summary = await Patient.aggregate([
    // Flatten treatments
    { $unwind: "$treatmentdone" },

    // Filter by treatment date
    {
      $match: {
        "treatmentdone.createdAt": {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }
      }
    },
    { $unwind: "$treatmentdone" },
    // Lookup rate card info based on treatment's rateCard field
    {
      $lookup: {
        from: "ratecards",
        localField: "rateCard",  // assuming each treatment has its own rateCard
        foreignField: "_id",
        as: "rateCardInfo"
      }
    },
    {
      $unwind: {
        path: "$rateCardInfo",
        preserveNullAndEmptyArrays: true
      }
    },

    // Group by rate card name
    {
      $group: {
        _id: { $ifNull: ["$rateCardInfo.ratecardName", "None"] },
        treatmentsDone: { $sum: 1 },
        grossAmount: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.total", 0] } }
        },
        discount: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.discountAmount", 0] } }
        },
        chargedToPatient: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.netAmount", 0] } }
        },
        labCharges: { $sum: 0 },       // placeholder if needed later
        remuneration: { $sum: 0 }      // placeholder if needed later
      }
    },

    // Format result
    {
      $project: {
        _id: 0,
        rateCard: "$_id",
        treatmentsDone: 1,
        grossAmount: 1,
        discount: 1,
        chargedToPatient: 1,
        labCharges: 1,
        remuneration: 1,
        netRevenues: {
          $subtract: ["$chargedToPatient", "$remuneration"]
        }
      }
    },

    // Sort by rate card name
    { $sort: { rateCard: 1 } }
  ]);

  // Compute footer totals
  const footer = summary.reduce(
    (acc, cur) => {
      acc.treatmentsDone += cur.treatmentsDone || 0;
      acc.grossAmount += cur.grossAmount || 0;
      acc.discount += cur.discount || 0;
      acc.chargedToPatient += cur.chargedToPatient || 0;
      acc.remuneration += cur.remuneration || 0;
      acc.labCharges += cur.labCharges || 0;
      return acc;
    },
    {
      treatmentsDone: 0,
      grossAmount: 0,
      discount: 0,
      chargedToPatient: 0,
      remuneration: 0,
      labCharges: 0
    }
  );

  footer.netRevenues = footer.chargedToPatient - footer.remuneration;

  return { summary, footer };
};


const getGroupSummary = async ({ fromDate, toDate }) => {
  const summary = await Patient.aggregate([
    { $unwind: "$treatmentdone" },
    {
      $match: {
        "treatmentdone.createdAt": {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }
      }
    },
    { $unwind: "$treatmentdone" },

    {
      $lookup: {
        from: "patientgroups",
        localField: "group",
        foreignField: "_id",
        as: "groupInfo"
      }
    },
    {
      $unwind: {
        path: "$groupInfo",
        preserveNullAndEmptyArrays: true
      }
    },

    {
      $group: {
        _id: { $ifNull: ["$groupInfo.patientGroupName", "None"] },
        treatmentsDone: { $sum: 1 },
        grossAmount: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.total", 0] } }
        },
        discount: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.discountAmount", 0] } }
        },
        chargedToPatient: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.netAmount", 0] } }
        },
        labCharges: { $sum: 0 },
        remuneration: { $sum: 0 }
      }
    },

    {
      $project: {
        _id: 0,
        group: "$_id",
        treatmentsDone: 1,
        grossAmount: 1,
        discount: 1,
        chargedToPatient: 1,
        labCharges: 1,
        remuneration: 1,
        netRevenues: {
          $subtract: ["$chargedToPatient", "$remuneration"]
        }
      }
    },

    { $sort: { group: 1 } }
  ]);

  // ✅ Footer totals
  const footer = summary.reduce(
    (acc, cur) => {
      acc.treatmentsDone += cur.treatmentsDone || 0;
      acc.grossAmount += cur.grossAmount || 0;
      acc.discount += cur.discount || 0;
      acc.chargedToPatient += cur.chargedToPatient || 0;
      acc.remuneration += cur.remuneration || 0;
      acc.labCharges += cur.labCharges || 0;
      return acc;
    },
    {
      treatmentsDone: 0,
      grossAmount: 0,
      discount: 0,
      chargedToPatient: 0,
      remuneration: 0,
      labCharges: 0
    }
  );

  footer.netRevenues = footer.chargedToPatient - footer.remuneration;

  return { summary, footer };
};

const getSourceSummary = async ({ fromDate, toDate }) => {
  const summary = await Patient.aggregate([
    { $unwind: "$treatmentdone" },
    {
      $match: {
        "treatmentdone.createdAt": {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }
      }
    },
    { $unwind: "$treatmentdone" },

    {
      $lookup: {
        from: "sources",
        localField: "Source",
        foreignField: "_id",
        as: "sourceInfo"
      }
    },
    {
      $unwind: {
        path: "$sourceInfo",
        preserveNullAndEmptyArrays: true
      }
    },

    {
      $group: {
        _id: { $ifNull: ["$sourceInfo.sourceName", "Unknown"] },
        treatmentsDone: { $sum: 1 },
        grossAmount: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.total", 0] } }
        },
        discount: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.discountAmount", 0] } }
        },
        chargedToPatient: {
          $sum: { $toDouble: { $ifNull: ["$treatmentdone.netAmount", 0] } }
        },
        labCharges: { $sum: 0 },
        remuneration: { $sum: 0 }
      }
    },

    {
      $project: {
        _id: 0,
        source: "$_id",
        treatmentsDone: 1,
        grossAmount: 1,
        discount: 1,
        chargedToPatient: 1,
        labCharges: 1,
        remuneration: 1,
        netRevenues: {
          $subtract: ["$chargedToPatient", "$remuneration"]
        }
      }
    },

    { $sort: { source: 1 } }
  ]);

  // ✅ Footer totals
  const footer = summary.reduce(
    (acc, cur) => {
      acc.treatmentsDone += cur.treatmentsDone || 0;
      acc.grossAmount += cur.grossAmount || 0;
      acc.discount += cur.discount || 0;
      acc.chargedToPatient += cur.chargedToPatient || 0;
      acc.remuneration += cur.remuneration || 0;
      acc.labCharges += cur.labCharges || 0;
      return acc;
    },
    {
      treatmentsDone: 0,
      grossAmount: 0,
      discount: 0,
      chargedToPatient: 0,
      remuneration: 0,
      labCharges: 0
    }
  );

  footer.netRevenues = footer.chargedToPatient - footer.remuneration;

  return { summary, footer };
};



const getSourceTypeSummary = async ({ fromDate, toDate }) => {
  const summary = await Patient.aggregate([
    { $unwind: "$treatmentdone" },
    {
      $match: {
        "treatmentdone.createdAt": {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }
      }
    },
    { $unwind: "$treatmentdone" },
    {
      $lookup: {
        from: "sourcetypes",
        localField: "Sourcetype",
        foreignField: "_id",
        as: "sourceTypeInfo"
      }
    },
    {
      $unwind: {
        path: "$sourceTypeInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: { $ifNull: ["$sourceTypeInfo.name", "Unknown"] },
        treatmentsDone: { $sum: 1 },
        grossAmount: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.total", 0] }
          }
        },
        discount: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.discountAmount", 0] }
          }
        },
        chargedToPatient: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.netAmount", 0] }
          }
        },
        labCharges: { $sum: 0 },
        remuneration: { $sum: 0 }
      }
    },
    {
      $project: {
        _id: 0,
        sourceType: "$_id",
        treatmentsDone: 1,
        grossAmount: 1,
        discount: 1,
        chargedToPatient: 1,
        labCharges: 1,
        remuneration: 1,
        netRevenues: { $subtract: ["$chargedToPatient", "$remuneration"] }
      }
    },
    { $sort: { sourceType: 1 } }
  ]);

  const footer = summary.reduce(
    (acc, cur) => {
      acc.treatmentsDone += cur.treatmentsDone || 0;
      acc.grossAmount += cur.grossAmount || 0;
      acc.discount += cur.discount || 0;
      acc.chargedToPatient += cur.chargedToPatient || 0;
      acc.remuneration += cur.remuneration || 0;
      acc.labCharges += cur.labCharges || 0;
      return acc;
    },
    {
      treatmentsDone: 0,
      grossAmount: 0,
      discount: 0,
      chargedToPatient: 0,
      remuneration: 0,
      labCharges: 0
    }
  );

  footer.netRevenues = footer.chargedToPatient - footer.remuneration;

  return { summary, footer };
};



const getSourceAndTypeSummary = async ({ fromDate, toDate }) => {
  const summary = await Patient.aggregate([
    { $unwind: "$treatmentdone" },
    {
      $match: {
        "treatmentdone.createdAt": {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }
      }
    },
    { $unwind: "$treatmentdone" },
    {
      $lookup: {
        from: "sources",
        localField: "Source",
        foreignField: "_id",
        as: "sourceInfo"
      }
    },
    {
      $lookup: {
        from: "sourcetypes",
        localField: "Sourcetype",
        foreignField: "_id",
        as: "sourceTypeInfo"
      }
    },
    {
      $unwind: {
        path: "$sourceInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: "$sourceTypeInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          source: { $ifNull: ["$sourceInfo.sourceName", "Unknown"] },
          sourceType: { $ifNull: ["$sourceTypeInfo.name", "Unknown"] }
        },
        treatmentsDone: { $sum: 1 },
        grossAmount: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.total", 0] }
          }
        },
        discount: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.discountAmount", 0] }
          }
        },
        chargedToPatient: {
          $sum: {
            $toDouble: { $ifNull: ["$treatmentdone.netAmount", 0] }
          }
        },
        labCharges: { $sum: 0 },
        remuneration: { $sum: 0 }
      }
    },
    {
      $project: {
        _id: 0,
        source: "$_id.source",
        sourceType: "$_id.sourceType",
        treatmentsDone: 1,
        grossAmount: 1,
        discount: 1,
        chargedToPatient: 1,
        labCharges: 1,
        remuneration: 1,
        netRevenues: { $subtract: ["$chargedToPatient", "$remuneration"] }
      }
    },
    { $sort: { source: 1, sourceType: 1 } }
  ]);

  const footer = summary.reduce(
    (acc, cur) => {
      acc.treatmentsDone += cur.treatmentsDone || 0;
      acc.grossAmount += cur.grossAmount || 0;
      acc.discount += cur.discount || 0;
      acc.chargedToPatient += cur.chargedToPatient || 0;
      acc.remuneration += cur.remuneration || 0;
      acc.labCharges += cur.labCharges || 0;
      return acc;
    },
    {
      treatmentsDone: 0,
      grossAmount: 0,
      discount: 0,
      chargedToPatient: 0,
      remuneration: 0,
      labCharges: 0
    }
  );

  footer.netRevenues = footer.chargedToPatient - footer.remuneration;

  return { summary, footer };
};



const getReceiptsByFilter = async ({ fromDate, toDate, filterType, center, doctor, type, voucherStatus }) => {
  let startDate, endDate;
  const query = {};

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
    query.createdAt = { $gte: startDate, $lte: endDate };

  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }


  if (center && center !== 'all') {
    query.Center = center;
  }

  if (doctor && doctor !== 'all') {
    query.doctor = doctor;
  }

  if (voucherStatus && voucherStatus !== 'all') {
    query.voucherStatus = voucherStatus;
  }

  if (type && type !== 'all') {
    query.receivedFrom = type;
  }

  const data = await Paymentreceived.find(query)
    .populate('Center')
    .populate('doctor')
    .populate({
      path: 'patient',
      populate: {
        path: 'group',
      }
    })

  return data;
};

const getdailyactivityByFilter = async ({ fromDate, doctor }) => {
  let startDate, endDate;
  console.log('doctor', doctor)

  if (fromDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(fromDate);
    endDate.setHours(23, 59, 59, 999);
  }

  const query = {
    $and: []
  };

  if (startDate && endDate) {
    query.$and.push({
      $or: [
        { "treatmentdone.createdAt": { $gte: startDate, $lte: endDate } },
        {
          "treatmentOn.treatments": {
            $elemMatch: { createdAt: { $gte: startDate, $lte: endDate } }
          }
        }
      ]
    });
  }

  // if (doctor && doctor !== 'all') {
  //   query.$and.push({
  //     "clinic.doctor": mongoose.Types.ObjectId(doctor)
  //   });
  // }


  const data = await Patient.find(query)
    .populate('doctor');

  let filteredVisits = data;



  if (doctor && doctor !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.doctor?._id.toString() === doctor,

    );
  }
  console.log('first', filteredVisits.length)
  return filteredVisits;
};


const getDARTreportsByFilter = async ({ fromDate, toDate, filterType }) => {
  let startDate, endDate;
  console.log('filterType', filterType)

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));

  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }
  const query = {
    $and: []
  };

  if (startDate && endDate) {
    query.$and.push({
      $or: [
        { "treatmentdone.createdAt": { $gte: startDate, $lte: endDate } },
        { "treatmentOn.createdAt": { $gte: startDate, $lte: endDate } }
      ]
    })
  }


  const data = await Patient.find(query)
    .populate({
      path: 'treatmentdone.treatment',
      model: 'Treatment'
    })
    .populate({
      path: 'treatmentOn.treatments.treatment',
      model: 'Treatment'
    })
    .populate('appointment')
    .populate('doctor')
    .populate('Sourcetype');
  return data;
};


const getProspectByFilter = async ({ gender, sourceType, source, status }) => {
  const query = {};

  if (gender && gender !== 'all') {
    query.gender = gender;
  }

  if (sourceType && sourceType !== 'all') {
    query.Sourcetype = sourceType;
  }

  if (source && source !== 'all') {
    query.Source = source;
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  const data = await Patient.find(query)
    .populate('Sourcetype')
    .populate('Source')

  return data;
};

const getPatientsummeryByFilter = async (filterType) => {

  let groupField, lookupCollection, foreignField, localField, nameField;

  switch (filterType) {
    case 'patient_group_summary':
      groupField = '$group';
      lookupCollection = 'patientgroups';
      foreignField = '_id';
      localField = '_id';
      nameField = 'patientGroupName';
      break;

    case 'patient_rate_card_summary':
      groupField = '$rateCard';
      lookupCollection = 'ratecards';
      foreignField = '_id';
      localField = '_id';
      nameField = 'ratecardName';
      break;

    case 'patient_gender_summary':
      groupField = '$gender';
      return await Patient.aggregate([
        {
          $group: {
            _id: groupField,
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            key: '$_id',
            count: 1
          }
        }
      ]);

    case 'patient_source_summary':
      groupField = '$Source';
      lookupCollection = 'sources';
      foreignField = '_id';
      localField = '_id';
      nameField = 'sourceName';
      break;

    case 'patient_source_type_summary':
      groupField = '$Sourcetype';
      lookupCollection = 'sourcetypes';
      foreignField = '_id';
      localField = '_id';
      nameField = 'name';
      break;

    default:
      throw new Error('Invalid filterType');
  }

  const result = await Patient.aggregate([
    {
      $group: {
        _id: groupField,
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: lookupCollection,
        localField,
        foreignField,
        as: 'info'
      }
    },
    {
      $unwind: {
        path: '$info',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        key: '$_id',
        name: { $ifNull: [`$info.${nameField}`, 'Unknown'] },
        count: 1
      }
    }
  ]);

  return result;
};

const getPatientlistByFilter = async ({ gender, patientgroup, rateCard, refby, status }) => {
  const query = {};


  if (gender && gender !== 'all') {
    query.gender = gender;
  }

  if (patientgroup && patientgroup !== 'all') {
    query.group = patientgroup;
  }

  if (rateCard && rateCard !== 'all') {
    query.rateCard = rateCard;
  }

  if (refby && refby !== 'all') {
    query.refby = refby;
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  const data = await Patient.find(query)

  return data;
};

const getPatientcontactByFilter = async ({ gender, patientgroup, rateCard, status }) => {
  const query = {};

  if (gender && gender !== 'all') {
    query.gender = gender;
  }

  if (patientgroup && patientgroup !== 'all') {
    query.group = patientgroup;
  }

  if (rateCard && rateCard !== 'all') {
    query.rateCard = rateCard;
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  const data = await Patient.find(query)

  return data;
};

const getPatientbirthdayByFilter = async ({ month, status }) => {
  const query = {};

  if (month) {
    const monthIndex = parseInt(month) - 1;

    query['$expr'] = {
      $eq: [{ $month: "$dateOfBirth" }, monthIndex + 1]
    };
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  const data = await Patient.find(query)
    .populate('group')
    .populate('rateCard')

  return data;
};

const getPatientanniversaryByFilter = async ({ month, status }) => {
  const query = {};

  if (month) {
    const monthIndex = parseInt(month) - 1;

    query['$expr'] = {
      $eq: [{ $month: "$anniversaryDate" }, monthIndex + 1]
    };
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  const data = await Patient.find(query)
    .populate('group')
    .populate('rateCard')

  return data;
};

const getReferralsByFilter = async ({ fromDate, toDate, filterType, center, refby }) => {
  let startDate, endDate;
  const query = {}
  console.log('center', center)

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }
  if (startDate && endDate) {
    query.$or = [
      { "treatmentdone.createdAt": { $gte: startDate, $lte: endDate } },
    ];
  }

  const visits = await patient.find(query)
    .populate([
      {
        path: 'center'
      },
      {
        path: 'treatmentdone.treatment',
        model: 'Treatment',
        select: 'treatmentName'
      },
      {
        path: 'treatmentOn.treatments.treatment',
        model: 'Treatment',
        select: 'treatmentName'
      }
    ])
    .sort({ createdAt: -1 });
  console.log('visits.length', visits.length)
  let filteredVisits = visits;

  if (center && center !== 'all') {
    filteredVisits = visits.filter(v => v.center?._id?.toString() === center,

    );
  }
  console.log('filteredVisits', filteredVisits.length)

  if (refby && refby !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.refby?.toString() === refby,

    );
  }

  return filteredVisits;
};

const getpatientsperiodByFilter = async ({ fromDate, toDate, rateCard }) => {
  let startDate, endDate;
  const query = {}

  console.log('rateCard', rateCard)
  if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  } else {
    endDate = new Date();
    startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0);
  }
  if (startDate && endDate) {
    query.$or = [
      { "treatmentdone.createdAt": { $gte: startDate, $lte: endDate } },
      { "treatmentOn.treatments.createdAt": { $gte: startDate, $lte: endDate } }
    ];
  }


  const visits = await Patient.find(query)
    .populate([
      {
        path: 'rateCard'
      },
      {
        path: 'treatmentdone.treatment',
        model: 'Treatment',
        select: 'treatmentName'
      },
      {
        path: 'treatmentOn.treatments.treatment',
        model: 'Treatment',
        select: 'treatmentName'
      }
    ])
    .sort({ createdAt: -1 });

  console.log('visits', visits.length)
  let filteredVisits = visits;

  if (rateCard && rateCard !== 'all') {
    filteredVisits = visits.filter(v => v.rateCard?._id?.toString() === rateCard,

    );
  }

  return filteredVisits;
};

const getNevervisitedpatientByFilter = async ({ gender, patientgroup, rateCard, status }) => {
  const query = {
    treatmentOn: { $eq: [] },
    treatmentdone: { $eq: [] },
    clinic: { $eq: [] },
  };
  console.log('gender', gender)

  const data = await patient.find(query)
    .sort({ createdAt: -1 })

  let filteredVisits = data;
  console.log('data.length', data.length)

  if (rateCard && rateCard !== 'all') {
    filteredVisits = data.filter(v => v.rateCard?.toString() === rateCard,

    );
  }
  if (patientgroup && patientgroup !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.group?.toString() === patientgroup,
    );
  }
  if (gender && gender !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.gender?.toString() === gender,
    );
  }
  if (status && status !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.status?.toString() === status,
    );
  }

  return filteredVisits;
};


const getappointmentscheduleByFilter = async ({ fromDate, toDate, filterType, center, doctor, treatmentcategory, status }) => {
  let startDate, endDate;
  const query = {}

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }

  if (startDate && endDate) {
    query.createdAt = { $gte: startDate, $lte: endDate };
  }


  const visits = await Appointment.find(query)
    .populate('patient')
    .populate('doctor')
    .populate('operatory')
    .populate('treatmentCategory')
    .sort({ createdAt: -1 });

  console.log('visits', visits.length)
  let filteredVisits = visits;

  if (center && center !== 'all') {
    filteredVisits = visits.filter(v => v.center?.toString() === center,

    );
  }

  console.log('first', filteredVisits.length)


  if (doctor && doctor !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.doctor?.toString() === doctor,

    );
  }

  if (treatmentcategory && treatmentcategory !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.treatmentCategory?._id?.toString() === treatmentcategory
    );
  }

  if (status && status !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.status?.toString() === status,

    );
  }

  return filteredVisits;
};


const getappointmentbookedByFilter = async ({ fromDate, toDate, filterType, center, doctor, treatmentcategory, status, pastFuture }) => {
  let startDate, endDate;
  const query = {};

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }

  if (startDate && endDate) {
    query.date = {
      $gte: startDate,
      $lte: endDate
    };
  }

  if (center && center !== 'all') {
    query.center = center;
  }

  if (doctor && doctor !== 'all') {
    query.doctor = doctor;
  }

  if (treatmentcategory && treatmentcategory !== 'all') {
    query.treatmentCategory = treatmentcategory;
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  if (pastFuture && pastFuture !== 'all') {
    const now = new Date();
    if (pastFuture === 'past') {
      query.date = { ...(query.date || {}), $lt: now };
    } else if (pastFuture === 'future') {
      query.date = { ...(query.date || {}), $gt: now };
    }
  }

  const appointments = await Appointment.find(query)
    .populate('center')
    .populate('doctor')
    .populate('patient')
    .populate('operatory')
    .populate('treatmentCategory')
    .sort({ createdAt: -1 });

  return appointments;
};


const getTreatmentdoneByFilter = async ({ fromDate, toDate, filterType, center, doctor, rateCard, patientGroup, billedStatus, salesreturn }) => {
  let startDate, endDate;
  const query = {}

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }

  if (startDate && endDate) {
    query.$or = [
      { "treatmentdone.createdAt": { $gte: startDate, $lte: endDate } }
    ];
  }

  const visits = await Patient.find(query)
    .populate('doctor')
    .populate('center')
    .populate('rateCard')
    .populate('group')
    .populate('Source')
    .populate('Sourcetype')
    .populate({
      path: 'treatmentdone.treatment',
      populate: {
        path: 'treatmentCategory',
        model: 'TreatmentCategory'
      }
    })
    .sort({ createdAt: -1 });

  console.log('visits.length', visits.length)
  let filteredVisits = visits;

  if (center && center !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.center?._id?.toString() === center
    );
  }

  if (doctor && doctor !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.doctor?._id?.toString() === doctor
    );
  }

  if (rateCard && rateCard !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.rateCard?._id?.toString() === rateCard
    );
  }

  if (patientGroup && patientGroup !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.group?._id?.toString() === patientGroup
    );
  }

  if (billedStatus === 'billed') {
    filteredVisits = filteredVisits.filter(v => v.duepayment === '0');
  } else if (billedStatus === 'unbilled') {
    filteredVisits = filteredVisits.filter(v => v.duepayment !== '0');
  }


  if (salesreturn && salesreturn !== 'all') {
    // filteredVisits
  }
  return filteredVisits;
};

const getTreatmentplansByFilter = async ({ fromDate, toDate, filterType, center, doctor, rateCard, patientGroup }) => {
  let startDate, endDate;
  const query = {}

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }

  if (startDate && endDate) {
    query.$or = [
      { "treatmentOn.treatments.createdAt": { $gte: startDate, $lte: endDate } }
    ];
  }

  const visits = await Patient.find(query)
    .populate('doctor')
    .populate('center')
    .populate('rateCard')
    .populate('group')
    .populate({
      path: 'treatmentOn.treatments.treatment',
      model: 'Treatment' // Make sure the model name matches
    })
    .sort({ createdAt: -1 });

  let filteredVisits = visits;

  if (center && center !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.center?._id?.toString() === center
    );
  }

  if (doctor && doctor !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.doctor?._id?.toString() === doctor
    );
  }

  if (rateCard && rateCard !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.rateCard?._id?.toString() === rateCard
    );
  }

  if (patientGroup && patientGroup !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.group?._id?.toString() === patientGroup
    );
  }

  return filteredVisits;
};

const getConversionByFilter = async ({ fromDate, toDate, filterType, center, doctor, rateCard, patientGroup }) => {
  let startDate, endDate;
  const query = {}

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }

  if (startDate && endDate) {
    query.$or = [
      { "treatmentOn.treatments.createdAt": { $gte: startDate, $lte: endDate } }
    ];
  }

  const visits = await Patient.find(query)
    .populate('doctor')
    .populate('center')
    .populate('rateCard')
    .populate('group')
    .populate('Source')
    .populate('Sourcetype')
    .populate({
      path: 'treatmentOn.treatments.treatment',
      model: 'Treatment' // Make sure the model name matches
    })
    .sort({ createdAt: -1 });

  let filteredVisits = visits;

  if (center && center !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.center?._id?.toString() === center
    );
  }

  if (doctor && doctor !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.doctor?._id?.toString() === doctor
    );
  }

  if (rateCard && rateCard !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.rateCard?._id?.toString() === rateCard
    );
  }

  if (patientGroup && patientGroup !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.group?._id?.toString() === patientGroup
    );
  }

  return filteredVisits;
};

const getpatienttreatmentByFilter = async ({ fromDate, toDate, filterType, doctor, treatment }) => {
  let startDate, endDate;
  const query = {}

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }

  if (startDate && endDate) {
    query.$or = [
      { "treatmentdone.createdAt": { $gte: startDate, $lte: endDate } }
    ];
  }

  const visits = await Patient.find(query)
    .populate('doctor')
    .populate('Sourcetype')
    .populate('treatmentdone.treatment')
    .sort({ createdAt: -1 });

  let filteredVisits = visits;

  if (doctor && doctor !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.doctor?._id?.toString() === doctor
    );
  }

  if (treatment && treatment !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.treatmentdone?.some(t => t.treatment?._id?.toString() === treatment)
    );
  }


  return filteredVisits;
};

const getprescriptionByFilter = async ({ fromDate, toDate, filterType, doctor }) => {
  let startDate, endDate;
  const query = {}

  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }

  if (startDate && endDate) {
    query.$or = [
      { "prescription.createdAt": { $gte: startDate, $lte: endDate } }
    ];
  }

  const visits = await Patient.find(query)
    .populate('doctor')
    .populate({
      path: 'prescription.medicines'
    })
    .sort({ createdAt: -1 });

  let filteredVisits = visits;

  if (doctor && doctor !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.doctor?._id?.toString() === doctor
    );
  }

  return filteredVisits;
};


const getpatientreceivablesByFilter = async ({ patientgroup, rateCard, status, billedStatus }) => {
  const query = {};

  console.log('patientgroup, rateCard, status, billedStatus', patientgroup, rateCard, status, billedStatus)

  const data = await Patient.find(query)
    .sort({ createdAt: -1 })
    .populate('doctor')
    .populate('group')
    .populate('rateCard')

  let filteredVisits = data;

  if (rateCard && rateCard !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.rateCard?._id?.toString() === rateCard,

    );
  }
  if (patientgroup && patientgroup !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.group?._id?.toString() === patientgroup,
    );
  }
  if (status && status !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.status?.toString() === status,
    );
  }
  if (billedStatus === 'advance_payment') {
    filteredVisits = filteredVisits.filter(v => v.advpayment > 0);
  } else if (billedStatus === 'payment_due') {
    filteredVisits = filteredVisits.filter(v => v.duepayment > 0);
  }

  return filteredVisits;
};

const getratecardreceivablesByFilter = async ({ status }) => {

  const data = await Patient.find()
    .sort({ createdAt: -1 })
    .populate('doctor')
    .populate('group')
    .populate('rateCard')

  let filteredVisits = data;

  if (status && status !== 'all') {
    filteredVisits = filteredVisits.filter(v => v.status?.toString() === status,
    );
  }

  return filteredVisits;
};


const getvendorpayablesByFilter = async ({ billedStatus, type, status, }) => {

  const data = await Vendor.find()
    .sort({ createdAt: -1 })

  let filteredVisits = data;

  if (status && status !== 'all') {
    if (status === 'active') {
      filteredVisits = filteredVisits.filter(v => v.active === true);
    } else if (status === 'inactive') {
      filteredVisits = filteredVisits.filter(v => v.active === false);
    }
  }

  if (billedStatus === 'advance_payment') {
    filteredVisits = filteredVisits.filter(v => v.advpayment > 0);
  } else if (billedStatus === 'payment_due') {
    filteredVisits = filteredVisits.filter(v => v.duepayment > 0);
  }
  if (type && type !== 'all') {
    filteredVisits = filteredVisits
  }

  return filteredVisits;
};

const getdaybookByFilter = async ({ fromDate, toDate, filterType, status }) => {
  let startDate, endDate;
  const query = {}
  console.log('status', status)
  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }
  if (startDate && endDate) {
    query.date = { $gte: startDate, $lte: endDate };
  }

  const visits = await Paymentreceived.find(query)
    .populate('doctor')
    .populate('patient')
    .sort({ createdAt: -1 });

  console.log('visits.length', visits.length)
  let filteredVisits = visits;

  if (status && status !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.patient?.status?.toString() === status
    );
  }

  return filteredVisits;
};

const getvoucherlistByFilter = async ({ fromDate, toDate, filterType, type, status }) => {
  let startDate, endDate;
  const query = {}
  if (filterType) {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }
  if (startDate && endDate) {
    query.date = { $gte: startDate, $lte: endDate };
  }

  const visits = await Paymentreceived.find(query)
    .populate('doctor')
    .populate('patient')
    .sort({ createdAt: -1 });

  let filteredVisits = visits;

  if (status && status !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.status?.toString() === status
    );
  }

  if (type && type !== 'all') {
    filteredVisits = filteredVisits.filter(v =>
      v.paymentMode?.toString() === type
    );
  }

  return filteredVisits;
};

const getTasksByFilter = async ({ fromDate, toDate, filterType, assignedto, project, status }) => {
  let startDate, endDate;
  const query = {};

  if (filterType && filterType !== 'all') {
    ({ startDate, endDate } = getDateRange(filterType));
  } else if (fromDate && toDate) {
    startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);
  }

  if (startDate && endDate) {
    query.date = { $gte: startDate, $lte: endDate };
  }

  if (assignedto && assignedto !== 'all') {
    query.assignedto = assignedto;
  }

  if (project && project !== 'all') {
    query.project = project;
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  const tasks = await Singletask.find(query)
    .populate('assignedto')
    .populate('project')
    .populate('patient')
    .sort({ createdAt: -1 });

  return tasks;
};

const getDoctorUnavailabilitySummary = async ({ centerId, status }) => {
  const filter = {};
  if (status && status !== 'all') filter.status = status;
  const data = await Doctorunavaibility.find(filter)
    .populate({
      path: "doctorid",
      model: "Doctor",
      match: centerId ? { centerId } : {},
    })
    .lean();

  const filteredData = data.filter(item => item.doctorid && item.doctorid.length > 0);
  console.log('filteredData.length', filteredData.length)
  return filteredData
}

const saveOpeningBalance = async (data) => {
  const { patientId } = data;
  const existing = await CDHOpeningBalance.findOne({ patientId });

  if (existing) {
    return await CDHOpeningBalance.findByIdAndUpdate(existing._id, data, { new: true });
  }

  return await CDHOpeningBalance.create(data);
};

const getOpeningBalance = async (patientId) => {
  return await CDHOpeningBalance.findOne({ patientId }).populate('patientId');
};

const createContact = async (data) => {
  return await CDHContact.create(data);
};

const updateContact = async (id, data) => {
  return await CDHContact.findByIdAndUpdate(id, data, { new: true });
};

const getContact = async (id) => {
  return await CDHContact.findById(id);
};

const getAllContacts = async () => {
  return await CDHContact.find();
};

const deleteContact = async (id) => {
  return await CDHContact.findByIdAndDelete(id);
};


const getContactByName = async (name) => {
  return await CDHContact.findOne({
    fullName: { $regex: new RegExp(`^${name}$`, 'i') }
  });
};

const getProspectPatient = async (centerId) => {
  if (!mongoose.Types.ObjectId.isValid(centerId)) {
    throw new Error('Invalid center ID');
  }
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setHours(0, 0, 0, 0); 

  const patients = await Patient.find({
    center: centerId,
    createdAt: { $lt: sixMonthsAgo },
    treatmentOn: {
      $not: {
        $elemMatch: {
          createdAt: { $gte: sixMonthsAgo }
        }
      }
    },

    // No treatment done in last 6 months
    treatmentdone: {
      $not: {
        $elemMatch: {
          createdAt: { $gte: sixMonthsAgo }
        }
      }
    },

    // No clinic visits or entries in last 6 months
    clinic: {
      $not: {
        $elemMatch: {
          createdAt: { $gte: sixMonthsAgo }
        }
      }
    }
  })
  return patients;
};

const getRecallPatients = async (centerId) => {
  if (!mongoose.Types.ObjectId.isValid(centerId)) {
    throw new Error('Invalid center ID');
  }

  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const patients = await Patient.find({
    center: centerId,
    visitdate: { $gte: ninetyDaysAgo },
    appointment: null, 
    status: 'active'
  })
    .select('patientID firstName surname phoneNumber visitdate doctor')
    .sort({ visitdate: -1 });

  return patients;
};

const getInProgressPatients = async (centerId) => {
  if (!mongoose.Types.ObjectId.isValid(centerId)) {
    throw new Error('Invalid center ID');
  }

  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  return await Patient.find({
    center: centerId,
    status: 'active',
    visitdate: { $gte: ninetyDaysAgo },
    treatmentdone: { $not: { $size: 0 } },
    'appointment': null
  })
    .select('patientID firstName surname phoneNumber treatmentdone visitdate')
    .sort({ visitdate: -1 });
};

const getPatientsWithTreatmentPlans = async (centerId) => {
  if (!mongoose.Types.ObjectId.isValid(centerId)) {
    throw new Error('Invalid center ID');
  }
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  console.log('ninetyDaysAgo', ninetyDaysAgo)

  const patients = await Patient.find({
    center: centerId,
    treatmentOn: {
        $elemMatch: {
          createdAt: { $gte: ninetyDaysAgo }
      }
    },
  })
  .populate({
    path: 'treatmentOn.treatments.treatment',
    model: 'Treatment'
  })

  return patients;
};

const getConsultedPatients = async (centerId) => {
  //   if (!mongoose.Types.ObjectId.isValid(centerId)) {
  //     throw new Error('Invalid center ID');
  //   }
  
  //   const ninetyDaysAgo = new Date();
  //   ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  //   return await Patient.find({
  //     center: centerId,
  //     visitdate: { $gte: ninetyDaysAgo },
  //     status: 'active',
  //     treatmentOn: {
  //       $elemMatch: {
  //         treatments: {
  //           $elemMatch: {
  //             treatmentName: "Check Up / Consultation"
  //           }
  //         }
  //       }
  //     },
  //     treatmentdone: { $size: 0 }
  //   })
  //     .select('patientID firstName surname phoneNumber visitdate treatmentOn')
  //     .sort({ visitdate: -1 });
  // };
   if (!mongoose.Types.ObjectId.isValid(centerId)) {
      throw new Error("Invalid center ID");
    }
  
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
    const patients = await Patient.find({
      center: centerId,
      visitdate: { $gte: ninetyDaysAgo },
      status: 'active',
      treatmentdone: { $size: 0 },
      treatmentOn: { $not: { $size: 0 } }
    })
      .populate('treatmentOn.treatments.treatment', 'name') // only bring name field of Treatment
      .select('patientID firstName surname phoneNumber visitdate treatmentOn')
      .sort({ visitdate: -1 });
  
    // Filter in JS for those with "Check Up / Consultation"
    const filteredPatients = patients.filter(patient =>
      patient.treatmentOn.some(plan =>
        plan.treatments.some(t =>
          t.treatment?.name === 'Check Up / Consultation'
        )
      )
    );
  
    return filteredPatients;
  };

  const createProspect = async (data) => {
    const prospect = new CRMProspect(data);
    return await prospect.save();
  };
  
  const getAllProspects = async () => {
    return await CRMProspect.find();
  };
  
  const getProspectById = async (id) => {
    return await CRMProspect.findById(id);
  };
  
  const updateProspect = async (id, data) => {
    return await CRMProspect.findByIdAndUpdate(id, data, { new: true });
  };
  
  const deleteProspect = async (id) => {
    return await CRMProspect.findByIdAndDelete(id);
  };

  
const createNewfolder = async (data) => {
  return await Newfolder.create(data);
}

const getNewfolders = async () => {
  return await Newfolder.find();
}

const getNewfolderById = async (id) => {
  return await Newfolder.findById(id);
}

const updateNewfolder = async (id, data) => {
  return await Newfolder.findByIdAndUpdate(id, data, { new: true });
}

const deleteNewfolder = async (id) => {
  return await Newfolder.findByIdAndDelete(id);
}


const createUploaddoc = async (data) => {
  return await Uploaddoc.create(data);
}

const getUploaddocs = async () => {
  console.log("aaa111") 
   return await Uploaddoc.find();
}

const getUploaddocById = async (folderid) => {
  console.log("abc")  
  console.log('folderid', folderid)
  return await Uploaddoc.find({folder:folderid});
}

const updateUploaddoc = async (id, data) => {
  return await Uploaddoc.findByIdAndUpdate(id, data, { new: true });
}

const deleteUploaddoc = async (id) => {
  return await Uploaddoc.findByIdAndDelete(id);
}


export default {
  selecttime, userdetail, createPayment, verifyPayment, resendnotification, blockingtime,
  registeruser, loginuser, getuser, getuserbyid, updateuser, deleteuser, createCounter, createClinic, getClinics, searchnameClinics,
  searchdateClinics, getClinicById, updateClinic, deleteClinic, getClinicstatus, generateExcelClinic, generatePdfClinic,
  createCenter, getCenters, searchnameCenters, searchdateCenters, getCenterById, updateCenter, deleteCenter, getCenterstatus,
  generateExcelCenter, generatePdfCenter, createDoctor, getDoctors, searchnameDoctors, searchdateDoctors, getDoctorById,
  updateDoctor, deleteDoctor, getDoctorstatus, generateExcelDoctor, generatePdfDoctor, createStaff, getStaffs,
  searchnameStaffs, searchdateStaffs, getStaffById, updateStaff, deleteStaff, getStaffstatus, generateExcelStaff,
  generatePdfStaff, createHoliday, getHolidays, searchnameHolidays, searchdateHolidays, getHolidayById, updateHoliday, deleteHoliday,
  getHolidaystatus, generateExcelHoliday, generatePdfHoliday, createOperatory, getOperatorys, searchnameOperatorys,
  searchdateOperatorys, getOperatoryById, updateOperatory, deleteOperatory, createGallery, getGallerys, searchnameGallerys,
  searchdateGallerys, getGalleryById, updateGallery, deleteGallery, createAppointmentseries, getAppointmentseries, searchnameAppointmentseries,
  searchdateAppointmentseries, getAppointmentseriesById, updateAppointmentseries, deleteAppointmentseries, getAppointmentseriesstatus, generateExcelAppointmentseries,
  generatePdfAppointmentseries, createProject, getProjects, searchnameProjects, searchdateProjects, getProjectById, updateProject, deleteProject,
  createBankaccount, getBankaccounts, searchnameBankaccounts, searchdateBankaccounts, getBankaccountById, updateBankaccount, deleteBankaccount,
  getBankaccountstatus, generateExcelBankaccount, generatePdfBankaccount, createCardswipingmachine, getCardswipingmachines, searchnameCardswipingmachines,
  searchdateCardswipingmachines, getCardswipingmachineById, updateCardswipingmachine, deleteCardswipingmachine, getCardswipingmachinestatus,
  generateExcelCardswipingmachine, generatePdfCardswipingmachine, createCash, getCashs, searchnameCashs, searchdateCashs, getCashById, updateCash, deleteCash,
  getCashstatus, generateExcelCash, generatePdfCash, createCreditcard, getCreditcards, searchnameCreditcards, searchdateCreditcards, getCreditcardById, updateCreditcard, deleteCreditcard,
  getCreditcardstatus, generateExcelCreditcard, generatePdfCreditcard, createWallet, getWallets, searchnameWallets, searchdateWallets, getWalletById, updateWallet, deleteWallet,
  getWalletstatus, generateExcelWallet, generatePdfWallet, createOtherpayment, getOtherpayments, searchnameOtherpayments, searchdateOtherpayments, getOtherpaymentById, updateOtherpayment,
  deleteOtherpayment, getOtherpaymentstatus, generateExcelOtherpayment, generatePdfOtherpayment, createBranding, getBrandings, searchnameBrandings, searchdateBrandings, getBrandingById, updateBranding,
  deleteBranding, createSocialmedia, getSocialmedias, searchnameSocialmedias, searchdateSocialmedia, getSocialmediaById, updateSocialmedia, deleteSocialmedia, createRatecard, getRatecards, searchnameRatecards,
  searchdateRatecards, getRatecardById, updateRatecard, deleteRatecard, getRatecardstatus, generateExcelRatecard, generatePdfRatecard, createPackage, getPackage, searchnamePackages, searchdatePackages, getPackageById,
  updatePackage, deletePackage, getPackagestatus, generateExcelPackage, generatePdfPackage, createSpecialistfees, getSpecialistfees, searchnameSpecialistfees, searchdateSpecialistfees, getSpecialistfeesById, updateSpecialistfees,
  deleteSpecialistfees, createClinicalnotes, getClinicalnotes, searchnameClinicalnotes, searchdateClinicalnotes, getClinicalnotesById, updateClinicalnotes, deleteClinicalnotes, getClinicalnotesstatus, generateExcelClinicalnotes,
  generatePdfClinicalnotes, createTreatmentcategory, getTreatmentcategory, searchnameTreatmentcategorys, searchdateTreatmentcategorys, getTreatmentcategoryBymonth, getTreatmentcategoryById, updateTreatmentcategory, deleteTreatmentcategory,
  getTreatmentcategorystatus, generateExcelTreatmentcategory, generatePdfTreatmentcategory, createTreatment, getTreatment, searchnameTreatments, searchdateTreatments, getTreatmentBymonth, getTreatmentById, updateTreatment, deleteTreatment,
  getTreatmentstatus, generateExcelTreatment, generatePdfTreatment, createSittingnote, getSittingnote, searchnameSittingnotes, searchdateSittingnotes, getSittingnoteById, updateSittingnote, deleteSittingnote, getSittingnotestatus, generateExcelSittingnote,
  generatePdfSittingnote, createDrug, getDrug, searchnameDrugs, searchdateDrugs, getDrugById, updateDrug, deleteDrug, getDrugstatus, generateExcelDrug, generatePdfDrug, createInstruction, getInstruction, searchnameInstructions, searchdateInstructions,
  getInstructionById, updateInstruction, deleteInstruction, getInstructionstatus, generateExcelInstruction, generatePdfInstruction, createInsurance, getInsurance, searchnameInsurances, searchdateInsurances, getInsuranceById, updateInsurance, deleteInsurance,
  getInsurancestatus, generateExcelInsurance, generatePdfInsurance, createPrescription, getPrescription, searchnamePrescriptions, searchdatePrescriptions, getPrescriptionById, updatePrescription, deletePrescription, getPrescriptionstatus, generateExcelPrescription,
  generatePdfPrescription, createOrthogoal, getOrthogoals, searchnameOrthogoals, searchdateOrthogoals, getOrthogoalById, updateOrthogoal, deleteOrthogoal, getOrthogoalstatus, generateExcelOrthogoal, generatePdfOrthogoal, createOrtholimitation, getOrtholimitations,
  searchnameOrtholimitations, searchdateOrtholimitations, getOrtholimitationById, updateOrtholimitation, deleteOrtholimitation, getOrtholimitationstatus, generateExcelOrtholimitation, generatePdfOrtholimitation, createMedicalcondition, getMedicalconditions,
  searchnameMedicalconditions, searchdateMedicalconditions, getMedicalconditionById, updateMedicalcondition, deleteMedicalcondition, createDentalcondition, getDentalconditions, searchnameDentalconditions, searchdateDentalconditions, getDentalconditionById,
  updateDentalcondition, deleteDentalcondition, createPatientgroup, getPatientgroups, searchnamePatientgroups, searchdatePatientgroups, getPatientgroupById, updatePatientgroup, deletePatientgroup, getPatientgroupstatus, generateExcelPatientgroup,
  generatePdfPatientgroup, createSource, getSources, searchnameSources, searchdateSources, getSourceBymonth, getSourceById, updateSource, deleteSource, getSourcestatus, generateExcelSource,
  generatePdfSource, createSourcetype, getSourcetypes, searchnameSourcetypes, searchdateSourcetypes, getSourcetypeBymonth, getSourcetypeById, updateSourcetype, deleteSourcetype, getSourcetypestatus, generateExcelSourcetype, generatePdfSourcetype,
  createRefferal, getRefferals, searchnameRefferals, searchdateRefferals, getRefferalById, updateRefferal, deleteRefferal, getRefferalstatus, generateExcelRefferal, generatePdfRefferal, createGeneralpractitioner, getGeneralpractitioners, searchnameGeneralpractitioners,
  searchdateGeneralpractitioners, getGeneralpractitionerById, updateGeneralpractitioner, deleteGeneralpractitioner, getGeneralpractitionerstatus, generateExcelGeneralpractitioner, generatePdfGeneralpractitioner, createEmaildomain, getEmaildomains, searchnameEmaildomains,
  searchdateEmaildomains, getEmaildomainById, updateEmaildomain, deleteEmaildomain, createSMStemplate, getSMStemplates, searchnameSMStemplates, searchdateSMStemplates, getSMStemplateById, updateSMStemplate, deleteSMStemplate, getSMStemplatestatus, generateExcelSMStemplate,
  generatePdfSMStemplate, createWATemplate, getWATemplates, searchnameWATemplates, searchdateWATemplates, getWATemplateById, updateWATemplate, deleteWATemplate, getWATemplatestatus, generateExcelWATemplate, generatePdfWATemplate, createEmailtemplate, getEmailtemplates,
  searchnameEmailtemplates, searchdateEmailtemplates, getEmailtemplateById, updateEmailtemplate, deleteEmailtemplate, getEmailtemplatestatus, generateExcelEmailtemplate, generatePdfEmailtemplate, createLettertemplate, getLettertemplates, searchnameLettertemplates,
  searchdateLettertemplates, getLettertemplateById, updateLettertemplate, deleteLettertemplate, getLettertemplatestatus, generateExcelLettertemplate, generatePdfLettertemplate, createVendor, getVendors, searchnameVendors, searchdateVendors, getVendorById, updateVendor,
  deleteVendor, getVendorstatus, generateExcelVendor, generatePdfVendor, createInventorycategory, getInventorycategorys, searchnameInventorycategorys, searchdateInventorycategorys, getInventorycategoryById, updateInventorycategory, deleteInventorycategory, getInventorycategorystatus,
  generateExcelInventorycategory, generatePdfInventorycategory, createInventoryitem, getInventoryitems, searchnameInventoryitems, searchdateInventoryitems, getInventoryitemById, updateInventoryitem, deleteInventoryitem, getInventoryitemstatus, generateExcelInventoryitem,
  generatePdfInventoryitem, createAccount, getAccounts, searchnameAccounts, searchdateAccounts, getAccountById, updateAccount, deleteAccount, getAccountstatus, generateExcelAccount, generatePdfAccount, createPatient, addInvoiceToPatient, getPatients, searchnamePatients, searchdatePatients,
  getPatientBymonth, getPatientById, updatePatient, addMultipleTreatmentDone,  updateTreatmentDoneById, deleteTreatmentDone, deletePatient, getTotalPatientsByRateCard, getTotalPatientsBySourcetype, getTotalPatientsBySource, getTotalPatientsByGroup, createDoctorunavaibility, getDoctorunavaibilitys, searchnameDoctorunavaibilitys,
  searchdateDoctorunavaibilitys, getDoctorunavaibilityById, updateDoctorunavaibility, deleteDoctorunavaibility, createCreditnote, getCreditnotes, searchnameCreditnotes, searchdateCreditnotes, getCreditnoteById, updateCreditnote, deleteCreditnote,
  createPaymentreceived, getPaymentreceiveds, searchnamePaymentreceiveds, searchdatePaymentreceiveds, getPaymentreceivedById, getPaymentreceivedBypatientid, updatePaymentreceived, deletePaymentreceived,
  createPaymentreminder, getPaymentreminders, getPaymentreminderById, getPaymentreminderBypatientid, updatePaymentreminder, deletePaymentreminder,
  createPaymentMade, getPaymentMades, searchnamePaymentMades, searchdatePaymentMades,
  getPaymentMadeById, updatePaymentMade, deletePaymentMade, createCashBankTransaction, getCashBankTransactions, searchnameCashBankTransactions, searchdateCashBankTransactions, getCashBankTransactionById, updateCashBankTransaction, deleteCashBankTransaction,
  createJournalentry, getJournalentrys, searchnameJournalentrys, searchdateJournalentrys, getJournalentryById, updateJournalentry, deleteJournalentry, createPatientopeaningbalance, getPatientopeaningbalances, searchnamePatientopeaningbalances, searchdatePatientopeaningbalances,
  getPatientopeaningbalanceById, updatePatientopeaningbalance, deletePatientopeaningbalance, createInventorypurchase, getInventorypurchases, searchnameInventorypurchases, searchdateInventorypurchases, getInventorypurchaseById, updateInventorypurchase, deleteInventorypurchase,
  createInventoryconsume, getInventoryconsumes, searchnameInventoryconsumes, searchdateInventoryconsumes, getInventoryconsumeById, updateInventoryconsume, deleteInventoryconsume, createInventorytransfer, getInventorytransfers, searchnameInventorytransfers, searchdateInventorytransfers,
  getInventorytransferById, updateInventorytransfer, deleteInventorytransfer, createLab, getLabs, searchnameLabs, searchdateLabs, getLabById, updateLab, deleteLab, createLabbill, getLabbills, searchnameLabbills, searchdateLabbills, getLabbillById, updateLabbill, deleteLabbill,
  createLabworkgive, getLabworkgives, searchnameLabworkgives, searchdateLabworkgives, getLabworkgiveById, updateLabworkgive, deleteLabworkgive, createLabworkrecieve, getLabworkrecieves, searchnameLabworkrecieves, searchdateLabworkrecieves, getLabworkrecieveById, updateLabworkrecieve,
  deleteLabworkrecieve, createSmstransfer, getSmstransfers, searchnameSmstransfers, searchdateSmstransfers, getSmstransferById, updateSmstransfer, deleteSmstransfer, createPersonvisit, getPersonvisits, searchnamePersonvisits, searchdatePersonvisits, getPersonvisitById, updatePersonvisit,
  deletePersonvisit, updateDuePayment, getPatientsLoggedInButNotVisitedClinic, getPatientsWithLatestClinicVisit, getPatientsWithCompletedClinicVisit,
  createPurchaseorder, getPurchaseorders, getPurchaseorderById, updatePurchaseorder, deletePurchaseorder,
  createPurchaseInvoice, getPurchaseInvoices, getPurchaseInvoiceById, updatePurchaseInvoice, deletePurchaseInvoice,
  createGrninward, getGrninwards, getGrninwardById, updateGrninward, deleteGrninward,
  createGrnoutward, getGrnoutwards, getGrnoutwardById, updateGrnoutward, deleteGrnoutward, getSourceAndTypeSummary,
  createBranchindent, getBranchindents, getBranchindentById, updateBranchindent, deleteBranchindent,
  createBranchinward, getBranchinwards, getBranchinwardById, updateBranchinward, deleteBranchinward,
  createBranchoutward, getBranchoutwards, getBranchoutwardById, updateBranchoutward, deleteBranchoutward,
  createPurchasepayment, getPurchasepayments, getPurchasepaymentById, updatePurchasepayment, deletePurchasepayment,
  createPurchasereturnbill, getPurchasereturnbills, getPurchasereturnbillById, updatePurchasereturnbill, deletePurchasereturnbill,
  createPurchasereturnpayment, getPurchasereturnpayments, getPurchasereturnpaymentById, updatePurchasereturnpayment, deletePurchasereturnpayment,
  createOpeningstock, getOpeningstocks, getOpeningstockById, updateOpeningstock, deleteOpeningstock, getFilteredPatients, getDoctorTreatmentSummary,
  getTreatmentCategorySummary, getTreatmentSummary, getRateCardSummary, getGroupSummary, getSourceSummary, getSourceTypeSummary, getReceiptsByFilter,
  getdailyactivityByFilter, getDARTreportsByFilter, getProspectByFilter, getPatientsummeryByFilter, getPatientlistByFilter, getPatientcontactByFilter, getPatientbirthdayByFilter, getPatientanniversaryByFilter,
  getReferralsByFilter, getpatientsperiodByFilter, getNevervisitedpatientByFilter, getappointmentscheduleByFilter, getappointmentbookedByFilter, getTreatmentdoneByFilter,
  getTreatmentplansByFilter, getConversionByFilter, getpatienttreatmentByFilter, getprescriptionByFilter, getpatientreceivablesByFilter, getratecardreceivablesByFilter,
  getvendorpayablesByFilter, getdaybookByFilter, getvoucherlistByFilter, getTasksByFilter, getDoctorUnavailabilitySummary, saveOpeningBalance, getOpeningBalance, 
  createContact, updateContact, getContact, getAllContacts, deleteContact, getContactByName, 
  getProspectPatient, getConsultedPatients, getPatientsWithTreatmentPlans, getInProgressPatients, getRecallPatients, createProspect, getAllProspects, getProspectById, updateProspect, deleteProspect, 
  createNewfolder, getNewfolders, getNewfolderById, updateNewfolder, deleteNewfolder,
  createUploaddoc, getUploaddocs, getUploaddocById, updateUploaddoc, deleteUploaddoc, 
};