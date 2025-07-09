import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  dose: { type: String, required: true },
  unit: { type: String, required: true },
});

const timingSchema = new mongoose.Schema({
  morning: { type: Boolean, default: false },
  afternoon: { type: Boolean, default: false },
  evening: { type: Boolean, default: false },
  dinner: { type: Boolean, default: false },
});

const reminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HYGOUser",
      required: true,
    },

    prescriptionUrl: {
      type: String,
    },

    medicines: {
      type: [medicineSchema],
      required: true,
    },

    timings: timingSchema,

    duration: {
      number: { type: Number, required: true },
      unit: {
        type: String,
        enum: ["Days", "Weeks", "Months"],
        required: true,
      },
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    notes: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// const HYGOReminder = mongoose.model("HYGOReminder", reminderSchema);
export default reminderSchema;
