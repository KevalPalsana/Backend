import mongoose from "mongoose";
import RameshwarCategory from "./category.model.js";

const pollSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  companyName: { type: mongoose.Schema.Types.ObjectId, ref: "RameshwarCustomer", required: true },
  poNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PONumber",
    required: true,
  },
  product: { type: String, required: true },
  totalPoles: { type: Number, required: true },
  startNumber: { type: String, required: true },
  lastNumber: { type: String, required: true},

  usedMaterials: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RameshwarCategory",
        required: true,
      },
      quantity: { type: Number, required: true }, // this will always store final "used quantity"
    },
  ],
});

pollSchema.pre("save", async function (next) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    for (let material of this.usedMaterials) {
      const category = await RameshwarCategory.findById(material.category);
      if (!category) {
        return next(new Error(`Category not found: ${material.category}`));
      }

      let usedQty;

      // For CEMENT, quantity is directly today's usage
      if (category.name.toLowerCase() === "cement") {
        usedQty = material.quantity;
      } else {
        // For others, quantity is remaining stock entered today
        const todayRemaining = material.quantity;

        const yesterdaysPoll = await mongoose.model("Poll").findOne({
          "usedMaterials.category": material.category,
          date: { $gte: yesterday, $lt: today },
        }).sort({ date: -1 });

        const yesterdaysEntry = yesterdaysPoll?.usedMaterials?.find(
          (item) => item.category.toString() === material.category.toString()
        );

        const yesterdaysRemaining = yesterdaysEntry?.quantity ?? category.stock;

        usedQty = yesterdaysRemaining - todayRemaining;

        if (usedQty < 0) usedQty = 0; // prevent negative use
        material.quantity = usedQty; // overwrite with calculated used quantity
      }

      if (category.stock < usedQty) {
        return next(
          new Error(
            `Insufficient stock for ${category.name}. Available: ${category.stock}, Required: ${usedQty}`
          )
        );
      }

      category.stock -= usedQty;
      await category.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

const PGVCLPoll = mongoose.model("PGVCLPoll", pollSchema);
export default PGVCLPoll;
