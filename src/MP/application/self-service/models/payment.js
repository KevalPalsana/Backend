import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderReciept",
    },
    cashierName: {
        type: String,
        required: true,
    },
    recieptNo: {
        type: String,
        required: true,
        unique: true,
    },
    recieptImage: {
        type: String,
    },
}, { timestemps: true });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;