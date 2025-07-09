import mongoose from 'mongoose';

const kalawadPremvatiSchema = new mongoose.Schema({
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        // default: "Kalawad Road", 
    },
    services: {
        orderMethod: { type: String, required: true },
        qualityFood: { type: String, required: true },
        tasteOfFood: { type: String, required: true },
        servingMethod: { type: String, required: true },
        staffBehaviour: { type: String, required: true },
        cleanliness: { type: String, required: true },
    },
    productLiked: {
        type: String,
        required: false,
    },
    suggestion: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    assignedRole: {
        type: String,
        default: null
    },
    date: { type: Date, default: Date.now },
});

const KalawadPremvati = mongoose.model('KalawadPremvati', kalawadPremvatiSchema);


export default KalawadPremvati;
