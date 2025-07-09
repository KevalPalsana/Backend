import Mandal from '../models/mandal.js';

const createMandal = async (req, res) => {
    try {
        const mandal = new Mandal(req.body);
        await mandal.save();
        res.status(201).json(mandal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getMandals = async (req, res) => {
    try {
        const mandals = await Mandal.find();
        res.status(200).json(mandals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getMandalById = async (req, res) => {
    try {
        const mandal = await Mandal.findById(req.params.id);
        if (!mandal) {
            return res.status(404).json({ message: 'Mandal not found' });
        }
        res.status(200).json(mandal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateMandal = async (req, res) => {
    try {
        const mandal = await Mandal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!mandal) {
            return res.status(404).json({ message: 'Mandal not found' });
        }
        res.status(200).json(mandal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteMandal = async (req, res) => {
    try {
        const mandal = await Mandal.findByIdAndDelete(req.params.id);
        if (!mandal) {
            return res.status(404).json({ message: 'Mandal not found' });
        }
        res.status(200).json({ message: 'Mandal deleted successfully', data: mandal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {createMandal, getMandalById, getMandals, updateMandal, deleteMandal}