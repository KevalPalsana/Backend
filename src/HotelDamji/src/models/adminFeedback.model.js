import { Schema, model } from 'mongoose';

const adminFeedbackSchema = new Schema({
    name: {
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



export const AdminFeedback = model("AdminFeedback", adminFeedbackSchema);