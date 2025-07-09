import ServingCategory from '../models/servingCategory.js';
import xlsx from 'xlsx';

const createServingCategory = async (req, res) => {
    try {
        const servingCategory = new ServingCategory(req.body);
        await servingCategory.save();
        res.status(201).json({
            status: "success",
            data: servingCategory});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getServingCategories = async (req, res) => {
    try {
        const servingCategories = await ServingCategory.find();
        res.status(200).json({
            status: "success",
            data: servingCategories
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getServingCategoryById = async (req, res) => {
    try {
        const servingCategory = await ServingCategory.findById(req.params.id);
        if (!servingCategory) {
            return res.status(404).json({ message: 'ServingCategory not found' });
        }
        res.status(200).json(servingCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateServingCategory = async (req, res) => {
    try {
        const servingCategory = await ServingCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!servingCategory) {
            return res.status(404).json({ message: 'ServingCategory not found' });
        }
        res.status(200).json({
            status: "success",
            data: servingCategory});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteServingCategory = async (req, res) => {
    try {
        const servingCategory = await ServingCategory.findByIdAndDelete(req.params.id);
        if (!servingCategory) {
            return res.status(404).json({ message: 'ServingCategory not found' });
        }
        res.status(200).json({ 
        status: "success",
        message: 'ServingCategory deleted successfully',
        data: servingCategory });
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
        await ServingCategory.insertMany(foodsToInsert);
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

export default {createServingCategory, getServingCategories, updateServingCategory, getServingCategoryById, deleteServingCategory, uploadExcel}