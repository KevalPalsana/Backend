import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      trim: true,
      sparse: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const CDHUser = mongoose.model("CDHUser", userSchema);
