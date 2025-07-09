import aboutusModel from "../models/aboutus.model.js";
import blogModel from "../models/blog.model.js";
import calculationModel from "../models/calculation.model.js";
import ChhapiaContact from "../models/contactUs.model.js";
import coreValueModel from "../models/coreValue.model.js";
import faqModel from "../models/faq.model.js";
import ChappiaService from "../models/service.model.js";
import testimonialModel from "../models/testimonial.model.js";
import ChhapiaWhyChooseUs from "../models/whyChooseUs.model.js";
import HYGOSetting from "../models/whyChooseUs.model.js";


const createService = async (payload) => {
    return await ChappiaService.create(payload);
};

const getService = async () => {
  return await ChappiaService.find().sort({ createdAt: -1 });
};


const deleteService = async (id) => {
   return await ChappiaService.findByIdAndDelete(id);
}

const updateService = async (id, update) => {
  const service = await ChappiaService.findByIdAndUpdate(id, update, { new: true });
  if (!service) throw new ApiError(404, 'service not found');
  return service;
  
};
const createWhyChooseUs = async (payload) => {
    return await ChhapiaWhyChooseUs.create(payload);
};

const getWhyChooseUs = async () => {
    return await ChhapiaWhyChooseUs.find().sort({ createdAt: -1 });
}

const deleteWhyChooseUs = async (id) => {
    return await ChhapiaWhyChooseUs.findByIdAndDelete(id);
}

const updateWhyChooseUs = async (id, update) => {
  const data = await ChhapiaWhyChooseUs.findByIdAndUpdate(id, update, { new: true });
  if (!data) throw new ApiError(404, 'data not found');
  return data;
  
};

const createAboutUs = async (data) => {
  const existing = await aboutusModel.findOne();

  if (existing) {
    const updated = await aboutusModel.findByIdAndUpdate(existing._id, data, { new: true });
    return { type: 'update', data: updated };
  } else {
    const created = await aboutusModel.create(data);
    return { type: 'create', data: created };
  }
};


const updateAboutUs = async (data) => {
  const existing = await aboutusModel.findOne();
  if (!existing) {
    throw new Error('No About Us entry exists to update.');
  }

  existing.title = data.title || existing.title;
  existing.image = data.image || existing.image;
  existing.description = data.description || existing.description;

  return await existing.save();
};

const getAboutUs = async () => {
  return await aboutusModel.findOne();
};

const createFaq = async (payload) => {
    return await faqModel.create(payload);
};

const getFaq = async () => {
   return await faqModel.find().sort({ createdAt: -1 });
}

const deleteFaq = async (id) => {
   return await faqModel.findByIdAndDelete(id);
}

const updateFaq = async (id, update) => {
  const data = await faqModel.findByIdAndUpdate(id, update, { new: true });
  if (!data) throw new ApiError(404, 'data not found');
  return data;
  
};

const createTestimonial = async (payload) => {
   return await testimonialModel.create(payload);
};

const getTestimonial = async () => {
   return await testimonialModel.find().sort({ createdAt: -1 });
}

const deleteTestimonial = async (id) => {
   return await testimonialModel.findByIdAndDelete(id);
}

const updateTestimonial = async (id, update) => {
  const data = await testimonialModel.findByIdAndUpdate(id, update, { new: true });
  if (!data) throw new ApiError(404, 'data not found');
  return data;
  
};

const createBlog = async (payload) => {
   return await blogModel.create(payload);
};

const getBlog = async () => {
   return await blogModel.find().sort({ createdAt: -1 });
}

const deleteBlog = async (id) => {
     return await blogModel.findByIdAndDelete(id);
}

const updateBlog = async (id, update) => {
  const data = await blogModel.findByIdAndUpdate(id, update, { new: true });
  if (!data) throw new ApiError(404, 'data not found');
  return data;
  
};

const createCalculation = async (payload) => {
   return await calculationModel.create(payload);
};

const getCalculation = async () => {
   return await calculationModel.find().sort({ createdAt: -1 });
}

const deleteCalculation = async (id) => {
   return await calculationModel.findByIdAndDelete(id);
}

const updateCalculation = async (id, update) => {
  const data = await calculationModel.findByIdAndUpdate(id, update, { new: true });
  if (!data) throw new ApiError(404, 'data not found');
  return data;
};

const createCoreValue = async (payload) => {
   return await coreValueModel.create(payload);
};

const getCoreValue = async () => {
   return await coreValueModel.find().sort({ createdAt: -1 });
}

const deleteCoreValue = async (id) => {
   return await coreValueModel.findByIdAndDelete(id);
}

const updateCoreValue = async (id, update) => {
  const data = await coreValueModel.findByIdAndUpdate(id, update, { new: true });
  if (!data) throw new ApiError(404, 'data not found');
  return data;
  
};

const createContactUs = async (payload) => {
   return await ChhapiaContact.create(payload);
};

const getContactUs = async () => {
   return await ChhapiaContact.find().sort({ createdAt: -1 });
}

const deleteContactUs = async (id) => {
   return await ChhapiaContact.findByIdAndDelete(id);
}

const updateContactUs = async (id, update) => {
  const data = await ChhapiaContact.findByIdAndUpdate(id, update, { new: true });
  if (!data) throw new ApiError(404, 'data not found');
  return data;
  
};


export default { createService, getService, deleteService, updateService, createAboutUs, getAboutUs, updateAboutUs, createWhyChooseUs, getWhyChooseUs, updateWhyChooseUs, deleteWhyChooseUs,
  createFaq, getFaq, updateFaq, deleteFaq, createTestimonial, getTestimonial, updateTestimonial, deleteTestimonial, createBlog, getBlog, updateBlog, deleteBlog, createCalculation, getCalculation, updateCalculation, deleteCalculation,
  createCoreValue, getCoreValue, updateCoreValue, deleteCoreValue, createContactUs, getContactUs, updateContactUs, deleteContactUs,
}