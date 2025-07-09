import Category from "../models/category.model.js"  
import { ApiError } from "../utils/ApiError.js";
import Product from "../models/product.model.js"
import httpStatus, { status } from "http-status"
import { VinayakAboutUs } from "../models/aboutUs.model.js";
import WhatWeOffer from "../models/WhatWeDo.model.js";
import Contact from "../models/contactUs.model.js";
import Calculation from "../models/calculation.model.js";
import WhyUs from "../models/whyUs.model.js";
import WhatWeDo from "../models/WhatWeDo.model.js";
import Service from "../models/service.model.js";
import AboutUsMainPage from "../models/aboutUsPage.model.js";
import IndustriesServe from "../models/serve.model.js";
import WhatWeDoMain from "../models/whatWeDoMain.model.js";

const createCategory = async (categoryData) => {
    if (!categoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
    const existingCategory = await Category.findOne({name : categoryData?.name})
    if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Category with name "${categoryData.name}" already exists.`);
  }
     return Category.create(categoryData);
   };

const getCategories = async () => {
     return  Category.find();
   };

const updateCategory = async (id, categoryData) => {
  const existingCategory = await Category.findOne({name : categoryData?.name})
  if (existingCategory) {
  throw new ApiError(httpStatus.BAD_REQUEST, `Category with name "${categoryData.name}" already exists.`);
}
  const updateData = await Category.findByIdAndUpdate(id,categoryData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
     return updateData;
   };

const deleteCategory = async (id) => {
  const deleteId = await Category.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
     return  deleteId;
   };

const createProduct = async (productData) => {
    return await Product.create(productData);
   };

   const getProducts = async (query) => {
    return Product.find();
  };

const updateProduct = async (id, productData) => {
 
  const updateData = await Product.findByIdAndUpdate(id,productData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
     return updateData;
   };

   const deleteProduct = async (id) => {
    const deleteId = await Product.findByIdAndDelete(id);
    if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
       return  deleteId;
     };

 const getProductsByCategoryId = async (categoryId) => {
      const products = await Product.find({ categoryId }).populate('categoryId');
      return products;
    };


    const createAboutUsPage = async (aboutUsData) => {
      if (!aboutUsData.headDescription) throw new ApiError(httpStatus.BAD_REQUEST, 'HeadDescription is required!');
    
      if (!Array.isArray(aboutUsData.sections) || aboutUsData.sections.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'At least one section is required!');
      }
  
        for (const section of aboutUsData.sections) {
        if (!section.subTitle) throw new ApiError(httpStatus.BAD_REQUEST, 'subTitle is required for each section!');
        if (!section.description) throw new ApiError(httpStatus.BAD_REQUEST, 'description is required for each section!');
      }
    
      const existingAboutUs = await VinayakAboutUs.findOne();
    
      if (existingAboutUs) {
        return VinayakAboutUs.findByIdAndUpdate(existingAboutUs._id, aboutUsData, {
          new: true,
          runValidators: true,
        });
      }
    
      return VinayakAboutUs.create(aboutUsData);
    };
    

const getAboutUsPage = async() => {
  return VinayakAboutUs.find();
};

const getAboutUsById = async(id) => {
    return VinayakAboutUs.findById(id);
};

const updateAboutUsPage = async (id, aboutUsData) => {
const updateData = await VinayakAboutUs.findByIdAndUpdate(id,aboutUsData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
     return updateData;
};

const deleteAboutUsPage = async (id) => {
  const deleteId = await VinayakAboutUs.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
     return  deleteId;
   };

   const createAboutUsMainPage = async (aboutUsData) => {
    if (!aboutUsData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
    if (!aboutUsData.headDescription) throw new ApiError(httpStatus.BAD_REQUEST, 'HeadDescription is required!');
  
    if (!Array.isArray(aboutUsData.sections) || aboutUsData.sections.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'At least one section is required!');
    }

      for (const section of aboutUsData.sections) {
      if (!section.subTitle) throw new ApiError(httpStatus.BAD_REQUEST, 'subTitle is required for each section!');
      if (!section.description) throw new ApiError(httpStatus.BAD_REQUEST, 'description is required for each section!');
      if (!section.icon) throw new ApiError(httpStatus.BAD_REQUEST, 'icon is required for each section!');
    }
  
    const existingAboutUs = await AboutUsMainPage.findOne();
  
    if (existingAboutUs) {
      return AboutUsMainPage.findByIdAndUpdate(existingAboutUs._id, aboutUsData, {
        new: true,
        runValidators: true,
      });
    }
  
    return AboutUsMainPage.create(aboutUsData);
  };
  

const getAboutUsMainPage = async() => {
return AboutUsMainPage.find();
};

const getAboutUsByIdMain = async(id) => {
  return AboutUsMainPage.findById(id);
};

const updateAboutUsMainPage = async (id, aboutUsData) => {
const existingAboutUs = await AboutUsMainPage.findOne({title : aboutUsData?.title})
if (existingAboutUs) {
throw new ApiError(httpStatus.BAD_REQUEST, `About Us with title "${aboutUsData.title}" already exists.`);
}
const updateData = await AboutUsMainPage.findByIdAndUpdate(id,aboutUsData,{new:true});
if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
   return updateData;
};

const deleteAboutUsMainPage = async (id) => {
const deleteId = await AboutUsMainPage.findByIdAndDelete(id);
if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
   return  deleteId;
 };

      const createWhatWeOffer = async (whatWeOfferData) => {
        if (!whatWeOfferData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
        if (!whatWeOfferData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!');
        if (!whatWeOfferData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
      
        return WhatWeOffer.create(whatWeOfferData);
      };
      
      const getWhatWeOffer = async () => {
        return WhatWeOffer.find();
      };
      
      const updateWhatWeOffer = async (id, whatWeOfferData) => {
        const team = await WhatWeOffer.findByIdAndUpdate(id, whatWeOfferData, { new: true });
          if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'WhatWeOffer Data is not found!');
          return team;
      };
      
      const deleteWhatWeOffer = async (id) => {
        const deleteId = await WhatWeOffer.findByIdAndDelete(id);
        if(deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'WhatWeOffer Data is not found');
        return deleteId;
      };

       const createWhyUs = async (visionData) => {
        if (!visionData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
         return WhyUs.create(visionData);
       };
      
      const getWhyUs = async () => {
         return  WhyUs.find();
       };
      
      const updateWhyUs = async (id, visionData) => {
      const updateData = await WhyUs.findByIdAndUpdate(id,visionData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
         return updateData;
       };
      
      const deleteWhyUs = async (id) => {
      const deleteId = await WhyUs.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
         return  deleteId;
       };

       const getAllContacts = async () => {
        return await Contact.find().sort({ createdAt: -1 });
      };
    
      const createCalculation = async (visionData) => {
         return await Calculation.create(visionData);
       };
      
      const getCalculation = async () => {
         return await Calculation.find();
       };
      
      const updateCalculation = async (id, visionData) => {
      const updateData = await Calculation.findByIdAndUpdate(id,visionData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
      
      const deleteCalculation = async (id) => {
      const deleteId = await Calculation.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };
      

       const createWhatWeDo = async (visionData) => {
        return await WhatWeDo.create(visionData);
      };
     
     const getWhatWeDo = async () => {
        return await WhatWeDo.find();
      };
     
     const updateWhatWeDo = async (id, visionData) => {
     const updateData = await WhatWeDo.findByIdAndUpdate(id,visionData,{new:true});
     if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return updateData;
      };
     
     const deleteWhatWeDo = async (id) => {
     const deleteId = await WhatWeDo.findByIdAndDelete(id);
     if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return  deleteId;
      };


      const createService = async (visionData) => {
        return await Service.create(visionData);
      };
     
     const getService = async () => {
        return await Service.find();
      };
     
     const updateService = async (id, visionData) => {
     const updateData = await Service.findByIdAndUpdate(id,visionData,{new:true});
     if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return updateData;
      };
     
     const deleteService = async (id) => {
     const deleteId = await Service.findByIdAndDelete(id);
     if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return  deleteId;
      };

      const createServe = async (visionData) => {
        return await IndustriesServe.create(visionData);
      };
     
     const getServe = async () => {
        return await IndustriesServe.find();
      };
     
     const updateServe = async (id, visionData) => {
     const updateData = await IndustriesServe.findByIdAndUpdate(id,visionData,{new:true});
     if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return updateData;
      };
     
     const deleteServe = async (id) => {
     const deleteId = await IndustriesServe.findByIdAndDelete(id);
     if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return  deleteId;
      };

       const createWhatWeDoMain = async (data) => {
        return await WhatWeDoMain.create(data);
    };
    
      const getAllWhatWeDoMain = async () => {
        return await WhatWeDoMain.find().sort({ createdAt: -1 });
    };
    
     const updateWhatWeDoMain = async (id, data) => {
        return await WhatWeDoMain.findByIdAndUpdate(id, data, { new: true });
    };
    
     const deleteWhatWeDoMain = async (id) => {
        return await WhatWeDoMain.findByIdAndDelete(id);
    };
     
      
export default {createCategory,getCategories,updateCategory,deleteCategory, createCalculation, getCalculation, updateCalculation, deleteCalculation,
createProduct,getProducts,updateProduct,deleteProduct,getProductsByCategoryId, createAboutUsPage, getAboutUsById, getAboutUsPage, updateAboutUsPage, deleteAboutUsPage, createWhatWeDoMain, getAllWhatWeDoMain, updateWhatWeDoMain, deleteWhatWeDoMain,
createAboutUsMainPage, getAboutUsMainPage, getAboutUsByIdMain, updateAboutUsMainPage, deleteAboutUsMainPage,
createWhatWeOffer, getWhatWeOffer, updateWhatWeOffer, deleteWhatWeOffer,createWhyUs, getWhyUs, updateWhyUs, deleteWhyUs,getAllContacts,
createWhatWeDo, getWhatWeDo, updateWhatWeDo, deleteWhatWeDo, createService, getService, updateService, deleteService, createServe, getServe, updateServe, deleteServe,

}