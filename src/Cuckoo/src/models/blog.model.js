import { Schema, model } from "mongoose";


const blogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String},
    image: { type: String },
});

const CuckooBlog = model("CuckooBlog", blogSchema);
export default CuckooBlog;
