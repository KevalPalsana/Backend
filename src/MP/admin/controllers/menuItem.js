import MenuCategory from '../models/MenuCategory.js';
import MenuItem from '../models/menuItem.js';
import xlsx from 'xlsx';
import fs from 'fs';


const createItem = async (req, res) => {
    try {
       
        const { foodId, name, price} = req.body;
        

        const newItem = new MenuItem({
            foodId,
            name,
            price,
        });

        const saveItem = await newItem.save();

        res.status(201).json({
            status: "success",
            message: 'Food item created successfully',
            data: saveItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating food item',
            error: error.message
        });
    }
};


const getAllItems = async (req, res) => {
    try {
        const foodItems = await MenuItem.find();
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

const getItemById = async (req,res) => {
    try {
        const { foodId } = req.params;
        const foodItems = await MenuItem.find({ foodId }).populate('foodId');
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



const updateItem = async (req, res) => {
    try {
        const updateData = {
            foodId: req.body.foodId,
            name: req.body.name,
            price: req.body.price,
        };

        const updateItem = await MenuItem.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updateItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item updated successfully',
            data: updateItem
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
        const deleteItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (!deleteItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item deleted successfully',
            data: deleteItem
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
        const { foodName, name, price} = row;
  
        if (!foodName || !name || !price) {
          rowsSkipped++;
          continue;
        }
  
        let foodDoc = await MenuCategory.findOne({ name: foodName });
  
        if (!foodDoc) {
          rowsSkipped++;
          continue;
        }
  
        itemsToInsert.push({
          foodId: foodDoc._id,
          name,
          price,
        });
        rowsProcessed++;
      }
  
      if (itemsToInsert.length > 0) {
        await MenuItem.insertMany(itemsToInsert);
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

export default {createItem, getItemById, getAllItems, updateItem, deleteFoodItem, uploadExcel}
