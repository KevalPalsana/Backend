import { Schema, model } from 'mongoose';

const aboutUsSchema = new Schema({
    // title: {
    //     type: String,
    // },
    headDescription: {
        type: String,
    },
    image: {
            type: String,
    },
    sections: [
        {
            subTitle: { type: String },
            description: { type: String },
        }
    ],
    active: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const VinayakAboutUs = model("VinayakAboutUs", aboutUsSchema);
