import mongoose from "mongoose";

// Section schema: Each blog detail section
const sectionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  // Optional heading field if needed in the future
  heading: {
    type: String,
  },
});

// Blog Detail schema: Linked to a main blog (e.g., RotexBlog)
const blogDetailSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IconBlog ",
      required: true,
    },
    image: {
      type: String, // URL or path to image
    },
    sections: {
      type: [sectionSchema],
      required: true,
      validate: [arrayLimit, "A blog must have at least one section."],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Validator to ensure there's at least one section
function arrayLimit(val) {
  return val.length > 0;
}

const IconBlogDetail = mongoose.model("IconBlogDetail", blogDetailSchema);

export default IconBlogDetail;
