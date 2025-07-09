import Kshetra from '../models/kshetra.js';



const createKshetra = async (req, res) => {
    try {
        const kshetra = new Kshetra(req.body);
        const savedKshetra= await kshetra.save();
        res.status(201).json({
            status: "success",
            data:
            savedKshetra,
        });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create Kshetra', error: error.message });
    }
};


const getAllKshetra = async (req, res) => {
    try {
        const kshetras = await Kshetra.find();
        res.status(200).json({
            status: "success",
            data:
            kshetras,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Kshetra records', error: error.message });
    }
};


const getKshetraById = async (req, res) => {
    try {
        const kshetra = await Kshetra.findById(req.params.id);
        if (!kshetra) {
            return res.status(404).json({ message: 'Kshetra not found' });
        }
        res.status(200).json({
            status: "success",
            data:
            kshetra,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Kshetra', error: error.message });
    }
};


const updateKshetra = async (req, res) => {
    try {
        const kshetra = await Kshetra.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!kshetra) {
            return res.status(404).json({ message: 'Kshetra not found' });
        }
        res.status(200).json({
            status: "success",
            data:
            kshetra,
        });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update Kshetra', error: error.message });
    }
};


const deleteKshetra = async (req, res) => {
    try {
        const kshetra = await Kshetra.findByIdAndDelete(req.params.id);
        if (!kshetra) {
            return res.status(404).json({ message: 'Kshetra not found' });
        }
        res.status(200).json({ message: 'Kshetra deleted successfully', data: kshetra });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Kshetra', error: error.message });
    }
};

export default {createKshetra, getAllKshetra, getKshetraById, updateKshetra, deleteKshetra}