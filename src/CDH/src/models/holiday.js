import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Holiday", holidaySchema);
