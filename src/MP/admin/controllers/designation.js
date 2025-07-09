import  Designation from '../models/designation.js';



const createDesignation = async (req, res) => {
    try {
        const designation = new Designation(req.body);
        const savedDesignation= await designation.save();
        res.status(201).json({
            status: "success",
            data:
            savedDesignation,
        });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create Designation', error: error.message });
    }
};


const getAllDesignation = async (req, res) => {
    try {
        const designations = await Designation.find();
        res.status(200).json({
            status: "success",
            data:
            designations,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Designation records', error: error.message });
    }
};


const getDesignationById = async (req, res) => {
    try {
        const designation = await Designation.findById(req.params.id);
        if (!designation) {
            return res.status(404).json({ message: 'Designation not found' });
        }
        res.status(200).json({
            status: "success",
            data:
            designation,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Designation', error: error.message });
    }
};


const updateDesignation = async (req, res) => {
    try {
        const designation = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!designation) {
            return res.status(404).json({ message: 'Designation not found' });
        }
        res.status(200).json({
            status: "success",
            data:
            designation,
        });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update Designation', error: error.message });
    }
};


const deleteDesignation = async (req, res) => {
    try {
        const designation = await Designation.findByIdAndDelete(req.params.id);
        if (!designation) {
            return res.status(404).json({ message: 'Designation not found' });
        }
        res.status(200).json({ message: 'Designation deleted successfully', data: designation });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Designation', error: error.message });
    }
};


export default {createDesignation, getAllDesignation, getDesignationById, updateDesignation, deleteDesignation}