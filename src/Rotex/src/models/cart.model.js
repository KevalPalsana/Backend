import mongoose, { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'RotexUser', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'RotexProduct', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        selectedColor: { type: String },
        selectedColorImage: { type: String },
      },
    ],
    totalPrice: { type: Number, default: 0 },
    status: { type: String, enum: ['complete', 'incomplete'], default: 'incomplete' },
  },
  { timestamps: true }
);

const RotexCart = model('RotexCart', cartSchema);

export default RotexCart;
