import mongoose from "mongoose";

const { Schema, model } = mongoose;

const roleUserSchema = new Schema(
  {
    role: { type: Schema.Types.ObjectId, ref: "Role"},
    name: { type: String},
    phoneNo: { type: Number},
  },
  { timestamps: true }
);

export default model("RoleUser", roleUserSchema);
