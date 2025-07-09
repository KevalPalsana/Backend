import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'KKCategory', required: true }
});

const KKSubCategory = model('KKSubCategory', subCategorySchema);

export default KKSubCategory;
