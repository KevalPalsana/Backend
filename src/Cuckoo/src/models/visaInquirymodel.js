import mongoose from "mongoose";

const visaSchema = new mongoose.Schema(
    {
        country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
        title: { type: String, required: true },
        processingTime: { type: String, required: true },
        stayPeriod: { type: String, required: true },
        validity: { type: String, required: true },
        entry: { type: String, required: true },
        fees: { type: Number, required: true },
        isPopular: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Visa = mongoose.model('Visa', visaSchema);

export default Visa;