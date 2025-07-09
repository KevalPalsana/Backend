import { Schema, model } from 'mongoose';

const spotliteSchema = new Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    text: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const SpotLite = model("SpotLite", spotliteSchema);