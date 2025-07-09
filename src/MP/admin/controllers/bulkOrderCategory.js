import BulkOrderCategory from '../models/bulkOrderCategory.js';
import xlsx from 'xlsx';

const createBulOrderCategory = async (req, res) => {
    try {
        const bulkOrderCategory = new BulkOrderCategory(req.body);
        await bulkOrderCategory.save();
        res.status(201).json({
            status: "success",
            data: bulkOrderCategory
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getBulkOrderCategory = async (req, res) => {
    try {
        const bulkOrderCategory = await BulkOrderCategory.find();
        res.status(200).json({
            status: "success",
            data: bulkOrderCategory
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getBulkOrderCategoryById = async (req, res) => {
    try {
        const bulkOrderCategory = await BulkOrderCategory.findById(req.params.id);
        if (!bulkOrderCategory) {
            return res.status(404).json({ message: 'BulkOrderCategory not found' });
        }
        res.status(200).json(bulkOrderCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateBulkOrderCategory = async (req, res) => {
    try {
        const bulkOrderCategory = await BulkOrderCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!bulkOrderCategory) {
            return res.status(404).json({ message: 'BulkOrderCategory not found' });
        }
        res.status(200).json({
            status: "success",
            data: bulkOrderCategory});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteBulkOrderCategory = async (req, res) => {
    try {
        const bulkOrderCategory = await BulkOrderCategory.findByIdAndDelete(req.params.id);
        if (!bulkOrderCategory) {
            return res.status(404).json({ message: 'BulkOrderCategory not found' });
        }
        res.status(200).json({ message: 'BulkOrderCategory deleted successfully', data: bulkOrderCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadExcel = async (req, res) => {
    try {
        console.log('req.file is:', req.file);
        console.log('req.file:', req.file);
        console.log('req.body:', req.body);
        console.log('Headers:', req.headers);


        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const foodsToInsert = [];
        for (const row of jsonData) {
            if (!row.name) {
                console.log('Skipping row because "name" is missing:', row);
                continue;
            }

            foodsToInsert.push({
                name: row.name,
            });
        }
        if (foodsToInsert.length > 0) {
            await BulkOrderCategory.insertMany(foodsToInsert);
        }

        return res.status(200).json({
            message: 'Excel uploaded and data stored successfully!',
            insertedCount: foodsToInsert.length,
        });
    } catch (error) {
        console.error('Error processing Excel file:', error);
        return res.status(500).json({ message: 'Error processing the file.' });
    }
};

export default {createBulOrderCategory, getBulkOrderCategory, updateBulkOrderCategory, deleteBulkOrderCategory, getBulkOrderCategoryById, uploadExcel}