import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  videoLink: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Gallery", gallerySchema);
