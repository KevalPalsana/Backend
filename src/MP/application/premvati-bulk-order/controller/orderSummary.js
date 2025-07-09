import OrderSummary from'../models/orderSummary.js';
import Cart from'../models/cart.js';
import FoodItem from'../../../admin/models/bulkOrderItems.js';
import mongoose from'mongoose';

const createOrder = async (req, res) => {
    try {
        const { userId} = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
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

        const totalAmount = orderItems.reduce((acc, item) => acc + item.totalPrice, 0);

        // // Calculate total amount for the order
        // const totalAmount = totalFoodAmount + totalServingAmount;

        // Create a new order
        const newOrder = new OrderSummary({
            userId: new mongoose.Types.ObjectId(userId),
            items: orderItems,
            totalAmount: totalAmount
        });

        const savedOrder = await newOrder.save();
        // const totalFoodItemsPrice = savedOrder.items.reduce((acc, item) => acc + item.totalPrice, 0);



        // Clear the user's cart after the order is placed (optional)
        // await Cart.findOneAndDelete({ userId });


        res.status(201).json({
            message: 'Order created successfully',
            data: {
                ...savedOrder._doc,
                totalAmount: totalAmount,
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
            .populate('items.foodItem');


        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const totalFoodItemsPrice = order.items.reduce((acc, item) => acc + item.totalPrice, 0);

        res.status(200).json({ message: "Order retrieved successfully",
             data: order,
            totalFoodItemsPrice,
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
            .populate('items.foodItem');

        if (!orderSummary) {
            return res.status(404).json({
                status: "fail",
                message: "Order summary not found"
            });
        }
        const totalFoodItemsPrice = orderSummary.totalFoodItemsPrice;

        res.status(200).json({
            status: "success",
            message: "Order summary fetched successfully",
            data: {
                orderSummary,
                totalAmount: totalFoodItemsPrice
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


const deleteFoodItemFromOrderSummary = async (req, res) => {
    try {
        const { orderSummaryId, foodItemId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(orderSummaryId) || !mongoose.Types.ObjectId.isValid(foodItemId)) {
            return res.status(400).json({ message: 'Invalid Order Summary ID or Food Item ID' });
        }

        const updatedOrderSummary = await OrderSummary.findByIdAndUpdate(
            orderSummaryId,
            { $pull: { items: { foodItem: foodItemId } } },
            { new: true } 
        ).populate('items.foodItem', 'name price'); 

        if (!updatedOrderSummary) {
            return res.status(404).json({ message: 'Order summary or food item not found' });
        }

        res.status(200).json({
            message: 'Food item removed successfully from the order summary',
            data: updatedOrderSummary
        });
    } catch (error) {
        console.error('Error removing food item from order summary:', error);
        res.status(500).json({ message: 'An error occurred while removing the food item', error: error.message });
    }
};

const updateOrderSummary = async (req, res) => {
    try {
        const { orderSummaryId, userId, items} = req.body;

        if (!mongoose.Types.ObjectId.isValid(orderSummaryId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid Order Summary ID or User ID' });
        }

        let updatedItems = [];
        if (items && Array.isArray(items)) {
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

        const totalFoodAmount = updatedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        const totalAmount = totalFoodAmount;

        const updatedOrderSummary = await OrderSummary.findByIdAndUpdate(
            orderSummaryId,
            {
                userId: new mongoose.Types.ObjectId(userId),
                items: updatedItems.length ? updatedItems : undefined,
                totalAmount: totalAmount,
            },
            { new: true }
        ).populate('items.foodItem', 'name price')

        if (!updatedOrderSummary) {
            return res.status(404).json({ message: 'Order summary not found' });
        }

        res.status(200).json({
            message: 'Order summary updated successfully',
            data: {
                ...updatedOrderSummary._doc,
                totalFoodItemsPrice: totalFoodAmount,
            }
        });
    } catch (error) {
        console.error('Error updating order summary:', error);
        res.status(500).json({ message: 'Error updating order summary', error: error.message });
    }
};


export default {createOrder, getOrderByUserId, getOrderSummaryById, updateOrderSummary, deleteFoodItemFromOrderSummary}
