import mongoose from "mongoose";

const ContentItemSchema = new mongoose.Schema({
  image: { type: String },
  content: { type: String, required: true }
});

const WhyChooseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    items: [ContentItemSchema]
  },
  { timestamps: true }
);

const IconWhyChoose = mongoose.model("IconWhyChoose", WhyChooseSchema);
export default IconWhyChoose;
