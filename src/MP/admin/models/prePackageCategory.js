import mongoose from 'mongoose';

const prePackageFoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const PrePackageFood = mongoose.model("PrePackageFood", prePackageFoodSchema);

export default PrePackageFood;