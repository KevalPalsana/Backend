import authService from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req, res) => {
    const { name, email, phone } = req.body;
    const user = await authService.registerUserService(name, email, phone);
    res.status(httpStatus.CREATED).send({ user });
});


const registerAdmin = catchAsync(async (req, res) => {
    const admin = await authService.registerAdminService(req.body);
    res.status(httpStatus.CREATED).send({ admin });
});


const loginAdmin = catchAsync(async (req, res) => {
    const admin = await authService.loginAdminService(req.body);
    res.status(httpStatus.CREATED).send({ admin });
});

export default { registerUser, registerAdmin, loginAdmin };