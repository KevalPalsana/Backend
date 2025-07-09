import Food from '../models/food.js';
import xlsx from 'xlsx';

const createFood = async (req, res) => {
    try {
        const food = new Food(req.body);
        await food.save();
        res.status(201).json({
            status: "success",
            data: food
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json({
            status: "success",
            data: foods
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json({
            status: "success",
            data: food
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json({ message: 'Food deleted successfully', data: food });
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
            await Food.insertMany(foodsToInsert);
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

export default { createFood, getFoodById, getFoods, updateFood, deleteFood, uploadExcel }