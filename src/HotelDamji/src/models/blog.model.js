import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    title: {
        type: String,
    },
    subblogs: {
        type: String
    }
}, { timestamps: true });



export const HotelBlog = model("HotelBlog", blogSchema);