import { Schema, model, Types } from 'mongoose';

const galleryImageSchema = new Schema({
    title: {
        type: String, 
    },
    categoryid:
    {
        type: Types.ObjectId,
        ref:"GalleryCategory"
    },
    galleryImages: {
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



export const GalleryImages = model("GalleryImages", galleryImageSchema);