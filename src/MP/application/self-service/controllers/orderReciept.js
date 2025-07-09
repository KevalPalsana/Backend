import OrderReciept from "../models/orderReciept.js";
import OrderSummary from "../models/orderSummary.js";
import Cart from '../models/cart.js';
import mongoose from 'mongoose';

const createOrderReciept = async (req, res) => {
    try {
        const { orderId, orderDate, pickupLocation } = req.body;



        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID' });
        }

        const order = await OrderSummary.findById(orderId);

        if (!mongoose.Types.ObjectId.isValid(orderDate)) {
            return res.status(400).json({ message: 'Invalid Order Date ID' });
        }
        if (!mongoose.Types.ObjectId.isValid(pickupLocation)) {
            return res.status(400).json({ message: 'Invalid Pickup Location ID' });
        }

        const userId = order.userId;

        let existingOrderReciept = await OrderReciept.findOne({ orderId });

        if (existingOrderReciept) {
            existingOrderReciept.orderDate = orderDate;
            existingOrderReciept.pickupLocation = pickupLocation;

            const updatedOrderReciept = await existingOrderReciept.save();

            await Cart.deleteOne({ userId });

            return res.status(200).json({
                status: "success",
                message: "Order receipt updated successfully",
                data: updatedOrderReciept
            });
        }

        // Create a new OrderReciept if none exists
        const newOrderReciept = new OrderReciept({
            orderId,
            orderDate,
            pickupLocation
        });

        const savedOrderReciept = await newOrderReciept.save();

        await Cart.deleteOne({ userId });

        res.status(201).json({
            status: "success",
            message: "Order receipt created successfully",
            data: savedOrderReciept
        });
    } catch (error) {
        console.error("Error creating receipt:", error);
        res.status(500).json({
            message: "Error to create receipt",
            error: error.message
        });
    }
};



const getOrderReciept = async (req, res) => {
    try {

        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID' });

        }

        const orderSummaries = await OrderSummary.find({ userId });

        if (orderSummaries.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        const orderIds = orderSummaries.map(order => order._id);

        const orderReceipts = await OrderReciept.find({ orderId: { $in: orderIds } })
            .populate('userId')
            .populate({
                path: 'orderId',
                populate: [
                    { path: 'items.foodItem', select: 'name price photo' },
                    { path: 'servingMethodId.servingMethod', select: 'name price photo' }
                ]
            })
            .populate('orderDate')
            .populate('pickupLocation').sort({ createdAt: -1 });

        if (orderReceipts.length === 0) {
            return res.status(404).json({ message: 'No receipts found for this user' });
        }

        res.status(200).json({
            status: "success",
            message: "Order receipts retrieved successfully",
            data: orderReceipts,
        });
    }
    catch (error) {
        console.error("Error retrieving order receipts:", error);
        res.status(500).json({ message: "Error retrieving order receipts", error: error.message });
    }
}

const updateOrderRecieptToPaid = async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find and update the order receipt's orderType to 'paid'
        const updatedOrderReciept = await OrderReciept.findOneAndUpdate(
            { orderId },  // Find by orderId
            { orderType: "paid" },  // Update orderType to 'paid'
            { new: true }  // Return the updated document
        );


        if (!updatedOrderReciept) {
            return res.status(404).json({
                status: "error",
                message: "Order receipt not found for this order ID"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Order receipt updated to paid successfully",
            data: updatedOrderReciept
        });
    } catch (error) {
        console.error("Error updating order receipt:", error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};



const getUnpaidOrderById = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        // Find order summaries by userId
        const orderSummaries = await OrderSummary.find({ userId });

        if (orderSummaries.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        // Extract orderIds from the order summaries
        const orderIds = orderSummaries.map(order => order._id);

        // Find unpaid order receipts using the retrieved orderIds
        const unpaidOrders = await OrderReciept.find({ orderType: "unpaid", orderId: { $in: orderIds } })
            .populate('orderId')
            .populate('orderDate')
            .populate('pickupLocation').sort({ createdAt: -1 });

        if (unpaidOrders.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No unpaid orders found for this user."
            });
        }

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


const getPaidOrderById = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const orderSummaries = await OrderSummary.find({ userId });


        if (orderSummaries.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        const orderIds = orderSummaries.map(order => order._id);

        console.log('Order IDs for userId:', userId, orderIds);

        const paidOrders = await OrderReciept.find({ orderType: "paid", orderId: { $in: orderIds } })
            .populate('orderId')
            .populate('orderDate')
            .populate('pickupLocation').sort({ createdAt: -1 });

        console.log('Paid orders for userId:', userId, paidOrders);

        if (paidOrders.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No paid orders found for this user"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Paid orders retrieved successfully",
            data: paidOrders
        });
    } catch (error) {
        console.error("Error retrieving paid orders:", error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};




// const getOrderById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ status: "error", message: "Invalid order ID" });
//         }

//         const order = await OrderReciept.findById(id)
//             .populate({
//                 path: 'orderId',
//                 populate: [
//                     { path: 'items.foodItem', select: 'name price photo' },
//                     { path: 'servingMethodId.servingMethod', select: 'name price photo' }
//                 ]
//             })
//             .populate('orderDate')
//             .populate('pickupLocation');

//         if (!order) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "Order not found"
//             });
//         }


//         res.status(200).json({
//             status: "success",
//             message: "Order retrieved successfully",
//             data: order
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: "error",
//             message: error.message
//         });
//     }
// };

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "Invalid order ID" });
        }

        const orderReciept = await OrderReciept.findById(id)
            .populate({
                path: 'orderId',
                populate: [
                    { path: 'items.foodItem', select: 'name price photo' },
                    { path: 'servingMethodId.servingMethod', select: 'name price photo' }
                ]
            })
            .populate('orderDate')
            .populate('pickupLocation')
            .populate('userId', 'name'); // Populate user details if needed

        if (!orderReciept) {
            return res.status(404).json({
                status: "error",
                message: "Order not found"
            });
        }

        // Format the response
        const formattedResponse = {
            orderSummary: {
                _id: orderReciept.orderId?._id,
                userId: {
                    _id: orderReciept.userId?._id,
                    name: orderReciept.userId?.name,
                },
                items: orderReciept?.orderId?.items?.map(item => ({
                    foodItem: {
                        _id: item?.foodItem?._id,
                        name: item?.foodItem?.name,
                        price: item?.foodItem?.price,
                        photo: item?.foodItem?.photo,
                    },
                    quantity: item?.quantity,
                    totalPrice: item?.totalPrice,
                    _id: item?._id,
                })),
                servingMethodId: orderReciept?.orderId?.servingMethodId?.map(method => ({
                    servingMethod: {
                        _id: method?.servingMethod?._id,
                        name: method?.servingMethod?.name,
                        price: method?.servingMethod?.price,
                        photo: method?.servingMethod?.photo,
                    },
                    quantity: method?.quantity,
                    totalPrice: method?.totalPrice,
                    _id: method?._id,
                })),
                totalAmount: orderReciept?.orderId?.totalAmount,
                createdAt: orderReciept?.orderId?.createdAt,
                updatedAt: orderReciept?.orderId?.updatedAt,
            },
            orderDate: {
                _id: orderReciept?.orderDate?._id,
                pickupDate: orderReciept?.orderDate?.pickupDate,
            },
            pickupLocation: {
                _id: orderReciept?.pickupLocation?._id,
                name: orderReciept?.pickupLocation?.name,
            },
            _id: orderReciept?._id,
            totalFoodItemsPrice: orderReciept.orderId.items.reduce((acc, item) => acc + item.totalPrice, 0),
            totalServingMethodPrice: orderReciept.orderId.servingMethodId.reduce((acc, method) => acc + method.totalPrice, 0),
            totalAmount: orderReciept?.orderId?.totalAmount,
        };

        res.status(200).json({
            status: "success",
            message: "Order retrieved successfully",
            data: formattedResponse
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};


const getReceiptById = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID' });
        }

        const orderReciept = await OrderReciept.findOne({ orderId })
            .populate('userId', 'name')
            .populate({
                path: 'orderId',
                populate: [
                    {
                        path: 'items.foodItem',
                        select: 'name price',
                    },
                    {
                        path: 'servingMethodId.servingMethod',
                        select: 'name price',
                    }
                ]
            })
            .populate('orderDate')
            .populate('pickupLocation', 'name');

        if (!orderReciept) {
            return res.status(404).json({
                status: "fail",
                message: "Order receipt not found"
            });
        }

        const formattedResponse = {
            orderSummary: {
                _id: orderReciept.orderId?._id,
                userId: {
                    _id: orderReciept.userId?._id,
                    name: orderReciept.userId?.name,
                },
                items: orderReciept?.orderId?.items?.map(item => ({
                    foodItem: {
                        _id: item?.foodItem?._id,
                        name: item?.foodItem?.name,
                        price: item?.foodItem?.price,
                    },
                    quantity: item?.quantity,
                    totalPrice: item?.totalPrice,
                    _id: item?._id,
                })),
                servingMethodId: orderReciept?.orderId?.servingMethodId?.map(method => ({
                    servingMethod: {
                        _id: method?.servingMethod?._id,
                        name: method?.servingMethod?.name,
                        price: method?.servingMethod?.price,
                    },
                    quantity: method?.quantity,
                    totalPrice: method?.totalPrice,
                    _id: method?._id,
                })),
                pickupLocation: {
                    _id: orderReciept?.pickupLocation?._id,
                    name: orderReciept?.pickupLocation?.name,
                },
                orderDate: {
                    _id: orderReciept?.orderDate?._id,
                    pickupDate: orderReciept.orderDate?.pickupDate,
                    pickupTime: orderReciept.orderDate?.pickupTime
                },
                totalAmount: orderReciept?.orderId?.totalAmount,
                createdAt: orderReciept?.orderId?.createdAt,
                updatedAt: orderReciept?.orderId?.updatedAt,
            },
            totalFoodItemsPrice: orderReciept.orderId.items.reduce((acc, item) => acc + item.totalPrice, 0),
            totalServingMethodPrice: orderReciept.orderId.servingMethodId.reduce((acc, method) => acc + method.totalPrice, 0),
            totalAmount: orderReciept?.orderId?.totalAmount,
        };

        res.status(200).json({
            status: "success",
            message: "Order receipt fetched successfully",
            data: formattedResponse
        });
    } catch (error) {
        console.error("Error fetching receipt:", error);
        res.status(500).json({
            message: "Error fetching receipt",
            error: error.message
        });
    }
};


const updateOrderRecieptToCancel = async (req, res) => {
    try {
        const orderId = req.params.id;

        const updatedOrderReciept = await OrderReciept.findOneAndUpdate(
            { orderId },
            { orderType: "canceled" },
            { new: true }  // Return the updated document
        );


        if (!updatedOrderReciept) {
            return res.status(404).json({
                status: "error",
                message: "Order receipt not found for this order ID"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Order receipt updated to paid successfully",
            data: updatedOrderReciept
        });
    } catch (error) {
        console.error("Error updating order receipt:", error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export default {createOrderReciept, getOrderReciept, updateOrderRecieptToCancel, getReceiptById, getOrderById, getPaidOrderById, getUnpaidOrderById, updateOrderRecieptToPaid}

