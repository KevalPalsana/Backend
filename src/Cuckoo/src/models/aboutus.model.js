import { Schema, model } from "mongoose";


const aboutUsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String},
    image: { type: String },
});

const CuckooAboutUs = model("CuckooAboutUs", aboutUsSchema);
export default CuckooAboutUs;
