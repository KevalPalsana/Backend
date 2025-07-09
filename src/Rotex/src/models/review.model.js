import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
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



const RotexReview = model("RotexReview", reviewSchema);

export default RotexReview;