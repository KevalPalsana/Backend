import { Schema, model } from "mongoose";


const blogDetailsSchema = new Schema({
    blog: { type: Schema.Types.ObjectId, ref: "CuckooBlog", required: true },
    description: { type: String },
    image: { type: String },
});

const CuckooBlogDetails = model("CuckooBlogDetails", blogDetailsSchema);
export default CuckooBlogDetails;
