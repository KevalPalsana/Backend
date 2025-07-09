import mongoose from 'mongoose';

const bulkOrderItemSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BulkOrderCategory",
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

const BulkOrderItem = mongoose.model("BulkOrderItem", bulkOrderItemSchema);

export default BulkOrderItem;