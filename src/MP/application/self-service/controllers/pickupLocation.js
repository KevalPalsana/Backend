import PremvatiListing from '../models/pickupLocation.js';
import path from 'path';
const BASE_URL = process.env.APP_URL;



const createPremvatiList = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file ? `uploads/self-service/premvatiImages/${req.file.filename}` : '';


        const newListing = new PremvatiListing({
            name,
            image: `${BASE_URL}/${image}`
        });

        const savedListing = await newListing.save();

        res.status(201).json({
            status: 'success',
            message: 'Premvati listing created successfully',
            data: savedListing,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create listing',
            error: error.message,
        });
    }
};


const updatePremvatiList = async (req, res) => {
    try {
        const { name } = req.body;

 
        const image = req.file ? `${BASE_URL}/uploads/self-service/premvatiImages/${req.file.filename}` : '';

        const updatedListing = await PremvatiListing.findByIdAndUpdate(
            req.params.id,
            { name, image },
            { new: true } 
        );

        if (!updatedListing) {
            return res.status(404).json({
                status: 'error',
                message: 'Listing not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Premvati listing updated successfully',
            data: updatedListing,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update listing',
            error: error.message,
        });
    }
};

const deletePremvatiList = async (req, res) => {
    try {
        const premvatiListing = await PremvatiListing.findByIdAndDelete(req.params.id);
        if (!premvatiListing) {
            return res.status(404).json({ message: 'PremvatiListing not found' });
        }
        res.status(200).json({ message: 'PremvatiListing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPremvatiList = async (req, res) => {
    try {
        const premvatiListings = await PremvatiListing.find();
        res.status(200).json({
            status: "success",
            data: 
            premvatiListings,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getPremvatiListById = async (req, res) => {
    try {
        const premvatiListing = await PremvatiListing.findById(req.params.id);
        if (!premvatiListing) {
            return res.status(404).json({ message: 'PremvatiListing not found' });
        }
        res.status(200).json(premvatiListing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {createPremvatiList, getPremvatiList, getPremvatiListById, updatePremvatiList, deletePremvatiList}