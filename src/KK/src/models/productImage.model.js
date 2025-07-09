import { Schema, model } from 'mongoose';

const productImageSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'KKProduct'},
    file: { type: String},
  },
  { timestamps: true }
);

const ProductImage = model('ProductImage', productImageSchema);

export default ProductImage;
