import adminService from "../services/admin.service.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendBookingEmail, sendBookingWhatsApp } from "../utils/notification.js";
import { CDHUser } from "../models/user.model.js";

// const createBooking = catchAsync(async (req, res) => {
//     const AboutUs = await adminService.createBookingService(req.body);
//     res.status(httpStatus.CREATED).send({ AboutUs });
//   });

const createBooking = async (req, res) => {
  try {
    const booking = await adminService.createBookingService(req.body);
    const user = await CDHUser.findById(booking.userId);

    const emailHTML = `
        <h3>Booking Confirmed</h3>
        <p>Your booking is confirmed on <strong>${booking.date}</strong> at <strong>${booking.time}</strong> (${booking.timeZone}).</p>
      `;
    const whatsappMsg = `Your booking is confirmed on ${booking.date} at ${booking.time} (${booking.timeZone}).`;

    await sendBookingEmail(user.email, "Booking Confirmation", emailHTML);
    //   await sendBookingWhatsApp(user.mobileNumber, whatsappMsg);

    res.status(201).json({
      success: true,
      message: "Booking created and confirmation sent",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllBookings = catchAsync(async (req, res) => {
  const booking = await adminService.getAllBookingsService(req.body);
  res.status(httpStatus.OK).send({ booking });
});
const getBookingById = catchAsync(async (req, res) => {
  const booking = await adminService.getBookingByIdService(req.params.id);
  res.status(httpStatus.OK).send({ booking });
});

const updateBooking = catchAsync(async (req, res) => {
  const booking = await adminService.updateBookingService(req.params.id, req.body);
  res.status(httpStatus.OK).send({ booking });
});

const deleteBooking = catchAsync(async (req, res) => {
  const booking = await adminService.deleteBookingService(req.params.id);
  res.status(httpStatus.OK).send({ booking });
});

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Amount is required",
      });
    }

    const order = await adminService.createRazorpayOrder(amount);
    return res.status(httpStatus.OK).json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

const createAppointment = async (req, res) => {
  try {
    const result = await adminService.createAppointmentService(req.body);
    res.status(201).json({ message: "Appointment created", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const results = await adminService.getAllAppointmentsService();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const result = await adminService.getAppointmentByIdService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const result = await adminService.updateAppointmentService(req.params.id, req.body);
    res.status(200).json({ message: "Appointment updated", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    await adminService.deleteAppointmentService(req.params.id);
    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};

const selecttime = async (req, res) => {
  try {
    const time = await adminService.selecttime(req.body);
    console.log('time', time)
    res.status(201).json(time);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};


const userdetail = async (req, res) => {
  try {
    const user = await adminService.userdetail(req.body);
    console.log('user', user)
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};



const createPayment = async (req, res) => {
  const { timeid, userid, amount } = req.body;
  try {
    const order = await adminService.createPayment(timeid, userid, amount);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { orderid } = req.body;

  try {
    const booking = await adminService.verifyPayment(orderid);
    res.status(200).json({ message: 'Payment verified successfully', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const resendnotification = async (req, res) => {

  try {
    const { paymentid } = req.params;
    const booking = await adminService.resendnotification(paymentid);
    res.status(200).json({ message: 'Payment verified successfully', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const blockingtime = async (req, res) => {
  try {
    const blocking = await adminService.blockingtime(req.body);
    res.status(201).json(blocking);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createClinic = async (req, res) => {
  try {
    const clinic = await adminService.createClinic(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClinics = async (_, res) => {
  try {
    const clinics = await adminService.getClinics();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getClinicById = async (req, res) => {
  try {
    const clinic = await adminService.getClinicById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.staus(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateClinic = async (req, res) => {
  try {
    const clinic = await adminService.updateClinic(req.params.id, req.body);
    res.staus(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteClinic = async (req, res) => {
  try {
    await adminService.deleteClinic(req.params.id);
    res.status(200).json({ message: 'Clinic deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createCenter = async (req, res) => {
  try {
    const clinic = await adminService.createCenter(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCenters = async (_, res) => {
  try {
    const clinics = await adminService.getCenters();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getCenterById = async (req, res) => {
    const clinic = await adminService.getCenterById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Center not found' });
    res.status(200).json(clinic);
};

const updateCenter = async (req, res) => {
  try {
    const clinic = await adminService.updateCenter(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCenter = async (req, res) => {
  try {
    await adminService.deleteCenter(req.params.id);
    res.status(200).json({ message: 'Center deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};


const createDoctor = async (req, res) => {
  try {
    const profileurl = req.file?.path;
    const data = { ...req.body, Profile: profileurl };
    const clinic = await adminService.createDoctor(data);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDoctors = async (_, res) => {
  try {
    const clinics = await adminService.getDoctors();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getDeletedDoctors = async (_, res) => {
  try {
    const clinics = await adminService.getDeletedDoctors();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const clinic = await adminService.getDoctorById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const profileurl = req.file?.path;
    const data = { ...req.body, ...(profileurl.length && { Profile: profileurl }) };
    const clinic = await adminService.updateDoctor(req.params.id, data);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await adminService.deleteDoctor(req.params.id);
    res.status(200).json({ message: 'Doctor deleted' });


  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createStaff = async (req, res) => {
  try {
    const profileurl = req.file?.path;
    const data = { ...req.body, Profile: profileurl };
    const clinic = await adminService.createStaff(data);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStaffs = async (_, res) => {
  try {
    const clinics = await adminService.getStaffs();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getDeletedStaffs = async (_, res) => {
  try {
    const clinics = await adminService.getDeletedStaffs();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getStaffById = async (req, res) => {
  try {
    const clinic = await adminService.getStaffById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Staff not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const profileurl = req.file?.path;
    const data = { ...req.body, ...(profileurl.length && { Profile: profileurl }) };
    const clinic = await adminService.updateStaff(req.params.id, data);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    await adminService.deleteStaff(req.params.id);
    res.status(200).json({ message: 'Staff deleted' });


  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createHoliday = async (req, res) => {
  try {
    const clinic = await adminService.createHoliday(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHolidays = async (_, res) => {
  try {
    const clinics = await adminService.getHolidays();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getHolidayById = async (req, res) => {
  try {
    const clinic = await adminService.getHolidayById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateHoliday = async (req, res) => {
  try {
    const clinic = await adminService.updateHoliday(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteHoliday = async (req, res) => {
  try {
    await adminService.deleteHoliday(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createOperatory = async (req, res) => {
  try {
    const clinic = await adminService.createOperatory(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOperatorys = async (_, res) => {
  try {
    const clinics = await adminService.getOperatorys();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getOperatoryById = async (req, res) => {
  try {
    const clinic = await adminService.getOperatoryById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateOperatory = async (req, res) => {
  try {
    const clinic = await adminService.updateOperatory(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOperatory = async (req, res) => {
  try {
    await adminService.deleteOperatory(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createGallery = async (req, res) => {
  try {
    const clinic = await adminService.createGallery(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGallerys = async (_, res) => {
  try {
    const clinics = await adminService.getGallerys();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getGalleryById = async (req, res) => {
  try {
    const clinic = await adminService.getGalleryById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateGallery = async (req, res) => {
  try {
    const clinic = await adminService.updateGallery(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteGallery = async (req, res) => {
  try {
    await adminService.deleteGallery(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createAppointmentseries = async (req, res) => {
  try {
    const clinic = await adminService.createAppointmentseries(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAppointmentseries = async (_, res) => {
  try {
    const clinics = await adminService.getAppointmentseries();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getAppointmentseriesById = async (req, res) => {
  try {
    const clinic = await adminService.getAppointmentseriesById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateAppointmentseries = async (req, res) => {
  try {
    const clinic = await adminService.updateAppointmentseries(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAppointmentseries = async (req, res) => {
  try {
    await adminService.deleteAppointmentseries(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createGroupappointment = async (req, res) => {
  try {
    const clinic = await adminService.createGroupappointment(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGroupappointments = async (_, res) => {
  try {
    const clinics = await adminService.getGroupappointments();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getGroupappointmentById = async (req, res) => {
  try {
    const clinic = await adminService.getGroupappointmentById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateGroupappointment = async (req, res) => {
  try {
    const clinic = await adminService.updateGroupappointment(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteGroupappointment = async (req, res) => {
  try {
    await adminService.deleteGroupappointment(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const clinic = await adminService.createProject(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProjects = async (_, res) => {
  try {
    const clinics = await adminService.getProjects();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const clinic = await adminService.getProjectById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const clinic = await adminService.updateProject(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    await adminService.deleteProject(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createBankaccount = async (req, res) => {
  try {
    const clinic = await adminService.createBankaccount(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBankaccounts = async (_, res) => {
  try {
    const clinics = await adminService.getBankaccounts();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getBankaccountById = async (req, res) => {
  try {
    const clinic = await adminService.getBankaccountById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateBankaccount = async (req, res) => {
  try {
    const clinic = await adminService.updateBankaccount(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBankaccount = async (req, res) => {
  try {
    await adminService.deleteBankaccount(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createCardswipingmachine = async (req, res) => {
  try {
    const clinic = await adminService.createCardswipingmachine(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCardswipingmachines = async (_, res) => {
  try {
    const clinics = await adminService.getCardswipingmachines();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getCardswipingmachineById = async (req, res) => {
  try {
    const clinic = await adminService.getCardswipingmachineById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateCardswipingmachine = async (req, res) => {
  try {
    const clinic = await adminService.updateCardswipingmachine(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCardswipingmachine = async (req, res) => {
  try {
    await adminService.deleteCardswipingmachine(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createCash = async (req, res) => {
  try {
    const clinic = await adminService.createCash(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCashs = async (_, res) => {
  try {
    const clinics = await adminService.getCashs();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getCashById = async (req, res) => {
  try {
    const clinic = await adminService.getCashById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateCash = async (req, res) => {
  try {
    const clinic = await adminService.updateCash(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCash = async (req, res) => {
  try {
    await adminService.deleteCash(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createCreditcard = async (req, res) => {
  try {
    const clinic = await adminService.createCreditcard(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCreditcards = async (_, res) => {
  try {
    const clinics = await adminService.getCreditcards();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getCreditcardById = async (req, res) => {
  try {
    const clinic = await adminService.getCreditcardById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateCreditcard = async (req, res) => {
  try {
    const clinic = await adminService.updateCreditcard(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCreditcard = async (req, res) => {
  try {
    await adminService.deleteCreditcard(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createWallet = async (req, res) => {
  try {
    const clinic = await adminService.createWallet(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getWallets = async (_, res) => {
  try {
    const clinics = await adminService.getWallets();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getWalletById = async (req, res) => {
  try {
    const clinic = await adminService.getWalletById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateWallet = async (req, res) => {
  try {
    const clinic = await adminService.updateWallet(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteWallet = async (req, res) => {
  try {
    await adminService.deleteWallet(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createOtherpayment = async (req, res) => {
  try {
    const clinic = await adminService.createOtherpayment(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOtherpayments = async (_, res) => {
  try {
    const clinics = await adminService.getOtherpayments();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getOtherpaymentById = async (req, res) => {
  try {
    const clinic = await adminService.getOtherpaymentById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateOtherpayment = async (req, res) => {
  try {
    const clinic = await adminService.updateOtherpayment(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOtherpayment = async (req, res) => {
  try {
    await adminService.deleteOtherpayment(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createBranding = async (req, res) => {
  try {
    const clinic = await adminService.createBranding(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBrandings = async (_, res) => {
  try {
    const clinics = await adminService.getBrandings();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getBrandingById = async (req, res) => {
  try {
    const clinic = await adminService.getBrandingById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateBranding = async (req, res) => {
  try {
    const clinic = await adminService.updateBranding(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBranding = async (req, res) => {
  try {
    await adminService.deleteBranding(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createSocialmedia = async (req, res) => {
  try {
    const clinic = await adminService.createSocialmedia(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSocialmedias = async (_, res) => {
  try {
    const clinics = await adminService.getSocialmedias();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getSocialmediaById = async (req, res) => {
  try {
    const clinic = await adminService.getSocialmediaById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateSocialmedia = async (req, res) => {
  try {
    const clinic = await adminService.updateSocialmedia(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSocialmedia = async (req, res) => {
  try {
    await adminService.deleteSocialmedia(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createRatecard = async (req, res) => {
  try {
    const clinic = await adminService.createRatecard(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRatecards = async (_, res) => {
  try {
    const clinics = await adminService.getRatecards();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getRatecardById = async (req, res) => {
  try {
    const clinic = await adminService.getRatecardById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateRatecard = async (req, res) => {
  try {
    const clinic = await adminService.updateRatecard(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRatecard = async (req, res) => {
  try {
    await adminService.deleteRatecard(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createPackage = async (req, res) => {
  try {
    const clinic = await adminService.createPackage(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPackage = async (_, res) => {
  try {
    const clinics = await adminService.getPackage();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getPackageById = async (req, res) => {
  try {
    const clinic = await adminService.getPackageById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updatePackage = async (req, res) => {
  try {
    const clinic = await adminService.updatePackage(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    await adminService.deletePackage(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createSpecialistfees = async (req, res) => {
  try {
    const clinic = await adminService.createSpecialistfees(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSpecialistfees = async (_, res) => {
  try {
    const clinics = await adminService.getSpecialistfees();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getSpecialistfeesById = async (req, res) => {
  try {
    const clinic = await adminService.getSpecialistfeesById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateSpecialistfees = async (req, res) => {
  try {
    const clinic = await adminService.updateSpecialistfees(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSpecialistfees = async (req, res) => {
  try {
    await adminService.deleteSpecialistfees(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createClinicalnotes = async (req, res) => {
  try {
    const clinic = await adminService.createClinicalnotes(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClinicalnotes = async (_, res) => {
  try {
    const clinics = await adminService.getClinicalnotes();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getClinicalnotesById = async (req, res) => {
  try {
    const clinic = await adminService.getClinicalnotesById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateClinicalnotes = async (req, res) => {
  try {
    const clinic = await adminService.updateClinicalnotes(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteClinicalnotes = async (req, res) => {
  try {
    await adminService.deleteClinicalnotes(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createTreatementcategory = async (req, res) => {
  try {
    const imageurl = req.file?.path;
    const data = { ...req.body, image: imageurl };
    const clinic = await adminService.createTreatementcategory(data);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTreatementcategory = async (_, res) => {
  try {
    const clinics = await adminService.getTreatementcategory();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getTreatementcategoryById = async (req, res) => {
  try {
    const clinic = await adminService.getTreatementcategoryById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateTreatementcategory = async (req, res) => {
  try {
    const imageurl = req.file?.path;
    const data = { ...req.body, ...(imageurl.length && { image: imageurl }) };
    const clinic = await adminService.updateTreatementcategory(req.params.id, data);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTreatementcategory = async (req, res) => {
  try {
    await adminService.deleteTreatementcategory(req.params.id);
    res.status(200).json({ message: 'Data deleted' });


  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};


const createSittingnote = async (req, res) => {
  try {
    const clinic = await adminService.createSittingnote(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSittingnote = async (_, res) => {
  try {
    const clinics = await adminService.getSittingnote();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getSittingnoteById = async (req, res) => {
  try {
    const clinic = await adminService.getSittingnoteById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateSittingnote = async (req, res) => {
  try {
    const clinic = await adminService.updateSittingnote(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSittingnote = async (req, res) => {
  try {
    await adminService.deleteSittingnote(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createDrug = async (req, res) => {
  try {
    const clinic = await adminService.createDrug(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDrug = async (_, res) => {
  try {
    const clinics = await adminService.getDrug();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getDrugById = async (req, res) => {
  try {
    const clinic = await adminService.getDrugById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateDrug = async (req, res) => {
  try {
    const clinic = await adminService.updateDrug(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDrug = async (req, res) => {
  try {
    await adminService.deleteDrug(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createInstruction = async (req, res) => {
  try {
    const clinic = await adminService.createInstruction(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInstruction = async (_, res) => {
  try {
    const clinics = await adminService.getInstruction();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getInstructionById = async (req, res) => {
  try {
    const clinic = await adminService.getInstructionById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateInstruction = async (req, res) => {
  try {
    const clinic = await adminService.updateInstruction(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteInstruction = async (req, res) => {
  try {
    await adminService.deleteInstruction(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createInsurance = async (req, res) => {
  try {
    const clinic = await adminService.createInsurance(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInsurance = async (_, res) => {
  try {
    const clinics = await adminService.getInsurance();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getInsuranceById = async (req, res) => {
  try {
    const clinic = await adminService.getInsuranceById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateInsurance = async (req, res) => {
  try {
    const clinic = await adminService.updateInsurance(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteInsurance = async (req, res) => {
  try {
    await adminService.deleteInsurance(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createPrescription = async (req, res) => {
  try {
    const clinic = await adminService.createPrescription(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPrescription = async (_, res) => {
  try {
    const clinics = await adminService.getPrescription();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getPrescriptionById = async (req, res) => {
  try {
    const clinic = await adminService.getPrescriptionById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const clinic = await adminService.updatePrescription(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deletePrescription = async (req, res) => {
  try {
    await adminService.deletePrescription(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createOrthogoal = async (req, res) => {
  try {
    const clinic = await adminService.createOrthogoal(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrthogoals = async (_, res) => {
  try {
    const clinics = await adminService.getOrthogoals();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getOrthogoalById = async (req, res) => {
  try {
    const clinic = await adminService.getOrthogoalById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrthogoal = async (req, res) => {
  try {
    const clinic = await adminService.updateOrthogoal(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOrthogoal = async (req, res) => {
  try {
    await adminService.deleteOrthogoal(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createOrtholimitation = async (req, res) => {
  try {
    const clinic = await adminService.createOrtholimitation(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrtholimitations = async (_, res) => {
  try {
    const clinics = await adminService.getOrtholimitations();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getOrtholimitationById = async (req, res) => {
  try {
    const clinic = await adminService.getOrtholimitationById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrtholimitation = async (req, res) => {
  try {
    const clinic = await adminService.updateOrtholimitation(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOrtholimitation = async (req, res) => {
  try {
    await adminService.deleteOrtholimitation(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createMedicalcondition = async (req, res) => {
  try {
    const clinic = await adminService.createMedicalcondition(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMedicalconditions = async (_, res) => {
  try {
    const clinics = await adminService.getMedicalconditions();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getMedicalconditionById = async (req, res) => {
  try {
    const clinic = await adminService.getMedicalconditionById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateMedicalcondition = async (req, res) => {
  try {
    const clinic = await adminService.updateMedicalcondition(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMedicalcondition = async (req, res) => {
  try {
    await adminService.deleteMedicalcondition(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createDentalcondition = async (req, res) => {
  try {
    const clinic = await adminService.createDentalcondition(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDentalconditions = async (_, res) => {
  try {
    const clinics = await adminService.getDentalconditions();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getDentalconditionById = async (req, res) => {
  try {
    const clinic = await adminService.getDentalconditionById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateDentalcondition = async (req, res) => {
  try {
    const clinic = await adminService.updateDentalcondition(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDentalcondition = async (req, res) => {
  try {
    await adminService.deleteDentalcondition(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createPatientgroup = async (req, res) => {
  try {
    const clinic = await adminService.createPatientgroup(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPatientgroups = async (_, res) => {
  try {
    const clinics = await adminService.getPatientgroups();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getPatientgroupById = async (req, res) => {
  try {
    const clinic = await adminService.getPatientgroupById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updatePatientgroup = async (req, res) => {
  try {
    const clinic = await adminService.updatePatientgroup(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deletePatientgroup = async (req, res) => {
  try {
    await adminService.deletePatientgroup(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createSource = async (req, res) => {
  try {
    const clinic = await adminService.createSource(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSources = async (_, res) => {
  try {
    const clinics = await adminService.getSources();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getSourceById = async (req, res) => {
  try {
    const clinic = await adminService.getSourceById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateSource = async (req, res) => {
  try {
    const clinic = await adminService.updateSource(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSource = async (req, res) => {
  try {
    await adminService.deleteSource(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createRefferal = async (req, res) => {
  try {
    const clinic = await adminService.createRefferal(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRefferals = async (_, res) => {
  try {
    const clinics = await adminService.getRefferals();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getRefferalById = async (req, res) => {
  try {
    const clinic = await adminService.getRefferalById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateRefferal = async (req, res) => {
  try {
    const clinic = await adminService.updateRefferal(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRefferal = async (req, res) => {
  try {
    await adminService.deleteRefferal(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createGeneralpractitioner = async (req, res) => {
  try {
    const clinic = await adminService.createGeneralpractitioner(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGeneralpractitioners = async (_, res) => {
  try {
    const clinics = await adminService.getGeneralpractitioners();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getGeneralpractitionerById = async (req, res) => {
  try {
    const clinic = await adminService.getGeneralpractitionerById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateGeneralpractitioner = async (req, res) => {
  try {
    const clinic = await adminService.updateGeneralpractitioner(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteGeneralpractitioner = async (req, res) => {
  try {
    await adminService.deleteGeneralpractitioner(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createEmaildomain = async (req, res) => {
  try {
    const clinic = await adminService.createEmaildomain(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEmaildomains = async (_, res) => {
  try {
    const clinics = await adminService.getEmaildomains();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getEmaildomainById = async (req, res) => {
  try {
    const clinic = await adminService.getEmaildomainById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateEmaildomain = async (req, res) => {
  try {
    const clinic = await adminService.updateEmaildomain(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEmaildomain = async (req, res) => {
  try {
    await adminService.deleteEmaildomain(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createSMStemplate = async (req, res) => {
  try {
    const clinic = await adminService.createSMStemplate(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSMStemplates = async (_, res) => {
  try {
    const clinics = await adminService.getSMStemplates();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getSMStemplateById = async (req, res) => {
  try {
    const clinic = await adminService.getSMStemplateById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateSMStemplate = async (req, res) => {
  try {
    const clinic = await adminService.updateSMStemplate(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSMStemplate = async (req, res) => {
  try {
    await adminService.deleteSMStemplate(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createWATemplate = async (req, res) => {
  try {
    const clinic = await adminService.createWATemplate(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getWATemplates = async (_, res) => {
  try {
    const clinics = await adminService.getWATemplates();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getWATemplateById = async (req, res) => {
  try {
    const clinic = await adminService.getWATemplateById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateWATemplate = async (req, res) => {
  try {
    const clinic = await adminService.updateWATemplate(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteWATemplate = async (req, res) => {
  try {
    await adminService.deleteWATemplate(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createEmailtemplate = async (req, res) => {
  try {
    const clinic = await adminService.createEmailtemplate(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEmailtemplates = async (_, res) => {
  try {
    const clinics = await adminService.getEmailtemplates();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getEmailtemplateById = async (req, res) => {
  try {
    const clinic = await adminService.getEmailtemplateById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateEmailtemplate = async (req, res) => {
  try {
    const clinic = await adminService.updateEmailtemplate(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEmailtemplate = async (req, res) => {
  try {
    await adminService.deleteEmailtemplate(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createLettertemplate = async (req, res) => {
  try {
    const clinic = await adminService.createLettertemplate(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLettertemplates = async (_, res) => {
  try {
    const clinics = await adminService.getLettertemplates();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getLettertemplateById = async (req, res) => {
  try {
    const clinic = await adminService.getLettertemplateById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateLettertemplate = async (req, res) => {
  try {
    const clinic = await adminService.updateLettertemplate(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLettertemplate = async (req, res) => {
  try {
    await adminService.deleteLettertemplate(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createSingletask = async (req, res) => {
  try {
    const clinic = await adminService.createSingletask(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingletasks = async (_, res) => {
  try {
    const clinics = await adminService.getSingletasks();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getSingletaskById = async (req, res) => {
  try {
    const clinic = await adminService.getSingletaskById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateSingletask = async (req, res) => {
  try {
    const clinic = await adminService.updateSingletask(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSingletask = async (req, res) => {
  try {
    await adminService.deleteSingletask(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createRecurringtask = async (req, res) => {
  try {
    const clinic = await adminService.createRecurringtask(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecurringtasks = async (_, res) => {
  try {
    const clinics = await adminService.getRecurringtasks();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getRecurringtaskById = async (req, res) => {
  try {
    const clinic = await adminService.getRecurringtaskById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateRecurringtask = async (req, res) => {
  try {
    const clinic = await adminService.updateRecurringtask(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRecurringtask = async (req, res) => {
  try {
    await adminService.deleteRecurringtask(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};


const createShowoncalender = async (req, res) => {
  try {
    const clinic = await adminService.createShowoncalender(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getShowoncalenders = async (_, res) => {
  try {
    const clinics = await adminService.getShowoncalenders();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getShowoncalenderById = async (req, res) => {
  try {
    const clinic = await adminService.getShowoncalenderById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateShowoncalender = async (req, res) => {
  try {
    const clinic = await adminService.updateShowoncalender(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteShowoncalender = async (req, res) => {
  try {
    await adminService.deleteShowoncalender(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};


const createTreatmentnote = async (req, res) => {
  try {
    const clinic = await adminService.createTreatmentnote(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTreatmentnotes = async (_, res) => {
  try {
    const clinics = await adminService.getTreatmentnotes();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateTreatmentnote = async (req, res) => {
  try {
    const clinic = await adminService.updateTreatmentnote(req.params.id, req.body);
    res.staus(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTreatmentnote = async (req, res) => {
  try {
    await adminService.deleteTreatmentnote(req.params.id);
    res.status(200).json({ message: 'Treatmentnote deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createFilenote = async (req, res) => {
  try {
    const clinic = await adminService.createFilenote(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFilenotes = async (_, res) => {
  try {
    const clinics = await adminService.getFilenotes();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateFilenote = async (req, res) => {
  try {
    const clinic = await adminService.updateFilenote(req.params.id, req.body);
    res.staus(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFilenote = async (req, res) => {
  try {
    await adminService.deleteFilenote(req.params.id);
    res.status(200).json({ message: 'Filenote deleted' });

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};


const getCenterByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getCenterByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getDoctorByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStaffByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getStaffByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOperatoryByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getOperatoryByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentseriesByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getAppointmentseriesByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBankaccountByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getBankaccountByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCardswipingmachineByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getCardswipingmachineByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCashByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getCashByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreditcardByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getCreditcardByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWalletByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getWalletByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOtherpaymentByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getOtherpaymentByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRatecardByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getRatecardByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPackageByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getPackageByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecialistfeesByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getSpecialistfeesByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClinicalnotesByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getClinicalnotesByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatementcategoryByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getTreatementcategoryByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatementByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getTreatementByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDrugByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getDrugByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInstructionByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getInstructionByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInsuranceByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getInsuranceByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrthogoalByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getOrthogoalByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrtholimitationByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getOrtholimitationByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientgroupByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getPatientgroupByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourceByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getSourceByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourcetypeByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getSourcetypeByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRefferalByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getRefferalByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGeneralpractitionerByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getGeneralpractitionerByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVendorByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getVendorByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryCategoryByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getInventoryCategoryByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryitemByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getInventoryitemByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountByFilter = async (req, res) => {
  try {
    const clinics = await adminService.getAccountByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  selecttime, userdetail, createPayment, verifyPayment, resendnotification, blockingtime, createClinic, getClinics, getClinicById, updateClinic, deleteClinic,
  createCenter, getCenters, getCenterById, updateCenter, deleteCenter, createDoctor, getDoctors, getDeletedDoctors, getDoctorById, updateDoctor, deleteDoctor, createStaff, getStaffs, getDeletedStaffs, getStaffById, updateStaff, deleteStaff,
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
  createInsurance, getInsurance, getInsuranceById, updateInsurance, deleteInsurance, createPrescription, getPrescription, getPrescriptionById, updatePrescription, deletePrescription, createOrthogoal, getOrthogoals, getOrthogoalById, updateOrthogoal, deleteOrthogoal,
  createOrtholimitation, getOrtholimitations, getOrtholimitationById, updateOrtholimitation, deleteOrtholimitation, createMedicalcondition, getMedicalconditions, getMedicalconditionById, updateMedicalcondition, deleteMedicalcondition,
  createDentalcondition, getDentalconditions, getDentalconditionById, updateDentalcondition, deleteDentalcondition, createPatientgroup, getPatientgroups, getPatientgroupById, updatePatientgroup, deletePatientgroup,
  createSource, getSources, getSourceById, updateSource, deleteSource, createRefferal, getRefferals, getRefferalById, updateRefferal, deleteRefferal, createGeneralpractitioner, getGeneralpractitioners, getGeneralpractitionerById, updateGeneralpractitioner, deleteGeneralpractitioner,
  createEmaildomain, getEmaildomains, getEmaildomainById, updateEmaildomain, deleteEmaildomain, createSMStemplate, getSMStemplates, getSMStemplateById, updateSMStemplate, deleteSMStemplate, createWATemplate, getWATemplates, getWATemplateById, updateWATemplate, deleteWATemplate,
  createEmailtemplate, getEmailtemplates, getEmailtemplateById, updateEmailtemplate, deleteEmailtemplate, createLettertemplate, getLettertemplates, getLettertemplateById, updateLettertemplate, deleteLettertemplate,
  createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking, createOrder, createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment,
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
