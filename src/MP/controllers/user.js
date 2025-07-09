import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
;
const createUser = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({
            status: "success",
            data: newUser,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// const loginUser = async (req, res) => {
//     try {
//         const { userName, password } = req.body;
//         const user = await User.findOne({ userName });

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

//         res.json({ status: "success", token });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const loginUser = async (req, res) => {
    try {
        const { userName, password, role } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Provided Role:", role); // Log provided role
        console.log("Stored Role:", user.role); // Log stored role

        // Convert the provided role to ObjectId for comparison
        if (!mongoose.Types.ObjectId.isValid(role) || !user.role.equals(role)) {
            return res.status(403).json({ error: "Invalid role" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ status: "success", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export default {createUser, loginUser};

