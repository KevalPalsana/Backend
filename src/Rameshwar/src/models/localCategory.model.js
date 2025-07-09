import mongoose from "mongoose";

const localCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  availableStock: { type: Number, default: 0 },
});

const LocalCategory = mongoose.model('LocalCategory', localCategorySchema);

export default LocalCategory;