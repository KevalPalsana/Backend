import  Pravruti from '../models/pravruti.js';



const createPravruti = async (req, res) => {
    try {
        const pravruti = new Pravruti(req.body);
        const savedPravruti = await pravruti.save();
        res.status(201).json({
            status: "success",
            data:
            savedPravruti,
        });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create Pravruti', error: error.message });
    }
};


const getAllPravruti = async (req, res) => {
    try {
        const pravrutis = await Pravruti.find();
        res.status(200).json({
            status: "success",
            data:
            pravrutis,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Pravruti records', error: error.message });
    }
};


const getPravrutiById = async (req, res) => {
    try {
        const pravruti = await Pravruti.findById(req.params.id);
        if (!pravruti) {
            return res.status(404).json({ message: 'Pravruti not found' });
        }
        res.status(200).json({
            status: "success",
            data: pravruti,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Pravruti', error: error.message });
    }
};


const updatePravruti = async (req, res) => {
    try {
        const pravruti = await Pravruti.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pravruti) {
            return res.status(404).json({ message: 'Pravruti not found' });
        }
        res.status(200).json({
            status: "success",
            data:
            pravruti,
        });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update Pravruti', error: error.message });
    }
};


const deletePravruti = async (req, res) => {
    try {
        const pravruti = await Pravruti.findByIdAndDelete(req.params.id);
        if (!pravruti) {
            return res.status(404).json({ message: 'Pravruti not found' });
        }
        res.status(200).json({ message: 'Pravruti deleted successfully', data: pravruti });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Pravruti', error: error.message });
    }
};

export default {createPravruti, getAllPravruti, getPravrutiById, updatePravruti, deletePravruti}