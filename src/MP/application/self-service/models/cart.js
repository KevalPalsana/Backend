import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'AdminUser', 
    },
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'FoodItem',
                required: true,
            },
            quantity: {
                type: String,
                required: true,
                default: 1,
            },
        },
    ],
}, { timestamps: true });

const SelfServiceCart = mongoose.model('SelfServiceCart', cartSchema);

export default SelfServiceCart;
