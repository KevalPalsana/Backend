import { Schema, model } from 'mongoose';
import paginate from './plugins/paginate.plugin.js';

const productSchema = new Schema(
  {
    subCategoryId: { type: Schema.Types.ObjectId, ref: 'KKSubCategory' },
    name: { type: String},
  },
  { timestamps: true }
);

productSchema.plugin(paginate);

const KKProduct = model('KKProduct', productSchema);

export default KKProduct;
