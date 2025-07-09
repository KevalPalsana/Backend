import mongoose from 'mongoose';

const orderRecieptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser', 
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SelfServiceOrderSummary"
    },
    orderDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PickupDate"
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

const OrderReciept  = mongoose.model("OrderReciept", orderRecieptSchema);

export default OrderReciept;