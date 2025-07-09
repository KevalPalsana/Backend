import { Schema, model } from 'mongoose';

const HotelSchema = new Schema(
  {
    name: String,
    location: String,
    basePrice: Number, 
  },
  { timestamps: true }
);

const Hotel = model('Hotel', HotelSchema);

export default Hotel;
