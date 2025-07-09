import mongoose, { Schema, model } from 'mongoose';
import orderStatus from '../config/orderStatus.js';

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'COD', 'razorpay'],
      default: 'COD',
    },
    orderItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: String,
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: String, required: true },
    gst: { type: String},
    finalAmount: { type: String},
    status: {
      type: String,
      enum: orderStatus,
      default: 'created',
    },
    paymentStatus: {  
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    
  },
  { timestamps: true }
);

const RotexOrder = model('RotexOrder', orderSchema);

export default RotexOrder;
