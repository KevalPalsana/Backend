import { Schema, model } from "mongoose";

const POSchema = new Schema({
  poNumber: { type: String },
  companyId: { type: Schema.Types.ObjectId, ref: "RameshwarCustomer" },
  assignId: { type: Schema.Types.ObjectId, ref: "RameshwarInfo" },
  productId: { type: Schema.Types.ObjectId, ref: "RameshwarProduct" },
  totalQuantity: { type: Number },
  minimumQuantity: { type: Number },
  from: { type: String },
  to: { type: String },
  pollNumbers: [{ type: String }],
  price: { type: Number },
  file: { type: String },
  mark: { type: String },
  document: [{ type: String }],

  isTransferPoll: { type: Boolean, default: false },
  transferPollNumbers: [{ type: String }],
  transferCompanyId: { type: Schema.Types.ObjectId, ref: "RameshwarCustomer" },

}, { timestamps: true });


const PONumber = model("PONumber", POSchema);
export default PONumber;
