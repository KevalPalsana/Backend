import HotelCategory from "../models/category.model.js"
import { ApiError } from "../utils/ApiError.js";
import SubCategory from "../models/subCategory.model.js"
import httpStatus from "http-status"
import { SliderImage } from "../models/slider.model.js";
import { BasaltHandpicked } from "../models/handpick.model.js";
import { HotelAboutUs } from "../models/aboutus.model.js";
import GalleryCategory from "../models/gallerycategory.js";
import { GalleryImages } from "../models/galleryImage.model.js";
import GalleryTitle from "../models/galleryTitle.model.js";
import { Facilities } from "../models/facility.model.js";
import { Amenities } from "../models/amenities.model.js";
import { CalculativeSection } from "../models/calulativeSection.model.js";
import { DarshanTiming } from "../models/darshanTiming.model.js";
import { SpecialDatesTiming } from "../models/SpecialDatesTiming.model.js";
import { LifeAtBP } from "../models/lifeAtBP.model.js";
import { Feedback } from "../models/feedback.model.js";
import Offer from "../models/offer.model.js";
import BasaltGallery from "../models/basaltGallery.model.js";
import MenuCategory from "../models/menuCategory.model.js";
import MenuItem from "../models/menuItem.model.js";
import { AdminFeedback } from "../models/adminFeedback.model.js";
import PrivacyPolicy from "../models/privacypolicy.model.js";
import { HotelBlog } from "../models/blog.model.js";
import { SubBlog } from "../models/subblog.js";
import { ContactUs } from "../models/contactUs.model.js";
import WalletAmount from "../models/walletAmount.model.js";
import { SecondSectionTitle } from "../models/secondSection.model.js";
import { SecondSection } from "../models/secondSectionSchema.model.js";
import { SpotLite } from "../models/spotlite.model.js";
import { AmenitiesSubCategory } from "../models/amenitiesSubCategory.model.js";
import { AmenitiesOption } from "../models/amenitiesOption.model.js";
import BasaltFAQ from "../models/faq.model.js";
import BasaltTestimonial from "../models/testimonial.model.js";
import BasaltBanner from "../models/banner.model.js";
import BasaltRoom from "../models/room.model.js";
import { SpecialTeriff } from "../models/specialTeriff.model.js";
import RazorPay from "../models/razorPay.model.js";
import { ExtraCharge } from "../models/extra.model.js";




const createGalleryTitle = async (galleryTitleData) => {
  if (!galleryTitleData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingCategory = await GalleryTitle.findOne({ name: galleryTitleData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Gallary with title "${galleryTitleData.name}" already exists.`);
  }
  return GalleryTitle.create(galleryTitleData);
};

const getGalleryTitle = async () => {
  return GalleryTitle.find();
};

const updateGalleryTitle = async (id, galleryTitleData) => {
  const existingCategory = await GalleryTitle.findOne({ name: galleryTitleData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Gallery with name "${galleryTitleData.name}" already exists.`);
  }
  const updateData = await GalleryTitle.findByIdAndUpdate(id, galleryTitleData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Gellary not found');
  return updateData;
};

const deleteGalleryTitle = async (id) => {
  const deleteId = await GalleryTitle.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Gallery not found');
  return deleteId;
};


const createGalleryCategory = async (galleryCategoryData) => {
  if (!galleryCategoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingCategory = await GalleryCategory.findOne({ name: galleryCategoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Gallary with title "${galleryCategoryData.name}" already exists.`);
  }
  return GalleryCategory.create(galleryCategoryData);
};

const getGalleryCategory = async () => {
  return GalleryCategory.find();
};

const updateGalleryCategory = async (id, galleryCategoryData) => {
  const existingCategory = await GalleryCategory.findOne({ name: galleryCategoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Gallery with name "${galleryCategoryData.name}" already exists.`);
  }
  const updateData = await GalleryCategory.findByIdAndUpdate(id, galleryCategoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Gellary not found');
  return updateData;
};

const deleteGalleryCategory = async (id) => {
  const deleteId = await GalleryCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Gallery not found');
  return deleteId;
};

const createNewLineMotion = async (newsLineData) => {
  if (!newsLineData.text) throw new ApiError(httpStatus.BAD_REQUEST, 'Text is required!');
  const existingBasaltHandpicked = await BasaltHandpicked.findOne({ name: newsLineData?.text });
  if (existingBasaltHandpicked) {
    throw new ApiError(httpStatus.BAD_REQUEST, `NewsLine with text "${existingBasaltHandpicked}" already exists.`);
  }

  return BasaltHandpicked.create(newsLineData);
};

const getBasaltHandpicked = async () => {
  return BasaltHandpicked.find();
};

const getBasaltHandpickedById = async (id) => {
  return BasaltHandpicked.findById(id);
};

const updateBasaltHandpicked = async (id, newsLineData) => {
  const existingCategory = await BasaltHandpicked.findOne({ text: newsLineData?.text })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `NewsLine with text "${newsLineData.text}" already exists.`);
  }
  const updateData = await BasaltHandpicked.findByIdAndUpdate(id, newsLineData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'NewsLine not found');
  return updateData;
};

const deleteBasaltHandpicked = async (id) => {
  const deleteId = await BasaltHandpicked.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'NewsLine not found');
  return deleteId;
};

const createAboutUsPage = async (aboutUsData) => {
  if (!aboutUsData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
  if (!aboutUsData.subTitle) throw new ApiError(httpStatus.BAD_REQUEST, 'SubTitle is required!');
  if (!aboutUsData.text) throw new ApiError(httpStatus.BAD_REQUEST, 'Text is required!');
  if (!aboutUsData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');

  return HotelAboutUs.create(aboutUsData);
};

const getAboutUsPage = async () => {
  return HotelAboutUs.find();
};

const getAboutUsById = async (id) => {
  return HotelAboutUs.findById(id);
};

const updateAboutUsPage = async (id, aboutUsData) => {
  const updateData = await HotelAboutUs.findByIdAndUpdate(id, aboutUsData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return updateData;
};

const deleteAboutUsPage = async (id) => {
  const deleteId = await HotelAboutUs.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return deleteId;
};

const createGalleryImage = async (galleryData) => {
  if (!galleryData.galleryImages) throw new ApiError(httpStatus.BAD_REQUEST, "Gallery image is required!");
  if (!galleryData?.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is  required!');

  return GalleryImages.create(galleryData);
};

const getGalleryImages = async () => {
  return GalleryImages.find();
};

const updateGalleryImage = async (id, galleryData) => {
  const updateData = await GalleryImages.findByIdAndUpdate(id, galleryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Gallery image not found');
  return updateData;
};

const deleteGalleryImage = async (id) => {
  const deleteId = await GalleryImages.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Gallery image not found');
  return deleteId;
}

const createCategory = async (categoryData) => {
  if (!categoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingCategory = await HotelCategory.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `HotelCategory with name "${categoryData.name}" already exists.`);
  }
  return HotelCategory.create(categoryData);
};

const getCategories = async () => {
  return HotelCategory.find();
};

const updateCategory = async (id, categoryData) => {
  const existingCategory = await HotelCategory.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `HotelCategory with name "${categoryData.name}" already exists.`);
  }
  const updateData = await HotelCategory.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'HotelCategory not found');
  return updateData;
};

const deleteCategory = async (id) => {
  const deleteId = await HotelCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'HotelCategory not found');
  return deleteId;
};

const createSubCategory = async (categoryData) => {
  if (!categoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  if (!categoryData.categoryId) throw new ApiError(httpStatus.BAD_REQUEST, 'category id is required!');
  const existingCategory = await SubCategory.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Sub HotelCategory with name "${categoryData.name}" already exists.`);
  }
  const findCategory = await HotelCategory.findById(categoryData?.categoryId);
  if (!findCategory) throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  return SubCategory.create(categoryData);
};

const getSubCategories = async () => {
  return SubCategory.find();
};

const updateSubCategory = async (id, categoryData) => {
  const existingCategory = await SubCategory.findOne({ name: categoryData?.name })
  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Sub HotelCategory with name "${categoryData.name}" already exists.`);
  }
  if (categoryData?.categoryId) {
    const findCategory = await HotelCategory.findById(categoryData?.categoryId);
    if (!findCategory) throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }

  const updateData = await SubCategory.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  return updateData;
};

const deleteSubCategory = async (id,) => {
  const deleteId = await SubCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  return deleteId;
};

const createProduct = async (productData) => {
  if (!productData.name) throw new ApiError(httpStatus.BAD_REQUEST, "Name is required!");
  if (!productData.price) throw new ApiError(httpStatus.BAD_REQUEST, "Price is required!");
  if (!productData.totalRooms) throw new ApiError(httpStatus.BAD_REQUEST, "TotalRooms is required!");

  const existingProduct = await BasaltRoom.findOne({ name: productData.name });
  if (existingProduct) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Product with name "${productData.name}" already exists.`
    );
  }
  if (productData.amenities && productData.amenities.length > 0) {
    const invalidAmenities = [];

    const validatedAmenities = await Promise.all(
      productData.amenities.map(async (amenity) => {
        const amenityExists = await Amenities.findById(amenity.amenityId);
        if (!amenityExists) {
          invalidAmenities.push(amenity.amenityId);
          return null;
        }

        const validatedSubCategories = await Promise.all(
          (amenity.subCategories || []).map(async (subCategory) => {
            const subCategoryExists = await AmenitiesSubCategory.findById(
              subCategory.subCategoryId
            );
            if (!subCategoryExists) {
              invalidAmenities.push(subCategory.subCategoryId);
            }
            return {
              subCategoryId: subCategory.subCategoryId,
              option: subCategory.option || null,
            };
          })
        );

        return {
          amenityId: amenity.amenityId,
          subCategories: validatedSubCategories.filter(Boolean),
        };
      })
    );

    if (invalidAmenities.length > 0) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `The following IDs are invalid: ${invalidAmenities.join(", ")}`
      );
    };
    productData.amenities = validatedAmenities.filter(Boolean);
  }

  try {
    const newProduct = await BasaltRoom.create(productData);
    return {
      success: true,
      message: "Product created successfully.",
      data: newProduct,
    };
  } catch (error) {
    console.error("Error creating product:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create product.");
  }
};

const getProducts = async () => {
  return BasaltRoom.find()
    .populate('amenities.amenityId')
    .populate('amenities.subCategories.subCategoryId');
};


const getProductsById = async (id) => {
  return BasaltRoom.findById(id)
    .populate('amenities.amenityId')
    .populate('amenities.subCategories.subCategoryId');;
};

const updateProduct = async (id, productData) => {
  const existingProduct = await BasaltRoom.findOne({ name: productData?.name })
  if (existingProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Product with name "${productData.name}" already exists.`);
  }
  const updateData = await BasaltRoom.findByIdAndUpdate(id, productData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'HotelCategory not found');
  return updateData;
};

const deleteProduct = async (id,) => {
  const deleteId = await BasaltRoom.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'HotelCategory not found');
  return deleteId;
};


const getCategoryWiseProductCount = async () => {
  try {
    const categoryWiseCount = await BasaltRoom.aggregate([
      {
        $group: {
          _id: '$categoryId',
          productCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'hotelcategories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryDetails',
        },
      },
      {
        $project: {
          _id: 1,
          productCount: 1,
          categoryName: { $arrayElemAt: ['$categoryDetails.name', 0] },
        },
      },
    ]);

    return categoryWiseCount;
  } catch (error) {
    throw new Error(`Error fetching category-wise product count: ${error.message}`);
  }
};

const addSliderImage = async (imageData) => {
  if (!imageData.title) throw new ApiError(httpStatus.BAD_REQUEST, "Title is required");
  if (!imageData.date) throw new ApiError(httpStatus.BAD_REQUEST, "Date is required");
  const newSliderImage = new SliderImage({
    image: imageData.image,
    title: imageData.title,
    date: imageData.date
  });

  return await newSliderImage.save();
}

const getAllSliderImage = async () => {
  return await SliderImage.find();
};

const updateSliderImage = async (id, imageData) => {
  const updateData = await SliderImage.findByIdAndUpdate(id, imageData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return updateData;
};


const deleteSliderImage = async (id) => {
  const deletedSliderImage = await SliderImage.findByIdAndDelete(id);

  if (!deleteSliderImage) {
    throw new Error('Slider image not found');
  }

  return deletedSliderImage;
}

const createFacility = async (facilityData) => {
  if (!facilityData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  const existingFacility = await Facilities.findOne({ name: facilityData?.name });
  if (existingFacility) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Facility with name "${existingFacility}" already exists.`);
  }

  return Facilities.create(facilityData);
};

const getFacilities = async () => {
  return Facilities.find();
};

const updateFacility = async (id, facilityData) => {
  const existingFacility = await Facilities.findOne({ name: facilityData?.name })
  if (existingFacility) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Facility with name "${facilityData.name}" already exists.`);
  }
  const updateData = await Facilities.findByIdAndUpdate(id, facilityData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return updateData;
};

const deleteFacility = async (id) => {
  const deleteId = await Facilities.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return deleteId;
};

const createAmenities = async (amenitiesData) => {
  if (!amenitiesData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  const existingAmenities = await Amenities.findOne({ title: amenitiesData?.title });
  if (existingAmenities) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Amenities with name "${existingAmenities}" already exists.`);
  }

  return Amenities.create(amenitiesData);
};

const getAmenities = async () => {
  return Amenities.find();
};

const updateAmenities = async (id, amenitiesData) => {            
  const updateData = await Amenities.findByIdAndUpdate(id, amenitiesData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return updateData;
};

const deleteAmenities = async (id) => {
  const deleteId = await Amenities.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return deleteId;
};


const createCalculativeSection = async (calculateData) => {
  if (!calculateData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  if (!calculateData.countingNumber) throw new ApiError(httpStatus.BAD_REQUEST, ' Counting number is required!')
  const existingCalculation = await CalculativeSection.findOne({ name: calculateData?.name });
  if (existingCalculation) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Calculative with name "${existingCalculation}" already exists.`);
  }

  console.log('calculateData', calculateData)
  const createdDocument = await CalculativeSection.create(calculateData);
  console.log('Created Document:', createdDocument);

  return createdDocument;

};

const getCalculativeSection = async () => {
  return CalculativeSection.find();
};

const updateCalculativeSection = async (id, calculateData) => {
  const existingAmenities = await CalculativeSection.findOne({ name: calculateData?.name })
  if (existingAmenities) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Data with name "${calculateData.name}" already exists.`);
  }
  const updateData = await CalculativeSection.findByIdAndUpdate(id, calculateData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteCalculativeSection = async (id) => {
  const deleteId = await CalculativeSection.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};


const createDarshanTiming = async (darshanData) => {
  if (!darshanData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');


  return DarshanTiming.create(darshanData);
};

const getDarshanTiming = async () => {
  return DarshanTiming.find();
};

const updateDarshanTiming = async (id, darshanData) => {

  const updateData = await DarshanTiming.findByIdAndUpdate(id, darshanData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteDarshanTiming = async (id) => {
  const deleteId = await DarshanTiming.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};


const createSpecialDatesTiming = async (specialDatesTiming) => {
  if (!specialDatesTiming.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');

  return SpecialDatesTiming.create(specialDatesTiming);
};

const getSpecialDatesTiming = async () => {
  return SpecialDatesTiming.find();
};

const updateSpecialDatesTiming = async (id, specialDatesTiming) => {
  const updateData = await SpecialDatesTiming.findByIdAndUpdate(id, specialDatesTiming, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteSpecialDatesTiming = async (id) => {
  const deleteId = await SpecialDatesTiming.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createLifeAtBP = async (seeSightData) => {
  if (!seeSightData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Namet is required!');
  if (!seeSightData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!');
  const existingLifeAtBP = await LifeAtBP.findOne({ name: seeSightData?.name });
  if (existingLifeAtBP) {
    throw new ApiError(httpStatus.BAD_REQUEST, `LifeAtBP with name "${existingLifeAtBP}" already exists.`);
  }

  return LifeAtBP.create(seeSightData);
};

const getLifeAtBP = async () => {
  return LifeAtBP.find();
};

const updateLifeAtBP = async (id, seeSightData) => {
  const existingLifeAtBP = await LifeAtBP.findOne({ name: seeSightData?.name })
  if (existingLifeAtBP) {
    throw new ApiError(httpStatus.BAD_REQUEST, `LifeAtBP with name "${seeSightData.name}" already exists.`);
  }
  const updateData = await LifeAtBP.findByIdAndUpdate(id, seeSightData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteLifeAtBP = async (id) => {
  const deleteId = await LifeAtBP.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createFeedback = async (feedbackData) => {
  if (!feedbackData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  if (!feedbackData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!');

  return Feedback.create(feedbackData);
};

const getFeedbacks = async () => {
  return Feedback.find();
};

const updateFeedback = async (id, feedbackData) => {
  const updateData = await Feedback.findByIdAndUpdate(id, feedbackData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteFeedback = async (id) => {
  const deleteId = await Feedback.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createOffer = async (offerData) => {
  if (!offerData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');
  if (!offerData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');

  return Offer.create(offerData);
};

const getOffers = async () => {
  return Offer.find();
};

const updateOffer = async (id, offerData) => {
  const updateData = await Offer.findByIdAndUpdate(id, offerData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return updateData;
};

const deleteOffer = async (id) => {
  const deleteId = await Offer.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return deleteId;
};

const createBasaltGallery = async (imageData) => {
  if (!imageData.image) throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required!');

  return BasaltGallery.create(imageData);
};

const getBasaltGallerys = async () => {
  return BasaltGallery.find();
};

const updateBasaltGallery = async (id, imageData) => {
  const updateData = await BasaltGallery.findByIdAndUpdate(id, imageData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return updateData;
};

const deleteBasaltGallery = async (id) => {
  const deleteId = await BasaltGallery.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return deleteId;
};

const createMenuCategory = async (categoryData) => {
  if (!categoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required');
  const existingcategoryData = await MenuCategory.findOne({ name: categoryData?.name });
  if (existingcategoryData) {
    throw new ApiError(httpStatus.BAD_REQUEST, `MenuCategory with name ${categoryData?.name} is already exists.`);
  };

  return MenuCategory.create(categoryData);
};

const getMenuCategories = async () => {
  return MenuCategory.find();
};

const updateMenuCategory = async (id, categoryData) => {
  const existingcategoryData = await MenuCategory.findOne({ name: categoryData?.name });
  if (existingcategoryData) {
    throw new ApiError(httpStatus.BAD_REQUEST, `MenuCategory with name ${categoryData?.name} is already exists.`);
  };

  const updateData = await MenuCategory.findByIdAndUpdate(id, categoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return updateData;
};

const deleteMenuCategory = async (id) => {
  const deleteId = await MenuCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return deleteId;
};

const createMenuItem = async (menuItem) => {
  if (!menuItem.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required');
  if (!menuItem.price) throw new ApiError(httpStatus.BAD_REQUEST, 'Price is required');
  const existingcategoryData = await MenuItem.findOne({ name: menuItem?.name });
  if (existingcategoryData) {
    throw new ApiError(httpStatus.BAD_REQUEST, `MenuCategory with name ${menuItem?.name} is already exists.`);
  };

  if (!menuItem?.categoryId && !menuItem?.subCategoryId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'category is  required!');
  }
  else {
    if (menuItem?.categoryId) {
      const findCatId = await MenuCategory.findById(menuItem?.categoryId)
      if (findCatId === null) throw new ApiError(httpStatus.NOT_FOUND, 'HotelCategory not found');
    }
  }

  return MenuItem.create(menuItem);
};

const getMenuItems = async () => {
  return MenuItem.find();
};

const updateMenuItem = async (id, menuItem) => {
  const existingcategoryData = await MenuItem.findOne({ name: menuItem?.name });
  if (existingcategoryData) {
    throw new ApiError(httpStatus.BAD_REQUEST, `MenuItem with name ${menuItem?.name} is already exists.`);
  };

  const updateData = await MenuItem.findByIdAndUpdate(id, menuItem, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return updateData;
};

const deleteMenuItem = async (id) => {
  const deleteId = await MenuItem.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');

  return deleteId;
};


const createAdminFeedback = async (feedbackData) => {
  if (!feedbackData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  if (!feedbackData.description) throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required!')

  return AdminFeedback.create(feedbackData);
};

const getAdminFeedbacks = async () => {
  return AdminFeedback.find();
};

const updateAdminFeedback = async (id, feedbackData) => {
  const updateData = await AdminFeedback.findByIdAndUpdate(id, feedbackData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteAdminFeedback = async (id) => {
  const deleteId = await AdminFeedback.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createPrivacyPolicy = async (policyData) => {
  if (!policyData.text) throw new ApiError(httpStatus.BAD_REQUEST, 'Text is required!');

  return PrivacyPolicy.create(policyData);
};

const getPrivacyPolicy = async () => {
  return PrivacyPolicy.find();
};

const updatePrivacyPolicy = async (id, policyData) => {
  const updateData = await PrivacyPolicy.findByIdAndUpdate(id, policyData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deletePrivacyPolicy = async (id) => {
  const deleteId = await PrivacyPolicy.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createHotelBlog = async (careerData) => {
  return HotelBlog.create(careerData);
};

const getHotelBlog = async () => {
  return HotelBlog.find();
};

const getHotelBlogById = async (id) => {
  const blog = await HotelBlog.findById(id);
  return blog;
};

const updateHotelBlog = async (id, careerData) => {
  const updateData = await HotelBlog.findByIdAndUpdate(id, careerData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteHotelBlog = async (id) => {
  const deleteId = await HotelBlog.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createSubBlog = async (careerData) => {
  return SubBlog.create(careerData);
};

const getSubBlog = async () => {
  return SubBlog.find();
};

const updateSubBlog = async (id, careerData) => {
  const updateData = await SubBlog.findByIdAndUpdate(id, careerData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteSubBlog = async (id) => {
  const deleteId = await SubBlog.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createContactUs = async (contactData) => {
  if (!contactData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');

  return ContactUs.create(contactData);
};

const getContactUs = async () => {
  return ContactUs.find();
};

const updateContactUs = async (id, contactData) => {
  const updateData = await ContactUs.findByIdAndUpdate(id, contactData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const DeleteContactUs = async (id) => {
  const deleteId = await ContactUs.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};


const createWalletAmount = async (amountData) => {
  if (!amountData.user) throw new ApiError(httpStatus.BAD_REQUEST, 'User is required!');
  if (!amountData.amount) throw new ApiError(httpStatus.BAD_REQUEST, 'Amount is required!');
  if (amountData?.user) {
    const userId = await WalletAmount.findById(amountData?.user);
    if (userId === null) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User is required!');
    }
  }

  return WalletAmount.create(amountData);
};

const getWalletAmount = async () => {
  return WalletAmount.find();
};

const updateWalletAmount = async (id, amountData) => {
  const updateData = await WalletAmount.findByIdAndUpdate(id, amountData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteWalletAmount = async (id) => {
  const deleteId = await WalletAmount.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createSecondSectionTitle = async (titleData) => {
  if (!titleData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
  const exiastingTitle = await SecondSectionTitle.findOne({ title: titleData?.title });
  if (exiastingTitle) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Title with title ${titleData?.title} is already exists.`);
  };

  if (titleData?.titleId) {
    const titleId = await SecondSectionTitle.findById(titleData?.titleId);
    if (titleId === null) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
    }
  }

  return SecondSectionTitle.create(titleData);
};

const getSecondSectionTitle = async () => {
  return SecondSectionTitle.find();
};

const updateSecondSectionTitle = async (id, titleData) => {
  const updateData = await SecondSectionTitle.findByIdAndUpdate(id, titleData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteSecondSectionTitle = async (id) => {
  const deleteId = await SecondSectionTitle.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createSecondSection = async (secondSectionData) => {
  if (!secondSectionData.title) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
  const exiastingTitle = await SecondSection.findOne({ title: secondSectionData?.title });
  if (exiastingTitle) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Title with title ${secondSectionData?.title} is already exists.`);
  };


  return SecondSection.create(secondSectionData);
};

const getSecondSection = async () => {
  return SecondSection.find();
};

const updateSecondSection = async (id, secondSectionData) => {
  const updateData = await SecondSection.findByIdAndUpdate(id, secondSectionData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteSecondSection = async (id) => {
  const deleteId = await SecondSection.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createSpotLitePage = async (data) => {
  return await SpotLitePage.create(data);
};

const getSpotLitePage = async () => {
  return SpotLite.find();
};

const updateSpotLitePage = async (id, data) => {
  const existingAboutUs = await SpotLite.findOne({ title: data?.title })
  if (existingAboutUs) {
    throw new ApiError(httpStatus.BAD_REQUEST, `SpotLite with title "${data.title}" already exists.`);
  }
  const updateData = await SpotLite.findByIdAndUpdate(id, data, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return updateData;
};

const deleteSpotLitePage = async (id) => {
  const deleteId = await SpotLite.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  return deleteId;
};

const createAmenitiesSubCategory = async (subCategoryData) => {
  if (!subCategoryData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  const existingProduct = await AmenitiesSubCategory.findOne({ name: subCategoryData?.name })
  if (existingProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Product with name "${subCategoryData.name}" already exists.`);
  }
  if (!subCategoryData?.amenitiesId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'category is  required!');
  }
  else {
    if (subCategoryData?.amenitiesId) {
      const findCatId = await Amenities.findById(subCategoryData?.amenitiesId)
      if (findCatId === null) throw new ApiError(httpStatus.NOT_FOUND, 'HotelCategory not found');
    }
  }
  return AmenitiesSubCategory.create(subCategoryData);
};

const getAmenitiesSubCategory = async () => {
  return AmenitiesSubCategory.find().populate('amenitiesId', 'name');
};

const getAmenitiesSubCategoryById = async (id) => {
  return AmenitiesSubCategory.findById(id).populate('amenitiesId', 'name');
};

const getAmenitiesSubCategoriesByAmenitiesId = async (amenitiesId) => {
  try {
    const subcategories = await AmenitiesSubCategory.find({ amenitiesId });
    return subcategories;
  } catch (error) {
    console.error("Error in service fetching subcategories:", error);
    throw error;
  }
};

const updateAmenitiesSubCategory = async (id, subCategoryData) => {
  const updateData = await AmenitiesSubCategory.findByIdAndUpdate(id, subCategoryData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'HotelCategory not found');
  return updateData;
};

const deleteAmenitiesSubCategory = async (id,) => {
  const deleteId = await AmenitiesSubCategory.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'HotelCategory not found');
  return deleteId;
};

const createAmenitiesOption = async (optionData) => {
  if (!optionData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'name is required!');
  if (!optionData?.amenitiesId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Amenities SubCategory is required!');
  }
  else {
    if (optionData?.amenitiesId) {
      const findCatId = await AmenitiesSubCategory.findById(optionData?.amenitiesId)
      if (findCatId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
    }
  }
  return AmenitiesOption.create(optionData);
};

const getAmenitiesOption = async () => {
  return AmenitiesOption.find().populate('amenitiesId', 'name');
};

const getAmenitiesOptionById = async (id) => {
  return AmenitiesOption.findById(id).populate('amenitiesId', 'name');
};

const getAmenitiesOptionsBySubCategory = async (subCategoryId) => {
  try {
    const amenitiesOptions = await AmenitiesOption.find({
      amenitiesId: subCategoryId,
    });
    return amenitiesOptions;
  } catch (error) {
    console.error("Error in service fetching amenities options:", error);
    throw error;
  }
};

const updateAmenitiesOption = async (id, optionData) => {
  const existingProduct = await AmenitiesOption.findOne({ name: optionData?.name })
  if (existingProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, `AmenitiesOption with name "${optionData.name}" already exists.`);
  }
  const updateData = await AmenitiesOption.findByIdAndUpdate(id, optionData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};


const deleteAmenitiesOption = async (id,) => {
  const deleteId = await AmenitiesOption.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const addBasaltTestimonial = async (roomData) => {
  if (!roomData.name) throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required!');
  const exiastingTitle = await BasaltTestimonial.findOne({ name: roomData?.name });
  if (exiastingTitle) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Room with name ${roomData?.name} is already exists.`);
  };

  return BasaltTestimonial.create(roomData);
};


const getBasaltTestimonial = async () => {
  return BasaltTestimonial.find();
};

const updateBasaltTestimonial = async (id, roomData) => {
  const updateData = await BasaltTestimonial.findByIdAndUpdate(id, roomData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteBasaltTestimonial = async (id) => {
  const deleteId = await BasaltTestimonial.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const createBasaltFAQ = async (viewData) => {
  if (!viewData.viewName) throw new ApiError(httpStatus.BAD_REQUEST, 'ViewName is required!');
  const exiastingTitle = await BasaltFAQ.findOne({ viewName: viewData?.viewName });
  if (exiastingTitle) {
    throw new ApiError(httpStatus.BAD_REQUEST, `BasaltFAQ with viewName ${viewData?.viewName} is already exists.`);
  };


  return BasaltFAQ.create(viewData);
};

const getBasaltFAQ = async () => {
  return BasaltFAQ.find();
};

const updateBasaltFAQ = async (id, viewData) => {
  const updateData = await BasaltFAQ.findByIdAndUpdate(id, viewData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteBasaltFAQ = async (id) => {
  const deleteId = await BasaltFAQ.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};


const createBanner = async (typeData) => {
  if (!typeData.typeName) throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required!');
  const exiastingTitle = await BasaltBanner.findOne({ typeName: typeData?.typeName });
  if (exiastingTitle) {
    throw new ApiError(httpStatus.BAD_REQUEST, `BasaltBanner with name ${typeData?.typeName} is already exists.`);
  };


  return BasaltBanner.create(typeData);
};

const getBanner = async () => {
  return BasaltBanner.find();
};

const updateBanner = async (id, typeData) => {
  const updateData = await BasaltBanner.findByIdAndUpdate(id, typeData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteBanner = async (id) => {
  const deleteId = await BasaltBanner.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};


const createSpecialTeriff = async (optionData) => {
  if (!optionData?.productId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Amenities SubCategory is required!');
  }
  else {
    if (optionData?.productId) {
      const findCatId = await BasaltRoom.findById(optionData?.productId)
      if (findCatId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
    }
  }
  return SpecialTeriff.create(optionData);
};

const getSpecialTeriff = async () => {
  return SpecialTeriff.find().populate('productId');
};

const getSpecialTeriffById = async (id) => {
  return SpecialTeriff.findById(id).populate('productId');
};

const updateSpecialTeriff = async (id, optionData) => {
  const updateData = await SpecialTeriff.findByIdAndUpdate(id, optionData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteSpecialTeriff = async (id,) => {
  const deleteId = await SpecialTeriff.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

const getProductsWithAmenities = async () => {
  try {
    return await Amenities.aggregate([
      {
        $lookup: {
          from: "amenitiessubcategories",
          localField: "_id",
          foreignField: "amenitiesId",
          as: "subCategories",
        },
      },

      {
        $unwind: {
          path: "$subCategories",
          preserveNullAndEmptyArrays: true,
        }, 
      },

      {
        $lookup: {
          from: "amenitiesoptions",
          localField: "subCategories._id",
          foreignField: "amenitiesId",
          as: "subCategories.options",
        },
      },

      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          image: { $first: "$image" },
          description: { $first: "$description" },
          active: { $first: "$active" },
          subCategories: { $push: "$subCategories" },
        },
      },
    ]);
   
  } catch (error) {
    console.error("Error in getProductsWithAmenities:", error.message);
    throw new Error("Unable to fetch products with amenities");
  }
};

const createRazorPay = async ({ key, secret }) => {
  try {
    const updatedData = await RazorPay.findOneAndUpdate(
      {}, 
      { key, secret }, 
      { upsert: true, new: true, setDefaultsOnInsert: true } 
    );

    return updatedData;
  } catch (error) {
    console.error("Error in upsertRazorPay service:", error.message);
    throw new Error("Failed to upsert RazorPay data.");
  }
};


const getRazorPay = async () => {
  return RazorPay.find();
};

const updateRazorPay = async (id, razorPayData) => {
  const existingAboutUs = await RazorPay.findOne({ key: razorPayData?.key })
  if (existingAboutUs) {
    throw new ApiError(httpStatus.BAD_REQUEST, `RazorPay with key "${razorPayData.key}" already exists.`);
  }
  const updateData = await RazorPay.findByIdAndUpdate(id, razorPayData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'RazorPay not found');
  return updateData;
};

const deleteRazorPay = async (id) => {
  const deleteId = await RazorPay.findByIdAndDelete(id);
  if (deleteId === null) throw new ApiError(httpStatus.NOT_FOUND, 'RazorPay not found');
  return deleteId;
};

const createExtraCharges = async (otherData) => {
  if (!otherData.gst) throw new ApiError(httpStatus.BAD_REQUEST, "GST is required!");
  if (!otherData.breakfast) throw new ApiError(httpStatus.BAD_REQUEST, "Breakfast is required!");
  if (!otherData.lunch) throw new ApiError(httpStatus.BAD_REQUEST, "Lunch is required!");
  if (!otherData.dinner) throw new ApiError(httpStatus.BAD_REQUEST, "Dinner is required!");

  const existingData = await ExtraCharge.findOne();

  if (existingData) {
    const updatedData = await ExtraCharge.findByIdAndUpdate(
      existingData._id,
      {
        gst: otherData.gst,
        breakfast: otherData.breakfast,
        lunch: otherData.lunch,
        dinner: otherData.dinner,
      },
      { new: true }
    );

    return updatedData;
  } else {
    const newData = await ExtraCharge.create(otherData);

    return newData;
  }
};

const getExtraCharges = async () => {
  return ExtraCharge.find();
};

const updateExtraCharge = async (id, otherData) => {
  const updateData = await ExtraCharge.findByIdAndUpdate(id, otherData, { new: true });
  if (updateData === null) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return updateData;
};

const deleteExtraCharge = async (id) => {
  const deleteId = await ExtraCharge.findByIdAndDelete(id);
  if (deleteId === null) throw ApiError(httpStatus.NOT_FOUND, 'Data not found');
  return deleteId;
};

  
export default {createCategory,getCategories,updateCategory,deleteCategory , 
  createSubCategory,getSubCategories,updateSubCategory,deleteSubCategory,createProduct,getProducts,updateProduct,deleteProduct,
  getProductsById, addSliderImage, getAllSliderImage, updateSliderImage,
  deleteSliderImage, createNewLineMotion, getBasaltHandpicked, getBasaltHandpickedById, updateBasaltHandpicked, deleteBasaltHandpicked,
  createAboutUsPage, getAboutUsById, getAboutUsPage, updateAboutUsPage, deleteAboutUsPage, createGalleryImage, getGalleryImages,
  updateGalleryImage, deleteGalleryImage, createGalleryTitle, getGalleryTitle, updateGalleryTitle, deleteGalleryTitle, createGalleryCategory, getGalleryCategory, updateGalleryCategory, deleteGalleryCategory, 
  createFacility, getFacilities, updateFacility, deleteFacility, createAmenities, getAmenities, updateAmenities, deleteAmenities, createCalculativeSection,
  updateCalculativeSection, getCalculativeSection, deleteCalculativeSection, createDarshanTiming, getDarshanTiming, updateDarshanTiming, deleteDarshanTiming,
  createSpecialDatesTiming, getSpecialDatesTiming, updateSpecialDatesTiming, deleteSpecialDatesTiming, createLifeAtBP, getLifeAtBP, updateLifeAtBP, deleteLifeAtBP,
  createFeedback, getFeedbacks, updateFeedback, deleteFeedback, createOffer, getOffers, updateOffer, deleteOffer, createBasaltGallery, getBasaltGallerys, updateBasaltGallery, deleteBasaltGallery,
  createMenuCategory, getMenuCategories, updateMenuCategory, deleteMenuCategory, createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem,
  createAdminFeedback, getAdminFeedbacks, updateAdminFeedback, deleteAdminFeedback, createPrivacyPolicy, getPrivacyPolicy, updatePrivacyPolicy, deletePrivacyPolicy,
  createHotelBlog, getHotelBlog, getHotelBlogById, updateHotelBlog, deleteHotelBlog, createSubBlog, getSubBlog, updateSubBlog, deleteSubBlog, createContactUs, getContactUs, updateContactUs, DeleteContactUs, createWalletAmount, getWalletAmount, updateWalletAmount, deleteWalletAmount,
  createSecondSectionTitle, getSecondSectionTitle, updateSecondSectionTitle, deleteSecondSectionTitle, createSecondSection, getSecondSection, updateSecondSection, deleteSecondSection,
  createSpotLitePage, getSpotLitePage, updateSpotLitePage, deleteSpotLitePage, getCategoryWiseProductCount, addBasaltTestimonial, getBasaltTestimonial, updateBasaltTestimonial, deleteBasaltTestimonial,
  createBasaltFAQ, getBasaltFAQ, deleteBasaltFAQ, updateBasaltFAQ, createBanner, getBanner, updateBanner, deleteBanner, getCategoryWiseProductCount, createAmenitiesSubCategory,
  getAmenitiesSubCategory, getAmenitiesSubCategoryById, getAmenitiesSubCategoriesByAmenitiesId, updateAmenitiesSubCategory, deleteAmenitiesSubCategory, createAmenitiesOption, getAmenitiesOption,
  getAmenitiesOptionById, getAmenitiesOptionsBySubCategory, updateAmenitiesOption, deleteAmenitiesOption, createSpecialTeriff, getSpecialTeriff, getSpecialTeriffById, updateSpecialTeriff, deleteSpecialTeriff, getProductsWithAmenities,
  createRazorPay, getRazorPay, updateRazorPay, deleteRazorPay, createExtraCharges, getExtraCharges, updateExtraCharge, deleteExtraCharge
};