import mongoose from 'mongoose';

const adminPremvatiListingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const AdminPickupLocation = mongoose.model("AdminPickupLocation", adminPremvatiListingSchema);

export default AdminPickupLocation;