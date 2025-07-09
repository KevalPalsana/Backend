import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    subDescription: {
        type: String,
    },
    city: {
        type: String,
    },
    rating: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const InfiReview = model("InfiReview", reviewSchema);