import mongoose from 'mongoose';
import OrderReciept from "../../application/self-service/models/orderReciept.js";
import PreOrderReciept from "../../application/pre-packaging/models/orderReciept.js";
import BulkOrderReciept from "../../application/premvati-bulk-order/models/orderReciept.js"


const getAllPaidSelfOrders = async (req, res) => {
    try {
        const paidOrders = await OrderReciept.find({ orderType: "paid" })
        .populate({
            path: 'orderId',
            populate: [
                {
                    path: 'userId',  
                    model: 'AdminUser'     
                },
                {
                    path: 'items.foodItem',  
                    model: 'FoodItem' 
                },
                {
                    path: 'servingMethodId.servingMethod', 
                    model: 'ServingMethod'  
                }
            ]
        })
            .populate('orderDate')
            .populate('pickupLocation');

        res.status(200).json({
            status: "success",
            message: "Paid orders retrieved successfully",
            data: paidOrders
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

const getAllUnpaidSelfOrders = async (req, res) => {
    try {
        const unpaidOrders = await OrderReciept.find({ orderType: "unpaid" })
        .populate({
            path: 'orderId',
            populate: [
                {
                    path: 'userId',  
                    model: 'AdminUser'     
                },
                {
                    path: 'items.foodItem',  
                    model: 'FoodItem' 
                },
                {
                    path: 'servingMethodId.servingMethod', 
                    model: 'ServingMethod'  
                }
            ]
        })
            .populate('orderDate')
            .populate('pickupLocation');

        res.status(200).json({
            status: "success",
            message: "Unpaid orders retrieved successfully",
            data: unpaidOrders
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};


const getAllPaidPreOrders = async (req, res) => {
    try {
        const paidOrders = await PreOrderReciept.find({ orderType: "paid" })
        .populate({
            path: 'orderId',
            populate: [
                {
                    path: 'userId',  
                    model: 'AdminUser'     
                },
                {
                    path: 'items.foodItem',  
                    model: 'PrePackageFoodItem' 
                }
            ]
        })
            .populate('orderDate')
            .populate('pickupLocation');

        res.status(200).json({
            status: "success",
            message: "Paid orders retrieved successfully",
            data: paidOrders
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

const getAllPaidBulkOrders = async (req, res) => {
    try {
        const paidOrders = await BulkOrderReciept.find({ orderType: "paid" })
        .populate({
            path: 'orderId',
            populate: [
                {
                    path: 'userId',  
                    model: 'PremvatiUser',
                    populate: {
                        path: 'premvati', 
                        model: 'AdminPickupLocation'
                    }
                },
                {
                    path: 'items.foodItem',  
                    model: 'BulkOrderItem' 
                }
            ]
        });

        res.status(200).json({
            status: "success",
            message: "Paid orders retrieved successfully",
            data: paidOrders
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

const getAllUnpaidPreOrders = async (req, res) => {
    try {
        const unpaidOrders = await PreOrderReciept.find({ orderType: "unpaid" })
        .populate({
            path: 'orderId',
            populate: [
                {
                    path: 'userId',  
                    model: 'AdminUser'     
                },
                {
                    path: 'items.foodItem',  
                    model: 'PrePackageFoodItem' 
                },
            ]
        })
        .populate({
            path: 'orderDate',
            model: 'PrePackagingDeliveryDate'
        })
            .populate('pickupLocation');


        res.status(200).json({
            status: "success",
            message: "Unpaid orders retrieved successfully",
            data: unpaidOrders
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};


const getAllUnpaidBulkOrders = async (req, res) => {
    try {
        const unpaidOrders = await BulkOrderReciept.find({ orderType: "unpaid" })
        .populate({
            path: 'orderId',
            populate: [
                {
                    path: 'userId',  
                    model: 'PremvatiUser',
                    populate: {
                        path: 'premvati', 
                        model: 'AdminPickupLocation'
                    }    
                },
                {
                    path: 'items.foodItem',  
                    model: 'BulkOrderItem' 
                },
            ]
        })
        .populate('formId');


        res.status(200).json({
            status: "success",
            message: "Unpaid orders retrieved successfully",
            data: unpaidOrders
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

const getAllPaidOrders = async (req, res) => {
    try {
        const selfServicePaidOrders = await OrderReciept.find({ orderType: "paid" })
            .populate({
                path: 'orderId',
                populate: [
                    { path: 'userId', model: 'AdminUser' },
                    { path: 'items.foodItem', model: 'FoodItem' },
                    { path: 'servingMethodId.servingMethod', model: 'ServingMethod' }
                ]
            })
            .populate('orderDate')
            .populate('pickupLocation');
        
        const prePackagingPaidOrders = await PreOrderReciept.find({ orderType: "paid" })
            .populate({
                path: 'orderId',
                populate: [
                    { path: 'userId', model: 'AdminUser' },
                    { path: 'items.foodItem', model: 'PrePackageFoodItem' }
                ]
            })
            .populate({
                path: 'orderDate',
                model: 'PrePackagingDeliveryDate'
            })
            .populate('pickupLocation');

        
            const bulkPaidOrders = await BulkOrderReciept.find({ orderType: "paid" })
            .populate({
                path: 'orderId',
                populate: [
                    { path: 'userId', model: 'PremvatiUser' },
                    { path: 'items.foodItem', model: 'BulkOrderItem' }
                ]
            })
            .populate('formId');

        const paidOrders = [...selfServicePaidOrders, ...prePackagingPaidOrders, ...bulkPaidOrders];

        res.status(200).json({
            status: "success",
            message: "Paid orders retrieved successfully",
            data: paidOrders
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};


const getAllCanceledOrders = async (req, res) => {
    try {
        //self-service
        const selfServiceCanceledOrders = await OrderReciept.find({ orderType: "canceled" })
            .populate({
                path: 'orderId',
                populate: [
                    { path: 'userId', model: 'AdminUser' },
                    { path: 'items.foodItem', model: 'FoodItem' },
                    { path: 'servingMethodId.servingMethod', model: 'ServingMethod' }
                ]
            })
            .populate('orderDate')
            .populate('pickupLocation');

            //pre-packaged
        const prePackagingCanceledOrders = await PreOrderReciept.find({ orderType: "canceled" })
            .populate({
                path: 'orderId',
                populate: [
                    { path: 'userId', model: 'AdminUser' },
                    { path: 'items.foodItem', model: 'PrePackageFoodItem' }
                ]
            })
            .populate({
                path: 'orderDate',
                model: 'PrePackagingDeliveryDate'
            })
            .populate('pickupLocation');

            const bulkCanceledOrders = await PreOrderReciept.find({ orderType: "canceled" })
            .populate({
                path: 'orderId',
                populate: [
                    { 
                        path: 'userId', 
                        model: 'PremvatiUser',
                        populate: {
                            path: 'premvati', 
                            model: 'Premvati' 
                        }
                    },
                    { path: 'items.foodItem', model: 'BulkOrderItem' }
                ]
            })
            .populate('formId');


        const canceledOrders = [...selfServiceCanceledOrders, ...prePackagingCanceledOrders, ...bulkCanceledOrders];

        res.status(200).json({
            status: "success",
            message: "Canceled orders retrieved successfully",
            data: canceledOrders
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export default {getAllCanceledOrders, getAllPaidBulkOrders, getAllPaidOrders, getAllPaidPreOrders, getAllPaidSelfOrders, getAllUnpaidBulkOrders, getAllUnpaidPreOrders, getAllUnpaidSelfOrders}