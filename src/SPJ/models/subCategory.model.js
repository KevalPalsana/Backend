import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema({
  itemName: { type: String, required: true, unique: true },
  cgstRate: { type: Number, default: 0 },
  sgstRate: { type: Number, default: 0 },
});

const GroupItem = model('GroupItem', subCategorySchema);

export default GroupItem;
  