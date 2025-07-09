import { Schema, model } from 'mongoose';

const secondSectionSchema = new Schema({
    // titleId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "SecondSectionTitle"
    // },
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



export const SecondSection = model("SecondSection", secondSectionSchema);