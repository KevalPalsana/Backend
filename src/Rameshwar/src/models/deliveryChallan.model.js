import mongoose from "mongoose";

const challanSchema = new mongoose.Schema(
  {
    challanNo: { type: String, required: true, unique: true },
    m_s: { type: String, required: true }, 
    shipTo: { type: String, required: true },
    date: { type: Date, default: Date.now },
    truckNo: { type: String, required: true },

    item: { type: String, required: true }, 
    poleQty: { type: Number, required: true },

    poleDetails: [
      {
        date: { type: Date},
        number: { type: Number},
      },
    ],

    receivedBy: { type: String },
    preparedBy: { type: String },
  },
  { timestamps: true }
);

challanSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastChallan = await mongoose
      .model("DeliveryChallan")
      .findOne({})
      .sort({ challanNo: -1 })
      .select("challanNo");

    this.challanNo = lastChallan ? lastChallan.challanNo + 1 : 1;
  }
  next();
});

const DeliveryChallan = mongoose.model("DeliveryChallan", challanSchema);
export default DeliveryChallan;
