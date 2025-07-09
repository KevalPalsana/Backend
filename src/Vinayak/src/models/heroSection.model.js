import { Schema, model } from 'mongoose';

const heroSchema = new Schema({
    image: {
            type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const VinayakHeroSection = model("VinayakHeroSection", heroSchema);
