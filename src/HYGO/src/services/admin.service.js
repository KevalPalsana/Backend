import { hygoModels } from "../db/hygo.db.js";

const createPatient = async (payload) => {
   return await hygoModels.HYGOPatient.create(payload);
};

const getPatients = async () => {
   return await hygoModels.HYGOPatient.find().sort({ createdAt: -1});
}
const getPatientById = async (id) => {
   return await hygoModels.HYGOPatient.findById(id);
}
const deletePatientById = async (id) => {
   return await hygoModels.HYGOPatient.findByIdAndDelete(id);
}

const updatePatientById = async (id, update) => {
  const patient = await hygoModels.HYGOPatient.findByIdAndUpdate(id, update, { new: true });
  if (!patient) throw new ApiError(404, 'Patient not found');
  return patient;
  
};

const createDoctor = async (payload) => { 
   return await hygoModels.HYGODoctor.create(payload);
}

const getDoctors = async () => {
   return await hygoModels.HYGODoctor.find().sort({ createdAt: -1});
}

const getDoctorById = async (id) => {
    return await hygoModels.HYGODoctor.findById(id);
}

const updateDoctorById = async (id, update) => {
  const doctor = await hygoModels.HYGODoctor.findByIdAndUpdate(id, update, { new: true });
  if (!doctor) throw new ApiError(404, 'Doctor not found');
  return doctor;
};

const deleteDoctorById = (id) => hygoModels.HYGODoctor.findByIdAndDelete(id);

const saveSettings = async (userId, data) => {
  return await hygoModels.HYGOSetting.findOneAndUpdate(
    { user: userId },
    { ...data, user: userId },
    { new: true, upsert: true }
  );
};

const getSettingsByUser = async (userId) => {
  return await hygoModels.HYGOSetting.findOne({ user: userId });
};

const deleteSettingsByUser = async (userId) => {
  return await hygoModels.HYGOSetting.deleteOne({ user: userId });
};

const createAppointment = async (data) => {
  const patient = await hygoModels.HYGOPatient.findById(data.patientId);

  if (!patient) {
    throw new Error("Patient is not registered");
  }

  const appointment = await hygoModels.HYGOAppointment.create(data);
  return appointment;
};

const getAppointments = async () => {
  return await hygoModels.HYGOAppointment.find().populate("patientId");
};

const getFilteredAppointments = async (dateFilter, status) => {
  const filter = {};

  const today = dayjs().startOf("day");
  if (dateFilter === "today") {
    filter.date = {
      $gte: today.toDate(),
      $lt: today.add(1, "day").toDate(),
    };
  } else if (dateFilter === "nextDay") {
    filter.date = {
      $gte: today.add(1, "day").toDate(),
      $lt: today.add(2, "day").toDate(),
    };
  } else if (dateFilter === "upcoming") {
    filter.date = { $gt: today.toDate() };
  }

  if (status) {
    filter.status = status;
  }

  return await hygoModels.HYGOAppointment.find(filter).populate("patientId");
};

const getAppointmentById = async (id) => {
  return await hygoModels.HYGOAppointment.findById(id).populate("patientId");
};

const updateAppointment = async (id, updates) => {
  return await hygoModels.HYGOAppointment.findByIdAndUpdate(id, updates, { new: true });
};

const deleteAppointment = async (id) => {
  return await hygoModels.HYGOAppointment.findByIdAndDelete(id);
};

 const createClinic = async (data) => {
  return await new hygoModels.HYGOClinic(data).save();
};

const getAllClinics = async () => {
  return await hygoModels.HYGOClinic.find();
};

const getClinicById = async (id) => {
  return await hygoModels.HYGOClinic.findById(id);
};

const updateClinic = async (id, data) => {
  return await hygoModels.HYGOClinic.findByIdAndUpdate(id, data, { new: true });
};

const deleteClinic = async (id) => {
  return await hygoModels.HYGOClinic.findByIdAndDelete(id);
};

 const createOPD = async (clinicId, data) => {
  return await new hygoModels.HYGOOPD({ ...data, clinic: clinicId }).save();
};

const getAllOPDs = async () => {
  return await hygoModels.HYGOOPD.find().populate('clinic');
};

const getOPDById = async (id) => {
  return await hygoModels.HYGOOPD.findById(id).populate('clinic');
};

const updateOPD = async (id, data) => {
  return await hygoModels.HYGOOPD.findByIdAndUpdate(id, data, { new: true });
};

const deleteOPD = async (id) => {
  return await hygoModels.HYGOOPD.findByIdAndDelete(id);
};

 const createDepartment = async (data) => {
  return await new hygoModels.HYGODepartment(data).save();
};

const getAllDepartments = async () => {
  return await hygoModels.HYGODepartment.find()
    .populate('clinic', 'clinicName')
    .populate('createdBy', 'fullName email')
    .populate('Staff', 'fullName staffRole');
};

const getDepartmentById = async (id) => {
  return await hygoModels.HYGODepartment.findById(id)
    .populate('clinic', 'clinicName')
    .populate('createdBy', 'fullName email')
    .populate('Staff', 'fullName staffRole');
};

const updateDepartment = async (id, data) => {
  return await hygoModels.HYGODepartment.findByIdAndUpdate(id, data, { new: true });
};

const deleteDepartment = async (id) => {
  return await hygoModels.HYGODepartment.findByIdAndDelete(id);
};

const createService = async (data) => {
  return await new hygoModels.HYGOService(data).save();
};

const getAllServices = async () => {
  return await hygoModels.HYGOService.find();
};

const getServiceById = async (id) => {
  return await hygoModels.HYGOService.findById(id);
};

const updateService = async (id, data) => {
  return await hygoModels.HYGOService.findByIdAndUpdate(id, data, { new: true });
};

const deleteService = async (id) => {
  return await hygoModels.HYGOService.findByIdAndDelete(id);
};

const createPrescription = async (data) => {
  return await new hygoModels.HYGOPrescription(data).save();
};

const getPrescriptionById = async (id) => {
  return await hygoModels.HYGOPrescription.findById(id)
    .populate('patientId', 'name')
    .populate('appointmentId');
};

const getAllPrescriptions = async () => {
  return await hygoModels.HYGOPrescription.find().sort({ createdAt: -1 });
};

export default { createPatient, getPatientById, getPatients, deletePatientById, updatePatientById, createDoctor, getDoctorById, getDoctors, updateDoctorById, deleteDoctorById,
    saveSettings, getSettingsByUser, deleteSettingsByUser, createAppointment, getAppointments, getFilteredAppointments, updateAppointment, deleteAppointment, 
    createClinic, getAllClinics, getClinicById, updateClinic, deleteClinic, createOPD, getAllOPDs, getOPDById, updateOPD, deleteOPD, createDepartment, getAllDepartments, getDepartmentById,
    updateDepartment, deleteDepartment, createService, getAllServices, getServiceById, updateService, deleteService, createPrescription, getAllPrescriptions, getPrescriptionById,
}