import { diskStorage } from "multer";
import adminService from "../services/admin.service.js";
import { generateSuccessMessage, sendSuccessResponse } from "../utils/ApiMessage.js";
import { sendResponse } from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status"

const createCategory  = catchAsync(async (req, res) => {
    const category = await adminService.createCategory(req.body);
    res.status(httpStatus.CREATED).send({ category });
  });

const getCategories   = catchAsync(async (req, res) => {
    const category = await adminService.getCategories(req.body);
    res.status(httpStatus.OK).send({ category });
  });

const updateCategory  = catchAsync(async (req, res) => {
    const category = await adminService.updateCategory(req.params.id, req.body);
    res.status(httpStatus.OK).send({ category });
  });

const deleteCategory   = catchAsync(async (req, res) => {
    const category = await adminService.deleteCategory(req.params.id);
    res.status(httpStatus.OK).send({ category });
  });

const createSubCategory  = catchAsync(async (req, res) => {
    const category = await adminService.createSubCategory(req.body);
    res.status(httpStatus.CREATED).send({ category });
  });

const getSubCategories   = catchAsync(async (req, res) => {
    const category = await adminService.getSubCategories(req.body);
    res.status(httpStatus.OK).send({ category });
  });

const getSubCategoryByCategoryId = catchAsync(async (req, res) => {
  const category = await adminService.getSubCategoryByCategoryId(req.params.id, req.body);
  res.status(httpStatus.OK).send({ category });
});

const updateSubCategory  = catchAsync(async (req, res) => {
    const category = await adminService.updateSubCategory(req.params.id, req.body);
    res.status(httpStatus.OK).send({ category });
  });

const deleteSubCategory   = catchAsync(async (req, res) => {
    const category = await adminService.deleteSubCategory(req.params.id);
    res.status(httpStatus.OK).send({ category , Message:"Delete SuccessFully...!"});
  });

const createProduct  = catchAsync(async (req, res) => {
    const product = await adminService.createProduct(req.body);
    res.status(httpStatus.CREATED).send({ product });
  });

const getProducts  = catchAsync(async (req, res) => {
    const product = await adminService.getProducts(req.query);
    res.status(httpStatus.OK).send({ product });
  });

const updateProduct = catchAsync(async (req, res) => {
    const product = await adminService.updateProduct(req.params.id, req.body);
    res.status(httpStatus.OK).send({ product });
  });

const deleteProduct = catchAsync(async (req, res) => {
    const product = await adminService.deleteProduct(req.params.id);
    res.status(httpStatus.OK).send({ product});
  });

const getProductsBySubCategoryId = catchAsync(async (req, res) => {
    const product = await adminService.getProductsBySubCategoryId(req.params.id);
    res.status(httpStatus.OK).send({ product });
  });

  const createProductImage  = catchAsync(async (req, res) => {
    const productImage = await adminService.createProductImage(req.body);
    res.status(httpStatus.CREATED).send({ productImage });
  });

  
 const getProductImages = catchAsync(async (req, res) => {
    const productImages = await adminService.getProductImages();
    sendSuccessResponse(res, 'Fetched all product images', productImages);
  });
  
 const getProductImagesByProductId = catchAsync(async (req, res) => {
    const productImages = await adminService.getProductImagesByProductId(req.params.id);
    if (!productImages || productImages.length === 0) {
      return res.status(404).json({ message: 'No images found for the specified product' });
    }
    sendSuccessResponse(res, 'Fetched product images by product ID', productImages);
  });
  
  const updateProductImage = catchAsync(async (req, res) => {
    const data = {
      productId: req.body.productId,
      file: req.file ? req.file.path : req.body.file,
    };
    const productImage = await adminService.updateProductImage(req.params.id, data);
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }
    sendSuccessResponse(res, 'Product image updated successfully', productImage);
  });
  
  const deleteProductImage = catchAsync(async (req, res) => {
    const productImage = await adminService.deleteProductImage(req.params.id);
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }
    sendSuccessResponse(res, 'Product image deleted successfully', {});
  });

export default {createCategory,getCategories,updateCategory,deleteCategory,createSubCategory,getSubCategories,getSubCategoryByCategoryId,updateSubCategory,deleteSubCategory,
  createProduct, getProducts,updateProduct,deleteProduct,getProductsBySubCategoryId,createProductImage, getProductImages, getProductImagesByProductId, updateProductImage, deleteProductImage}
