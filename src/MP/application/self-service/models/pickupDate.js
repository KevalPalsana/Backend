import mongoose from 'mongoose';

const dateSchema = new mongoose.Schema({
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

const PickupDate = mongoose.model("PickupDate", dateSchema);

export default PickupDate;