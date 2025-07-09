import mongoose from 'mongoose';
import Cart from './cart.js';

const orderSummarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser', 
        required: true,
    },
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'FoodItem',  
                required: true,
            },
            quantity: {
                type: Number,  
                required: true,
                default: 1,
            },
            totalPrice: {
                type: Number,  
                required: true,
            }
        }
    ],
    servingMethodId: [
        {
            servingMethod: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ServingMethod',
                required: true
            },
            quantity: {
                type: Number,  
                required: true,
                default: 1
            },
            totalPrice: {
                type: Number,  
                required: true,
            }
        }
    ],
    totalAmount: {
        type: Number,  
        required: true
    },
}, { timestamps: true });

orderSummarySchema.virtual('totalFoodItemsPrice').get(function() {
    return this.items.reduce((acc, item) => acc + item.totalPrice, 0);
});

orderSummarySchema.virtual('totalServingMethodPrice').get(function() {
    return this.servingMethodId.reduce((acc, method) => acc + method.totalPrice, 0);
});

const SelfServiceOrderSummary = mongoose.model('SelfServiceOrderSummary', orderSummarySchema);

export default SelfServiceOrderSummary;
