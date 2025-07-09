import mongoose from "mongoose";

const brokenPollSchema = new mongoose.Schema({
  // pollId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Poll",
  //   required: true,
  // },
  manufacturingDate: { type: Date, required: true },
  todayDate: { type: Date, required: true, default: Date.now },
  companyName: { type: mongoose.Schema.Types.ObjectId, ref: "RameshwarCustomer"},
  product: { type: String, required: true },
  poNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PONumber",
    required: true,
  },
  totalPoll: { type: String, required: true },
  brokenPollNumbers: [{ type: String, required: true }],
  brokenCount: { type: Number, required: true }
}, {
  timestamps: true
});

const PGVCLBrokenPoll = mongoose.model("PGVCLBrokenPoll", brokenPollSchema);
export default PGVCLBrokenPoll;
