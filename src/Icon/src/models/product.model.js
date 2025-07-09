import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const SubSpecSchema = new Schema({
  subCategory: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const SpecificationBlockSchema = new Schema({
  mainCategory: { type: String, required: true },
  items: [SubSpecSchema],
}, { _id: false });

const IconProductSchema = new Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "IconCategory", required: true },
  industryCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "IconIndustriesCategory" }],
  productUSP: [{ type: mongoose.Schema.Types.ObjectId, ref: "IconProductUSP" }],
  productPacking: [{ type: mongoose.Schema.Types.ObjectId, ref: "IconProductPacking" }],
  mainImage: { type: String },
  mainDescription: { type: String },
  otherImages: [{ image: String, title: String }],
  mainTitle: { type: String },
  specifications: [SpecificationBlockSchema],
  file: {
    name: { type: String },
    fileUrl: { type: String },
    type: { type: String }
  },
  youtubeUrl: { type: String },
  sequence: { type: Number },
  titleTag: { type: String },
  metaKeyword: { type: String },
  metaDescription: { type: String },
}, { timestamps: true });

export default model('IconProduct', IconProductSchema);
