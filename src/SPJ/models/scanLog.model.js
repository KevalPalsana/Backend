import mongoose from "mongoose";

const scanLogSchema = new mongoose.Schema(
  {
    barcode: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "SPJProduct", required: true },
    scannedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ScanLog = mongoose.model("ScanLog", scanLogSchema);
export default ScanLog;
