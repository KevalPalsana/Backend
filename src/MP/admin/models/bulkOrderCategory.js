import mongoose from 'mongoose';

const bulkorderCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const BulkOrderCategory = mongoose.model("BulkOrderCategory", bulkorderCategorySchema);

export default BulkOrderCategory;