import { Schema, model } from 'mongoose';

const aboutUsSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const InfiAboutUs = model("InfiAboutUs", aboutUsSchema);
