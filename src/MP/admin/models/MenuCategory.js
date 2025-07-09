import mongoose from 'mongoose';

const menuCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);

export default MenuCategory;