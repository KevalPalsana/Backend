import { Schema, model } from 'mongoose';

const popularCategorySchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
},
});

const InfiPopularCategory = model('InfiPopularCategory', popularCategorySchema);

export default InfiPopularCategory;
