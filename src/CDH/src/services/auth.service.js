import { CDHAdmin } from "../models/admin.model.js";
import { CDHUser } from "../models/user.model.js";

const registerUserService = async (name, email, phone) => {
    if (!name) throw new Error("Name is required");
    if (!phone) throw new Error("Phone number is required");
    if (!email) throw new Error("Email is required");
  
    let user = await CDHUser.findOne({ phone });
  
    if (user) return { alreadyExists: true, user };
  
    user = await CDHUser.create({ name, email, phone });
  
    return { alreadyExists: false, user };
  };
  
const registerAdminService = async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required");
  
    const existingAdmin = await CDHAdmin.findOne({ email });
    if (existingAdmin) throw new Error("Admin already exists");
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newAdmin = await CDHAdmin.create({
      email,
      password: hashedPassword,
    });
  
    return newAdmin;
  };
  
 const loginAdminService = async (email, password) => {
    const admin = await CDHAdmin.findOne({ email });
    if (!admin) throw new Error("Admin not found");
  
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error("Invalid credentials");
  
    return admin;
  };
  


export default { registerUserService, registerAdminService, loginAdminService};
