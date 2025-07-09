import { Schema, model } from "mongoose";


const testimonialSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    rating: { type: Number},
    image: { type: String },
});

const CuckooTestimonial = model("CuckooTestimonial", testimonialSchema);
export default CuckooTestimonial;
