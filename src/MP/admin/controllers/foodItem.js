import Food from '../models/food.js';
import FoodItem from '../models/foodItem.js';
import xlsx from 'xlsx';
import fs from 'fs'
const BASE_URL = process.env.APP_URL;

const createFoodItem = async (req, res) => {
    try {
        const { foodId, name, price, description, photo } = req.body;

        const newFoodItem = new FoodItem({
            foodId,
            name,
            photo,
            price,
            description,
            // quantity
        });

        const savedFoodItem = await newFoodItem.save();

        res.status(201).json({
            status: "success",
            message: 'Food item created successfully',
            data: savedFoodItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating food item',
            error: error.message
        });
    }
};


const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
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

const getFoodItemByFoodId = async (req,res) => {
    try {
        const { foodId } = req.params;
        const foodItems = await FoodItem.find({ foodId }).populate('foodId');
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



const updateFoodItem = async (req, res) => {
    try {
        const updateData = {
            foodId: req.body.foodId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            photo: req.body.photo
        };

     
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedFoodItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item updated successfully',
            data: updatedFoodItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating food item',
            error: error.message
        });
    }
};


const deleteFoodItem = async (req, res) => {
    try {
        const deletedFoodItem = await FoodItem.findByIdAndDelete(req.params.id);

        if (!deletedFoodItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item deleted successfully',
            data: deletedFoodItem
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
  
        let foodDoc = await Food.findOne({ name: foodName });
  
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
        await FoodItem.insertMany(itemsToInsert);
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
  

export default {createFoodItem, getAllFoodItems, getFoodItemByFoodId, updateFoodItem, deleteFoodItem, uploadExcel}
