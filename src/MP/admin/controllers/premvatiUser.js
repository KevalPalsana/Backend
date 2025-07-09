import PremvatiUser from '../models/premvatiUser.js';
import PickupLocation from '../models/pickupLocation.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    const { name, password, phoneNumber, serialNo, date, premvati } = req.body;
    try {
        const existingUser = await PremvatiUser.findOne({ name });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists. Please log in.',
            });
        }
        const selectedPremvati = await PickupLocation.findById(premvati);
        if (!selectedPremvati) {
            return res.status(404).json({
                status: 'error',
                message: 'Invalid Premvati ID.'
            });
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = new PremvatiUser({
            name,
            password,
            phoneNumber,
            premvati: selectedPremvati?._id,
            serialNo,
            date,
        });
        await user.save();
        const populatedUser = await PremvatiUser.findById(user._id)
        .populate('premvati', 'name')

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
        const users = await PremvatiUser.find().populate('premvati');
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
        const user = await PremvatiUser.findById(req.params.id)
            .populate('premvati');
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
        const user = await PremvatiUser.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .populate('premvati');
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
        const user = await PremvatiUser.findByIdAndDelete(req.params.id);
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
        const user = await PremvatiUser.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'User not registered. Please register first.' });
        }

        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: 'Invalid password' });
        // }

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

export default {registerUser, userLogin, getAllUsers, getUserById, updateUser, deleteUser}