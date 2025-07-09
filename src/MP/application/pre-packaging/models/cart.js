import mongoose from 'mongoose';

const prePackagingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'AdminUser', 
    },
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PrePackageFoodItem',
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

const PrePackagingCart = mongoose.model('PrePackagingCart', prePackagingSchema);

export default PrePackagingCart;
