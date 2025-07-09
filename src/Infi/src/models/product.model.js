import { Schema, model } from 'mongoose';
import paginate from './plugins/paginate.plugin.js';

const productSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    productImgUrl: { type: [String], default: [] },
  },
  { timestamps: true }
);

productSchema.plugin(paginate);

const InfiProduct = model('InfiProduct', productSchema);

export default InfiProduct;
