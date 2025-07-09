import mongoose from 'mongoose';

const servingMethodSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    quantity: {
        type: String,
    },
}, { timestamps: true });

const ServingMethod = mongoose.model("ServingMethod", servingMethodSchema);

export default ServingMethod;