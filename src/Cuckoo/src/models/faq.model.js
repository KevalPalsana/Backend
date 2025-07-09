import { Schema, model } from "mongoose";


const faqSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    image: { type: String },
});

const CuckooFAQ = model("CuckooFAQ", faqSchema);
export default CuckooFAQ;
