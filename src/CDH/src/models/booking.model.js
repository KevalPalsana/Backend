import mongoose, { Schema } from "mongoose";


const bookingSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "CDHUser",
        required: true,
    },
    date: {
      type: String,
      required: true,
    },
    timeZone: {
      type: String,
      required: true,
    },
    time: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true, 
  }
);

export const CDHBooking = mongoose.model("CDHBooking", bookingSchema);
