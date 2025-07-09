import  MenuCategory from '../models/MenuCategory.js';
import xlsx from 'xlsx';

const createCategory = async (req, res) => {
    try {
        const menuCategory = new MenuCategory(req.body);
        await menuCategory.save();
        res.status(201).json({
            status: "success",
            data: menuCategory
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getCategory = async (req, res) => {
    try {
        const menuCategories = await MenuCategory.find();
        res.status(200).json({
            status: "success",
            data: menuCategories
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCategoryById = async (req, res) => {
    try {
        const menuCategroy = await MenuCategory.findById(req.params.id);
        if (!menuCategroy) {
            return res.status(404).json({ message: 'MenuCategory not found' });
        }
        res.status(200).json(menuCategroy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateCategory = async (req, res) => {
    try {
        const menuCategroy = await MenuCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!menuCategroy) {
            return res.status(404).json({ message: 'MenuCategroy not found' });
        }
        res.status(200).json({
            status: "success",
            data: menuCategroy});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const menuCategory = await MenuCategory.findByIdAndDelete(req.params.id);
        if (!menuCategory) {
            return res.status(404).json({ message: 'MenuCategory not found' });
        }
        res.status(200).json({ message: 'MenuCategory deleted successfully', data: menuCategory });
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
            await MenuCategory.insertMany(foodsToInsert);
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

export default {createCategory, getCategoryById, getCategory, updateCategory, deleteCategory, uploadExcel}