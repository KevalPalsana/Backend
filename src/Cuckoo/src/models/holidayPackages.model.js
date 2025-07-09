import { Schema, model } from "mongoose";

const packageSchema = new Schema({
  packageId: { type: Schema.Types.ObjectId, ref: "Package", required: true },
  name: { type: String },
  coverImage: { type: String },
  images: [
    {
      name: { type: String },
      image: { type: String },
    },
  ],
  duration: { type: String },
  days: { type: Number },
  location: { type: String },
  included: [{ type: Schema.Types.ObjectId, ref: "Included" }],
  highlights: { type: String },
  intinerary: [
    {
      day: { type: String, required: true },
      title: { type: String, required: true },
      photos: { type: [String], default: [] },
      details: { type: String, required: true },
      transfer: { type: String },
      from: { type: String },
      to: { type: String },
      checkIn: { type: String },
      checkOut: { type: String },
      duration: { type: String },
    },
  ],
  tripDetails: [
    {
      date: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      sightseeing: { type: [String], default: [] },
      stay: { type: String },
      meals: { type: [String], enum: ["Breakfast", "Lunch", "Dinner"], default: [] },
    },
  ],
  price: { type: Number },
  inquiry: { type: Schema.Types.ObjectId, ref: "InquiryForm" },
  inclusion: [{ type: String }],
  exclusion: [{ type: String }],
  information: [{ type: String }], 
  additionalInformation: [{ type: String }],
  reviews: [
    {
      name: { type: String, required: true },
      photo: { type: String },
      title: { type: String },
      date: { type: Date, default: Date.now },
      description: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
      images: { type: [String], default: [] },
    },
  ],
  confirmationPolicy: { type: [String] },
  refundPolicy: { type: [String] },
  cancellationPolicy: { type: [String] },
  paymentPolicy: { type: [String] },
  banner: { type: Schema.Types.ObjectId, ref: "CuckooBanner" },
  rating: { type: Number },
  discountPrice: { type: String },
  price: { type: String },
});

const HolidayPackage = model("HolidayPackage", packageSchema);

export default HolidayPackage;
