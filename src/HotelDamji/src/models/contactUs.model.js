import { Schema, model } from 'mongoose';

const contactUsSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const ContactUs = model("ContactUs", contactUsSchema);