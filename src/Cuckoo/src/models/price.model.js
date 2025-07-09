import { Schema, model } from 'mongoose';

const priceSchema = new Schema(
  {
    hotelId: { type: Schema.Types.ObjectId, ref: "Hotel" },
    fromDate: String,
    toDate: String,
    price: Number,
  },
  { timestamps: true }
);

const HotelPrice = model('HotelPrice', priceSchema);

export default HotelPrice;
