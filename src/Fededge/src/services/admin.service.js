import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status"
import { FededgeBlog } from "../models/blog.model.js";
import KeyAchievement from "../models/keyAchievement.model.js";
import FededgeTeam from "../models/team.model.js";
import { FededgeReview } from "../models/review.model.js";
import Mission from "../models/achievement.model.js";
import RunningText from "../models/runningText.model.js";
import Service from "../models/service.model.js";
import Achievement from "../models/achievement.model.js";
import ServiceDetail from "../models/serviceDetails.model.js";
import PopularCategory from "../models/popularCategory.model.js";
import PopularTag from "../models/popularTag.model.js";
import { FededgeAboutUs} from "../models/aboutUs.model.js";
import FededgeFaq from "../models/faq.model.js";
import FededgeWhyChooseUs from "../models/label.model.js";
import FededgeContact from "../models/contactUs.model.js";


    const createKeyAchievement = async (aboutUsData) => {
      if (!aboutUsData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
      if (!aboutUsData.counting) throw new ApiError(httpStatus.BAD_REQUEST, 'Counting is required!');
    
    
      return KeyAchievement.create(aboutUsData);
    };
    

const getKeyAchievement = async() => {
  return KeyAchievement.find();
};

const updateKeyAchievement = async (id, aboutUsData) => {
  const existingAboutUs = await KeyAchievement.findOne({name : aboutUsData?.name})
  if (existingAboutUs) {
  throw new ApiError(httpStatus.BAD_REQUEST, `Achievement with name "${aboutUsData.name}" already exists.`);
}
const updateData = await KeyAchievement.findByIdAndUpdate(id,aboutUsData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
     return updateData;
};

const deleteKeyAchievement = async (id) => {
  const deleteId = await KeyAchievement.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
     return  deleteId;
   };                     

   const createAboutUsMainPage = async (data) => {
    const { title, image1, image2, description } = data;
  
    if (!image2 || !title || !image1 || !description) {
      throw new Error('All fields are required!');
    }

    const existingAboutUs = await FededgeAboutUs.findOne();
  
    if (existingAboutUs) {
      return FededgeAboutUs.findByIdAndUpdate(
        existingAboutUs._id,
        { title, image1, image2, description },
        { new: true, runValidators: true } 
      );
    }
  

    return FededgeAboutUs.create({ title, image1, image2, description});
  };
  
    
  
  const getAboutUsMainPage = async() => {
    return FededgeAboutUs.find();
  };
  
  const getAboutUsByIdMain = async(id) => {
      return FededgeAboutUs.findById(id);
  };
  
  const updateAboutUsMainPage = async (id, aboutUsData) => {
  const updateData = await FededgeAboutUs.findByIdAndUpdate(id,aboutUsData,{new:true});
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
    if(!blogData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
    const existingBlog = await FededgeBlog.findOne({title: blogData?.title});
    if(existingBlog) {
      throw new ApiError(httpStatus.BAD_REQUEST, `FededgeBlog with title "${existingBlog}" already exists.`);
    }
  
    return FededgeBlog.create(blogData);
  };
  
  const getBlog = async() => {
    return FededgeBlog.find();
  };
  
  const updateBlog = async (id, blogData) => {
  const updateData = await FededgeBlog.findByIdAndUpdate(id,blogData,{new:true});
    if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'FededgeBlog not found');
       return updateData;
  };
  
  const deleteBlog = async (id) => {
    const deleteId = await FededgeBlog.findByIdAndDelete(id);
    if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'FededgeBlog not found');
       return  deleteId;
     };

       const createTextLine = async (textData) => {
        if (!textData.text) throw new ApiError(httpStatus.BAD_REQUEST, 'text is required!');

         return RunningText.create(textData);
       };
    
    const getTextLine = async () => {
         return  RunningText.find();
       };
    
    const updateTextLine = async (id, textData) => {
     
      const updateData = await RunningText.findByIdAndUpdate(id,textData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
    
    const deleteTextLine = async (id) => {
      const deleteId = await RunningText.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };
  
       const createTeam = async (teamData) => {
        if (!teamData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
        if (!teamData.role) throw new ApiError(httpStatus.BAD_REQUEST, 'Role is required!');
        if (!teamData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
      
        return FededgeTeam.create(teamData);
      };
      
      const getTeam = async () => {
        return FededgeTeam.find();
      };
      
      const getTeamById = async (id) => {
        const team = await FededgeTeam.findById(id);
        if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'FededgeTeam not found!');
      
        return team;
      };
      
      const updateTeam = async (id, teamData) => {
        const team = await FededgeTeam.findByIdAndUpdate(id, teamData, { new: true });
          if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'FededgeTeam not found!');
          return team;
      };
      
      const deleteTeam = async (id) => {
        const deleteId = await FededgeTeam.findByIdAndDelete(id);
        if(deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'FededgeTeam not found');
        return deleteId;
      };

      const createFeedback = async (feedbackData) => {
        if(!feedbackData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
        if(!feedbackData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!')
      
          return FededgeReview.create(feedbackData);
      };


      const getFeedbacks = async () => {
        return FededgeReview.find();
      };
      
      const updateFeedback = async (id, feedbackData) => {
        const updateData = await FededgeReview.findByIdAndUpdate(id, feedbackData, {new: true});
        if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return updateData;
      };
      
      const deleteFeedback = async (id) => {
        const deleteId =  await FededgeReview.findByIdAndDelete(id);
        if (deleteId === null ) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
        return deleteId;
      };

      const createFaq = async (attributeData) => {
        if (!attributeData.question) throw new ApiError(httpStatus.BAD_REQUEST, 'question is required!');
        if (!attributeData.answer) throw new ApiError(httpStatus.BAD_REQUEST, 'answer is required!');
        const existingCategory = await FededgeFaq.findOne({question : attributeData?.question})
        if (existingCategory) {
        throw new ApiError(httpStatus.BAD_REQUEST, `FAQ with question "${attributeData.question}" already exists.`);
      }
      return FededgeFaq.create(attributeData);
      
      };

      const getFaqs = async () => {
        return  FededgeFaq.find();
      };
      
      const updateFaq = async (id, attributeData) => {
        const updateData = await FededgeFaq.findByIdAndUpdate(id,attributeData,{new:true});
        if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
           return updateData;
         };
      
      
      const deleteFaq = async (id) => {
      const deleteId = await FededgeFaq.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
        return  deleteId;
      };

       const createPopularCategory = async (visionData) => {
        if (!visionData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
         return PopularCategory.create(visionData);
       };
      
      const getPopularCategory = async () => {
         return  PopularCategory.find();
       };
      
      const updatePopularCategory = async (id, visionData) => {
      const updateData = await PopularCategory.findByIdAndUpdate(id,visionData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
         return updateData;
       };
      
      const deletePopularCategory = async (id) => {
      const deleteId = await PopularCategory.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
         return  deleteId;
       };

       const createWhyChooseUs = async (data) => {
        if (!data.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
        if (!data.text) throw new ApiError(httpStatus.BAD_REQUEST, 'text is required!');
        if (!data.icon) throw new ApiError(httpStatus.BAD_REQUEST, 'icon is required!');
         return FededgeWhyChooseUs.create(data);
       };
      
      const getWhyChooseUs = async () => {
         return  FededgeWhyChooseUs.find();
       };
      
      const updateWhyChooseUs = async (id, data) => {
      const updateData = await FededgeWhyChooseUs.findByIdAndUpdate(id,data,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'data not found');
         return updateData;
       };
      
      const deleteWhyChooseUs = async (id) => {
      const deleteId = await FededgeWhyChooseUs.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'data not found');
         return  deleteId;
       };
       const createServiceDetail = async (serviceData) => {
        if (!serviceData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
        if (!serviceData.subTitle) throw new ApiError(httpStatus.BAD_REQUEST, 'subTitle is required!');
        if (!serviceData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'description is required!');
        if (!serviceData.subDescription) throw new ApiError(httpStatus.BAD_REQUEST, 'subDescription is required!');

        if(!serviceData?.serviceId) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Service is  required!');
        }
        else {
          if(serviceData?.serviceId) {
            const findCatId = await Service.findById(serviceData?.serviceId)
            if (findCatId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
          } 
        }

         return ServiceDetail.create(serviceData);
       };
      
      const getServiceDetail = async () => {
         return  ServiceDetail.find();
       };
      
      const updateServiceDetail = async (id, serviceData) => {
      const updateData = await ServiceDetail.findByIdAndUpdate(id,serviceData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
      
      const deleteServiceDetail = async (id) => {
      const deleteId = await ServiceDetail.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };

       const createService = async (serviceData) => {
        if (!serviceData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'title is required!');
        if (!serviceData.icon) throw new ApiError(httpStatus.BAD_REQUEST, 'Icon is required!');
        if (!serviceData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'description is required!');
        const existingCategory = await Service.findOne({title : serviceData?.title})
        if (existingCategory) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Service with title "${serviceData.title}" already exists.`);
      }
         return Service.create(serviceData);
       };
    
    const getService = async () => {
         return  Service.find();
       };
    
    const updateService = async (id, serviceData) => {
      const existingCategory = await Service.findOne({title : serviceData?.title})
      if (existingCategory) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Service with title "${serviceData.title}" already exists.`);
    }
      const updateData = await Service.findByIdAndUpdate(id,serviceData,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
    
    const deleteService = async (id) => {
      const deleteId = await Service.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };

       const createAchievement = async (data) => {
        if (!data.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
        const existingCategory = await Achievement.findOne({name : data?.name})
        if (existingCategory) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Tag with name "${data.name}" already exists.`);
      }
         return Achievement.create(data);
       };
    
    const getPopularTag = async () => {
         return  PopularTag.find();
       };
    
    const updatePopularTag = async (id, data) => {
      const updateData = await PopularTag.findByIdAndUpdate(id,data,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
    
    const deletePopularTag = async (id) => {
      const deleteId = await PopularTag.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };

       const createPopularTag = async (data) => {
        if (!data.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
        const existingCategory = await Achievement.findOne({name : data?.name})
        if (existingCategory) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Achievement with name "${data.name}" already exists.`);
      }
         return Achievement.create(data);
       };
    
    const getAchievement = async () => {
         return  Achievement.find();
       };
    
    const updateAchievement = async (id, data) => {
      const updateData = await Achievement.findByIdAndUpdate(id,data,{new:true});
      if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return updateData;
       };
    
    const deleteAchievement = async (id) => {
      const deleteId = await Achievement.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
         return  deleteId;
       };
       const deleteContactUs = async (id) => {
        const deleteId = await FededgeContact.findByIdAndDelete(id);
        if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
           return  deleteId;
         };

         const getAllContacts = async () => {
          return await FededgeContact.find().sort({ createdAt: -1 });
        };
        
    
      
export default {
createKeyAchievement, getKeyAchievement, updateKeyAchievement, deleteKeyAchievement,
createBlog, getBlog, updateBlog, deleteBlog,
createAboutUsMainPage, getAboutUsMainPage, getAboutUsByIdMain, updateAboutUsMainPage, deleteAboutUsMainPage,
createTextLine, getTextLine, updateTextLine, deleteTextLine, createTeam, getTeam, getTeamById, updateTeam, deleteTeam,
createFeedback, getFeedbacks, updateFeedback, deleteFeedback, createFaq, getFaqs, updateFaq, deleteFaq,
createPopularCategory, getPopularCategory, updatePopularCategory, deletePopularCategory,
createWhyChooseUs, getWhyChooseUs, updateWhyChooseUs, deleteWhyChooseUs, createServiceDetail, getServiceDetail, updateServiceDetail, deleteServiceDetail,
createService, getService, updateService, deleteService, createAchievement, getAchievement, updateAchievement, deleteAchievement,
createPopularTag, getPopularTag, updatePopularTag, deletePopularTag, deleteContactUs, getAllContacts,
}