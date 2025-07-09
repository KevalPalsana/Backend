import mongoose from 'mongoose';

const bulkOrderDeliveryDateSchema = new mongoose.Schema({
    pickupDate: {
        type: Date,
        required: true,
    },
    eventName: {
        type: String,
    },
    pickupTime: {
        trye: String,
    }
}, {timestemps: true});

const BulkOrderDeliveryDate = mongoose.model("BulkOrderDeliveryDate", bulkOrderDeliveryDateSchema);

export default BulkOrderDeliveryDate;