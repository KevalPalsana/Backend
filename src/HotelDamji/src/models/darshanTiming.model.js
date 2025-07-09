import { Schema, model } from 'mongoose';

const darshanTimingSchema = new Schema({
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



export const DarshanTiming = model("DarshanTiming", darshanTimingSchema);