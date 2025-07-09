import mongoose from "mongoose";

const passportSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        processingTime: { type: String, required: true },
        processingType: { type: String, required: true },
        validity: { type: String, required: true },
        assistanceType: { type: String, required: true },
        fees: { type: Number, required: true },
        isPopular: { type: Boolean, default: false },
        travelerType: { type: String},
    },
    { timestamps: true }
);

const Passport = mongoose.model('Passport', passportSchema);

export default Passport;