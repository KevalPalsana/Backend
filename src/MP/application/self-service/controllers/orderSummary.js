import OrderSummary from '../models/orderSummary.js';
import Cart from '../models/cart.js';
import ServingMethod from '../../../admin/models/servingMethod.js';
import FoodItem from '../../../admin/models/foodItem.js';
import mongoose from 'mongoose';

const createOrder = async (req, res) => {
    try {
        const { userId, servingMethodId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        if (!Array.isArray(servingMethodId) || servingMethodId.length === 0) {
            return res.status(400).json({ message: 'servingMethodId must be an array with at least one element' });
        }

        const invalidMethods = servingMethodId.filter(method =>
            !mongoose.Types.ObjectId.isValid(method.servingMethod) || typeof method.quantity !== 'number');
        if (invalidMethods.length > 0) {
            return res.status(400).json({ message: 'Invalid serving method IDs or quantities', invalidMethods });
        }

        const servingMethodIds = servingMethodId.map(m => m.servingMethod);
        const validServingMethods = await ServingMethod.find({ _id: { $in: servingMethodIds } });

        if (validServingMethods.length !== servingMethodIds.length) {
            return res.status(400).json({ message: 'Some serving methods not found' });
        }

        const cart = await Cart.findOne({ userId }).populate('items.foodItem');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty. Cannot create order.' });
        }

        const orderItems = cart.items
            .filter(item => item.foodItem) 
            .map(item => ({
                foodItem: item.foodItem._id,
                quantity: item.quantity,
                totalPrice: item.foodItem.price * item.quantity
            }));

        if (orderItems.length === 0) {
            return res.status(400).json({ message: 'No valid items in the cart to create an order.' });
        }

        // Calculate total food amount
        const totalFoodAmount = orderItems.reduce((acc, item) => acc + item.totalPrice, 0);

        const orderServingMethods = servingMethodId.map(method => {
            const foundMethod = validServingMethods.find(m => m._id.equals(method.servingMethod));
            const servingPrice = foundMethod ? foundMethod.price : 0;
            const totalPrice = servingPrice * method.quantity;
            return {
                servingMethod: method.servingMethod,
                quantity: method.quantity,
                totalPrice: totalPrice
            };
        });

        // Calculate total serving amount
        const totalServingAmount = orderServingMethods.reduce((acc, method) => acc + method.totalPrice, 0);

        // Calculate total amount for the order
        const totalAmount = totalFoodAmount + totalServingAmount;

        // Create a new order
        const newOrder = new OrderSummary({
            userId: new mongoose.Types.ObjectId(userId),
            items: orderItems,
            servingMethodId: orderServingMethods,
            totalAmount: totalAmount
        });

        const savedOrder = await newOrder.save();
        const totalFoodItemsPrice = savedOrder.items.reduce((acc, item) => acc + item.totalPrice, 0);
        const totalServingMethodPrice = savedOrder.servingMethodId.reduce((acc, method) => acc + method.totalPrice, 0);



        // Clear the user's cart after the order is placed (optional)
        // await Cart.findOneAndDelete({ userId });


        res.status(201).json({
            message: 'Order created successfully',
            data: {
                ...savedOrder._doc,
                servingMethodId: orderServingMethods,
                totalAmount: totalAmount,
                totalFoodItemsPrice: totalFoodItemsPrice,
                totalServingMethodPrice: totalServingMethodPrice 

            }
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};



const getOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const order = await OrderSummary.findOne({ userId: new mongoose.Types.ObjectId(userId) })
            .populate('userId')  
            .populate('items.foodItem') 
            .populate('servingMethodId.servingMethod');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const totalFoodItemsPrice = order.items.reduce((acc, item) => acc + item.totalPrice, 0);
        const totalServingMethodPrice = order.servingMethodId.reduce((acc, method) => acc + method.totalPrice, 0);

        res.status(200).json({ message: "Order retrieved successfully",
             data: order,
            totalFoodItemsPrice,
            totalServingMethodPrice
             });
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: "Error retrieving order", error: error.message });
    }
};


const getOrderSummaryById = async (req, res) => {
    try {
        const { id } = req.params; 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Order Summary ID' });
        }

        const orderSummary = await OrderSummary.findById(id)
            .populate('userId') 
            .populate('items.foodItem') 
            .populate('servingMethodId.servingMethod');

        if (!orderSummary) {
            return res.status(404).json({
                status: "fail",
                message: "Order summary not found"
            });
        }
        const totalFoodItemsPrice = orderSummary.totalFoodItemsPrice;
        const totalServingMethodPrice = orderSummary.totalServingMethodPrice;

        res.status(200).json({
            status: "success",
            message: "Order summary fetched successfully",
            data: {
                orderSummary,
                totalFoodItemsPrice,
                totalServingMethodPrice,
                totalAmount: totalFoodItemsPrice + totalServingMethodPrice
            }
        });
    } catch (error) {
        console.error("Error fetching order summary:", error);
        res.status(500).json({
            message: "Error fetching order summary",
            error: error.message
        });
    }
};


const deleteItemFromOrderSummary = async (req, res) => {
    try {
        const { orderSummaryId, foodItemId, servingMethodId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(orderSummaryId) ||
            (foodItemId && !mongoose.Types.ObjectId.isValid(foodItemId)) ||
            (servingMethodId && !mongoose.Types.ObjectId.isValid(servingMethodId))) {
            return res.status(400).json({ message: 'Invalid ID(s) provided' });
        }

        const updateQuery = {};
        
        if (foodItemId) {
            updateQuery.$pull = { items: { foodItem: foodItemId } };
        }
        
        if (servingMethodId) {
            updateQuery.$pull = updateQuery.$pull || {};
            updateQuery.$pull.servingMethodId = { servingMethod: servingMethodId };
        }

        const updatedOrderSummary = await OrderSummary.findByIdAndUpdate(
            orderSummaryId,
            updateQuery,
            { new: true }
        )
        .populate('items.foodItem', 'name price')
        .populate('servingMethodId.servingMethod', 'name price'); 

        if (!updatedOrderSummary) {
            return res.status(404).json({ message: 'Order summary or specified item not found' });
        }

        res.status(200).json({
            message: 'Item removed successfully from the order summary',
            data: updatedOrderSummary
        });
    } catch (error) {
        console.error('Error removing item from order summary:', error);
        res.status(500).json({ message: 'An error occurred while removing the item', error: error.message });
    }
};


const updateOrderSummary = async (req, res) => {
    try {
        const { orderSummaryId, userId, items, servingMethodId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(orderSummaryId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid Order Summary ID or User ID' });
        }

        let updatedItems = [];
        if (items && Array.isArray(items)) {
            // Retrieve food item prices from the database if needed
            const foodItemIds = items.map(item => item.foodItem);
            const foodItemsData = await FoodItem.find({ _id: { $in: foodItemIds } }, 'price');

            updatedItems = items.map(item => {
                const foodItemData = foodItemsData.find(fi => fi._id.equals(item.foodItem));
                const price = item.price || (foodItemData ? foodItemData.price : 0);
                
                if (!mongoose.Types.ObjectId.isValid(item.foodItem) || typeof item.quantity !== 'number') {
                    throw new Error('Invalid food item ID or quantity');
                }
                
                return {
                    foodItem: item.foodItem,
                    quantity: item.quantity,
                    totalPrice: price * item.quantity,
                };
            });
        }

        let updatedServingMethods = [];
        if (servingMethodId && Array.isArray(servingMethodId)) {
            const invalidMethods = servingMethodId.filter(method =>
                !mongoose.Types.ObjectId.isValid(method.servingMethod) || typeof method.quantity !== 'number'
            );
            if (invalidMethods.length > 0) {
                return res.status(400).json({ message: 'Invalid serving method IDs or quantities', invalidMethods });
            }

            const servingMethodIds = servingMethodId.map(m => m.servingMethod);
            const validServingMethods = await ServingMethod.find({ _id: { $in: servingMethodIds } });

            if (validServingMethods.length !== servingMethodIds.length) {
                return res.status(400).json({ message: 'Some serving methods not found' });
            }

            updatedServingMethods = servingMethodId.map(method => {
                const foundMethod = validServingMethods.find(m => m._id.equals(method.servingMethod));
                const servingPrice = foundMethod ? foundMethod.price : 0;
                const totalPrice = servingPrice * method.quantity;
                return {
                    servingMethod: method.servingMethod,
                    quantity: method.quantity,
                    totalPrice: totalPrice,
                };
            });
        }

        const totalFoodAmount = updatedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        const totalServingAmount = updatedServingMethods.reduce((acc, method) => acc + method.totalPrice, 0);
        const totalAmount = totalFoodAmount + totalServingAmount;

        const updatedOrderSummary = await OrderSummary.findByIdAndUpdate(
            orderSummaryId,
            {
                userId: new mongoose.Types.ObjectId(userId),
                items: updatedItems.length ? updatedItems : undefined,
                servingMethodId: updatedServingMethods.length ? updatedServingMethods : undefined,
                totalAmount: totalAmount,
            },
            { new: true }
        ).populate('items.foodItem', 'name price')
         .populate('servingMethodId.servingMethod', 'name price');

        if (!updatedOrderSummary) {
            return res.status(404).json({ message: 'Order summary not found' });
        }

        res.status(200).json({
            message: 'Order summary updated successfully',
            data: {
                ...updatedOrderSummary._doc,
                totalFoodItemsPrice: totalFoodAmount,
                totalServingMethodPrice: totalServingAmount,
            }
        });
    } catch (error) {
        console.error('Error updating order summary:', error);
        res.status(500).json({ message: 'Error updating order summary', error: error.message });
    }
};

export default {createOrder, getOrderByUserId, getOrderSummaryById, updateOrderSummary, deleteItemFromOrderSummary}