import { Schema, model } from 'mongoose';

const calculationSchema = new Schema({
    name: {
        type: String,
    },
    countingNumber: {
        type: Number,
    },
    icon: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const CalculativeSection = model("CalculativeSection", calculationSchema);