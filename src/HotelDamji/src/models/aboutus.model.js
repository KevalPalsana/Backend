import { Schema, model } from 'mongoose';

const aboutUsSchema = new Schema({
    title: {
        type: String,
    },
    subTitle: {
        type: String,
    },
    text: {
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




export const HotelAboutUs = model("HotelAboutUs", aboutUsSchema);