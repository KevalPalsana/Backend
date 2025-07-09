import { Schema, model } from "mongoose";
import paginate from "./plugins/paginate.plugin.js";

const productSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "RotexCategory" },
    title: { type: String, required: true, unique: true },
    subTitle: { type: String, required: true },
    description: [{ type: String, default: "" }],
    price: { type: Number, required: false },
    maxPrice: { type: Number, required: false },
    productImages: [
      {
        color: { type: String, required: true },
        images: { type: [String], default: [] }, 
        price: { type: Number, required: true },
      },
    ],
    application: { type: [String], required: true },
    warrantyNumbers: { type: [String], default: [] },
    specifications: [
      {
        sweep: { type: String, required: true },
        noOfBlades: { type: String, required: true },
        power: { type: String, required: true },
        inputVoltage: { type: String, required: true },
        rpm: { type: String, required: true },
        airDelivery: { type: String, required: true },
        powerFactor: { type: String, required: true },
        serviceValue: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

productSchema.plugin(paginate);

const RotexProduct = model("RotexProduct", productSchema);
export default RotexProduct;
