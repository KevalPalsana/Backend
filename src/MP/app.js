import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Use express's built-in body parser
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Feedback Form

import userRoutes from './routes/user.js';
import roleRoutes from './routes/role.js';
import feedbackRoutes from './routes/feedback.js';
import kalwadRoadRoutes from './routes/kalawadRoad.js';
import dholakiyaRoutes from './routes/dholakiya.js';
import pramukhVatikaRoutes from './routes/pramukhVatika.js';
import mavdiRoutes from './routes/mavdi.js';
import shraddhaparkRoutes from './routes/shradhdhaPark.js';
import sorathiyaVadiRoutes from './routes/sorathiyaVadi.js';
import tirupatiRoutes from './routes/tirupati.js';

//Feedback Form
app.use('/api/v1', userRoutes);
app.use('/api/v1', roleRoutes);
app.use('/api/v1', feedbackRoutes);
app.use('/api/v1', kalwadRoadRoutes);
app.use('/api/v1', dholakiyaRoutes);
app.use('/api/v1', pramukhVatikaRoutes);
app.use('/api/v1', mavdiRoutes);
app.use('/api/v1', shraddhaparkRoutes);
app.use('/api/v1', sorathiyaVadiRoutes);
app.use('/api/v1', tirupatiRoutes);


//Premvati Menu

import premvatiMenuCategroyRoutes from './application/premvati-menu/routes/menuCategory.js';
import premvatiMenuItemRoutes from './application/premvati-menu/routes/menuItem.js';

app.use('/menu', premvatiMenuCategroyRoutes);
app.use('/menu', premvatiMenuItemRoutes);


//Self Service 

import premvatiListingRoutes from './application/self-service/routes/pickupLocation.js';
import deliveryDateRoutes from './application/self-service/routes/pickupDate.js';
import cartRoutes from './application/self-service/routes/cart.js';
import paymentRoutes from './application/self-service/routes/payment.js';
import orderSummaryRoutes from './application/self-service/routes/orderSummary.js';
import orderRecieptRoutes from './application/self-service/routes/orderReciept.js';
import orderListRoutes from './admin/routes/orderList.js';
import foodCategoryRoutes from './application/self-service/routes/foodCategory.js'; 
import foodItemRoutes from './application/self-service/routes/foodItem.js';
import servingCategoryRoutes from './application/self-service/routes/servingCategory.js';
import servingMethodRoutes from './application/self-service/routes/servingmethod.js';

// Self Service routes

app.use('/self-service', premvatiListingRoutes);
app.use('/self-service', deliveryDateRoutes);
app.use('/self-service', cartRoutes);
app.use('/self-service', paymentRoutes);
app.use('/self-service', orderSummaryRoutes);
app.use('/self-service', orderRecieptRoutes);
app.use('/self-service', orderListRoutes);
app.use('/self-service', foodCategoryRoutes);
app.use('/self-service', foodItemRoutes);
app.use('/self-service', servingCategoryRoutes);
app.use('/self-service', servingMethodRoutes);



//Bulk Orer
import bulkOrderDeliveryDateRoutes from './application/premvati-bulk-order/routes/pickupDate.js';
import bulkOrderCategoryRoutes from './application/premvati-bulk-order/routes/foodCategory.js';
import bulkorderItemRoutes from './application/premvati-bulk-order/routes/foodItem.js';
import bulkOrderCartRoutes from './application/premvati-bulk-order/routes/cart.js';
import orderFormRoutes from './application/premvati-bulk-order/routes/orderForm.js';
import bulkOrderSummaryRoutes from './application/premvati-bulk-order/routes/orderSummary.js';
import bulkOrderReceiptRoutes from './application/premvati-bulk-order/routes/orderReciept.js';
import bulkPaymentRoutes from './application/premvati-bulk-order/routes/payment.js';


app.use('/bulk-order', bulkOrderDeliveryDateRoutes);
app.use('/bulk-order', bulkOrderCategoryRoutes);
app.use('/bulk-order', bulkorderItemRoutes);
app.use('/bulk-order', bulkOrderCartRoutes);
app.use('/bulk-order', orderFormRoutes);
app.use('/bulk-order', bulkOrderSummaryRoutes);
app.use('/bulk-order', bulkOrderReceiptRoutes);
app.use('/bulk-order', bulkPaymentRoutes);



//Pre Packaging
// import prePremvatiListingRoutes from './application/pre-packaging/routes/pickupLocation');
import preFoodRoutes from './application/pre-packaging/routes/food.js';
import preFoodItemRoutes from './application/pre-packaging/routes/foodItem.js';
import preDeliveryDateRoutes from './application/pre-packaging/routes/deliveryDate.js';
import preCartRoutes from './application/pre-packaging/routes/cart.js';
import prePaymentRoutes from './application/pre-packaging/routes/payment.js';
import preOrderSummaryRoutes from './application/pre-packaging/routes/orderSummary.js';
import preOrderReceiptRoutes from './application/pre-packaging/routes/orderReciept.js';



//Pre Packaging Routes
// app.use('/api/pre-packaging', prePremvatiListingRoutes);
app.use('/pre-packaging', preFoodRoutes);
app.use('/pre-packaging', preFoodItemRoutes);
app.use('/pre-packaging', preDeliveryDateRoutes);
app.use('/pre-packaging', preCartRoutes);
app.use('/pre-packaging', prePaymentRoutes);
app.use('/pre-packaging', preOrderReceiptRoutes);
app.use('/pre-packaging', preOrderSummaryRoutes);


//Admin Route


import splashScreenRoutes from './admin/routes/splashImage.js';
import pravrutiRoutes from './admin/routes/pravruti.js';
import kshetraRoutes from './admin/routes/kshetra.js';
import designationRoutes from './admin/routes/designation.js';
import adminUserRoutes from './admin/routes/user.js';
import adminPremvatiListingRoutes from './admin/routes/pickupLocation.js';
import adminFoodRoutes from './admin/routes/food.js';
import adminFoodItemRoutes from './admin/routes/foodItem.js';
import adminServingCategoryRoutes from './admin/routes/servingCategory.js';
import adminServingMethodRoutes from './admin/routes/servingMethod.js';
import adminPrePackageItemRoutes from './admin/routes/prePaclageItem.js';
import adminPrePackageCategoryRoutes from './admin/routes/prePackageCategory.js';
import adminOrderListingRoutes from './admin/routes/orderList.js';
import adminRoutes from './admin/routes/admin.js';
import adminPremvatiUserRoutes from './admin/routes/premvatiUser.js';
import adminBulkOrderCategoryRoutes from './admin/routes/bulkOrderCategory.js';
import adminBulkOrderItemRoutes from './admin/routes/bulkOrderItem.js';
import adminMenuCategoryRoutes from './admin/routes/MenuCategory.js';
import adminMenuItemRoutes from './admin/routes/menuItem.js';

app.use('/admin', splashScreenRoutes);
app.use('/admin', pravrutiRoutes);
app.use('/admin', kshetraRoutes);
app.use('/admin', designationRoutes);
app.use('/user', adminUserRoutes);
app.use('/admin', adminPremvatiListingRoutes);
app.use('/admin', adminFoodRoutes);
app.use('/admin', adminFoodItemRoutes);
app.use('/admin', adminServingCategoryRoutes);
app.use('/admin', adminServingMethodRoutes);
app.use('/admin', adminPrePackageCategoryRoutes);
app.use('/admin', adminOrderListingRoutes);
app.use('/admin', adminPrePackageItemRoutes);
app.use('/admin', adminRoutes);
app.use('/admin', adminPremvatiUserRoutes);
app.use('/admin', adminBulkOrderCategoryRoutes);
app.use('/admin', adminBulkOrderItemRoutes);
app.use('/admin', adminMenuCategoryRoutes);
app.use('/admin', adminMenuItemRoutes)

export default app;
