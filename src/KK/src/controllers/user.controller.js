import userService from "../services/user.service.js";
import { sendSuccessResponse } from "../utils/ApiMessage.js";
import catchAsync from "../utils/catchAsync.js";

const getProducts  = catchAsync(async (req, res) => {
  const product = await userService.getProducts(req.query);
  sendSuccessResponse(res, 'get', product)
});

const getProductsBySubCategoryId = catchAsync(async (req, res) => {
  const product = await userService.getProductsBySubCategoryId(req.params.id);
  sendSuccessResponse(res, 'get', product)
});


const getCategories = catchAsync(async (req, res) => {
  const categories = await userService.getCategories(req.query);
  sendSuccessResponse(res, 'get', categories);
});

const getSubCategories   = catchAsync(async (req, res) => {
  const category = await userService.getSubCategories(req.body);
  sendSuccessResponse(res, 'get', category)
});

const getSubCategoryByCategoryId = catchAsync(async (req, res) => {
const category = await userService.getSubCategoryByCategoryId(req.params.id, req.body);
sendSuccessResponse(res, 'get', category)
});

const getProductImages  = catchAsync(async (req, res) => {
  const product = await userService.getProductImages(req.query);
  sendSuccessResponse(res, 'get', product)
});


const getProductImagesByProdcutId = catchAsync(async (req, res) => {
  const product = await userService.getProductImagesByProductId(req.params.id);
  sendSuccessResponse(res, 'get', product)
});


const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.getUserById(userId);

    if (!user) {
      throw new ApiError("User not found");
    }
    
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error); 
  }
};

export default { getProducts, getProductsBySubCategoryId, getCategories, getUserById, getSubCategories, getSubCategoryByCategoryId, getProductImages, getProductImagesByProdcutId}