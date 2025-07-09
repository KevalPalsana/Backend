import adminService from "../services/admin.service.js";
import httpStatus from 'http-status';
import catchAsync from "../utils/catchAsync.js";
import { ApiError } from "../../../utils/ApiError.js";


const createService = catchAsync (async (req, res) => {
    const service = await adminService.createService(req.body);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: 'service created successfully',
      data: service
    });
});


 const getService = catchAsync(async (req, res) => {
  const services = await adminService.getService(req.body);
  console.log('services', services)
  res.status(httpStatus.OK).json({
    status: true,
    message: 'services fetched successfully',
    data: services,
  });
});

const updateService = catchAsync(async (req, res) => {
  const updateService = await adminService.updateService(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Service updated successfully',
    data: updateService,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteService(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  res.status(httpStatus.NO_CONTENT).send();
});

 const createAboutUs = catchAsync(async (req, res) => {
  console.log('req.body', req.body)
  const result = await adminService.createAboutUs(req.body);

  const status = result.type === 'create' ? httpStatus.CREATED : httpStatus.OK;
  const message = result.type === 'create' ? 'About Us created' : 'About Us updated';

  res.status(status).json({
    success: true,
    message,
    data: result.data,
  });
});

const updateAboutUs = catchAsync(async (req, res) => {
  const updated = await adminService.updateAboutUs(req.body);
  if (!updated) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No About Us entry exists to update.');
  }
  res.status(httpStatus.OK).json(updated);
});

 const getAboutUs = catchAsync(async (req, res) => {
  const about = await adminService.getAboutUs(req.body);
  if (!about) {
    throw new ApiError(httpStatus.NOT_FOUND, 'About Us not found');
  }
  res.status(httpStatus.OK).json(about);
});

const createWhyChooseUs = catchAsync (async (req, res) => {
    const data = await adminService.createWhyChooseUs(req.body);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: 'data created successfully',
      data: data
    });
});


 const getWhyChooseUs = catchAsync(async (req, res) => {
  const data = await adminService.getWhyChooseUs(req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'data fetched successfully',
    data: data,
  });
});

const updateWhyChooseUs = catchAsync(async (req, res) => {
  const data = await adminService.updateWhyChooseUs(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'data updated successfully',
    data: data,
  });
});

const deleteWhyChooseUs = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteWhyChooseUs(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  res.status(httpStatus.NO_CONTENT).send();
});

const createFaq = catchAsync (async (req, res) => {
    const faq = await adminService.createFaq(req.body);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: 'Faq created successfully',
      data: faq
    });
});


 const getFaq = catchAsync(async (req, res) => {
  const faq = await adminService.getFaq(req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Faq fetched successfully',
    data: faq,
  });
});

const updateFaq = catchAsync(async (req, res) => {
  const faq = await adminService.updateFaq(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Faq updated successfully',
    data: faq,
  });
});

const deleteFaq = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteFaq(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
  res.status(httpStatus.NO_CONTENT).send();
});

const createTestimonial = catchAsync (async (req, res) => {
    const testimonial = await adminService.createTestimonial(req.body);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: 'Testimonial created successfully',
      data: testimonial
    });
});


 const getTestimonial = catchAsync(async (req, res) => {
  const testimonial = await adminService.getTestimonial(req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Testimonial fetched successfully',
    data: testimonial,
  });
});

const updateTestimonial = catchAsync(async (req, res) => {
  const testimonial = await adminService.updateTestimonial(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Testimonial updated successfully',
    data: testimonial,
  });
});

const deleteTestimonial = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteTestimonial(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  res.status(httpStatus.NO_CONTENT).send();
});

const createBlog = catchAsync (async (req, res) => {
    const blog = await adminService.createBlog(req.body);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: 'Blog created successfully',
      data: blog
    });
});


 const getBlog = catchAsync(async (req, res) => {
  const blog = await adminService.getBlog(req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Blog fetched successfully',
    data: blog,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const blog = await adminService.updateBlog(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Blog updated successfully',
    data: blog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteBlog(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  res.status(httpStatus.NO_CONTENT).send();
});

const createCalculation = catchAsync (async (req, res) => {
    const data = await adminService.createCalculation(req.body);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: 'data created successfully',
      data: data
    });
});


 const getCalculation = catchAsync(async (req, res) => {
  const data = await adminService.getCalculation(req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'data fetched successfully',
    data: data,
  });
});

const updateCalculation = catchAsync(async (req, res) => {
  const data = await adminService.updateCalculation(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'data updated successfully',
    data: data,
  });
});

const deleteCalculation = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteCalculation(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  res.status(httpStatus.NO_CONTENT).send();
});

const createCoreValue = catchAsync (async (req, res) => {
    const data = await adminService.createCoreValue(req.body);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: 'data created successfully',
      data: data
    });
});


 const getCoreValue = catchAsync(async (req, res) => {
  const data = await adminService.getCoreValue(req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'data fetched successfully',
    data: data,
  });
});

const updateCoreValue = catchAsync(async (req, res) => {
  const data = await adminService.updateCoreValue(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'data updated successfully',
    data: data,
  });
});

const deleteCoreValue = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteCoreValue(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  res.status(httpStatus.NO_CONTENT).send();
});

const createContactUs = catchAsync (async (req, res) => {
    const data = await adminService.createContactUs(req.body);
    res.status(httpStatus.CREATED).json({
      status: true,
      message: 'data created successfully',
      data: data
    });
});


 const getContactUs = catchAsync(async (req, res) => {
  const data = await adminService.getContactUs(req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'data fetched successfully',
    data: data,
  });
});

const updateContactUs = catchAsync(async (req, res) => {
  const data = await adminService.updateContactUs(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'data updated successfully',
    data: data,
  });
});

const deleteContactUs = catchAsync(async (req, res) => {
  const deleted = await adminService.deleteContactUs(req.params.id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  res.status(httpStatus.NO_CONTENT).send();
});

export default { createService, getService, updateService, deleteService, createAboutUs, updateAboutUs, getAboutUs, createWhyChooseUs, getWhyChooseUs, updateWhyChooseUs, deleteWhyChooseUs,
  createFaq, getFaq, updateFaq, deleteFaq, createTestimonial, getTestimonial, updateTestimonial, deleteTestimonial, createBlog, deleteBlog, getBlog, updateBlog, createCalculation, getCalculation, updateCalculation, deleteCalculation,
  createCoreValue, getCoreValue, updateCoreValue, deleteCoreValue, createContactUs, getContactUs, updateContactUs, deleteContactUs,
}