import mongoose from 'mongoose';

const prePackageFoodItemSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PrePackageFood",
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
    // quantity: {
    //     type: Number,
    //     required: true,
    //     default: 0,
    // },
}, { timestamps: true });

const PrePackageFoodItem = mongoose.model("PrePackageFoodItem", prePackageFoodItemSchema);

export default PrePackageFoodItem;