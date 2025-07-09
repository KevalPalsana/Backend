import mongoose from 'mongoose';

const servingCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ServingCategory = mongoose.model("ServingCategory", servingCategorySchema);

export default ServingCategory;