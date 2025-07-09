import { Schema, model } from 'mongoose';

const amenitiesSchema = new Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const Amenities = model("Amenities", amenitiesSchema);