import { Schema, model } from 'mongoose';

const CouponSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
},
couponCode: {
    type: String,
},
  amountType: {
    type: String,
    enum: ['flat', 'percentage'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: false,
    default: "",
  },
  image: {
    type: String,
  },
});

const Coupon = model('Coupon', CouponSchema);

export default Coupon;

