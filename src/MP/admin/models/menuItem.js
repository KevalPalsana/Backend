import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuCategory",
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
    // quantity: {
    //     type: Number,
    //     required: true,
    //     default: 0,
    // },
}, { timestamps: true });

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;