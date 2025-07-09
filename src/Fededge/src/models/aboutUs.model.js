import { Schema, model } from 'mongoose';

const aboutUsSchema = new Schema({
    title: { type: String },
    description: {type: String},
    image1: { type: String },
    image2: { type: String, required: true }, 
    active: { type: Boolean, default: false },
}, { timestamps: true });

export const FededgeAboutUs = model("FededgeAboutUs", aboutUsSchema);
