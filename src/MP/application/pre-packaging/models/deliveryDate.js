import mongoose from 'mongoose';

const prePackagingDateSchema = new mongoose.Schema({
    pickupDate: {
        type: Date,
        required: true,
    },
    pickupTime: {
        trye: String,
    }
}, {timestemps: true});

const PrePackagingDeliveryDate = mongoose.model("PrePackagingDeliveryDate", prePackagingDateSchema);

export default PrePackagingDeliveryDate;