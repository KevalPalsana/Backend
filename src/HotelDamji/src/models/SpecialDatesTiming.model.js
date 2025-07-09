import { Schema, model } from 'mongoose';

const specialDatesTimingSchema = new Schema({
    specialDate: {
        type: String,
    },
    title: {
        type: String,
    },
    timing: {
        type: String,
    },
    activity: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const SpecialDatesTiming = model("SpecialDatesTiming", specialDatesTimingSchema);