import InfiCategory from "../models/category.model.js"  
import { ApiError } from "../utils/ApiError.js";
import InfiProduct from "../models/product.model.js"
import httpStatus from "http-status"
import { InfiBlog } from "../models/blog.model.js";
import KeyAchievement from "../models/gallery.model.js";
import InfiSpotlight from "../models/spotlite.model.js";
import { InfiReview } from "../models/review.model.js";
import InfiFaq from "../models/faq.model.js";
import InfiHeroSection from "../models/heroSection.model.js";
import InfiWhatWeOffer from "../models/WhatWeOffer.model.js";
import InfiCalculationSection from "../models/calculation.model.js";
import InfiCompanyInfo from "../models/info.model.js";
import InfoSecondSection from "../models/secondSection.model.js";
import InfoOurCore from "../models/ourCore.model.js";
import InfiAchivement from "../models/achievement.model.js";
import InfiBanner from "../models/banner.model.js";
import InfiService from "../models/service.model.js";
import InfiServiceDetail from "../models/serviceDetails.model.js";
import InfiPopularCategory from "../models/popularCategory.model.js";
import InfiPopularTag from "../models/popularTag.model.js";
import { InfiAboutUs } from "../models/aboutUs.model.js";
import { InfiFirstYearJourney } from "../models/firstJourney.model.js";
import { InfiSecondYearJourney } from "../models/secondJourney.model.js";
import { InfiThirdYearJourney } from "../models/thirdJourney.model.js";
import { InfiForthYearJourney } from "../models/forthJourney.model.js";
import InfiCoreValue from "../models/coreValue.model.js";
import InfiGallery from "../models/gallery.model.js";

const createCategory = async (categoryData) => {
    if (!categoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
    if (!categoryData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'image is required!');
    const existingCategory = await InfiCategory.findOne({name : categoryData?.name})
    if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `InfiCategory with name "${categoryData.name}" already exists.`);
  }
     return InfiCategory.create(categoryData);
   };

const getCategories = async () => {
     return  InfiCategory.find();
   };

const updateCategory = async (id, categoryData) => {
  const updateData = await InfiCategory.findByIdAndUpdate(id,categoryData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiCategory not found');
     return updateData;
   };

const deleteCategory = async (id) => {
  const deleteId = await InfiCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiCategory not found');
     return  deleteId;
   };

const createProduct = async (productData) => {
    if(!productData?.categoryId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'category is  required!');
    }
    else {
      if(productData?.categoryId) {
        const findCatId = await InfiCategory.findById(productData?.categoryId)
        if (findCatId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiCategory not found');
      } 
    }

    const data = {
      categoryId: productData.categoryId,
      productImgUrl: productData.productImgUrl || [],

    };
     return InfiProduct.create(data);
   };

   const getProducts = async (query) => {
    return InfiProduct.find();
  };

const updateProduct = async (id, productData) => {
 
  const updateData = await InfiProduct.findByIdAndUpdate(id,productData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiProduct not found');
     return updateData;
   };

   const deleteProduct = async (id) => {
    const deleteId = await InfiProduct.findByIdAndDelete(id);
    if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiProduct not found');
       return  deleteId;
     };

 const getProductsByCategoryId = async (categoryId) => {
      const products = await InfiProduct.find({ categoryId }).populate('categoryId');
    
      if (!products || products.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No products found for this category');
      }
    
      return products;
    };


    const createGallery = async (data) => {
      return await InfiGallery.create(data);
    };
    

const getGallery = async() => {
  return InfiGallery.find();
};

const updateGallery = async (id, data) => {
const updateData = await InfiGallery.findByIdAndUpdate(id,data,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiAchievement not found');
     return updateData;
};

const deleteGallery = async (id) => {
  const deleteId = await InfiGallery.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiAchievement not found');
     return  deleteId;
   };

   const createAboutUsMainPage = async (aboutUsData) => {
    if (!aboutUsData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
    if (!aboutUsData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!');
    if (!aboutUsData.image) throw new ApiError(httpStatus.BAD_REQUEST, "Image is required!");
  
    const existingAboutUs = await AboutUsPage.findOne();
  
    if (existingAboutUs) {
      return AboutUsPage.findByIdAndUpdate(existingAboutUs._id, aboutUsData, {
        new: true, 
        runValidators: true, 
      });
    }
  
    return AboutUsPage.create(aboutUsData);
  };
  
  
  const getAboutUsMainPage = async() => {
    return AboutUsPage.find();
  };
  
  const getAboutUsByIdMain = async(id) => {
      return AboutUsPage.findById(id);
  };
  
  const updateAboutUsMainPage = async (id, aboutUsData) => {
  const updateData = await AboutUsPage.findByIdAndUpdate(id,aboutUsData,{new:true});
    if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
       return updateData;
  };
  
  const deleteAboutUsMainPage = async (id) => {
    const deleteId = await AboutUsPage.findByIdAndDelete(id);
    if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
       return  deleteId;
     };

   const createBlog = async (blogData) => {
    if(!blogData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
    if(!blogData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!');
    if(!blogData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
    const existingBlog = await InfiBlog.findOne({title: blogData?.title});
    if(existingBlog) {
      throw new ApiError(httpStatus.BAD_REQUEST, `InfiBlog with title "${existingBlog}" already exists.`);
    }
  
    return InfiBlog.create(blogData);
  };
  
  const getBlog = async() => {
    return InfiBlog.find();
  };
  
  const updateBlog = async (id, blogData) => {
  const updateData = await InfiBlog.findByIdAndUpdate(id,blogData,{new:true});
    if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiBlog not found');
       return updateData;
  };
  
  const deleteBlog = async (id) => {
    const deleteId = await InfiBlog.findByIdAndDelete(id);
    if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiBlog not found');
       return  deleteId;
     };

     const createHeroSection = async (bannerData) => {
      if(!bannerData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
      return InfiHeroSection.create(bannerData);
    };
    
    const getHeroSection = async() => {
      return InfiHeroSection.find();
    };
    
    const updateHeroSection = async (id, bannerData) => {
    const updateData = await InfiHeroSection.findByIdAndUpdate(id,bannerData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiBanner not found');
         return updateData;
    };
    
    const deleteHeroSection = async (id) => {
      const deleteId = await InfiHeroSection.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiBanner not found');
         return  deleteId;
       };

       const createBanner = async (data) => {
         return await InfiBanner.create(data);
       };
    
    const getBanner = async () => {
         return  InfiBanner.find();
       };
    
    const updateBanner = async (id, data) => {
     
      const updateData = await InfiBanner.findByIdAndUpdate(id,data,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
    
    const deleteBanner = async (id) => {
      const deleteId = await InfiBanner.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };
  
       const createTeam = async (teamData) => {
        if (!teamData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
        if (!teamData.role) throw new ApiError(httpStatus.BAD_REQUEST, 'Role is required!');
        if (!teamData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
      
        return InfiSpotlight.create(teamData);
      };
      
      const getTeam = async () => {
        return InfiSpotlight.find();
      };
      
      const getTeamById = async (id) => {
        const team = await InfiSpotlight.findById(id);
        if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'InfiSpotlight not found!');
      
        return team;
      };
      
      const updateTeam = async (id, teamData) => {
        const team = await InfiSpotlight.findByIdAndUpdate(id, teamData, { new: true });
          if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'InfiSpotlight not found!');
          return team;
      };
      
      const deleteTeam = async (id) => {
        const deleteId = await InfiSpotlight.findByIdAndDelete(id);
        if(deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiSpotlight not found');
        return deleteId;
      };

      const createFeedback = async (feedbackData) => {
        if(!feedbackData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
        if(!feedbackData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!')
      
          return InfiReview.create(feedbackData);
      };


      const getFeedbacks = async () => {
        return InfiReview.find();
      };
      
      const updateFeedback = async (id, feedbackData) => {
        const updateData = await InfiReview.findByIdAndUpdate(id, feedbackData, {new: true});
        if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return updateData;
      };
      
      const deleteFeedback = async (id) => {
        const deleteId =  await InfiReview.findByIdAndDelete(id);
        if (deleteId === null ) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return deleteId;
      };

      const createFaq = async (attributeData) => {
        if (!attributeData.question) throw new ApiError(httpStatus.BAD_REQUEST, 'question is required!');
        if (!attributeData.answer) throw new ApiError(httpStatus.BAD_REQUEST, 'answer is required!');
        const existingCategory = await InfiFaq.findOne({question : attributeData?.question})
        if (existingCategory) {
        throw new ApiError(httpStatus.BAD_REQUEST, `FAQ with question "${attributeData.question}" already exists.`);
      }
      return InfiFaq.create(attributeData);
      
      };

      const getFaqs = async () => {
        return  InfiFaq.find();
      };
      
      const updateFaq = async (id, attributeData) => {
        const updateData = await InfiFaq.findByIdAndUpdate(id,attributeData,{new:true});
        if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
           return updateData;
         };
      
      
      const deleteFaq = async (id) => {
      const deleteId = await InfiFaq.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
        return  deleteId;
      };

      const createWhatWeOffer = async (whatWeOfferData) => {
        if (!whatWeOfferData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
        if (!whatWeOfferData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!');
        if (!whatWeOfferData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
      
        return InfiWhatWeOffer.create(whatWeOfferData);
      };
      
      const getWhatWeOffer = async () => {
        return InfiWhatWeOffer.find();
      };
      
      const updateWhatWeOffer = async (id, whatWeOfferData) => {
        const team = await InfiWhatWeOffer.findByIdAndUpdate(id, whatWeOfferData, { new: true });
          if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'InfiWhatWeOffer Data is not found!');
          return team;
      };
      
      const deleteWhatWeOffer = async (id) => {
        const deleteId = await InfiWhatWeOffer.findByIdAndDelete(id);
        if(deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiWhatWeOffer Data is not found');
        return deleteId;
      };

      const createCalculation = async (data) => {
        return await InfiCalculationSection.create(data);
       };
      
      const getCalculation = async () => {
         return  InfiCalculationSection.find();
       };
      
      const updateCalculation = async (id, coreValueData) => {
      const updateData = await InfiCalculationSection.findByIdAndUpdate(id,coreValueData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
      
      const deleteCalculation = async (id) => {
      const deleteId = await InfiCalculationSection.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };

       const createPopularCategory = async (visionData) => {
        if (!visionData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
         return InfiPopularCategory.create(visionData);
       };
      
      const getPopularCategory = async () => {
         return  InfiPopularCategory.find();
       };
      
      const updatePopularCategory = async (id, visionData) => {
      const updateData = await InfiPopularCategory.findByIdAndUpdate(id,visionData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
         return updateData;
       };
      
      const deletePopularCategory = async (id) => {
      const deleteId = await InfiPopularCategory.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
         return  deleteId;
       };

       const createCompanyInfo = async (chooseUsData) => {
        if (!chooseUsData.phoneNumber) throw new ApiError(httpStatus.BAD_REQUEST, 'phoneNumber is required!');
        if (!chooseUsData.email) throw new ApiError(httpStatus.BAD_REQUEST, 'email is required!');
        if (!chooseUsData.address) throw new ApiError(httpStatus.BAD_REQUEST, 'address is required!');
         return InfiCompanyInfo.create(chooseUsData);
       };
      
      const getCompanyInfo = async () => {
         return  InfiCompanyInfo.find();
       };
      
      const updateCompanyInfo = async (id, chooseUsData) => {
      const updateData = await InfiCompanyInfo.findByIdAndUpdate(id,chooseUsData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'data not found');
         return updateData;
       };
      
      const deleteCompanyInfo = async (id) => {
      const deleteId = await InfiCompanyInfo.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'data not found');
         return  deleteId;
       };

       const createSection = async (data) => {
        if (!data.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
        if (!data.description) throw new ApiError(httpStatus.BAD_REQUEST, 'description is required!');
        if (!data.image) throw new ApiError(httpStatus.BAD_REQUEST, 'image is required!');
         return InfoSecondSection.create(data);
       };
      
      const getSection = async () => {
         return  InfoSecondSection.find();
       };
      
      const updateSection = async (id, data) => {
      const updateData = await InfoSecondSection.findByIdAndUpdate(id,data,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'data not found');
         return updateData;
       };
      
      const deleteSection = async (id) => {
      const deleteId = await InfoSecondSection.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'data not found');
         return  deleteId;
       };
       const createServiceDetail = async (serviceData) => {
        if (!serviceData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
        if (!serviceData.subTitle) throw new ApiError(httpStatus.BAD_REQUEST, 'subTitle is required!');
        if (!serviceData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'description is required!');
        if (!serviceData.subDescription) throw new ApiError(httpStatus.BAD_REQUEST, 'subDescription is required!');

        if(!serviceData?.serviceId) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'InfiService is  required!');
        }
        else {
          if(serviceData?.serviceId) {
            const findCatId = await InfiService.findById(serviceData?.serviceId)
            if (findCatId === null) throw new ApiError(httpStatus.NOT_FOUND, 'InfiService not found');
          } 
        }

         return InfiServiceDetail.create(serviceData);
       };
      
      const getServiceDetail = async () => {
         return  InfiServiceDetail.find();
       };
      
      const updateServiceDetail = async (id, serviceData) => {
      const updateData = await InfiServiceDetail.findByIdAndUpdate(id,serviceData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
      
      const deleteServiceDetail = async (id) => {
      const deleteId = await InfiServiceDetail.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };

       const createMission = async (visionData) => {
        if (!visionData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
         return InfiAchivement.create(visionData);
       };
      
      const getMission = async () => {
         return  InfiAchivement.find();
       };
      
      const updateMission = async (id, visionData) => {
      const updateData = await InfiAchivement.findByIdAndUpdate(id,visionData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
         return updateData;
       };
      
      const deleteMission = async (id) => {
      const deleteId = await InfiAchivement.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
         return  deleteId;
       };

       const createOurCore = async (coreValueData) => {
        if (!coreValueData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
        
         return InfoOurCore.create(coreValueData);
       };
      
      const getOurCore = async () => {
         return  InfoOurCore.find();
       };
      
      const updateCore = async (id, coreValueData) => {
      const updateData = await InfoOurCore.findByIdAndUpdate(id,coreValueData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
      
      const deleteCore = async (id) => {
      const deleteId = await InfiCoreValue.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };

       const createCoreValue = async (coreValueData) => {        
         return await InfiCoreValue.create(coreValueData);
       };
      
      const getCoreValue = async () => {
         return  InfiCoreValue.find();
       };
      
      const updateCoreValue = async (id, coreValueData) => {
      const updateData = await InfiCoreValue.findByIdAndUpdate(id,coreValueData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
      
      const deleteCoreValue = async (id) => {
      const deleteId = await InfiCoreValue.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };


       const createSpotlite = async (coreValueData) => {        
        return await InfiSpotlight.create(coreValueData);
      };
     
     const getSpotlite = async () => {
        return  InfiSpotlight.find();
      };
     
     const updateSpotlite = async (id, coreValueData) => {
     const updateData = await InfiSpotlight.findByIdAndUpdate(id,coreValueData,{new:true});
     if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return updateData;
      };
     
     const deleteSpotlite = async (id) => {
     const deleteId = await InfiSpotlight.findByIdAndDelete(id);
     if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return  deleteId;
      };
     
      
       const createService = async (serviceData) => {
        if (!serviceData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
        if (!serviceData.icon) throw new ApiError(httpStatus.BAD_REQUEST, 'Icon is required!');
        if (!serviceData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'description is required!');
        const existingCategory = await InfiService.findOne({title : serviceData?.title})
        if (existingCategory) {
        throw new ApiError(httpStatus.BAD_REQUEST, `InfiService with title "${serviceData.title}" already exists.`);
      }
         return InfiService.create(serviceData);
       };
    
    const getService = async () => {
         return  InfiService.find();
       };
    
    const updateService = async (id, serviceData) => {
      const updateData = await InfiService.findByIdAndUpdate(id,serviceData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
    
    const deleteService = async (id) => {
      const deleteId = await InfiService.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };

       const createAchievement = async (data) => {
        if (!data.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
        const existingCategory = await InfiAchievement.findOne({name : data?.name})
        if (existingCategory) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Tag with name "${data.name}" already exists.`);
      }
         return InfiPopularTag.create(data);
       };
    
       
       const getAchievement = async () => {
         return  InfiAchievement.find();
        };
    
    const updateAchievement = async (id, data) => {
      const updateData = await InfiAchievement.findByIdAndUpdate(id,data,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
      return updateData;
    };
    
    const deleteAchievement = async (id) => {
      const deleteId = await InfiAchievement.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
      return  deleteId;
    };
    
    const getPopularTag = async () => {
         return  InfiPopularTag.find();
       };
    
    const updatePopularTag = async (id, data) => {
      const updateData = await InfiPopularTag.findByIdAndUpdate(id,data,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
    
    const deletePopularTag = async (id) => {
      const deleteId = await InfiPopularTag.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };

       const createPopularTag = async (data) => {
        if (!data.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
        const existingCategory = await InfiAchievement.findOne({name : data?.name})
        if (existingCategory) {
        throw new ApiError(httpStatus.BAD_REQUEST, `InfiAchievement with name "${data.name}" already exists.`);
      }
         return InfiAchievement.create(data);
       };

       const getAboutUs = async () => {
        return await InfiAboutUs.findOne(); // ✅ Fetch the only existing About Us entry
    };
    
    const createOrUpdateAboutUs = async (data) => {
        let aboutUs = await InfiAboutUs.findOne();
    
        if (aboutUs) {
            aboutUs.title = data.title || aboutUs.title;
            aboutUs.description = data.description || aboutUs.description;
            aboutUs.active = data.active !== undefined ? data.active : aboutUs.active;
            await aboutUs.save();
        } else {
            aboutUs = await InfiAboutUs.create(data);
        }
    
        return aboutUs;
    };
    
    const editAboutUs = async (id, data) => {
        const aboutUs = await InfiAboutUs.findByIdAndUpdate(id, data, { new: true });
        if (!aboutUs) throw new Error("About Us entry not found");
        return aboutUs;
    };
    
    const deleteAboutUs = async (id) => {
        const deletedAboutUs = await InfiAboutUs.findByIdAndDelete(id);
        if (!deletedAboutUs) throw new Error("About Us entry not found");
        return deletedAboutUs;
    };


    const getFirstYear = async () => {
      return await InfiFirstYearJourney.findOne(); // ✅ Fetch the only existing About Us entry
  };
  
  const createFirstYear = async (data) => {
      let aboutUs = await InfiFirstYearJourney.findOne();
  
      if (aboutUs) {
          aboutUs.title = data.title || aboutUs.title;
          aboutUs.description = data.description || aboutUs.description;
          aboutUs.image = data.image || aboutUs.image;
          aboutUs.year = data.year || aboutUs.year;
          aboutUs.active = data.active !== undefined ? data.active : aboutUs.active;
          await aboutUs.save();
      } else {
          aboutUs = await InfiFirstYearJourney.create(data);
      }
  
      return aboutUs;
  };
  
  const updateFirstYear = async (id, data) => {
      const aboutUs = await InfiFirstYearJourney.findByIdAndUpdate(id, data, { new: true });
      if (!aboutUs) throw new Error("About Us entry not found");
      return aboutUs;
  };
  
  const deleteFirstYear = async (id) => {
      const deletedAboutUs = await InfiFirstYearJourney.findByIdAndDelete(id);
      if (!deletedAboutUs) throw new Error("About Us entry not found");
      return deletedAboutUs;
  };

  const getSecondYear = async () => {
    return await InfiSecondYearJourney.findOne(); // ✅ Fetch the only existing About Us entry
};

const createSecondYear = async (data) => {
    let aboutUs = await InfiSecondYearJourney.findOne();

    if (aboutUs) {
        aboutUs.title = data.title || aboutUs.title;
        aboutUs.description = data.description || aboutUs.description;
        aboutUs.image = data.image || aboutUs.image;
        aboutUs.year = data.year || aboutUs.year;
        aboutUs.active = data.active !== undefined ? data.active : aboutUs.active;
        await aboutUs.save();
    } else {
        aboutUs = await InfiSecondYearJourney.create(data);
    }

    return aboutUs;
};

const updateSecondYear = async (id, data) => {
    const aboutUs = await InfiSecondYearJourney.findByIdAndUpdate(id, data, { new: true });
    if (!aboutUs) throw new Error("About Us entry not found");
    return aboutUs;
};

const deleteSecondYear = async (id) => {
    const deletedAboutUs = await InfiSecondYearJourney.findByIdAndDelete(id);
    if (!deletedAboutUs) throw new Error("About Us entry not found");
    return deletedAboutUs;
};

const getThirdYear = async () => {
  return await InfiThirdYearJourney.findOne(); // ✅ Fetch the only existing About Us entry
};

const createThirdYear = async (data) => {
  let aboutUs = await InfiThirdYearJourney.findOne();

  if (aboutUs) {
      aboutUs.title = data.title || aboutUs.title;
      aboutUs.description = data.description || aboutUs.description;
      aboutUs.image = data.image || aboutUs.image;
      aboutUs.year = data.year || aboutUs.year;
      aboutUs.active = data.active !== undefined ? data.active : aboutUs.active;
      await aboutUs.save();
  } else {
      aboutUs = await InfiThirdYearJourney.create(data);
  }

  return aboutUs;
};

const updateThirdYear = async (id, data) => {
  const aboutUs = await InfiThirdYearJourney.findByIdAndUpdate(id, data, { new: true });
  if (!aboutUs) throw new Error("About Us entry not found");
  return aboutUs;
};

const deleteThirdYear = async (id) => {
  const deletedAboutUs = await InfiThirdYearJourney.findByIdAndDelete(id);
  if (!deletedAboutUs) throw new Error("About Us entry not found");
  return deletedAboutUs;
};

const getForthYear = async () => {
  return await InfiForthYearJourney.findOne(); // ✅ Fetch the only existing About Us entry
};

const createForthYear = async (data) => {
  let aboutUs = await InfiForthYearJourney.findOne();

  if (aboutUs) {
      aboutUs.title = data.title || aboutUs.title;
      aboutUs.description = data.description || aboutUs.description;
      aboutUs.image = data.image || aboutUs.image;
      aboutUs.year = data.year || aboutUs.year;
      aboutUs.active = data.active !== undefined ? data.active : aboutUs.active;
      await aboutUs.save();
  } else {
      aboutUs = await InfiForthYearJourney.create(data);
  }

  return aboutUs;
};

const updateForthYear = async (id, data) => {
  const aboutUs = await InfiForthYearJourney.findByIdAndUpdate(id, data, { new: true });
  if (!aboutUs) throw new Error("About Us entry not found");
  return aboutUs;
};

const deleteForthYear = async (id) => {
  const deletedAboutUs = await InfiForthYearJourney.findByIdAndDelete(id);
  if (!deletedAboutUs) throw new Error("About Us entry not found");
  return deletedAboutUs;
};


export default {createCategory,getCategories,updateCategory,deleteCategory, createProduct,getProducts,updateProduct,deleteProduct,getProductsByCategoryId,
createGallery, getGallery, updateGallery, deleteGallery, createBlog, getBlog, updateBlog, deleteBlog, createHeroSection, getHeroSection, updateHeroSection, deleteHeroSection, 
createAboutUsMainPage, getAboutUsMainPage, getAboutUsByIdMain, updateAboutUsMainPage, deleteAboutUsMainPage, createFirstYear, getFirstYear, updateFirstYear, deleteFirstYear,
createBanner, getBanner, updateBanner, deleteBanner, createTeam, getTeam, getTeamById, updateTeam, deleteTeam,
createFeedback, getFeedbacks, updateFeedback, deleteFeedback, createFaq, getFaqs, updateFaq, deleteFaq, createSecondYear, getSecondYear, updateSecondYear, deleteSecondYear,
createWhatWeOffer, getWhatWeOffer, updateWhatWeOffer, deleteWhatWeOffer, createCalculation, getCalculation, updateCalculation, deleteCalculation,
createPopularCategory, getPopularCategory, updatePopularCategory, deletePopularCategory, createCompanyInfo, getCompanyInfo, updateCompanyInfo, deleteCompanyInfo,
createSection, getSection, updateSection, deleteSection, createServiceDetail, getServiceDetail, updateServiceDetail, deleteServiceDetail,
createMission, getMission, updateMission, deleteMission, createOurCore, getOurCore, updateCore, deleteCore, createThirdYear, getThirdYear, updateThirdYear, deleteThirdYear,
createService, getService, updateService, deleteService, createAchievement, getAchievement, updateAchievement, deleteAchievement,
createPopularTag, getPopularTag, updatePopularTag, deletePopularTag, getAboutUs, createOrUpdateAboutUs, editAboutUs, deleteAboutUs,
getForthYear, createForthYear, updateForthYear, deleteForthYear, createCoreValue, getCoreValue, updateCoreValue, deleteCoreValue,
createSpotlite, getSpotlite, updateSpotlite, deleteSpotlite,
}