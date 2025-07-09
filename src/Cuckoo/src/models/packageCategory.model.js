import { Schema, model } from 'mongoose';

const packageCategorySchema = new Schema({
  packageName: { type: String, required: true, unique: true },
});

const PackageCategory = model('PackageCategory', packageCategorySchema);

export default PackageCategory;
