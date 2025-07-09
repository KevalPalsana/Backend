import mongoose, { Schema } from "mongoose";


const adminSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      sparse: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const CDHAdmin = mongoose.model("CDHAdmin", adminSchema);
