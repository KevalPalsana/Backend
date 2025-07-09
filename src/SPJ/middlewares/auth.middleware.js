import { ApiError } from "../utils/ApiError.js";
// import  asyncHandler  from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { SPJUser} from "../models/user.model.js";


const authenticateAdmin = async (req, res, next) => {
    // const token = req.header('Authorization')?.replace('Bearer ', '');
  
    // if (!token) {
    //   return res.status(401).json({ error: 'No token provided' });
    // }
    // try {
    //   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
    //   req.user = decoded;
  
    //   if (req.user.role !== 'admin') {
    //     return res.status(403).json({ error: 'You do not have permission to access this resource' });
    //   }
  
    //   next();
    // } catch (err) {
    //   // res.status(401).json({ error: 'Invalid or expired token' });
    //   if (err.name === 'TokenExpiredError') {
    //     return res.status(401).json({ error: 'Token has expired' });
    //   } else {
    //     return res.status(401).json({ error: 'Invalid token' });
    //   }
    // }

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("Decoded Token:", decoded);
      req.user = decoded; 
      next();
    } catch (error) {
      console.error("Authentication Error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token." });
    }
  };
  
const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Received Token:', token);
    console.log('Secret Key During Verification:', process.env.ACCESS_TOKEN_SECRET);

    if (!token) {
      return res.status(401).json({ error: 'No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log('Decoded Token:', decoded);
      req.user = decoded;

      next();
    } catch (err) {
      console.error('Token Verification Error:', err.message);
      return res.status(401).json({ error: err.message });
    }
  };
  
export default {authenticateAdmin,authenticateUser}  