import { Schema, model } from 'mongoose';

const handpickedSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: String,
    images: [{ type: String}],
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const BasaltHandpicked = model("BasaltHandpicked", handpickedSchema);