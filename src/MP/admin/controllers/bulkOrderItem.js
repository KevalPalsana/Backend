import BulkOrderCategory from '../models/bulkOrderCategory.js';
import BulkOrderItem from '../models/bulkOrderItems.js';
import xlsx from 'xlsx';
import fs from 'fs';


const createBulkOrderItem = async (req, res) => {
    try {
       
        const { foodId, name, price, description, photo } = req.body;
        

        const newBulkOrderItem = new BulkOrderItem({
            foodId,
            name,
            photo,
            price,
            description,
        });

        const savedBulkOrderItem = await newBulkOrderItem.save();

        res.status(201).json({
            status: "success",
            message: 'Food item created successfully',
            data: savedBulkOrderItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating food item',
            error: error.message
        });
    }
};


const getAllBulkOrderItem = async (req, res) => {
    try {
        const BulkOrderItems = await BulkOrderItem.find();
        res.status(200).json({
            status: "success",
            message: 'Food items retrieved successfully',
            data: BulkOrderItems
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving food items',
            error: error.message
        });
    }
};

const getbulkOrderItemsByFoodId = async (req,res) => {
    try {
        const { foodId } = req.params;
        const bulkOrderItem = await BulkOrderItem.find({ foodId }).populate('foodId');
        if (!bulkOrderItem) {
            return res.status(404).json({ message: 'Food items not found' });
        }
        res.json({
            status: "success",
            data:
            bulkOrderItem});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



const updateBulkOrderItem = async (req, res) => {
    try {
        const updateData = {
            foodId: req.body.foodId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            photo: req.body.photo,
        };

        const updatedBulkOrderItem = await BulkOrderItem.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedBulkOrderItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item updated successfully',
            data: updatedBulkOrderItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating food item',
            error: error.message
        });
    }
};


const deleteBulkOrderItem = async (req, res) => {
    try {
        const deleteBulkOrderItem = await BulkOrderItem.findByIdAndDelete(req.params.id);

        if (!deleteBulkOrderItem) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            message: 'Food item deleted successfully',
            data: deleteBulkOrderItem
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
  
        let foodDoc = await BulkOrderCategory.findOne({ name: foodName });
  
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
        await BulkOrderItem.insertMany(itemsToInsert);
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

export default {createBulkOrderItem, getAllBulkOrderItem, getbulkOrderItemsByFoodId, updateBulkOrderItem, deleteBulkOrderItem, uploadExcel}
