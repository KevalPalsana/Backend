import mongoose from 'mongoose';

const BulkOrderCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PremvatiUser', 
    },
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BulkOrderItem',
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

const BulkOrderCart = mongoose.model('BulkOrderCart', BulkOrderCartSchema);

export default BulkOrderCart;
