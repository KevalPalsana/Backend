import mongoose from "mongoose";
import userService from "../services/user.service.js";
import httpStatus from "http-status" ;

const selecttime = async (req, res) => {

  try {
    const time = await userService.selecttime(req.body);
    console.log('time', time)
    res.status(201).json(time);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};


const userdetail = async (req, res) => {
  try {
    const user = await userService.userdetail(req.body);
    console.log('user', user)
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};



const createPayment = async (req, res) => {
  const { timeid, userid, amount } = req.body;
  try {
    const order = await userService.createPayment(timeid, userid, amount);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { orderid } = req.body;

  try {
    const booking = await userService.verifyPayment(orderid);
    res.status(200).json({ message: 'Payment verified successfully', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const resendnotification = async (req, res) => {
  try {
    const { paymentid } = req.params;

    // ✅ Validate ID format
    if (!mongoose.Types.ObjectId.isValid(paymentid)) {
      return res.status(400).json({ message: "Invalid payment ID" });
    }

    const booking = await userService.resendnotification(paymentid);

    res.status(200).json({ message: "Payment verified successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blockingtime = async (req, res) => {
  try {
    const blocking = await userService.blockingtime(req.body);
    res.status(201).json(blocking);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const registeruser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await userService.registeruser(name, email, password, role);
    //   if (user.message) {
    //     return res.status(400).json({ error: user.message });
    // }
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginuser(email, password, res);
    res.status(201).json({ message: 'userService login successfully', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getuser = async (req, res) => {
  try {
    const user = await userService.getuser();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getuserbyid = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getuserbyid(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateuser = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.user._id.toString() !== id) {
      return res.status(403).json({ error: "You can only update your own profile" });
    }
    const user = await userService.updateuser(id, req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteuser = async (req, res) => {
  try {
    await userService.deleteuser(req.params.id);
    res.json({ message: "delete successfully" });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const createCounter = async (req, res) => {
  try {
    const clinic = await userService.createCounter(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClinic = async (req, res) => {
  try {
    const clinic = await userService.createClinic(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClinics = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getClinics(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameClinics = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameClinics(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateClinics = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateClinics(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClinicById = async (req, res) => {
  try {
    const clinic = await userService.getClinicById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.staus(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClinic = async (req, res) => {
  try {
    const clinic = await userService.updateClinic(req.params.id, req.body);
    res.staus(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClinic = async (req, res) => {
  try {
    await userService.deleteClinic(req.params.id);
    res.status(200).json({ message: 'Clinic deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClinicstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getClinicstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const generateExcelClinic = async (req, res) => {
  try {
    await userService.generateExcelClinic(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfClinic = async (req, res) => {
  try {
    await userService.generatePdfClinic(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCenter = async (req, res) => {
  try {
    const clinic = await userService.createCenter(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCenters = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getCenters(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameCenters = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameCenters(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateCenters = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateCenters(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCenterById = async (req, res) => {
  try {
    const clinic = await userService.getCenterById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Center not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCenter = async (req, res) => {
  try {
    const clinic = await userService.updateCenter(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCenter = async (req, res) => {
  try {
    await userService.deleteCenter(req.params.id);
    res.status(200).json({ message: 'Center deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCenterstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getCenterstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const generateExcelCenter = async (req, res) => {
  try {
    await userService.generateExcelCenter(res);
  } catch (error) {
    res?.status(400).json({ error: error.message });
  }
};

  const generatePdfCenter = async (req, res) => {
    try {
      await userService.generatePdfCenter(res);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const createDoctor = async (req, res) => {
  try {
    const clinic = await userService.createDoctor(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const clinics = await userService.getDoctors();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameDoctors = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameDoctors(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateDoctors = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateDoctors(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getDoctorById = async (req, res) => {
  try {
    const clinic = await userService.getDoctorById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const clinic = await userService.updateDoctor(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await userService.deleteDoctor(req.params.id);
    res.status(200).json({ message: 'Doctor deleted' });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getDoctorstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const generateExcelDoctor = async (req, res) => {
  try {
    await userService.generateExcelDoctor(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfDoctor = async (req, res) => {
  try {
    await userService.generatePdfDoctor(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createStaff = async (req, res) => {
  try {
    const clinic = await userService.createStaff(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStaffs = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getStaffs(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameStaffs = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameStaffs(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateStaffs = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateStaffs(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getStaffById = async (req, res) => {
  try {
    const clinic = await userService.getStaffById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Staff not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const clinic = await userService.updateStaff(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    await userService.deleteStaff(req.params.id);
    res.status(200).json({ message: 'Staff deleted' });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStaffstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getStaffstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelStaff = async (req, res) => {
  try {
    await userService.generateExcelStaff(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfStaff = async (req, res) => {
  try {
    await userService.generatePdfStaff(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createHoliday = async (req, res) => {
  try {
    const clinic = await userService.createHoliday(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHolidays = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getHolidays(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameHolidays = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameHolidays(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateHolidays = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateHolidays(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHolidayById = async (req, res) => {
  try {
    const clinic = await userService.getHolidayById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHoliday = async (req, res) => {
  try {
    const clinic = await userService.updateHoliday(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHoliday = async (req, res) => {
  try {
    await userService.deleteHoliday(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHolidaystatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getHolidaystatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelHoliday = async (req, res) => {
  try {
    await userService.generateExcelHoliday(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfHoliday = async (req, res) => {
  try {
    await userService.generatePdfHoliday(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOperatory = async (req, res) => {
  try {
    const clinic = await userService.createOperatory(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOperatorys = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getOperatorys(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameOperatorys = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameOperatorys(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateOperatorys = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateOperatorys(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOperatoryById = async (req, res) => {
  try {
    const clinic = await userService.getOperatoryById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOperatory = async (req, res) => {
  try {
    const clinic = await userService.updateOperatory(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOperatory = async (req, res) => {
  try {
    await userService.deleteOperatory(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGallery = async (req, res) => {
  try {
    const clinic = await userService.createGallery(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGallerys = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getGallerys(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameGallerys = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameGallerys(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateGallerys = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateGallerys(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getGalleryById = async (req, res) => {
  try {
    const clinic = await userService.getGalleryById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGallery = async (req, res) => {
  try {
    const clinic = await userService.updateGallery(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGallery = async (req, res) => {
  try {
    await userService.deleteGallery(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAppointmentseries = async (req, res) => {
  try {
    const clinic = await userService.createAppointmentseries(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentseries = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getAppointmentseries(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameAppointmentseries = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameAppointmentseries(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateAppointmentseries = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateAppointmentseries(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAppointmentseriesById = async (req, res) => {
  try {
    const clinic = await userService.getAppointmentseriesById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppointmentseries = async (req, res) => {
  try {
    const clinic = await userService.updateAppointmentseries(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAppointmentseries = async (req, res) => {
  try {
    await userService.deleteAppointmentseries(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentseriesstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getAppointmentseriesstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelAppointmentseries = async (req, res) => {
  try {
    await userService.generateExcelAppointmentseries(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfAppointmentseries = async (req, res) => {
  try {
    await userService.generatePdfAppointmentseries(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const clinic = await userService.createProject(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getProjects(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameProjects = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameProjects(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateProjects = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateProjects(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getProjectById = async (req, res) => {
  try {
    const clinic = await userService.getProjectById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const clinic = await userService.updateProject(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    await userService.deleteProject(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBankaccount = async (req, res) => {
  try {
    const clinic = await userService.createBankaccount(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBankaccounts = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getBankaccounts(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameBankaccounts = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameBankaccounts(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateBankaccounts = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateBankaccounts(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getBankaccountById = async (req, res) => {
  try {
    const clinic = await userService.getBankaccountById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBankaccount = async (req, res) => {
  try {
    const clinic = await userService.updateBankaccount(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBankaccount = async (req, res) => {
  try {
    await userService.deleteBankaccount(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBankaccountstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getBankaccountstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelBankaccount = async (req, res) => {
  try {
    await userService.generateExcelBankaccount(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfBankaccount = async (req, res) => {
  try {
    await userService.generatePdfBankaccount(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCardswipingmachine = async (req, res) => {
  try {
    const clinic = await userService.createCardswipingmachine(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCardswipingmachines = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getCardswipingmachines(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameCardswipingmachines = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameCardswipingmachines(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateCardswipingmachines = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateCardswipingmachines(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCardswipingmachineById = async (req, res) => {
  try {
    const clinic = await userService.getCardswipingmachineById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCardswipingmachine = async (req, res) => {
  try {
    const clinic = await userService.updateCardswipingmachine(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCardswipingmachine = async (req, res) => {
  try {
    await userService.deleteCardswipingmachine(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCardswipingmachinestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getCardswipingmachinestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelCardswipingmachine = async (req, res) => {
  try {
    await userService.generateExcelCardswipingmachine(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfCardswipingmachine = async (req, res) => {
  try {
    await userService.generatePdfCardswipingmachine(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCash = async (req, res) => {
  try {
    const clinic = await userService.createCash(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCashs = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getCashs(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameCashs = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameCashs(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateCashs = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateCashs(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCashById = async (req, res) => {
  try {
    const clinic = await userService.getCashById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCash = async (req, res) => {
  try {
    const clinic = await userService.updateCash(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCash = async (req, res) => {
  try {
    await userService.deleteCash(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCashstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getCashstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelCash = async (req, res) => {
  try {
    await userService.generateExcelCash(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfCash = async (req, res) => {
  try {
    await userService.generatePdfCash(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCreditcard = async (req, res) => {
  try {
    const clinic = await userService.createCreditcard(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreditcards = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getCreditcards(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameCreditcards = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameCreditcards(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateCreditcards = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateCreditcards(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCreditcardById = async (req, res) => {
  try {
    const clinic = await userService.getCreditcardById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCreditcard = async (req, res) => {
  try {
    const clinic = await userService.updateCreditcard(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCreditcard = async (req, res) => {
  try {
    await userService.deleteCreditcard(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreditcardstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getCreditcardstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelCreditcard = async (req, res) => {
  try {
    await userService.generateExcelCreditcard(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfCreditcard = async (req, res) => {
  try {
    await userService.generatePdfCreditcard(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWallet = async (req, res) => {
  try {
    const clinic = await userService.createWallet(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameWallets = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameWallets(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateWallets = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateWallets(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getWallets = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getWallets(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWalletById = async (req, res) => {
  try {
    const clinic = await userService.getWalletById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWallet = async (req, res) => {
  try {
    const clinic = await userService.updateWallet(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWallet = async (req, res) => {
  try {
    await userService.deleteWallet(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWalletstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getWalletstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelWallet = async (req, res) => {
  try {
    await userService.generateExcelWallet(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfWallet = async (req, res) => {
  try {
    await userService.generatePdfWallet(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOtherpayment = async (req, res) => {
  try {
    const clinic = await userService.createOtherpayment(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOtherpayments = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getOtherpayments(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameOtherpayments = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameOtherpayments(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateOtherpayments = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateOtherpayments(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOtherpaymentById = async (req, res) => {
  try {
    const clinic = await userService.getOtherpaymentById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOtherpayment = async (req, res) => {
  try {
    const clinic = await userService.updateOtherpayment(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOtherpayment = async (req, res) => {
  try {
    await userService.deleteOtherpayment(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOtherpaymentstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getOtherpaymentstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelOtherpayment = async (req, res) => {
  try {
    await userService.generateExcelOtherpayment(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfOtherpayment = async (req, res) => {
  try {
    await userService.generatePdfOtherpayment(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createBranding = async (req, res) => {
  try {
    const clinic = await userService.createBranding(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBrandings = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getBrandings(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameBrandings = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameBrandings(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateBrandings = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateBrandings(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getBrandingById = async (req, res) => {
  try {
    const clinic = await userService.getBrandingById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBranding = async (req, res) => {
  try {
    const clinic = await userService.updateBranding(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBranding = async (req, res) => {
  try {
    await userService.deleteBranding(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSocialmedia = async (req, res) => {
  try {
    const clinic = await userService.createSocialmedia(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSocialmedias = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getSocialmedias(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameSocialmedias = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameSocialmedias(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateSocialmedia = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateSocialmedia(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSocialmediaById = async (req, res) => {
  try {
    const clinic = await userService.getSocialmediaById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSocialmedia = async (req, res) => {
  try {
    const clinic = await userService.updateSocialmedia(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSocialmedia = async (req, res) => {
  try {
    await userService.deleteSocialmedia(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRatecard = async (req, res) => {
  try {
    const clinic = await userService.createRatecard(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRatecards = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getRatecards(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameRatecards = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameRatecards(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateRatecards = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateRatecards(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getRatecardById = async (req, res) => {
  try {
    const clinic = await userService.getRatecardById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRatecard = async (req, res) => {
  try {
    const clinic = await userService.updateRatecard(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRatecard = async (req, res) => {
  try {
    await userService.deleteRatecard(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRatecardstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getRatecardstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelRatecard = async (req, res) => {
  try {
    await userService.generateExcelRatecard(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfRatecard = async (req, res) => {
  try {
    await userService.generatePdfRatecard(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPackage = async (req, res) => {
  try {
    const clinic = await userService.createPackage(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPackage = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getPackage(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnamePackages = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnamePackages(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdatePackages = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdatePackages(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getPackageById = async (req, res) => {
  try {
    const clinic = await userService.getPackageById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePackage = async (req, res) => {
  try {
    const clinic = await userService.updatePackage(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    await userService.deletePackage(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPackagestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getPackagestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelPackage = async (req, res) => {
  try {
    await userService.generateExcelPackage(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfPackage = async (req, res) => {
  try {
    await userService.generatePdfPackage(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSpecialistfees = async (req, res) => {
  try {
    const clinic = await userService.createSpecialistfees(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecialistfees = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getSpecialistfees(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameSpecialistfees = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameSpecialistfees(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateSpecialistfees = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateSpecialistfees(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSpecialistfeesById = async (req, res) => {
  try {
    const clinic = await userService.getSpecialistfeesById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSpecialistfees = async (req, res) => {
  try {
    const clinic = await userService.updateSpecialistfees(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSpecialistfees = async (req, res) => {
  try {
    await userService.deleteSpecialistfees(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClinicalnotes = async (req, res) => {
  try {
    const clinic = await userService.createClinicalnotes(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClinicalnotes = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getClinicalnotes(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameClinicalnotes = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameClinicalnotes(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateClinicalnotes = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateClinicalnotes(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getClinicalnotesById = async (req, res) => {
  try {
    const clinic = await userService.getClinicalnotesById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClinicalnotes = async (req, res) => {
  try {
    const clinic = await userService.updateClinicalnotes(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClinicalnotes = async (req, res) => {
  try {
    await userService.deleteClinicalnotes(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClinicalnotesstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getClinicalnotesstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelClinicalnotes = async (req, res) => {
  try {
    await userService.generateExcelClinicalnotes(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfClinicalnotes = async (req, res) => {
  try {
    await userService.generatePdfClinicalnotes(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createTreatmentcategory = async (req, res) => {
  try {
    const clinic = await userService.createTreatmentcategory(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatmentcategory = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getTreatmentcategory(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameTreatmentcategorys = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameTreatmentcategorys(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateTreatmentcategorys = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateTreatmentcategorys(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatmentcategoryBymonth = async (req, res) => {
  try {
    const { month, year } = req.query;
    const clinics = await userService.getTreatmentcategoryBymonth(month, year);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatmentcategoryById = async (req, res) => {
  try {
    const clinic = await userService.getTreatmentcategoryById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTreatmentcategory = async (req, res) => {
  try {
    const clinic = await userService.updateTreatmentcategory(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTreatmentcategory = async (req, res) => {
  try {
    await userService.deleteTreatmentcategory(req.params.id);
    res.status(200).json({ message: 'Data deleted' });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatmentcategorystatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getTreatmentcategorystatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelTreatmentcategory = async (req, res) => {
  try {
    await userService.generateExcelTreatmentcategory(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfTreatmentcategory = async (req, res) => {
  try {
    await userService.generatePdfTreatmentcategory(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createTreatment = async (req, res) => {
  try {
    const clinic = await userService.createTreatment(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatment = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getTreatment(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameTreatments = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameTreatments(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateTreatments = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateTreatments(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatmentBymonth = async (req, res) => {
  try {
    const { month, year } = req.query;
    const clinics = await userService.getTreatmentBymonth(month, year);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatmentById = async (req, res) => {
  try {
    const clinic = await userService.getTreatmentById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTreatment = async (req, res) => {
  try {
    const clinic = await userService.updateTreatment(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTreatment = async (req, res) => {
  try {
    await userService.deleteTreatment(req.params.id);
    res.status(200).json({ message: 'Data deleted' });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatmentstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getTreatmentstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelTreatment = async (req, res) => {
  try {
    await userService.generateExcelTreatment(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfTreatment = async (req, res) => {
  try {
    await userService.generatePdfTreatment(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSittingnote = async (req, res) => {
  try {
    const clinic = await userService.createSittingnote(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSittingnote = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getSittingnote(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameSittingnotes = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameSittingnotes(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateSittingnotes = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateSittingnotes(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSittingnoteById = async (req, res) => {
  try {
    const clinic = await userService.getSittingnoteById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSittingnote = async (req, res) => {
  try {
    const clinic = await userService.updateSittingnote(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSittingnote = async (req, res) => {
  try {
    await userService.deleteSittingnote(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSittingnotestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getSittingnotestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelSittingnote = async (req, res) => {
  try {
    await userService.generateExcelSittingnote(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfSittingnote = async (req, res) => {
  try {
    await userService.generatePdfSittingnote(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDrug = async (req, res) => {
  try {
    const clinic = await userService.createDrug(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDrug = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getDrug(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameDrugs = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameDrugs(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateDrugs = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateDrugs(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getDrugById = async (req, res) => {
  try {
    const clinic = await userService.getDrugById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDrug = async (req, res) => {
  try {
    const clinic = await userService.updateDrug(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDrug = async (req, res) => {
  try {
    await userService.deleteDrug(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDrugstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getDrugstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelDrug = async (req, res) => {
  try {
    await userService.generateExcelDrug(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfDrug = async (req, res) => {
  try {
    await userService.generatePdfDrug(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createInstruction = async (req, res) => {
  try {
    const clinic = await userService.createInstruction(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInstruction = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getInstruction(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameInstructions = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameInstructions(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateInstructions = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateInstructions(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInstructionById = async (req, res) => {
  try {
    const clinic = await userService.getInstructionById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInstruction = async (req, res) => {
  try {
    const clinic = await userService.updateInstruction(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteInstruction = async (req, res) => {
  try {
    await userService.deleteInstruction(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInstructionstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getInstructionstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelInstruction = async (req, res) => {
  try {
    await userService.generateExcelInstruction(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfInstruction = async (req, res) => {
  try {
    await userService.generatePdfInstruction(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createInsurance = async (req, res) => {
  try {
    const clinic = await userService.createInsurance(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInsurance = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getInsurance(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameInsurances = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameInsurances(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateInsurances = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateInsurances(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getInsuranceById = async (req, res) => {
  try {
    const clinic = await userService.getInsuranceById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInsurance = async (req, res) => {
  try {
    const clinic = await userService.updateInsurance(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteInsurance = async (req, res) => {
  try {
    await userService.deleteInsurance(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInsurancestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getInsurancestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelInsurance = async (req, res) => {
  try {
    await userService.generateExcelInsurance(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfInsurance = async (req, res) => {
  try {
    await userService.generatePdfInsurance(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPrescription = async (req, res) => {
  try {
    const clinic = await userService.createPrescription(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPrescription = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getPrescription(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnamePrescriptions = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnamePrescriptions(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdatePrescriptions = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdatePrescriptions(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getPrescriptionById = async (req, res) => {
  try {
    const clinic = await userService.getPrescriptionById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const clinic = await userService.updatePrescription(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePrescription = async (req, res) => {
  try {
    await userService.deletePrescription(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPrescriptionstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getPrescriptionstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelPrescription = async (req, res) => {
  try {
    await userService.generateExcelPrescription(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfPrescription = async (req, res) => {
  try {
    await userService.generatePdfPrescription(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOrthogoal = async (req, res) => {
  try {
    const clinic = await userService.createOrthogoal(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrthogoals = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getOrthogoals(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameOrthogoals = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameOrthogoals(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateOrthogoals = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateOrthogoals(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOrthogoalById = async (req, res) => {
  try {
    const clinic = await userService.getOrthogoalById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrthogoal = async (req, res) => {
  try {
    const clinic = await userService.updateOrthogoal(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrthogoal = async (req, res) => {
  try {
    await userService.deleteOrthogoal(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrthogoalstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getOrthogoalstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelOrthogoal = async (req, res) => {
  try {
    await userService.generateExcelOrthogoal(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfOrthogoal = async (req, res) => {
  try {
    await userService.generatePdfOrthogoal(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOrtholimitation = async (req, res) => {
  try {
    const clinic = await userService.createOrtholimitation(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrtholimitations = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getOrtholimitations(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameOrtholimitations = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameOrtholimitations(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateOrtholimitations = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateOrtholimitations(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOrtholimitationById = async (req, res) => {
  try {
    const clinic = await userService.getOrtholimitationById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrtholimitation = async (req, res) => {
  try {
    const clinic = await userService.updateOrtholimitation(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrtholimitation = async (req, res) => {
  try {
    await userService.deleteOrtholimitation(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrtholimitationstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getOrtholimitationstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelOrtholimitation = async (req, res) => {
  try {
    await userService.generateExcelOrtholimitation(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfOrtholimitation = async (req, res) => {
  try {
    await userService.generatePdfOrtholimitation(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createMedicalcondition = async (req, res) => {
  try {
    const clinic = await userService.createMedicalcondition(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedicalconditions = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getMedicalconditions(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameMedicalconditions = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameMedicalconditions(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateMedicalconditions = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateMedicalconditions(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedicalconditionById = async (req, res) => {
  try {
    const clinic = await userService.getMedicalconditionById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMedicalcondition = async (req, res) => {
  try {
    const clinic = await userService.updateMedicalcondition(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMedicalcondition = async (req, res) => {
  try {
    await userService.deleteMedicalcondition(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDentalcondition = async (req, res) => {
  try {
    const clinic = await userService.createDentalcondition(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDentalconditions = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getDentalconditions(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameDentalconditions = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameDentalconditions(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateDentalconditions = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateDentalconditions(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getDentalconditionById = async (req, res) => {
  try {
    const clinic = await userService.getDentalconditionById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDentalcondition = async (req, res) => {
  try {
    const clinic = await userService.updateDentalcondition(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDentalcondition = async (req, res) => {
  try {
    await userService.deleteDentalcondition(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPatientgroup = async (req, res) => {
  try {
   
    const clinic = await userService.createPatientgroup(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientgroups = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getPatientgroups(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnamePatientgroups = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnamePatientgroups(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdatePatientgroups = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdatePatientgroups(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientgroupById = async (req, res) => {
  try {
    const clinic = await userService.getPatientgroupById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePatientgroup = async (req, res) => {
  try {
   
    const clinic = await userService.updatePatientgroup(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePatientgroup = async (req, res) => {
  try {
    await userService.deletePatientgroup(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientgroupstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getPatientgroupstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelPatientgroup = async (req, res) => {
  try {
    await userService.generateExcelPatientgroup(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfPatientgroup = async (req, res) => {
  try {
    await userService.generatePdfPatientgroup(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSource = async (req, res) => {
  try {
    const clinic = await userService.createSource(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSources = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getSources(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameSources = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameSources(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateSources = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateSources(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourceBymonth = async (req, res) => {
  try {
    const { month, year } = req.query;
    const clinics = await userService.getSourceBymonth(month, year);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourceById = async (req, res) => {
  try {
    const clinic = await userService.getSourceById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSource = async (req, res) => {
  try {
    const clinic = await userService.updateSource(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSource = async (req, res) => {
  try {
    await userService.deleteSource(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourcestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getSourcestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelSource = async (req, res) => {
  try {
    await userService.generateExcelSource(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfSource = async (req, res) => {
  try {
    await userService.generatePdfSource(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSourcetype = async (req, res) => {
  try {
    const clinic = await userService.createSourcetype(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourcetypes = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getSourcetypes(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameSourcetypes = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameSourcetypes(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateSourcetypes = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateSourcetypes(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourcetypeBymonth = async (req, res) => {
  try {
    const { month, year } = req.query;
    const clinics = await userService.getSourcetypeBymonth(month, year);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourcetypeById = async (req, res) => {
  try {
    const clinic = await userService.getSourcetypeById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSourcetype = async (req, res) => {
  try {
    const clinic = await userService.updateSourcetype(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSourcetype = async (req, res) => {
  try {
    await userService.deleteSourcetype(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourcetypestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getSourcetypestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelSourcetype = async (req, res) => {
  try {
    await userService.generateExcelSourcetype(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfSourcetype = async (req, res) => {
  try {
    await userService.generatePdfSourcetype(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRefferal = async (req, res) => {
  try {
    const clinic = await userService.createRefferal(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRefferals = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getRefferals(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameRefferals = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameRefferals(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateRefferals = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateRefferals(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRefferalById = async (req, res) => {
  try {
    const clinic = await userService.getRefferalById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRefferal = async (req, res) => {
  try {
    const clinic = await userService.updateRefferal(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRefferal = async (req, res) => {
  try {
    await userService.deleteRefferal(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRefferalstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getRefferalstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelRefferal = async (req, res) => {
  try {
    await userService.generateExcelRefferal(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfRefferal = async (req, res) => {
  try {
    await userService.generatePdfRefferal(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createGeneralpractitioner = async (req, res) => {
  try {
    const clinic = await userService.createGeneralpractitioner(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGeneralpractitioners = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getGeneralpractitioners(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameGeneralpractitioners = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameGeneralpractitioners(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateGeneralpractitioners = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateGeneralpractitioners(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGeneralpractitionerById = async (req, res) => {
  try {
    const clinic = await userService.getGeneralpractitionerById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGeneralpractitioner = async (req, res) => {
  try {
    const clinic = await userService.updateGeneralpractitioner(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGeneralpractitioner = async (req, res) => {
  try {
    await userService.deleteGeneralpractitioner(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGeneralpractitionerstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getGeneralpractitionerstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelGeneralpractitioner = async (req, res) => {
  try {
    await userService.generateExcelGeneralpractitioner(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfGeneralpractitioner = async (req, res) => {
  try {
    await userService.generatePdfGeneralpractitioner(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createEmaildomain = async (req, res) => {
  try {
    const clinic = await userService.createEmaildomain(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmaildomains = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getEmaildomains(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameEmaildomains = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameEmaildomains(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateEmaildomains = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateEmaildomains(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmaildomainById = async (req, res) => {
  try {
    const clinic = await userService.getEmaildomainById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmaildomain = async (req, res) => {
  try {
    const clinic = await userService.updateEmaildomain(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmaildomain = async (req, res) => {
  try {
    await userService.deleteEmaildomain(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSMStemplate = async (req, res) => {
  try {
    const clinic = await userService.createSMStemplate(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSMStemplates = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getSMStemplates(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameSMStemplates = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameSMStemplates(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateSMStemplates = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateSMStemplates(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSMStemplateById = async (req, res) => {
  try {
    const clinic = await userService.getSMStemplateById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSMStemplate = async (req, res) => {
  try {
    const clinic = await userService.updateSMStemplate(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSMStemplate = async (req, res) => {
  try {
    await userService.deleteSMStemplate(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSMStemplatestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getSMStemplatestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelSMStemplate = async (req, res) => {
  try {
    await userService.generateExcelSMStemplate(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfSMStemplate = async (req, res) => {
  try {
    await userService.generatePdfSMStemplate(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWATemplate = async (req, res) => {
  try {
   
    const clinic = await userService.createWATemplate(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWATemplates = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getWATemplates(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameWATemplates = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameWATemplates(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateWATemplates = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateWATemplates(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWATemplateById = async (req, res) => {
  try {
    const clinic = await userService.getWATemplateById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWATemplate = async (req, res) => {
  try {
    const clinic = await userService.updateWATemplate(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWATemplate = async (req, res) => {
  try {
    await userService.deleteWATemplate(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWATemplatestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getWATemplatestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelWATemplate = async (req, res) => {
  try {
    await userService.generateExcelWATemplate(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfWATemplate = async (req, res) => {
  try {
    await userService.generatePdfWATemplate(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createEmailtemplate = async (req, res) => {
  try {
    const clinic = await userService.createEmailtemplate(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmailtemplates = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getEmailtemplates(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameEmailtemplates = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameEmailtemplates(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateEmailtemplates = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateEmailtemplates(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmailtemplateById = async (req, res) => {
  try {
    const clinic = await userService.getEmailtemplateById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmailtemplate = async (req, res) => {
  try {
    const clinic = await userService.updateEmailtemplate(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmailtemplate = async (req, res) => {
  try {
    await userService.deleteEmailtemplate(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmailtemplatestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getEmailtemplatestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelEmailtemplate = async (req, res) => {
  try {
    await userService.generateExcelEmailtemplate(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfEmailtemplate = async (req, res) => {
  try {
    await userService.generatePdfEmailtemplate(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createLettertemplate = async (req, res) => {
  try {
    const clinic = await userService.createLettertemplate(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLettertemplates = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getLettertemplates(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameLettertemplates = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameLettertemplates(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateLettertemplates = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateLettertemplates(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getLettertemplateById = async (req, res) => {
  try {
    const clinic = await userService.getLettertemplateById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLettertemplate = async (req, res) => {
  try {
    const clinic = await userService.updateLettertemplate(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLettertemplate = async (req, res) => {
  try {
    await userService.deleteLettertemplate(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLettertemplatestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getLettertemplatestatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelLettertemplate = async (req, res) => {
  try {
    await userService.generateExcelLettertemplate(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfLettertemplate = async (req, res) => {
  try {
    await userService.generatePdfLettertemplate(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createVendor = async (req, res) => {
  try {
    const clinic = await userService.createVendor(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVendors = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getVendors(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameVendors = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameVendors(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateVendors = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateVendors(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVendorById = async (req, res) => {
  try {
    const clinic = await userService.getVendorById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVendor = async (req, res) => {
  try {
    const clinic = await userService.updateVendor(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVendor = async (req, res) => {
  try {
    await userService.deleteVendor(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVendorstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getVendorstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelVendor = async (req, res) => {
  try {
    await userService.generateExcelVendor(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfVendor = async (req, res) => {
  try {
    await userService.generatePdfVendor(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createInventorycategory = async (req, res) => {
  try {
    const clinic = await userService.createInventorycategory(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventorycategorys = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getInventorycategorys(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameInventorycategorys = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameInventorycategorys(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateInventorycategorys = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateInventorycategorys(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getInventorycategoryById = async (req, res) => {
  try {
    const clinic = await userService.getInventorycategoryById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInventorycategory = async (req, res) => {
  try {
    const clinic = await userService.updateInventorycategory(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteInventorycategory = async (req, res) => {
  try {
    await userService.deleteInventorycategory(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventorycategorystatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getInventorycategorystatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelInventorycategory = async (req, res) => {
  try {
    await userService.generateExcelInventorycategory(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfInventorycategory = async (req, res) => {
  try {
    await userService.generatePdfInventorycategory(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createInventoryitem = async (req, res) => {
  try {
    const clinic = await userService.createInventoryitem(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryitems = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getInventoryitems(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameInventoryitems = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameInventoryitems(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateInventoryitems = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateInventoryitems(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getInventoryitemById = async (req, res) => {
  try {
    const clinic = await userService.getInventorycategoryById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInventoryitem = async (req, res) => {
  try {
    const clinic = await userService.updateInventoryitem(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteInventoryitem = async (req, res) => {
  try {
    await userService.deleteInventoryitem(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryitemstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getInventoryitemstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelInventoryitem = async (req, res) => {
  try {
    await userService.generateExcelInventoryitem(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfInventoryitem = async (req, res) => {
  try {
    await userService.generatePdfInventoryitem(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const clinic = await userService.createAccount(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccounts = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getAccounts(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameAccounts = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameAccounts(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateAccounts = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateAccounts(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountById = async (req, res) => {
  try {
    const clinic = await userService.getAccountById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const clinic = await userService.updateAccount(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await userService.deleteAccount(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountstatus = async (req, res) => {
  try {
    const { status } = req.body;
    const clinics = await userService.getAccountstatus(status);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateExcelAccount = async (req, res) => {
  try {
    await userService.generateExcelAccount(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePdfAccount = async (req, res) => {
  try {
    await userService.generatePdfAccount(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPatient = async (req, res) => {
  try {
    const clinic = await userService.createPatient(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addInvoiceToPatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const invoiceData = req.body;
    const clinic = await userService.addInvoiceToPatient(patientId, invoiceData);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatients = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getPatients(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnamePatients = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnamePatients(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdatePatients = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdatePatients(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientBymonth = async (req, res) => {
  try {
    const { month, year } = req.query;
    const clinics = await userService.getPatientBymonth(month, year);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const clinic = await userService.getPatientById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const clinic = await userService.updatePatient(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMultipleTreatmentDone = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { treatments } = req.body;

    if (!Array.isArray(treatments) || treatments.length === 0) {
      return res.status(400).json({ message: "Treatments array is required" });
    }

    const updatedTreatments = await userService.addMultipleTreatmentDone(patientId, treatments);

    return res.status(200).json({
      message: "Treatments added to treatmentdone successfully",
      data: updatedTreatments,
    });
  } catch (err) {
    console.error("Error in handleAddTreatmentDone:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

const updateTreatmentDone = async (req, res) => {
  const { patientid, treatmentid } = req.params;
  const updatedFields = req.body;

  try {
    const result = await userService.updateTreatmentDoneById(patientid, treatmentid, updatedFields);

    if (!result) {
      return res.status(404).json({ message: 'Patient or treatment not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Controller Error:', error); 
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const deleteTreatmentDone = async (req, res) => {
  const { patientid, treatmentid } = req.params;

  try {
    const result = await userService.deleteTreatmentDone(patientid, treatmentid);

    if (!result) {
      return res.status(404).json({ message: 'Patient or treatment not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Controller Error:', error); 
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



const deletePatient = async (req, res) => {
  try {
    await userService.deletePatient(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalPatientsByRateCard = async (req, res) => {
  try {
    const clinics = await userService.getTotalPatientsByRateCard();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalPatientsBySourcetype = async (req, res) => {
  try {
    const clinics = await userService.getTotalPatientsBySourcetype();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalPatientsBySource = async (req, res) => {
  try {
    const clinics = await userService.getTotalPatientsBySource();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalPatientsByGroup = async (req, res) => {
  try {
    const clinics = await userService.getTotalPatientsByGroup();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDoctorunavaibility = async (req, res) => {
  try {
    const clinic = await userService.createDoctorunavaibility(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorunavaibilitys = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getDoctorunavaibilitys(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameDoctorunavaibilitys = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameDoctorunavaibilitys(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateDoctorunavaibilitys = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateDoctorunavaibilitys(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorunavaibilityById = async (req, res) => {
  try {
    const clinic = await userService.getDoctorunavaibilityById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoctorunavaibility = async (req, res) => {
  try {
    const clinic = await userService.updateDoctorunavaibility(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDoctorunavaibility = async (req, res) => {
  try {
    await userService.deleteDoctorunavaibility(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCreditnote = async (req, res) => {
  try {
    const clinic = await userService.createCreditnote(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreditnotes = async (req, res) => {
  try {
    const { from, to, voucherStatus, center, doctor, order } = req.body;
    const clinics = await userService.getCreditnotes(from, to, voucherStatus, center, doctor, order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameCreditnotes = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameCreditnotes(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateCreditnotes = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateCreditnotes(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreditnoteById = async (req, res) => {
  try {
    const clinic = await userService.getCreditnoteById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCreditnote = async (req, res) => {
  try {
    const clinic = await userService.updateCreditnote(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCreditnote = async (req, res) => {
  try {
    await userService.deleteCreditnote(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPaymentreceived = async (req, res) => {
  try {
    const clinic = await userService.createPaymentreceived(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentreceiveds = async (req, res) => {
  try {
    const clinics = await userService.getPaymentreceiveds();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnamePaymentreceiveds = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnamePaymentreceiveds(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdatePaymentreceiveds = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdatePaymentreceiveds(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentreceivedById = async (req, res) => {
  try {
    const clinic = await userService.getPaymentreceivedById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found 1' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentreceivedBypatientid = async (req, res) => {
  try {
    const { patient } = req.params;
    const { fromDate, toDate, filterType } = req.query;

    const clinic = await userService.getPaymentreceivedBypatientid(patient, fromDate, toDate, filterType);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaymentreceived = async (req, res) => {
  try {
    const clinic = await userService.updatePaymentreceived(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePaymentreceived = async (req, res) => {
  try {
    await userService.deletePaymentreceived(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createPaymentreminder = async (req, res) => {
  try {
    const clinic = await userService.createPaymentreminder(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentreminders = async (req, res) => {
  try {
    const clinics = await userService.getPaymentreminders();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentreminderById = async (req, res) => {
  try {
    const clinic = await userService.getPaymentreminderById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found 1' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentreminderBypatientid = async (req, res) => {
  try {
    const clinic = await userService.getPaymentreminderBypatientid(req.params.patient);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaymentreminder = async (req, res) => {
  try {
    const clinic = await userService.updatePaymentreminder(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePaymentreminder = async (req, res) => {
  try {
    await userService.deletePaymentreminder(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPaymentMade = async (req, res) => {
  try {
  
    const clinic = await userService.createPaymentMade(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentMades = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getPaymentMades(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnamePaymentMades = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnamePaymentMades(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdatePaymentMades = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdatePaymentMades(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentMadeById = async (req, res) => {
  try {
    const clinic = await userService.getPaymentMadeById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaymentMade = async (req, res) => {
  try {
    const clinic = await userService.updatePaymentMade(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePaymentMade = async (req, res) => {
  try {
    await userService.deletePaymentMade(req.params.id);
    res.status(200).json({ message: 'Data deleted' });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCashBankTransaction = async (req, res) => {
  try {
    const clinic = await userService.createCashBankTransaction(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCashBankTransactions = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getCashBankTransactions(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameCashBankTransactions = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameCashBankTransactions(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateCashBankTransactions = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateCashBankTransactions(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCashBankTransactionById = async (req, res) => {
  try {
    const clinic = await userService.getCashBankTransactionById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCashBankTransaction = async (req, res) => {
  try {
    const clinic = await userService.updateCashBankTransaction(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCashBankTransaction = async (req, res) => {
  try {
    await userService.deleteCashBankTransaction(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createJournalentry = async (req, res) => {
  try {
    const clinic = await userService.createJournalentry(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJournalentrys = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getJournalentrys(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameJournalentrys = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameJournalentrys(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateJournalentrys = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateJournalentrys(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJournalentryById = async (req, res) => {
  try {
    const clinic = await userService.getJournalentryById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateJournalentry = async (req, res) => {
  try {
    const clinic = await userService.updateJournalentry(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteJournalentry = async (req, res) => {
  try {
    await userService.deleteJournalentry(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPatientopeaningbalance = async (req, res) => {
  try {
    const clinic = await userService.createPatientopeaningbalance(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientopeaningbalances = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getPatientopeaningbalances(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnamePatientopeaningbalances = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnamePatientopeaningbalances(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdatePatientopeaningbalances = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdatePatientopeaningbalances(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientopeaningbalanceById = async (req, res) => {
  try {
    const clinic = await userService.getPatientopeaningbalanceById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePatientopeaningbalance = async (req, res) => {
  try {
    const clinic = await userService.updatePatientopeaningbalance(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePatientopeaningbalance = async (req, res) => {
  try {
    await userService.deletePatientopeaningbalance(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createInventorypurchase = async (req, res) => {
  try {
   
    const clinic = await userService.createInventorypurchase(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventorypurchases = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getInventorypurchases(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameInventorypurchases = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameInventorypurchases(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateInventorypurchases = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateInventorypurchases(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventorypurchaseById = async (req, res) => {
  try {
    const clinic = await userService.getInventorypurchaseById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInventorypurchase = async (req, res) => {
  try {
   
    const clinic = await userService.updateInventorypurchase(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteInventorypurchase = async (req, res) => {
  try {
    await userService.deleteInventorypurchase(req.params.id);
    res.status(200).json({ message: 'Data deleted' });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createInventoryconsume = async (req, res) => {
  try {
    const clinic = await userService.createInventoryconsume(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryconsumes = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getInventoryconsumes(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameInventoryconsumes = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameInventoryconsumes(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateInventoryconsumes = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateInventoryconsumes(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryconsumeById = async (req, res) => {
  try {
    const clinic = await userService.getInventoryconsumeById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInventoryconsume = async (req, res) => {
  try {
    const clinic = await userService.updateInventoryconsume(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteInventoryconsume = async (req, res) => {
  try {
    await userService.deleteInventoryconsume(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createInventorytransfer = async (req, res) => {
  try {
    const clinic = await userService.createInventorytransfer(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventorytransfers = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getInventorytransfers(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameInventorytransfers = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameInventorytransfers(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateInventorytransfers = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateInventorytransfers(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventorytransferById = async (req, res) => {
  try {
    const clinic = await userService.getInventorytransferById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInventorytransfer = async (req, res) => {
  try {
    const clinic = await userService.updateInventorytransfer(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteInventorytransfer = async (req, res) => {
  try {
    await userService.deleteInventorytransfer(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLab = async (req, res) => {
  try {
    const clinic = await userService.createLab(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLabs = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getLabs(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameLabs = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameLabs(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateLabs = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateLabs(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLabById = async (req, res) => {
  try {
    const clinic = await userService.getLabById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLab = async (req, res) => {
  try {
    const clinic = await userService.updateInventorytransfer(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLab = async (req, res) => {
  try {
    await userService.deleteLab(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLabbill = async (req, res) => {
  try {
    const clinic = await userService.createLabbill(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLabbills = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getLabbills(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameLabbills = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameLabbills(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateLabbills = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateLabbills(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLabbillById = async (req, res) => {
  try {
    const clinic = await userService.getLabbillById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLabbill = async (req, res) => {
  try {
    const clinic = await userService.updateLabbill(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLabbill = async (req, res) => {
  try {
    await userService.deleteLabbill(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLabworkgive = async (req, res) => {
  try {
    const clinic = await userService.createLabworkgive(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLabworkgives = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getLabworkgives(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameLabworkgives = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameLabworkgives(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateLabworkgives = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateLabworkgives(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLabworkgiveById = async (req, res) => {
  try {
    const clinic = await userService.getLabworkgiveById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLabworkgive = async (req, res) => {
  try {
    const clinic = await userService.updateLabworkgive(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLabworkgive = async (req, res) => {
  try {
    await userService.deleteLabworkgive(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLabworkrecieve = async (req, res) => {
  try {
    const clinic = await userService.createLabworkrecieve(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLabworkrecieves = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getLabworkrecieves(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameLabworkrecieves = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameLabworkrecieves(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateLabworkrecieves = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateLabworkrecieves(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLabworkrecieveById = async (req, res) => {
  try {
    const clinic = await userService.getLabworkrecieveById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLabworkrecieve = async (req, res) => {
  try {
    const clinic = await userService.updateLabworkrecieve(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLabworkrecieve = async (req, res) => {
  try {
    await userService.deleteLabworkrecieve(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSmstransfer = async (req, res) => {
  try {
    const clinic = await userService.createSmstransfer(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSmstransfers = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getSmstransfers(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnameSmstransfers = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnameSmstransfers(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdateSmstransfers = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdateSmstransfers(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSmstransferById = async (req, res) => {
  try {
    const clinic = await userService.getSmstransferById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSmstransfer = async (req, res) => {
  try {
    const clinic = await userService.updateSmstransfer(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSmstransfer = async (req, res) => {
  try {
    await userService.deleteSmstransfer(req.params.id);
    res.status(200).json({ message: 'Data deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createPersonvisit = async (req, res) => {
  try {
    const clinic = await userService.createPersonvisit(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPersonvisits = async (req, res) => {
  try {
    const order = req.body?.order || 'asc';
    const clinics = await userService.getPersonvisits(order);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchnamePersonvisits = async (req, res) => {
  try {
    const { name } = req.body;
    const clinics = await userService.searchnamePersonvisits(name);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchdatePersonvisits = async (req, res) => {
  try {
    const { date } = req.body;
    const clinics = await userService.searchdatePersonvisits(date);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPersonvisitById = async (req, res) => {
  try {
    const clinic = await userService.getPersonvisitById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePersonvisit = async (req, res) => {
  try {
    const clinic = await userService.updatePersonvisit(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePersonvisit = async (req, res) => {
  try {
    await userService.deletePersonvisit(req.params.id);
    res.status(200).json({ message: 'Data deleted' });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateDuePayment = async (req, res) => {
  try {
    const clinic = await userService.updateDuePayment(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getPatientsLoggedInButNotVisitedClinic = async (req, res) => {
  try {
    const clinics = await userService.getPatientsLoggedInButNotVisitedClinic();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientsWithLatestClinicVisit = async (req, res) => {
  try {
    const clinics = await userService.getPatientsWithLatestClinicVisit();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientsWithCompletedClinicVisit = async (req, res) => {
  try {
    const clinics = await userService.getPatientsWithCompletedClinicVisit();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createPurchaseorder = async (req, res) => {
  try {
    const Purchaseorder = await userService.createPurchaseorder(req.body);
    res.status(201).json(Purchaseorder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchaseorders = async (req, res) => {
  try {
    const Purchaseorders = await userService.getPurchaseorders();
    res.status(200).json(Purchaseorders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchaseorderById = async (req, res) => {
  try {
    const Purchaseorder = await userService.getPurchaseorderById(req.params.id);
    if (!Purchaseorder) return res.status(404).json({ message: 'Purchaseorder not found' });
    res.staus(200).json(Purchaseorder);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePurchaseorder = async (req, res) => {
  try {
    const Purchaseorder = await userService.updatePurchaseorder(req.params.id, req.body);
    res.staus(200).json(Purchaseorder);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePurchaseorder = async (req, res) => {
  try {
    await userService.deletePurchaseorder(req.params.id);
    res.status(200).json({ message: 'Purchaseorder deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createPurchaseInvoice = async (req, res) => {
  try {
    const PurchaseInvoice = await userService.createPurchaseInvoice(req.body);
    res.status(201).json(PurchaseInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchaseInvoices = async (req, res) => {
  try {
    const PurchaseInvoices = await userService.getPurchaseInvoices();
    res.status(200).json(PurchaseInvoices);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchaseInvoiceById = async (req, res) => {
  try {
    const PurchaseInvoice = await userService.getPurchaseInvoiceById(req.params.id);
    if (!PurchaseInvoice) return res.status(404).json({ message: 'PurchaseInvoice not found' });
    res.staus(200).json(PurchaseInvoice);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePurchaseInvoice = async (req, res) => {
  try {
    const PurchaseInvoice = await userService.updatePurchaseInvoice(req.params.id, req.body);
    res.staus(200).json(PurchaseInvoice);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePurchaseInvoice = async (req, res) => {
  try {
    await userService.deletePurchaseInvoice(req.params.id);
    res.status(200).json({ message: 'PurchaseInvoice deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGrninward = async (req, res) => {
  try {
    const Grninward = await userService.createGrninward(req.body);
    res.status(201).json(Grninward);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGrninwards = async (req, res) => {
  try {
    const Grninwards = await userService.getGrninwards();
    res.status(200).json(Grninwards);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGrninwardById = async (req, res) => {
  try {
    const Grninward = await userService.getGrninwardById(req.params.id);
    if (!Grninward) return res.status(404).json({ message: 'Grninward not found' });
    res.staus(200).json(Grninward);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGrninward = async (req, res) => {
  try {
    const Grninward = await userService.updateGrninward(req.params.id, req.body);
    res.staus(200).json(Grninward);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGrninward = async (req, res) => {
  try {
    await userService.deleteGrninward(req.params.id);
    res.status(200).json({ message: 'Grninward deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGrnoutward = async (req, res) => {
  try {
    const Grnoutward = await userService.createGrnoutward(req.body);
    res.status(201).json(Grnoutward);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGrnoutwards = async (req, res) => {
  try {
    const Grnoutwards = await userService.getGrnoutwards();
    res.status(200).json(Grnoutwards);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGrnoutwardById = async (req, res) => {
  try {
    const Grnoutward = await userService.getGrnoutwardById(req.params.id);
    if (!Grnoutward) return res.status(404).json({ message: 'Grnoutward not found' });
    res.staus(200).json(Grnoutward);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGrnoutward = async (req, res) => {
  try {
    const Grnoutward = await userService.updateGrnoutward(req.params.id, req.body);
    res.staus(200).json(Grnoutward);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGrnoutward = async (req, res) => {
  try {
    await userService.deleteGrnoutward(req.params.id);
    res.status(200).json({ message: 'Grnoutward deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBranchindent = async (req, res) => {
  try {
    const Branchindent = await userService.createBranchindent(req.body);
    res.status(201).json(Branchindent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBranchindents = async (req, res) => {
  try {
    const Branchindents = await userService.getBranchindents();
    res.status(200).json(Branchindents);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBranchindentById = async (req, res) => {
  try {
    const Branchindent = await userService.getBranchindentById(req.params.id);
    if (!Branchindent) return res.status(404).json({ message: 'Branchindent not found' });
    res.staus(200).json(Branchindent);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBranchindent = async (req, res) => {
  try {
    const Branchindent = await userService.updateBranchindent(req.params.id, req.body);
    res.staus(200).json(Branchindent);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBranchindent = async (req, res) => {
  try {
    await userService.deleteBranchindent(req.params.id);
    res.status(200).json({ message: 'Branchindent deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBranchinward = async (req, res) => {
  try {
    const Branchinward = await userService.createBranchinward(req.body);
    res.status(201).json(Branchinward);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBranchinwards = async (req, res) => {
  try {
    const Branchinwards = await userService.getBranchinwards();
    res.status(200).json(Branchinwards);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBranchinwardById = async (req, res) => {
  try {
    const Branchinward = await userService.getBranchinwardById(req.params.id);
    if (!Branchinward) return res.status(404).json({ message: 'Branchinward not found' });
    res.staus(200).json(Branchinward);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBranchinward = async (req, res) => {
  try {
    const Branchinward = await userService.updateBranchinward(req.params.id, req.body);
    res.staus(200).json(Branchinward);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBranchinward = async (req, res) => {
  try {
    await userService.deleteBranchinward(req.params.id);
    res.status(200).json({ message: 'Branchinward deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBranchoutward = async (req, res) => {
  try {
    const Branchoutward = await userService.createBranchoutward(req.body);
    res.status(201).json(Branchoutward);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBranchoutwards = async (req, res) => {
  try {
    const Branchoutwards = await userService.getBranchoutwards();
    res.status(200).json(Branchoutwards);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBranchoutwardById = async (req, res) => {
  try {
    const Branchoutward = await userService.getBranchoutwardById(req.params.id);
    if (!Branchoutward) return res.status(404).json({ message: 'Branchoutward not found' });
    res.staus(200).json(Branchoutward);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBranchoutward = async (req, res) => {
  try {
    const Branchoutward = await userService.updateBranchoutward(req.params.id, req.body);
    res.staus(200).json(Branchoutward);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBranchoutward = async (req, res) => {
  try {
    await userService.deleteBranchoutward(req.params.id);
    res.status(200).json({ message: 'Branchoutward deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPurchasepayment = async (req, res) => {
  try {
    const Purchasepayment = await userService.createPurchasepayment(req.body);
    res.status(201).json(Purchasepayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchasepayments = async (req, res) => {
  try {
    const Purchasepayments = await userService.getPurchasepayments();
    res.status(200).json(Purchasepayments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchasepaymentById = async (req, res) => {
  try {
    const Purchasepayment = await userService.getPurchasepaymentById(req.params.id);
    if (!Purchasepayment) return res.status(404).json({ message: 'Purchasepayment not found' });
    res.staus(200).json(Purchasepayment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePurchasepayment = async (req, res) => {
  try {
    const Purchasepayment = await userService.updatePurchasepayment(req.params.id, req.body);
    res.staus(200).json(Purchasepayment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePurchasepayment = async (req, res) => {
  try {
    await userService.deletePurchasepayment(req.params.id);
    res.status(200).json({ message: 'Purchasepayment deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPurchasereturnbill = async (req, res) => {
  try {
    const Purchasereturnbill = await userService.createPurchasereturnbill(req.body);
    res.status(201).json(Purchasereturnbill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchasereturnbills = async (req, res) => {
  try {
    const Purchasereturnbills = await userService.getPurchasereturnbills();
    res.status(200).json(Purchasereturnbills);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchasereturnbillById = async (req, res) => {
  try {
    const Purchasereturnbill = await userService.getPurchasereturnbillById(req.params.id);
    if (!Purchasereturnbill) return res.status(404).json({ message: 'Purchasereturnbill not found' });
    res.staus(200).json(Purchasereturnbill);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePurchasereturnbill = async (req, res) => {
  try {
    const Purchasereturnbill = await userService.updatePurchasereturnbill(req.params.id, req.body);
    res.staus(200).json(Purchasereturnbill);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePurchasereturnbill = async (req, res) => {
  try {
    await userService.deletePurchasereturnbill(req.params.id);
    res.status(200).json({ message: 'Purchasereturnbill deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPurchasereturnpayment = async (req, res) => {
  try {
    const Purchasereturnpayment = await userService.createPurchasereturnpayment(req.body);
    res.status(201).json(Purchasereturnpayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchasereturnpayments = async (req, res) => {
  try {
    const Purchasereturnpayments = await userService.getPurchasereturnpayments();
    res.status(200).json(Purchasereturnpayments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchasereturnpaymentById = async (req, res) => {
  try {
    const Purchasereturnpayment = await userService.getPurchasereturnpaymentById(req.params.id);
    if (!Purchasereturnpayment) return res.status(404).json({ message: 'Purchasereturnpayment not found' });
    res.staus(200).json(Purchasereturnpayment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePurchasereturnpayment = async (req, res) => {
  try {
    const Purchasereturnpayment = await userService.updatePurchasereturnpayment(req.params.id, req.body);
    res.staus(200).json(Purchasereturnpayment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePurchasereturnpayment = async (req, res) => {
  try {
    await userService.deletePurchasereturnpayment(req.params.id);
    res.status(200).json({ message: 'Purchasereturnpayment deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOpeningstock = async (req, res) => {
  try {
    const Openingstock = await userService.createOpeningstock(req.body);
    res.status(201).json(Openingstock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOpeningstocks = async (req, res) => {
  try {
    const Openingstocks = await userService.getOpeningstocks();
    res.status(200).json(Openingstocks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOpeningstockById = async (req, res) => {
  try {
    const Openingstock = await userService.getOpeningstockById(req.params.id);
    if (!Openingstock) return res.status(404).json({ message: 'Openingstock not found' });
    res.staus(200).json(Openingstock);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOpeningstock = async (req, res) => {
  try {
    const Openingstock = await userService.updateOpeningstock(req.params.id, req.body);
    res.staus(200).json(Openingstock);

  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};

const deleteOpeningstock = async (req, res) => {
  try {
    await userService.deleteOpeningstock(req.params.id);
    res.status(200).json({ message: 'Openingstock deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchReceiptsWithTotals = async (req, res) => {
  try {
    const data = await userService.getFilteredReceiptsWithTotals(req.query);
    res.json(data);
  } catch (err) {
    console.error('Fetch failed:', err);
    res.status(500).json({ error: 'Internal error' });
  }
};

const getPracticeSummary = async (req, res) => {
  try {
    const filters = req.query;
    const summary = await userService.fetchPracticeSummary(filters);
    res.json({ success: true, data: summary });
  } catch (err) {
    console.error('Controller Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const fetchDoctorTreatmentSummary = async (req, res) => {
  try {
    const summary = await userService.getDoctorTreatmentSummary(req.query);
    res.json({ summary });
  } catch (error) {
    console.error('Error in fetchDoctorTreatmentSummary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

 const fetchTreatmentCategorySummary = async (req, res) => {
  try {
    const data = await userService.getTreatmentCategorySummary(req.query);
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching treatment category summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchTreatmentSummary = async (req, res) => {
  try {
    const data = await userService.getTreatmentSummary(req.query);
    res.status(200).json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch treatment summary." });
  }
};

const fetchRateCardSummary = async (req, res) => {
  try {
    const data = await userService.getRateCardSummary(req.query);
    res.status(200).json({ data });
  } catch (error) {
    console.error("RateCard Summary Error:", error);
    res.status(500).json({ error: "Failed to fetch rate card summary" });
  }
};

const fetchGroupSummary = async (req, res) => {
  try {
    const result = await userService.getGroupSummary(req.query);
    res.status(200).json({ data: result });
  } catch (err) {
    console.error("Error fetching group summary", err);
    res.status(500).json({ error: "Server Error" });
  }
};

const fetchSourceSummary = async (req, res) => {
  try {
    const data = await userService.getSourceSummary(req.query);
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error in fetchSourceSummary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 const getSourceTypeSummary = async (req, res) => {
  const report = await userService.getSourceTypeSummary(req.query);
  res.status(httpStatus.OK).send(report);
};

 const getSourceAndTypeSummary = async (req, res) => {
  const summary = await userService.getSourceAndTypeSummary(req.query);
  res.status(httpStatus.OK).send(summary);
};

const getReceiptsByFilter = async (req, res) => {
  try {
    const clinics = await userService.getReceiptsByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getdailyactivityByFilter = async (req, res) => {
  try {
    const clinics = await userService.getdailyactivityByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDARTreportsByFilter = async (req, res) => {
  try {
    const clinics = await userService.getDARTreportsByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProspectByFilter = async (req, res) => {
  try {
    const clinics = await userService.getProspectByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientsummeryByFilter = async (req, res) => {
  try {
    const { filterType } = req.query;
    if (!filterType) {
      return res.status(400).json({ success: false, message: 'filterType is required' });
    }
    const clinics = await userService.getPatientsummeryByFilter(filterType);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientlistByFilter = async (req, res) => {
  try {
    const clinics = await userService.getPatientlistByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientcontactByFilter = async (req, res) => {
  try {
    const clinics = await userService.getPatientcontactByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientbirthdayByFilter = async (req, res) => {
  try {
    const clinics = await userService.getPatientbirthdayByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientanniversaryByFilter = async (req, res) => {
  try {
    const clinics = await userService.getPatientanniversaryByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReferralsByFilter = async (req, res) => {
  try {
    const clinics = await userService.getReferralsByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getpatientsperiodByFilter = async (req, res) => {
  try {
    const clinics = await userService.getpatientsperiodByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNevervisitedpatientByFilter = async (req, res) => {
  try {
    const clinics = await userService.getNevervisitedpatientByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getappointmentscheduleByFilter = async (req, res) => {
  try {
    const clinics = await userService.getappointmentscheduleByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getappointmentbookedByFilter = async (req, res) => {
  try {
    const clinics = await userService.getappointmentbookedByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatmentdoneByFilter = async (req, res) => {
  try {
    const clinics = await userService.getTreatmentdoneByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreatmentplansByFilter = async (req, res) => {
  try {
    const clinics = await userService.getTreatmentplansByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getConversionByFilter = async (req, res) => {
  try {
    const clinics = await userService.getConversionByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getpatienttreatmentByFilter = async (req, res) => {
  try {
    const clinics = await userService.getpatienttreatmentByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getprescriptionByFilter = async (req, res) => {
  try {
    const clinics = await userService.getprescriptionByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getpatientreceivablesByFilter = async (req, res) => {
  try {
    const clinics = await userService.getpatientreceivablesByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getratecardreceivablesByFilter = async (req, res) => {
  try {
    const clinics = await userService.getratecardreceivablesByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getvendorpayablesByFilter = async (req, res) => {
  try {
    const clinics = await userService.getvendorpayablesByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getdaybookByFilter = async (req, res) => {
  try {
    const clinics = await userService.getdaybookByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getvoucherlistByFilter = async (req, res) => {
  try {
    const clinics = await userService.getvoucherlistByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasksByFilter = async (req, res) => {
  try {
    const clinics = await userService.getTasksByFilter(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorUnavailabilitySummary = async (req, res) => {
  try {
    const clinics = await userService.getDoctorUnavailabilitySummary(req.query);
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saveOpeningBalance = async (req, res) => {
  try {
    const result = await userService.saveOpeningBalance(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOpeningBalanceByPatient = async (req, res) => {
  try {
    const balance = await userService.getOpeningBalance(req.params.patientId);
    if (!balance) return res.status(404).json({ message: 'Not found' });
    res.json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    // console.log('req.body', req.body)
    const result = await userService.createContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const result = await userService.updateContact(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await userService.getContact(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllContacts = async (_req, res) => {
  try {
    const list = await userService.getAllContacts();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    await userService.deleteContact(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContactByName = async (req, res) => {
  try {
    const contact = await userService.getContactByName(req.params.name);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProspectPatient = async (req, res) => {
  try {
    const { centerId } = req.params;
    const patients = await userService.getProspectPatient(centerId);

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

const getRecallPatients = async (req, res) => {
  try {
    const { centerId } = req.params;
    const patients = await userService.getRecallPatients(centerId);

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

const getInProgressPatients = async (req, res) => {
  try {
    const { centerId } = req.params;
    const patients = await userService.getInProgressPatients(centerId);

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong'
    });
  }
};

const fetchTreatmentPlanList = async (req, res) => {
  try {
    const { centerId } = req.params;
    const patients = await userService.getPatientsWithTreatmentPlans(centerId);

    res.status(200).json(patients);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getConsultedPatients = async (req, res) => {
  try {
    const { centerId } = req.params;

    const patients = await userService.getConsultedPatients(centerId);
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error in controller:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProspect = async (req, res) => {
  try {
    const result = await userService.createProspect(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProspects = async (req, res) => {
  const results = await userService.getAllProspects();
  res.json(results);
};

const getProspectById = async (req, res) => {
  const result = await userService.getProspectById(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json(result);
};

const updateProspect = async (req, res) => {
  const result = await userService.updateProspect(req.params.id, req.body);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json(result);
};

const deleteProspect = async (req, res) => {
  const result = await userService.deleteProspect(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};


const createNewfolder = async (req, res) => {
  try {
  
    const clinic = await userService.createNewfolder(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNewfolders = async (req, res) => {
  try {
    const clinics = await userService.getNewfolders();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNewfolderById = async (req, res) => {
  try {
    const clinic = await userService.getNewfolderById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNewfolder = async (req, res) => {
  try {
    const clinic = await userService.updateNewfolder(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNewfolder = async (req, res) => {
  try {
    await userService.deleteNewfolder(req.params.id);
    res.status(200).json({ message: 'Data deleted' });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createUploaddoc = async (req, res) => {
  try {
  
    const clinic = await userService.createUploaddoc(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUploaddocs = async (req, res) => {
  try {
    const clinics = await userService.getUploaddocs();
    res.status(200).json(clinics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUploaddocById = async (req, res) => {
  try {
    const clinic = await userService.getUploaddocById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUploaddoc = async (req, res) => {
  try {
    const clinic = await userService.updateUploaddoc(req.params.id, req.body);
    res.status(200).json(clinic);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUploaddoc = async (req, res) => {
  try {
    await userService.deleteUploaddoc(req.params.id);
    res.status(200).json({ message: 'Data deleted' });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { selecttime, userdetail, createPayment, verifyPayment, resendnotification, blockingtime,
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
  getBankaccountstatus, generateExcelBankaccount, generatePdfBankaccount, createCardswipingmachine, getCardswipingmachines,  searchnameCardswipingmachines,
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
  generatePdfClinicalnotes, createTreatmentcategory, getTreatmentcategory, searchnameTreatmentcategorys, searchdateTreatmentcategorys, getTreatmentcategoryBymonth,  getTreatmentcategoryById, updateTreatmentcategory, deleteTreatmentcategory, 
  getTreatmentcategorystatus, generateExcelTreatmentcategory, generatePdfTreatmentcategory, createTreatment, getTreatment, searchnameTreatments, searchdateTreatments, getTreatmentBymonth,  getTreatmentById, updateTreatment, deleteTreatment, 
  getTreatmentstatus, generateExcelTreatment, generatePdfTreatment, createSittingnote, getSittingnote, searchnameSittingnotes, searchdateSittingnotes, getSittingnoteById, updateSittingnote, deleteSittingnote, getSittingnotestatus, generateExcelSittingnote, 
  generatePdfSittingnote, createDrug, getDrug, searchnameDrugs, searchdateDrugs,  getDrugById, updateDrug, deleteDrug, getDrugstatus, generateExcelDrug, generatePdfDrug, createInstruction, getInstruction, searchnameInstructions, searchdateInstructions, 
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
  generateExcelInventorycategory, generatePdfInventorycategory, createInventoryitem, getInventoryitems,  searchnameInventoryitems, searchdateInventoryitems, getInventoryitemById, updateInventoryitem, deleteInventoryitem, getInventoryitemstatus, generateExcelInventoryitem, 
  generatePdfInventoryitem, createAccount, getAccounts, searchnameAccounts, searchdateAccounts, getAccountById, updateAccount, deleteAccount, getAccountstatus, generateExcelAccount, generatePdfAccount, createPatient, addInvoiceToPatient, getPatients, searchnamePatients, searchdatePatients, 
  getPatientBymonth, getPatientById, updatePatient, addMultipleTreatmentDone, updateTreatmentDone, deleteTreatmentDone, deletePatient, getTotalPatientsByRateCard, getTotalPatientsBySourcetype, getTotalPatientsBySource, getTotalPatientsByGroup, createDoctorunavaibility, getDoctorunavaibilitys, searchnameDoctorunavaibilitys, 
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
  createGrninward, getGrninwards, getGrninwardById, updateGrninward, deleteGrninward, getPracticeSummary,
  createGrnoutward, getGrnoutwards, getGrnoutwardById, updateGrnoutward, deleteGrnoutward, 
  createBranchindent, getBranchindents, getBranchindentById, updateBranchindent, deleteBranchindent, 
  createBranchinward, getBranchinwards, getBranchinwardById, updateBranchinward, deleteBranchinward, 
  createBranchoutward, getBranchoutwards, getBranchoutwardById, updateBranchoutward, deleteBranchoutward, 
  createPurchasepayment, getPurchasepayments, getPurchasepaymentById, updatePurchasepayment, deletePurchasepayment, 
  createPurchasereturnbill, getPurchasereturnbills, getPurchasereturnbillById, updatePurchasereturnbill, deletePurchasereturnbill, 
  createPurchasereturnpayment, getPurchasereturnpayments, getPurchasereturnpaymentById, updatePurchasereturnpayment, deletePurchasereturnpayment, 
  createOpeningstock, getOpeningstocks, getOpeningstockById, updateOpeningstock, deleteOpeningstock, fetchReceiptsWithTotals, fetchDoctorTreatmentSummary,
  fetchTreatmentCategorySummary, fetchTreatmentSummary, fetchRateCardSummary, fetchGroupSummary, fetchSourceSummary, getSourceTypeSummary, getSourceAndTypeSummary, getReceiptsByFilter,
  getdailyactivityByFilter, getDARTreportsByFilter, getProspectByFilter, getPatientsummeryByFilter, getPatientlistByFilter, getPatientcontactByFilter, getPatientbirthdayByFilter, getPatientanniversaryByFilter,
  getReferralsByFilter, getpatientsperiodByFilter, getNevervisitedpatientByFilter, getappointmentscheduleByFilter, getappointmentbookedByFilter, getTreatmentdoneByFilter, 
  getTreatmentplansByFilter,  getConversionByFilter, getpatienttreatmentByFilter, getprescriptionByFilter, getpatientreceivablesByFilter, getratecardreceivablesByFilter,
  getvendorpayablesByFilter, getdaybookByFilter, getvoucherlistByFilter, getTasksByFilter, getDoctorUnavailabilitySummary, saveOpeningBalance, getOpeningBalanceByPatient, 
  createContact, updateContact, getContact, getAllContacts, deleteContact, getContactByName, 
  getProspectPatient, getConsultedPatients, fetchTreatmentPlanList, getInProgressPatients, getRecallPatients, createProspect, getAllProspects, getProspectById, updateProspect, deleteProspect, 
  createNewfolder, getNewfolders, getNewfolderById, updateNewfolder, deleteNewfolder,
  createUploaddoc, getUploaddocs, getUploaddocById, updateUploaddoc, deleteUploaddoc, 
};