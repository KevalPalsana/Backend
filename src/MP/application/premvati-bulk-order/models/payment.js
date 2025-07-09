import mongoose from 'mongoose';

const bulkPayemntSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BulkOrderReceipt",
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

const BulkPayment = mongoose.model("BulkPayment", bulkPayemntSchema);

export default BulkPayment;