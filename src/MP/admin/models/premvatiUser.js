import mongoose from 'mongoose';

const premvatiUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    serialNo: {
        type: Number,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    premvati: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminPickupLocation"
    }
}, {timestamps : true});

const PremvatiUser = mongoose.model("PremvatiUser", premvatiUserSchema);

export default PremvatiUser;