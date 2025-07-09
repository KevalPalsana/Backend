import { Schema, model } from 'mongoose';

const amenitiesSubCategorySchema = new Schema({
    name: {
        type: String,
    },
    amenitiesId: {
        type: Schema.Types.ObjectId,
        ref: "Amenities",
    },
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});


export const AmenitiesSubCategory = model("AmenitiesSubCategory", amenitiesSubCategorySchema);