import { Schema, model } from 'mongoose';

const sliderImageSchema = new Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    date: {
        type: String,
    },
}, {timestamps: true});



export const SliderImage = model("SliderImage", sliderImageSchema);