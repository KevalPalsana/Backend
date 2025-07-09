import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String},
    category: { type: String},
    description: { type: String},
    image: { type: String },
    date: { type: Date, default: Date.now },
    readTime: { type: String },
    slug: { type: String},
  },
  { timestamps: true }
);

export default mongoose.model('ChhapiaBlog', blogSchema);
