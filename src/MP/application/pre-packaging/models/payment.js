import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PrePackageOrderReciept",
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

const PrePayment = mongoose.model("PrePayment", paymentSchema);

export default PrePayment;