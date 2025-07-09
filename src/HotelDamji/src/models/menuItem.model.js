import { Schema, model } from 'mongoose';

const menuItemSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "HotelMenuCategory",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const HotelMenuItem = model("HotelMenuItem", menuItemSchema);

export default HotelMenuItem;