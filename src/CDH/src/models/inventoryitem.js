import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  inventoryItem:
  {
    type: String,
    required: true
  },
  inventoryItemCategory:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InventoryCategory',
    required: true
  },
  preferredBrands:
  {
    type: [String],
  },
  hsnCode:
  {
    type: String,
  },
  taxRate:
  {
    type: Number,
    default: 0.0
  },
  unitOfMeasureCode:
  {
    type: String,
  },
  unitOfMeasureDescription:
  {
    type: String,
  },
  notes:
  {
    type: String,
  },
  active :{
    type: Boolean,
    default: true,
  },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
  },
},{timestamps:true});

export default mongoose.model('InventoryItem', inventoryItemSchema);
