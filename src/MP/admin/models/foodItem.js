import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
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

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

export default FoodItem;