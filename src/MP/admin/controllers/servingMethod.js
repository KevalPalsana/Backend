
import ServingCategory from '../models/servingCategory.js';
import ServingMethod from '../models/servingMethod.js';
import xlsx from 'xlsx';
 import fs from 'fs';


export const createServingMethod = async (req, res) => {
    try {
        const { categoryId, name, price, description, quantity, photo } = req.body;

        const newServingMethod = new ServingMethod({
            categoryId,
            name,
            photo,
            price,
            description,
            quantity
        });

        const savedServingMethod = await newServingMethod.save();

        res.status(201).json({
            status: "success",
            message: 'Serving category created successfully',
            data: savedServingMethod
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating serving category',
            error: error.message
        });
    }
};


 export const getAllServingMethods = async (req, res) => {
    try {
        const servingMethods = await ServingMethod.find();
        res.status(200).json({
            status: "success",
            message: 'Food items retrieved successfully',
            data: servingMethods
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving food items',
            error: error.message
        });
    }
};


export const getServingMethodByCategoryId = async (req,res) => {
    try {
        const { categoryId } = req.params;
        const servingMethod = await ServingMethod.find({ categoryId }).populate('categoryId');
        if (!servingMethod) {
            return res.status(404).json({ message: 'Serving Method not found' });
        }
        res.json({
            status: "success",
            data:
            servingMethod});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const updateServingMethod = async (req, res) => {
    try {
        const updateData = {
            categoryId: req.body.categoryId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            photo: req.body.photo
        };

        const updatedServingMethod = await ServingMethod.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedServingMethod) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            status: "success",
            message: 'Food item updated successfully',
            data: updatedServingMethod
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating food item',
            error: error.message
        });
    }
};


export const deleteServingMethod = async (req, res) => {
    try {
        const deletedServingMethod = await ServingMethod.findByIdAndDelete(req.params.id);

        if (!deletedServingMethod) {
            return res.status(404).json({
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            status: "success",
            message: 'Food item deleted successfully',
            data: deletedServingMethod
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting food item',
            error: error.message
        });
    }
};

export const uploadExcel = async (req, res) => {
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
  
        let foodDoc = await ServingCategory.findOne({ name: foodName });
  
        if (!foodDoc) {
          rowsSkipped++;
          continue;
        }
  
        itemsToInsert.push({
          categoryId: foodDoc._id,
          name,
          price,
          description: description || '',
        });
        rowsProcessed++;
      }
  
      if (itemsToInsert.length > 0) {
        await ServingMethod.insertMany(itemsToInsert);
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

// export default {createServingMethod, getAllServingMethods, getServingMethodByCategoryId, updateServingMethod, deleteServingMethod}
