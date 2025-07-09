import PackageCategory from "../models/packageCategory.model.js"  
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status"
import HolidayPackage from "../models/holidayPackages.model.js";
import Hotel from "../models/hotel.model.js";
import HotelPrice from "../models/price.model.js";
import InquiryForm from "../models/inquiryForm.model.js";
import CuckooBanner from "../models/banner.model.js";
import Included from "../models/included.model.js";
import Room from "../models/room.model.js";
import CuckooContactUs from "../models/contactUs.model.js";
import Visa from "../models/visaInquirymodel.js";
import Passport from "../models/passportInquiry.model.js";
import Country from "../models/country.model.js";
import CuckooTag from "../models/tag.model.js";
import Package from "../models/package.model.js";
import CuckooBlog from "../models/blog.model.js";
import CuckooBlogDetails from "../models/blogDetails.model.js";
import CuckooAboutUs from "../models/aboutus.model.js";
import CuckooFAQ from "../models/faq.model.js";
import CuckooVisaExpert from "../models/visaExport.model.js";
import CuckooTestimonial from "../models/testimonial.model.js";
import CuckooGateway from "../models/visaGateway.model.js";
import VisaInquiryForm from "../models/visaInquiry.model.js";
import PassPortInquiryForm from "../models/passportForm.model.js";
import GellaryImage from "../models/gellary.model.js";
import CustomerForm from "../models/customer.model.js";
import CuckooTheme from "../models/theme.model.js";

const createCategory = async (categoryData) => {
    if (!categoryData.packageName) throw new ApiError(httpStatus.BAD_REQUEST, 'packageName is required!');
    const existingCategory = await PackageCategory.findOne({packageName : categoryData?.packageName})
    if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `PackageCategory with packageName "${categoryData.packageName}" already exists.`);
  }
     return PackageCategory.create(categoryData);
   };

const getCategories = async () => {
     return  PackageCategory.find();
   };

const updateCategory = async (id, categoryData) => {
  const updateData = await PackageCategory.findByIdAndUpdate(id,categoryData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'PackageCategory not found');
     return updateData;
   };

const deleteCategory = async (id) => {
  const deleteId = await PackageCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'PackageCategory not found');
     return  deleteId;
   };

   const createHolidayPackage = async (data) => {
   return await HolidayPackage.create(data);
   };

const getHolidayPackages = async () => {
     return  HolidayPackage.find().populate('categoryId inquiry banner');
   };

   const getHolidayPackagesByCategory = async (packageId) => {
    try {
      const holidayPackages = await HolidayPackage.find({ packageId })
        .populate("included")
        .populate("inquiry")
        .populate("banner")
        .populate("reviews");
  
      if (!holidayPackages.length) {
        throw new Error("No holiday packages found for the given packageId.");
      }
  
      return holidayPackages;
    } catch (error) {
      console.error("Error fetching holiday packages:", error);
      throw new Error("Failed to fetch holiday packages.");
    }
  };
const updateHolidayPackage = async (id, categoryData) => {
  if(categoryData?.categoryId) {
    const findCategory =await KKCategory.findById(categoryData?.categoryId);
    if (!findCategory) throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  
  const updateData = await HolidayPackage.findByIdAndUpdate(id,categoryData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'HolidayPackage not found');
     return updateData;
   };

const deleteHolidayPackage = async (id, ) => {
  const deleteId = await HolidayPackage.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'HolidayPackage not found');
     return  deleteId;
   };

const getRelatedProducts = async (packageId, categoryId, limit = 5) => {
    try {
      const relatedProducts = await HolidayPackage.find({
        categoryId,
        _id: { $ne: packageId }, 
      })
        .limit(limit)
        .select("name coverImage duration price discountPrice rating"); 
      return relatedProducts;
    } catch (error) {
      console.error("Error fetching related products:", error.message);
      throw new Error("Failed to fetch related products");
    }
};

const createVisaEnquiry = async (data) => {
    return await Visa.create(data);
   };

   const getVisaEnquiry = async () => {
    return Visa.find().populate("country");
  };

  const getVisaByCountry = async (countryId) => {
    const visa = await Visa.find({ country: countryId }).populate("country");
      return visa;
  };
    
const updateVisaEnquiry = async (id, productData) => {
 
  const updateData = await Visa.findByIdAndUpdate(id,productData,{new:true});
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Visa or Passport not found');
     return updateData;
   };

   const deleteVisaEnquiry = async (id) => {
    const deleteId = await Visa.findByIdAndDelete(id);
    if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Visa or Passport not found');
       return  deleteId;
     };

     const createPassportInquiry = async (data) => {
      return await Passport.create(data);
     };
  
     const getPassportInquiry = async () => {
      return Passport.find();
    };
  
  const updatePassportInquiry = async (id, productData) => {
   
    const updateData = await Passport.findByIdAndUpdate(id,productData,{new:true});
    if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Passport or Passport not found');
       return updateData;
     };
  
     const deletePassportInquiry = async (id) => {
      const deleteId = await Passport.findByIdAndDelete(id);
      if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Visa or Passport not found');
         return  deleteId;
       };

     const createHotel = async (data) => {
      return await Hotel.create(data);
    };
    
     const getAllHotels = async () => {
      return await Hotel.find();
    };
    
     const getHotelById = async (id) => {
      return await Hotel.findById(id);
    };
    
     const updateHotel = async (id, data) => {
      return await Hotel.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteHotel = async (id) => {
      return await Hotel.findByIdAndDelete(id);
    };

    
    const createHotelPrice = async (data) => {
      return await HotelPrice.create(data);
    };
    
     const getAllPrice = async () => {
      return await HotelPrice.find().populate('hotelId');
    };
    
    const getPriceByHotel = async (hotelId) => {
      try {
        return await HotelPrice.find({ hotelId }).populate('hotelId');
      } catch (error) {
        throw new Error(`Error fetching price by HotelId: ${error.message}`);
      }
    };

     const updateHotelPrice = async (id, data) => {
      return await HotelPrice.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteHotelPrice = async (id) => {
      return await HotelPrice.findByIdAndDelete(id);
    };

    const createEnquiry = async (data) => {
      return await InquiryForm.create(data);
    };
    
     const getAllEnquiries = async () => {
      return await InquiryForm.find();
    };
    
     const getEnquiryById = async (id) => {
      return await InquiryForm.findById(id);
    };
    
     const updateEnquiry = async (id, data) => {
      return await InquiryForm.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteEnquiry = async (id) => {
      return await InquiryForm.findByIdAndDelete(id);
    };

    const createBanner = async (data) => {
      return await CuckooBanner.create(data);
    };
    
     const getAllBanners = async () => {
      return await CuckooBanner.find();
    };
    
     const getBanerById = async (id) => {
      return await CuckooBanner.findById(id);
    };
    
     const updateBanner = async (id, data) => {
      return await CuckooBanner.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteBanner = async (id) => {
      return await CuckooBanner.findByIdAndDelete(id);
    };
    
    
    const createIncluded = async (data) => {
      return await Included.create(data);
    };
    
     const getAllIncluded = async () => {
      return await Included.find();
    };
    
     const getIncludedById = async (id) => {
      return await Included.findById(id);
    };
    
     const updateIncluded = async (id, data) => {
      return await Included.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteIncluded = async (id) => {
      return await Included.findByIdAndDelete(id);
    };

    const createRoom = async (data) => {
      return await Room.create(data);
    };
    
     const getAllRooms = async () => {
      return await Room.find();
    };
    
     const getRoomById = async (id) => {
      return await Room.findById(id);
    };
    
     const updateRoom = async (id, data) => {
      return await Room.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteRoom = async (id) => {
      return await Room.findByIdAndDelete(id);
    };

     const getAllContactUs = async () => {
      return await CuckooContactUs.find();
    };
    
     const getContactUsById = async (id) => {
      return await CuckooContactUs.findById(id);
    };
    
     const updateContactUs = async (id, data) => {
      return await CuckooContactUs.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteContactUs = async (id) => {
      return await CuckooContactUs.findByIdAndDelete(id);
    };

    const createCountry = async (data) => {
      return await Country.create(data);
    };
    
     const getAllCountries = async () => {
      return await Country.find();
    };
    
     const getCountryById = async (id) => {
      return await Country.findById(id);
    };
    
     const updateCountry = async (id, data) => {
      return await Country.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteCountry = async (id) => {
      return await Country.findByIdAndDelete(id);
    };

    const createTag = async (data) => {
      return await CuckooTag.create(data);
    };
    
     const getAllTags = async () => {
      return await CuckooTag.find();
    };
    
     const getTagById = async (id) => {
      return await CuckooTag.findById(id);
    };
    
     const updateTag = async (id, data) => {
      return await CuckooTag.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteTag = async (id) => {
      return await CuckooTag.findByIdAndDelete(id);
    };

    const createBlog = async (data) => {
      return await CuckooBlog.create(data);
    };
    
     const getAllBlogs = async () => {
      return await CuckooBlog.find();
    };
    
     const getBlogById = async (id) => {
      return await CuckooBlog.findById(id);
    };
    
     const updateBlog = async (id, data) => {
      return await CuckooBlog.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteBlog = async (id) => {
      return await CuckooBlog.findByIdAndDelete(id);
    };


    const createPackage = async (data) => {
      return await Package.create(data);
    };
    
     const getAllPackages = async () => {
      return await Package.find().populate("packageType country tag");
    };
    
     const getPackageById = async (id) => {
      return await Package.findById(id);
    };
    
     const updatePackage = async (id, data) => {
      return await Package.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deletePackage = async (id) => {
      return await Package.findByIdAndDelete(id);
    };

    const getPackagesByCategory = async (categoryId) => {
      const packages = await Package.find({ packageType: categoryId }).populate("packageType country tag");
        return packages;
    }
      

    const createBlogDetails = async (data) => {
      return await CuckooBlogDetails.create(data);
    };
    
     const getAllBlogDetails = async () => {
      return await CuckooBlogDetails.find();
    };
    
     const updateBlogDetail = async (id, data) => {
      return await CuckooBlogDetails.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteBlogDetail = async (id) => {
      return await CuckooBlogDetails.findByIdAndDelete(id);
    };

    const getBlogDetailsByBlog = async (blogId) => {
      const blogdetails = await CuckooBlogDetails.find({ blog: blogId }).populate("blog");
        return blogdetails;
    };


    const createAboutUs = async (data) => {
      return await CuckooAboutUs.create(data);
    };

    const getAboutUs = async () => {
      return await CuckooAboutUs.find();
    };

    const createFaq = async (data) => {
      return await CuckooFAQ.create(data);
    };
    
     const getAllFaqs = async () => {
      return await CuckooFAQ.find();
    };
    
     const updateFaq = async (id, data) => {
      return await CuckooFAQ.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteFaq = async (id) => {
      return await CuckooFAQ.findByIdAndDelete(id);
    };

    
    const createTestimonial = async (data) => {
      return await CuckooTestimonial.create(data);
    };
    
     const getAllTestimonials = async () => {
      return await CuckooTestimonial.find();
    };
    
     const updateTestimonial = async (id, data) => {
      return await CuckooTestimonial.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteTestimonial = async (id) => {
      return await CuckooTestimonial.findByIdAndDelete(id);
    };

    
    const createExpert = async (data) => {
      return await CuckooVisaExpert.create(data);
    };
    
     const getAllExperts = async () => {
      return await CuckooVisaExpert.find();
    };
    
     const updateExpert = async (id, data) => {
      return await CuckooVisaExpert.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteExpert = async (id) => {
      return await CuckooVisaExpert.findByIdAndDelete(id);
    };

    
    const createGateway = async (data) => {
      return await CuckooGateway.create(data);
    };
    
     const GetAllGateways = async () => {
      return await CuckooGateway.find();
    };
    
     const updateGateway = async (id, data) => {
      return await CuckooGateway.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteGateway = async (id) => {
      return await CuckooGateway.findByIdAndDelete(id);
    };

       
    const createVisaForm = async (data) => {
      return await VisaInquiryForm.create(data);
    };
    
     const getAllVisaForm = async () => {
      return await VisaInquiryForm.find();
    };
    
     const updateVisaForm = async (id, data) => {
      return await VisaInquiryForm.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteVisaForm = async (id) => {
      return await VisaInquiryForm.findByIdAndDelete(id);
    };

    const createPassportForm = async (data) => {
      return await PassPortInquiryForm.create(data);
    };
    
     const getAllPassportForm = async () => {
      return await PassPortInquiryForm.find();
    };
    
     const updatePassportForm = async (id, data) => {
      return await PassPortInquiryForm.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deletePassportForm = async (id) => {
      return await PassPortInquiryForm.findByIdAndDelete(id);
    };

    const createImage = async (data) => {
      return await GellaryImage.create(data);
    };
    
     const getAllImages = async () => {
      return await GellaryImage.find();
    };
    
     const updateImage = async (id, data) => {
      return await GellaryImage.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteImage = async (id) => {
      return await GellaryImage.findByIdAndDelete(id);
    };

    const getPackagesByCountry = async (countryId) => {
      try {
        const packages = await Package.find({ country: countryId })
          .populate("packageType")
          .populate("tag")
          .populate("country");
    
        if (!packages.length) {
          throw new Error("No holiday packages found for the given country.");
        }
    
        return packages;
      } catch (error) {
        console.error("Error fetching holiday packages:", error);
        throw new Error("Failed to fetch holiday packages.");
      }
    };

    const getPackagesByTag = async (tagId) => {
      try {
        const packages = await Package.find({ tag: tagId })
          .populate("packageType")
          .populate("tag")
          .populate("country");
    
        if (!packages.length) {
          throw new Error("No holiday packages found for the given tag.");
        }
    
        return packages;
      } catch (error) {
        console.error("Error fetching holiday packages by tag:", error);
        throw new Error("Failed to fetch holiday packages.");
      }
    };

    const getPackagesByPrice = async (minPrice, maxPrice) => {
      try {
        const packages = await Package.find({
          price: { $gte: minPrice, $lte: maxPrice }
        })
          .populate("packageType")
          .populate("tag")
          .populate("country");
    
        if (!packages.length) {
          throw new Error("No holiday packages found in the given price range.");
        }
    
        return packages;
      } catch (error) {
        console.error("Error fetching holiday packages by price:", error);
        throw new Error("Failed to fetch holiday packages.");
      }
    };

    const getPackagesByDuration = async (duration) => {
      try {
        let filter = {};
    
        if (duration) {
          if (duration === "1") filter.duration = "1 Day";
          else if (duration === "2-3") filter.duration = { $in: ["2 Days", "3 Days"] };
          else if (duration === "3-5") filter.duration = { $in: ["3 Days", "4 Days", "5 Days"] };
          else if (duration === "5-7") filter.duration = { $in: ["5 Days", "6 Days", "7 Days"] };
          else if (duration === "7+") filter.duration = { $regex: /[8-9]+ Days/, $options: "i" };
        }
    
        const packages = await Package.find(filter);
        return packages;
      } catch (error) {
        console.error("Error fetching packages by duration:", error);
        throw new Error("Failed to fetch packages");
      }
    };

    const createCustomer = async (data) => {
      return await CustomerForm.create(data);
    };
    
     const getAllCustomer = async () => {
      return await CustomerForm.find();
    };
    
     const updateCustomer = async (id, data) => {
      return await CustomerForm.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteCustomer = async (id) => {
      return await CustomerForm.findByIdAndDelete(id);
    };


    const createTheme = async (data) => {
      return await CuckooTheme.create(data);
    };
    
     const getAllThemes = async () => {
      return await CuckooTheme.find();
    };
    
     const updateTheme = async (id, data) => {
      return await CuckooTheme.findByIdAndUpdate(id, data, { new: true });
    };
    
    const deleteTheme = async (id) => {
      return await CuckooTheme.findByIdAndDelete(id);
    };


 export default {createCategory,getCategories,updateCategory,deleteCategory, createHolidayPackage, getHolidayPackages, getHolidayPackagesByCategory, updateHolidayPackage, deleteHolidayPackage,
createVisaEnquiry,getVisaEnquiry,updateVisaEnquiry,deleteVisaEnquiry, createHotel, getAllHotels, getHotelById, updateHotel, deleteHotel, createHotelPrice, getAllPrice, getPriceByHotel, updateHotelPrice, deleteHotelPrice,
createEnquiry, getAllEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry, createBanner, getAllBanners, getBanerById, updateBanner, deleteBanner, getRelatedProducts,
createPassportInquiry, getPassportInquiry, updatePassportInquiry, deletePassportInquiry, createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry,
createIncluded, getAllIncluded, getIncludedById, updateIncluded, deleteIncluded, createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom, 
getContactUsById, getAllContactUs, updateContactUs, deleteContactUs, createTestimonial, getAllTestimonials, updateTestimonial, deleteTestimonial,
createTag, getAllTags, getTagById, updateTag, deleteTag, createPackage, getAllPackages, getPackageById, updatePackage, deletePackage, getPackagesByCategory,
createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, createBlogDetails, getAllBlogDetails, updateBlogDetail, createBlogDetails, 
getAllBlogDetails, updateBlogDetail, deleteBlogDetail, getBlogDetailsByBlog, createAboutUs, getAboutUs, createFaq, getAllFaqs, updateFaq, deleteFaq,
createExpert, getAllExperts, updateExpert, deleteExpert, createGateway, GetAllGateways, updateGateway, deleteGateway, createVisaForm, getAllVisaForm, updateVisaForm, deleteVisaForm,
createPassportForm, getAllPassportForm, updatePassportForm, deletePassportForm, getVisaByCountry, createImage, getAllImages, updateImage, deleteImage,
getPackagesByCountry, getPackagesByPrice, getPackagesByDuration, getPackagesByTag, createCustomer, getAllCustomer, updateCustomer, deleteCustomer,
createTheme, getAllThemes, updateTheme, deleteTheme,
}