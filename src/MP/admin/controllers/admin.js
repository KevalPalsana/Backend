import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js'; 

const JWT_SECRET = "your_jwt_secret_key"; 

const register =  async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: "Name and password are required" });
        }

        const existingAdmin = await Admin.findOne({ name });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ status: "success",
            message: "Admin registered successfully", 
            data: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error registering admin", error: error.message });
    }
};

const login =  async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: "Name and password are required" });
        }

        const admin = await Admin.findOne({ name });
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: admin._id, name: admin.name }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

const getAllAdmin =  async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({ 
            status: "success",
            data: admins });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving admins", error: error.message });
    }
};

const getAdminById =  async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ 
            status: success,
            data: admin });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving admin", error: error.message });
    }
};

const updateAdmin =  async (req, res) => {
    try {
        const { name, password } = req.body;
        const updatedData = {};

        if (name) updatedData.name = name;
        if (password) updatedData.password = await bcrypt.hash(password, 10);

        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin updated successfully", data: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error updating admin", error: error.message });
    }
};

const deleteAdmin =  async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin deleted successfully", data: deletedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error deleting admin", error: error.message });
    }
};

export default {register, login, getAllAdmin, getAdminById, updateAdmin, deleteAdmin}