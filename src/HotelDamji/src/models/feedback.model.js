import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    rating: {
        type: String,
    },
    position: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const Feedback = model("Feedback", feedbackSchema);