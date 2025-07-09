import { Schema, model } from "mongoose";


const expertSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    role: { type: String},
    image: { type: String },
});

const CuckooVisaExpert = model("CuckooVisaExpert", expertSchema);
export default CuckooVisaExpert;
