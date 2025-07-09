import PrePackageFood from '../models/prePackageCategory.js';
import  PrePackageFoodItem from '../models/prePackageItem.js';
import xlsx from 'xlsx';
 import fs from 'fs';


const createPrePackageFoodItem = async (req, res) => {
    try {
       
        const { foodId, name, price, description, photo } = req.body;
        

        const newPrePackageFoodItem = new PrePackageFoodItem({
            foodId,
            name,
            photo,
            price,
            description,
        });

        const savedPrePackageFoodItem = await newPrePackageFoodItem.save();

        res.status(201).json({
            status: "success",
            message: 'Food item created successfully',
            data: savedPrePackageFoodItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating food item',
            error: error.message
        });
    }
};


const getAllPrePackageFoodItems = async (req, res) => {
    try {
        const foodItems = await PrePackageFoodItem.find();
        res.status(200).json({
            status: "success",
            message: 'Food items retrieved successfully',
            data: foodItems
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving food items',
            error: error.message
        });
    }
};

const getPrePackageFoodItemByFoodId = async (req,res) => {
    try {
        const { foodId } = req.params;
        const foodItems = await PrePackageFoodItem.find({ foodId }).populate('foodId');
        if (!foodItems) {
            return res.status(404).json({ message: 'Food items not found' });
        }
        res.json({
            status: "success",
            data:
            foodItems});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



const updatePrePackageFoodItem = async (req, res) => {
    try {
        const photo = req.file ? req.file.path : undefined;
        const updateData = {
            foodId: req.body.foodId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            photo: req.body.photo,
        };

        const updatedPrePackageFoodItem = await PrePackageFoodItem.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedPrePackageFoodItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item updated successfully',
            data: updatedPrePackageFoodItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating food item',
            error: error.message
        });
    }
};


const deletePrePackageFoodItem = async (req, res) => {
    try {
        const deletedPrePackageFoodItem = await PrePackageFoodItem.findByIdAndDelete(req.params.id);

        if (!deletedPrePackageFoodItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item deleted successfully',
            data: deletedPrePackageFoodItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting food item',
            error: error.message
        });
    }
};

const uploadExcel = async (req, res) => {
    let rowsProcessed = 0;
    let rowsSkipped = 0;
  
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const filePath = req.file.path; 
  
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; 
      const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      const itemsToInsert = [];
      for (const row of rows) {
        const { foodName, name, price, description } = row;
  
        if (!foodName || !name || !price) {
          rowsSkipped++;
          continue;
        }
  
        let foodDoc = await PrePackageFood.findOne({ name: foodName });
  
        if (!foodDoc) {
          rowsSkipped++;
          continue;
        }
  
        itemsToInsert.push({
          foodId: foodDoc._id,
          name,
          price,
          description: description || '',
        });
        rowsProcessed++;
      }
  
      if (itemsToInsert.length > 0) {
        await PrePackageFoodItem.insertMany(itemsToInsert);
      }
  
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file at ${filePath}:`, err);
        }
      });
  
      return res.status(200).json({
        message: 'Excel uploaded and data stored successfully!',
        insertedCount: itemsToInsert.length,
        rowsProcessed,
        rowsSkipped,
      });
    } catch (error) {
      console.error('Error processing Excel file:', error);
  
      if (req.file?.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(`Error deleting file on error path ${req.file.path}:`, err);
          }
        });
      }
  
      return res.status(500).json({ message: 'Error processing the file.' });
    }
  };

export default {createPrePackageFoodItem, getAllPrePackageFoodItems, getPrePackageFoodItemByFoodId, updatePrePackageFoodItem, deletePrePackageFoodItem, uploadExcel}
