import PrePackageFood from '../models/prePackageCategory.js';
import xlsx from 'xlsx';

const createPrePackageFood = async (req, res) => {
    try {
        const prePackageFood = new PrePackageFood(req.body);
        await prePackageFood.save();
        res.status(201).json({
            status: "success",
            data: prePackageFood
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getPrePackageFoods = async (req, res) => {
    try {
        const prePackageFoods = await PrePackageFood.find();
        res.status(200).json({
            status: "success",
            data: prePackageFoods
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getPrePackageFoodById = async (req, res) => {
    try {
        const prePackageFood = await PrePackageFood.findById(req.params.id);
        if (!prePackageFood) {
            return res.status(404).json({ message: 'PrePackageFood not found' });
        }
        res.status(200).json(prePackageFood);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updatePrePackageFood = async (req, res) => {
    try {
        const prePackageFood = await PrePackageFood.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!prePackageFood) {
            return res.status(404).json({ message: 'PrePackageFood not found' });
        }
        res.status(200).json({
            status: "success",
            data: prePackageFood});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deletePrePackageFood = async (req, res) => {
    try {
        const prePackageFood = await PrePackageFood.findByIdAndDelete(req.params.id);
        if (!prePackageFood) {
            return res.status(404).json({ message: 'PrePackageFood not found' });
        }
        res.status(200).json({ message: 'PrePackageFood deleted successfully', data: prePackageFood });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadExcel = async (req, res) => {
    try {
        console.log('req.file is:', req.file);

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
        await PrePackageFood.insertMany(foodsToInsert);
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




export default {createPrePackageFood, getPrePackageFoodById, getPrePackageFoods, updatePrePackageFood, deletePrePackageFood, uploadExcel}