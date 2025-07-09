import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import roles from "../config/roles.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true, 
      trim: true,
      lowercase: true,
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    referralCode: {
      type: String,
    },
    referPrice: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next(); 
  }

  this.password = await bcrypt.hash(this.password, 10); 
  next();
});


userSchema.methods.isPasswordMatch = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export const HotelUser = mongoose.model("HotelUser", userSchema);
