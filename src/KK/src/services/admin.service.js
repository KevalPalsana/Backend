import KKCategory from "../models/category.model.js"  
import { ApiError } from "../utils/ApiError.js";
import KKProduct from "../models/product.model.js"
import httpStatus from "http-status"
import KKSubCategory from "../models/subCategory.model.js";
import ProductImage from "../models/productImage.model.js";



const createCategory = async (categoryData) => {
    return await KKCategory.create(categoryData);
   };

const getCategories = async () => {
     return  KKCategory.find();
   };

const updateCategory = async (id, categoryData) => {
  const updateData = await KKCategory.findByIdAndUpdate(id,categoryData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'KKCategory not found');
     return updateData;
   };

const deleteCategory = async (id) => {
  const deleteId = await KKCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'KKCategory not found');
     return  deleteId;
   };

   const createSubCategory = async (categoryData) => {
    if (!categoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
    if (!categoryData.categoryId) throw new ApiError(httpStatus.BAD_REQUEST, 'category id is required!');
    const existingCategory = await  KKSubCategory.findOne({name : categoryData?.name})
    if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Sub KKCategory with name "${categoryData.name}" already exists.`);
  }
    const findCategory =await KKCategory.findById(categoryData?.categoryId);
    if (!findCategory) throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
     return KKSubCategory.create(categoryData);
   };

const getSubCategories = async () => {
     return  KKSubCategory.find().populate('categoryId');
   };

   const getSubCategoryByCategoryId = async (categoryId) => {
    if (!categoryId) throw new ApiError(httpStatus.BAD_REQUEST, 'categoryId is required!');
  
    const categoryExists = await KKCategory.findById(categoryId);
    if (!categoryExists) throw new ApiError(httpStatus.NOT_FOUND, 'KKCategory not found');
  
    const subCategories = await KKSubCategory.find({ categoryId }).populate('categoryId');
    
    return subCategories;
  };
  

const updateSubCategory = async (id, categoryData) => {
  const existingCategory = await KKSubCategory.findOne({name : categoryData?.name})
  if (existingCategory) {
  throw new ApiError(httpStatus.BAD_REQUEST, `Sub KKCategory with name "${categoryData.name}" already exists.`);
}
  if(categoryData?.categoryId) {
    const findCategory =await KKCategory.findById(categoryData?.categoryId);
    if (!findCategory) throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  
  const updateData = await KKSubCategory.findByIdAndUpdate(id,categoryData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'KKSubCategory not found');
     return updateData;
   };

const deleteSubCategory = async (id, ) => {
  const deleteId = await KKSubCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'KKSubCategory not found');
     return  deleteId;
   };

const createProduct = async (productData) => {
    if(!productData?.subCategoryId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'category is  required!');
    }
    else {
      if(productData?.subCategoryId) {
        const findCatId = await KKSubCategory.findById(productData?.subCategoryId)
        if (findCatId === null) throw new ApiError(httpStatus.NOT_FOUND, 'KKCategory not found');
      } 
    }

    const data = {  
      subCategoryId: productData.subCategoryId,
      name: productData.name || [],

    };
     return KKProduct.create(data);
   };

   const getProducts = async () => {
    return KKProduct.find().populate('subCategoryId');
  };

const updateProduct = async (id, productData) => {
 
  const updateData = await KKProduct.findByIdAndUpdate(id,productData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'KKProduct not found');
     return updateData;
   };

   const deleteProduct = async (id) => {
    const deleteId = await KKProduct.findByIdAndDelete(id);
    if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'KKProduct not found');
       return  deleteId;
     };

 const getProductsBySubCategoryId = async (subCategoryId) => {
      const products = await KKProduct.find({ subCategoryId }).populate('subCategoryId');
    
      if (!products || products.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No products found for this category');
      }
    
      return products;
    };

   const createProductImage = async (data) => {
    return await ProductImage.create(data);
    };
    
  const getProductImages = async () => {
      return await ProductImage.find().populate('productId');
    };

   const getProductImagesByProductId = async (productId) => {
      return await ProductImage.find({ productId }).populate('productId');
    };
    
  const updateProductImage = async (id, data) => {
      return await ProductImage.findByIdAndUpdate(id, data, { new: true });
    };
    
  const deleteProductImage = async (id) => {
      return await ProductImage.findByIdAndDelete(id);
    };  
      
export default {createCategory,getCategories,updateCategory,deleteCategory, createSubCategory, getSubCategories, getSubCategoryByCategoryId, updateSubCategory, deleteSubCategory,
createProduct,getProducts,updateProduct,deleteProduct,getProductsBySubCategoryId, createProductImage, getProductImages, updateProductImage, deleteProductImage, getProductImagesByProductId,
}