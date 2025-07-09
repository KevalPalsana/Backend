
import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import ProductImage from '../models/productImage.model.js';
import SubCategory from '../models/subCategory.model.js';
import {KKUser} from '../models/user.model.js'



const getUserByEmail = async (email) => {
    return KKUser.findOne({ email });
  };

const getUserByName = async (name) => {
    return KKUser.findOne({ name });
  };

const getUserById = async (id) => {
    return KKUser.findById(id);
  };

  const getCategories = async () => {
    return  Category.find();
  };

  const getSubCategories = async () => {
    return  SubCategory.find().populate('categoryId');
  };

  const getSubCategoryByCategoryId = async (categoryId) => {
   if (!categoryId) throw new ApiError(httpStatus.BAD_REQUEST, 'categoryId is required!');
 
   const categoryExists = await Category.findById(categoryId);
   if (!categoryExists) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
 
   const subCategories = await SubCategory.find({ categoryId }).populate('categoryId');
   
   return subCategories;
 };

 const getProducts = async () => {
  return Product.find().populate('subCategoryId');
};

const getProductsBySubCategoryId = async (subCategoryId) => {
  const products = await Product.find({ subCategoryId }).populate('subCategoryId');

  if (!products || products.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No products found for this category');
  }

  return products;
};

const getProductImages = async () => {
  return ProductImage.find().populate('productId');
};


const getProductImagesByProductId = async (productId) => {
  const products = await ProductImage.find({ productId }).populate('productId');

  if (!products || products.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No products found for this category');
  }

  return products;
};   

export default {getUserByName,getUserByEmail,getUserById, getCategories, getSubCategories, getSubCategoryByCategoryId, getProductImages, getProducts, getProductImagesByProductId, getProductsBySubCategoryId};
