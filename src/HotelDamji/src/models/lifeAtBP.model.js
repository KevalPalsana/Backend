import { Schema, model } from 'mongoose';

const lifeAtBPSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    images: [{
        type: String,
    }],
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const LifeAtBP = model("LifeAtBP", lifeAtBPSchema);