import mongoose from 'mongoose';
const orderFormSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PremvatiUser',
    },
    deliveryNo: {
        type: Number
    },
    deliveryDate: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
    },
    depositPrice: {
        type: String,
    },
    remainingPrice: {
        type: String,
    },
}, {timestamps: true});


const BulkOrderFormData  = mongoose.model("BulkOrderFormData", orderFormSchema);



export default BulkOrderFormData;