import { Schema, model } from 'mongoose';

const secondSectionTitleSchema = new Schema({
    title: {
        type: String,
    },
}, {timestamps: true});



export const SecondSectionTitle = model("SecondSectionTitle", secondSectionTitleSchema);