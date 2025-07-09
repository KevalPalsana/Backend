import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    planTime: {
      type: String,
      required: true,
    },
    mainAmount: {
      type: Number,
      required: true,
    },
    perMonthAmount: {
      type: Number,
      required: true,
    },
    descriptions: {
      type: [String], // Array of bullet-point descriptions
      required: true,
      validate: v => Array.isArray(v) && v.length > 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
