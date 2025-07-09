import { Schema, model } from 'mongoose';
import paginate from './plugins/paginate.plugin.js';

const productSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String, required: true},
    name: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

productSchema.plugin(paginate);

const VinayakProduct = model('VinayakProduct', productSchema);

export default VinayakProduct;
