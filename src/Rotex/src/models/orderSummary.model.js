import mongoose from "mongoose";

const orderSummarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    customerDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      companyName: { type: String },
      country: { type: String, required: true },
      streetAddress: { type: String, required: true },
      state: { type: String},
      pinCode: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    orderItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "RotexProduct", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        selectedColor: { type: String },
        selectedColorImage: { type: String },
      },
    ],
    totalPrice: { type: Number, required: true },

    gst: {
      type: String,
      required: true,
      default: 0,
    },

    finalAmount: {
      type: String,
      required: true,
      default: 0,
    },

    orderStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    courierName: { type: String },
    courierNumber: { type: String },

    paymentMethod: {
      type: String,
      enum: ['credit_card', 'COD', 'razorpay'],
      default: 'COD',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    shippingStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShippingStatus',
    },
  },
  { timestamps: true }
);

orderSummarySchema.pre('save', async function (next) {
  if (!this.shippingStatus) {
    const ShippingStatus = mongoose.model('ShippingStatus');
    const defaultStatus = await ShippingStatus.findOne({ status: 'NotShipped' });

    if (!defaultStatus) {
      return next(new Error('Default "Not Shipped" shipping status not found.'));
    }

    this.shippingStatus = defaultStatus._id;
  }
  next();
});


const RotexOrderSummary = mongoose.model('RotexOrderSummary', orderSummarySchema);

export default RotexOrderSummary;
