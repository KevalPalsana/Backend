import { Schema, model } from 'mongoose';

const amenitiesOptionSchema = new Schema({
    name: {
        type: String,
    },
    amenitiesId: {
        type: Schema.Types.ObjectId,
        ref: "AmenitiesSubCategory",
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});


export const AmenitiesOption = model("AmenitiesOption", amenitiesOptionSchema);