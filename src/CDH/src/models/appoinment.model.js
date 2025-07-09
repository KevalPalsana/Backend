import mongoose from "mongoose";

const consultationBookingSchema = new mongoose.Schema({
  treatment: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Treatment'
    }
  ],
  timeSlot: { type: String, enum: ["morning", "afternoon", "evening"] },
  name: { type: String, required: true },
  countryCode: { type: String},
  phone: { type: String, required: true },
  email: { type: String },
  userCity: { type: String },
  city: { type: String },
  hasReports: { type: String }, 
}, { timestamps: true });

export const CDHAppoinment = mongoose.model("CDHAppoinment", consultationBookingSchema);
