import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  amenities: {
    gym: { type: Boolean, default: false },
    restaurant: { type: Boolean, default: false },
    service24Hours: { type: Boolean, default: false },
  },
  basePrice: { type: Number, required: true },
  taxesAndFees: { type: Number, required: true },
  rating: { type: String },
  ratingText: { type: String },
  ratings: { type: Number },
  images: [String],
});


const BasaltRoom = mongoose.model('BasaltRoom', roomSchema);

export default BasaltRoom;
