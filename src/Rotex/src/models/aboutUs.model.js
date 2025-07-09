import { Schema, model } from 'mongoose';

const aboutUsSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const RotexAboutUs = model("RotexAboutUs", aboutUsSchema);