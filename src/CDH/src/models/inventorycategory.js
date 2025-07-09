import mongoose from 'mongoose';

const inventoryCategorySchema = new mongoose.Schema({
  inventoryCategory: 
  {
    type: String,
    required: true,
  },
  notes: 
  {
    type: String,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
  },
},{timestamps:true});

export default mongoose.model('InventoryCategory', inventoryCategorySchema);
