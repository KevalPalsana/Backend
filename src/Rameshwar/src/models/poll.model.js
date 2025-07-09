import mongoose from "mongoose";
import RameshwarCategory from "./category.model.js";
import LocalCategory from "./localCategory.model.js"; // ✅ Reusing your existing local category model

function generatePollNumberSeries(start, end) {
  const prefixMatch = start.match(/^[A-Za-z\-]+/);
  const prefix = prefixMatch ? prefixMatch[0] : "";
  const startNum = parseInt(start.replace(prefix, ""));
  const endNum = parseInt(end.replace(prefix, ""));
  if (isNaN(startNum) || isNaN(endNum)) return [];
  const series = [];
  for (let i = startNum; i <= endNum; i++) {
    series.push(`${prefix}${i}`);
  }
  return series;
}


const pollSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  companyName: { type: mongoose.Schema.Types.ObjectId, ref: "RameshwarCustomer"},
  poNumber: { type: mongoose.Schema.Types.ObjectId, ref: "PONumber"},
  infoId: { type: mongoose.Schema.Types.ObjectId, ref: "RameshwarInfo" },
  product: { type: String, required: true },
  totalPoles: { type: Number, required: true },
  startNumber: { type: String, required: true },
  lastNumber: { type: String, required: true },
  pollNumbers: [{ type: String }],
  againstPollQuantity: { type: Number, default: 0 },

  usedMaterials: [ // for RameshwarCategory logic
    {
      category: { type: mongoose.Schema.Types.ObjectId, ref: "RameshwarCategory", required: true },
      quantity: { type: Number, required: true },
    },
  ],

  materials: [ // for LocalCategory (another category)
    {
      materialName: { type: String },
      usedMaterial: { type: Number },
    },
  ],
});

pollSchema.pre("save", async function (next) {
  try {
    if (this.startNumber && this.lastNumber) {
      this.pollNumbers = generatePollNumberSeries(this.startNumber, this.lastNumber);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // ✅ Step 1: RameshwarCategory stock deduction
    for (let material of this.usedMaterials) {
      const category = await RameshwarCategory.findById(material.category);
      if (!category) return next(new Error(`Category not found: ${material.category}`));

      let usedQty;
      if (category.name.toLowerCase() === "cement") {
        usedQty = material.quantity;
      } else {
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
        if (usedQty < 0) usedQty = 0;
        material.quantity = usedQty;
      }

      if (category.stock < usedQty) {
        return next(new Error(`Insufficient stock for ${category.name}. Available: ${category.stock}, Required: ${usedQty}`));
      }

      category.stock -= usedQty;
      await category.save();
    }

    // ✅ Step 2: Handle LocalCategory
    for (const mat of this.materials || []) {
      const name = mat.materialName?.trim();
      const used = Number(mat.usedMaterial);
      if (!name || used <= 0) continue;

      const normalized = name.toUpperCase();

      let local = await LocalCategory.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
      });

      if (local) {
        local.availableStock += used;
        await local.save();
      } else {
        await LocalCategory.create({
          name: normalized,
          availableStock: used,
        });
      }
    }

    next();
  } catch (err) {
    console.error("Error in poll save middleware:", err);
    next(err);
  }
});

export default mongoose.model("Poll", pollSchema);
