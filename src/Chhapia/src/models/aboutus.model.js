import mongoose from 'mongoose';


const aboutusSchema = new mongoose.Schema(
  {
   title: { type: String},
   description: { type: String},
   image: { type: String},
  },
  { timestamps: true }
);

export default mongoose.model('ChhapiaAboutUs', aboutusSchema);
