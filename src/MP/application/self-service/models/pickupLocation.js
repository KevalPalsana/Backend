import mongoose from 'mongoose';

const premvatiListingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const PickupLocation = mongoose.model("pickupLocation", premvatiListingSchema);

export default PickupLocation;