import mongoose from 'mongoose';

const PrePackageOrderRecieptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser', 
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PrePackageOrderSummary"
    },
    orderDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PrePackagingDeliveryDate"
    },
    pickupLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminPickupLocation"
    },
    orderType: {
        type: String,
        enum: ["paid", "unpaid", "canceled"],
        default: "unpaid",
    }    
}, {timestamps: true});

const PrePackageOrderReciept  = mongoose.model("PrePackageOrderReciept", PrePackageOrderRecieptSchema);

export default PrePackageOrderReciept;