import mongoose from 'mongoose';

const bulkOrderReceiptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PremvatiUser', 
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BulkOrderSummary"
    },
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BulkOrderFormData"
    },
    orderDate: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "BulkOrderDeliveryDate"
        type: String,
    },
    // pickupLocation: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "AdminPickupLocation"
    // },
    orderType: {
        type: String,
        enum: ["paid", "unpaid", "canceled", "accept"],
        default: "unpaid",
    }    
}, {timestamps: true});

const BulkOrderReceipt  = mongoose.model("BulkOrderReceipt", bulkOrderReceiptSchema);

export default BulkOrderReceipt;