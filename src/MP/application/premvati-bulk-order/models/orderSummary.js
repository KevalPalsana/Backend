import mongoose from 'mongoose';
import  Cart from './cart.js';

const bulkOrderSummarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PremvatiUser', 
        required: true,
    },
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BulkOrderItem',  
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
    totalAmount: {
        type: Number,  
        required: true
    },
}, { timestamps: true });

// bulkOrderSummarySchema.virtual('totalFoodItemsPrice').get(function() {
//     return this.items.reduce((acc, item) => acc + item.totalPrice, 0);
// });

const BulkOrderSummary = mongoose.model('BulkOrderSummary', bulkOrderSummarySchema);

export default BulkOrderSummary;
