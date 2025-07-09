import { Schema, model } from 'mongoose';

const facilitySchema = new Schema({
    name: {
        type: String,
    },
    icon: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const Facilities = model("Facilities", facilitySchema);