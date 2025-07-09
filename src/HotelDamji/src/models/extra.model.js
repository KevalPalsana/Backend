import { Schema, model } from 'mongoose';

const extraSchema = new Schema({
    gst: {
        type: String,
    },
    breakfast: {
        type: String,
    },
    lunch: {
        type: String,
    },
    dinner: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const ExtraCharge = model("ExtraCharge", extraSchema);