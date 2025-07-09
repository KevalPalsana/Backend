import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    productName: { type: String },
    hsnCode: { type: Number },
    companyId: {
       type: Schema.Types.ObjectId,
       ref: 'RameshwarInfo',
       required: true,
     },
  },
  { timestamps: true }
);

const RameshwarProduct = model('RameshwarProduct', productSchema);
export default RameshwarProduct;
