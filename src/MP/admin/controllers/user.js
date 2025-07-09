import User from '../models/user.js';
import Designation from '../models/designation.js';
import Pravruti from '../models/pravruti.js';
import Kshetra from '../models/kshetra.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const registerUser = async (req, res) => {
    const { name, password, phoneNumber, designation, kshetra, pravruti, age } = req.body;
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    try {
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists. Please log in.',
            });
        }
        const selectedDesignation = await Designation.findById(designation);
        const selectedKshetra = await Kshetra.findById(kshetra);
        const selectedPravruti = await Pravruti.findById(pravruti);
        if (!selectedDesignation || !selectedKshetra || !selectedPravruti) {
            return res.status(404).json({
                status: 'error',
                message: 'Invalid designation, kshetra, or pravruti ID.'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            password: hashedPassword,
            phoneNumber,
            designation: selectedDesignation?._id,  
            kshetra: selectedKshetra?._id,
            pravruti: selectedPravruti?._id,
            age
        });
        await user.save();
        const populatedUser = await User.findById(user._id)
        .populate('pravruti', 'name')
        .populate('kshetra', 'name')
        .populate('designation', 'name');
        console.log('populate', populatedUser)
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: populatedUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('pravruti').populate('kshetra').populate('designation');
        res.status(200).json({
            status: "success",
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
    }
};


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('pravruti')
            .populate('kshetra')
            .populate('designation');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            status:"success",
            data: user});
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
    }
};


const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .populate('pravruti')
            .populate('kshetra')
            .populate('designation');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update user', error: error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};


const userLogin = async (req, res) => {
    const { name, password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'User not registered. Please register first.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
            user: user
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default {registerUser, userLogin, updateUser, deleteUser, getAllUsers, getUserById}