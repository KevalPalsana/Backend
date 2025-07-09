import Joi from 'joi';

 const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(255).optional(),
  status: Joi.string().valid('active', 'inactive').default('active'),  
});

 const createCollectionSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(255).optional(),
  status: Joi.string().valid('active', 'inactive').default('active'),  
});

 const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(255).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

 const updateCollectionSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(255).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

const createSubCategorySchema = Joi.object({
  categoryId: Joi.string().required(),  
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(255).optional(),
  status: Joi.string().valid('active', 'inactive').default('active'),  
});

 const updateSubCategorySchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(255).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
  categoryId: Joi.string().optional(),  
});

const priceSaleSchema = Joi.object({
  salePrice: Joi.number().positive().optional(), 
  startDate: Joi.date().optional(), 
  endDate: Joi.date().optional() 
});

 const createProductSchema = Joi.object({
  subCategoryId: Joi.string().optional(),  
  categoryId: Joi.string().optional(),  
  labelId: Joi.string().optional(),  
  sku: Joi.number().optional(),
  featuredImg: Joi.string().optional(),  
  productImgUrl:Joi.array().optional().allow(null).default([]),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().max(255).optional(),
  status: Joi.string().valid('available', 'unavailable').default('available'),
  collections: Joi.array().items(Joi.string().hex().length(24)).optional(),
  priceSale:priceSaleSchema.optional(),
  shipping: Joi.object({
    weight: Joi.number().required().min(0),  
    length: Joi.number().required().min(0),  
    width: Joi.number().required().min(0),   
    height: Joi.number().required().min(0),  
  }).optional(),
  productFAQs: Joi.array().items(
    Joi.object({
      question: Joi.string().required(), 
      answer: Joi.string().required(),   
    })
  ).optional(),
});

 const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  price: Joi.number().min(0).optional(),
  description: Joi.string().max(255).optional(),
  status: Joi.string().valid('available', 'unavailable').optional(),
  subCategoryId: Joi.string().optional(),  
  categoryId: Joi.string().optional(), 
  labelId: Joi.string().optional(),  
  productImgUrl:Joi.array().optional().allow(null).default([]),
  featuredImg: Joi.string().optional(), 
  sku: Joi.number().optional(),
  collections: Joi.array().items(Joi.string().hex().length(24)).optional(),
  priceSale:priceSaleSchema.optional(),
  shipping: Joi.object({
    weight: Joi.number().required().min(0),  
    length: Joi.number().required().min(0),  
    width: Joi.number().required().min(0),   
    height: Joi.number().required().min(0),  
  }).optional(),
  productFAQs: Joi.array().items(
    Joi.object({
      question: Joi.string().required(), 
      answer: Joi.string().required(),   
    })
  ).optional(),
});

export default {
  createCategorySchema,
  updateCategorySchema,
  createSubCategorySchema,
  updateSubCategorySchema,
  createProductSchema,
  updateProductSchema,
  createCollectionSchema,
  updateCollectionSchema
}
