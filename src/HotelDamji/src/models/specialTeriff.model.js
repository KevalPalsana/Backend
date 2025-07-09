import { Schema, model } from 'mongoose';

const specialTeriffSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId, 
        ref: "HotelProduct"
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    price: {
        type: String,
    },
    extraPerson: {
        type: String,
    },
    perPersonPrice: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const SpecialTeriff = model("SpecialTeriff", specialTeriffSchema);