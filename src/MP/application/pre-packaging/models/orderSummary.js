import mongoose from 'mongoose';

const prePackageOrderSummarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser', 
        required: true,
    },
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PrePackageFoodItem',  
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

const PrePackageOrderSummary = mongoose.model('PrePackageOrderSummary', prePackageOrderSummarySchema);

export default PrePackageOrderSummary;
