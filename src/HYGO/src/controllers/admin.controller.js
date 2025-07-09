import adminService from "../services/admin.service.js";
import httpStatus from 'http-status';
import catchAsync from "../utils/catchAsync.js";
import { ApiError } from "../../../utils/ApiError.js";


const createPatient = catchAsync (async (req, res) => {
    const patient = await adminService.createPatient(req.body);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: 'Patient registered successfully',
      data: patient
    });
});


 const getAllPatients = catchAsync(async (req, res) => {
  const patients = await adminService.getPatients(req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Patients fetched successfully',
    data: patients,
  });
});

const getPatientById = catchAsync(async (req, res) => {
  const patient = await adminService.getPatientById(req.params.id);
  if (!patient) throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Patient fetched successfully',
    data: patient,
  });
});

const updatePatientById = catchAsync(async (req, res) => {
  const updatedPatient = await adminService.updatePatientById(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Patient updated successfully',
    data: updatedPatient,
  });
});

const deletePatientById = catchAsync(async (req, res) => {
  const deleted = await adminService.deletePatientById(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  res.status(httpStatus.NO_CONTENT).send();
});

const createDoctor = catchAsync(async (req, res) => {
  const doctor = await adminService.createDoctor(req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'Doctor created successfully',
    data: doctor,
  });
});

const getAllDoctors = catchAsync(async (req, res) => {
  const doctors = await adminService.getDoctors(req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Doctors fetched successfully',
    data: doctors,
  });
});

const getDoctorById = catchAsync(async (req, res) => {
  const doctor = await adminService.getDoctorById(req.params.id);
  if (!doctor) throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Doctor fetched successfully',
    data: doctor,
  });
});

const updateDoctorById = catchAsync(async (req, res) => {
  const updated = await adminService.updateDoctorById(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Doctor updated successfully',
    data: updated,
  });
});

const deleteDoctorById = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteDoctorById(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  res.status(httpStatus.NO_CONTENT).send();
});


const getSettingsByUser = catchAsync(async (req, res) => {
  const settings = await adminService.getSettingsByUser(req.params.userId);
  if (!settings) {
    throw new ApiError(httpStatus.NOT_FOUND, "Settings not found");
  }
  res.status(httpStatus.OK).json(settings);
});

const createOrUpdateSettings = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const updated = await adminService.saveSettings(
    userId,
    { ...req.body, user: req.params.userId },
    { new: true, upsert: true }
  );
  res.status(httpStatus.OK).json(updated);
});

const deleteSettingsByUser = catchAsync(async (req, res) => {
  const result = await adminService.deleteOne({ user: req.params.userId });
  if (result.deletedCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Settings not found");
  }
  res.status(httpStatus.NO_CONTENT).send();
});

 const createAppointment = async (req, res) => {
  try {
    const appointment = await adminService.createAppointment(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const data = await adminService.getAppointments();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const getFilterAppointments = async (req, res) => {
  try {
    const { dateFilter, status } = req.query;
    const appointments = await adminService.getFilteredAppointments(dateFilter, status);
    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

 const createClinic = catchAsync(async (req, res) => {
  const clinic = await adminService.createClinic(req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'Clinic created successfully',
    data: clinic
  });
});

const getClinic = catchAsync(async (req, res) => {
  const clinic = await adminService.getClinicById(req.params.id);
  if (!clinic) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Clinic not found' });
  }
  res.status(httpStatus.OK).json({ status: true, data: clinic });
});

const getAllClinics = catchAsync(async (req, res) => {
  const clinics = await adminService.getAllClinics();
  res.status(httpStatus.OK).json({ status: true, data: clinics });
});

const updateClinic = catchAsync(async (req, res) => {
  const updated = await adminService.updateClinic(req.params.id, req.body);
  if (!updated) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Clinic not found' });
  }
  res.status(httpStatus.OK).json({ status: true, message: 'Updated successfully', data: updated });
});

const deleteClinic = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteClinic(req.params.id);
  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Clinic not found' });
  }
  res.status(httpStatus.OK).json({ status: true, message: 'Clinic deleted successfully' });
});

 const createOPD = catchAsync(async (req, res) => {
  const opd = await adminService.createOPD(req.params.clinicId, req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'OPD created successfully',
    data: opd
  });
});

const getAllOPDs = catchAsync(async (req, res) => {
  const list = await adminService.getAllOPDs();
  res.status(httpStatus.OK).json({ status: true, data: list });
});

const getOPDById = catchAsync(async (req, res) => {
  const opd = await adminService.getOPDById(req.params.id);
  if (!opd) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'OPD not found' });
  }
  res.status(httpStatus.OK).json({ status: true, data: opd });
});

const updateOPD = catchAsync(async (req, res) => {
  const updated = await adminService.updateOPD(req.params.id, req.body);
  if (!updated) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Not found' });
  }
  res.status(httpStatus.OK).json({ status: true, message: 'Updated', data: updated });
});

const deleteOPD = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteOPD(req.params.id);
  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Not found' });
  }
  res.status(httpStatus.OK).json({ status: true, message: 'Deleted' });
});

const createDepartment = catchAsync(async (req, res) => {
  const department = await adminService.createDepartment(req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'Department created successfully',
    data: department
  });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const departments = await adminService.getAllDepartments();
  res.status(httpStatus.OK).json({ status: true, data: departments });
});

const getDepartmentById = catchAsync(async (req, res) => {
  const department = await adminService.getDepartmentById(req.params.id);
  if (!department) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Not found' });
  }
  res.status(httpStatus.OK).json({ status: true, data: department });
});

 const updateDepartment = catchAsync(async (req, res) => {
  const updated = await adminService.updateDepartment(req.params.id, req.body);
  if (!updated) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Not found' });
  }
  res.status(httpStatus.OK).json({ status: true, message: 'Updated successfully', data: updated });
});

const deleteDepartment = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteDepartment(req.params.id);
  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Not found' });
  }
  res.status(httpStatus.OK).json({ status: true, message: 'Deleted successfully' });
});

 const createService = catchAsync(async (req, res) => {
  const service = await adminService.createService(req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'Service created successfully',
    data: service
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const services = await adminService.getAllServices();
  res.status(httpStatus.OK).json({ status: true, data: services });
});

const getServiceById = catchAsync(async (req, res) => {
  const service = await adminService.getServiceById(req.params.id);
  if (!service) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Service not found' });
  }
  res.status(httpStatus.OK).json({ status: true, data: service });
});

const updateService = catchAsync(async (req, res) => {
  const updated = await adminService.updateService(req.params.id, req.body);
  if (!updated) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Service not found' });
  }
  res.status(httpStatus.OK).json({ status: true, message: 'Updated successfully', data: updated });
});

const deleteService = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteService(req.params.id);
  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Service not found' });
  }
  res.status(httpStatus.OK).json({ status: true, message: 'Deleted successfully' });
});

const createPrescription = catchAsync(async (req, res) => {
  const prescription = await adminService.createPrescription(req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: 'Prescription created successfully',
    data: prescription
  });
});

const getPrescriptionById = catchAsync(async (req, res) => {
  const prescription = await adminService.getPrescriptionById(req.params.id);
  if (!prescription) {
    return res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Not found' });
  }
  res.status(httpStatus.OK).json({ status: true, data: prescription });
});

const getAllPrescriptions = catchAsync(async (req, res) => {
  const prescriptions = await adminService.getAllPrescriptions();
  res.status(httpStatus.OK).json({ status: true, data: prescriptions });
});

export default { createPatient, getAllPatients, getPatientById, updatePatientById, deletePatientById, createDoctor, getDoctorById, getAllDoctors, updateDoctorById, deleteDoctorById,
  createOrUpdateSettings, getSettingsByUser, deleteSettingsByUser, createAppointment, getAppointments, getFilterAppointments, createClinic, getAllClinics, getClinic, updateClinic, deleteClinic,
  createOPD, getAllOPDs, getOPDById, updateOPD, deleteOPD, createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment, createService, getAllServices, getServiceById, 
  updateService, deleteService, createPrescription, getPrescriptionById, getAllPrescriptions,

}