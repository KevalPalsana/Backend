import mongoose from 'mongoose';

const prePackagingMandalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const PrePackagingMandal = mongoose.model("PrePackagingMandal", prePackagingMandalSchema);

export default PrePackagingMandal;