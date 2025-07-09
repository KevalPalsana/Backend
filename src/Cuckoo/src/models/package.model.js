import mongoose, { Schema } from "mongoose";

const packageSchema = new mongoose.Schema({
    packageName: { type: String, required: true },
    packageType: { type: mongoose.Schema.Types.ObjectId, ref: "PackageCategory"},
    tag: { type: mongoose.Schema.Types.ObjectId, ref: "CuckooTag"},
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country"},
    description: { type: String },
    price: { type: String, required: true },
    image: { type: String },
    duration: { type: String, default: "5 Days & 4 Nights" }, 
    createdAt: { type: Date, default: Date.now }
});

const Package = mongoose.model("Package", packageSchema);
export default Package;
