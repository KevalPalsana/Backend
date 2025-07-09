import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const IconBlog = model("IconBlog", blogSchema);