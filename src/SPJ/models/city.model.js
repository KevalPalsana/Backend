import mongoose from "mongoose";

const { Schema, model } = mongoose;

const citySchema = new Schema(
  {
    stateId: { type: Schema.Types.ObjectId, ref: "State", required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("City", citySchema);
