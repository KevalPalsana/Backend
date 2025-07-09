import { Schema, model } from 'mongoose';

const popularCategorySchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
},
});

const PopularCategory = model('PopularCategory', popularCategorySchema);

export default PopularCategory;
