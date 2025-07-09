import mongoose from 'mongoose';
import BulkOrderFormData from '../models/orderForm.js';
import BulkOrderCart from '../models/cart.js';

const createOrder = async (req, res) => {
    try {
        const { userId, deliveryNo, deliveryDate, name, phoneNumber, depositPrice, remainingPrice } = req.body;

        const cart = await BulkOrderCart.findOne({ userId });
        const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const order = new BulkOrderFormData({
            userId,
            deliveryNo,
            deliveryDate,
            name,
            phoneNumber,
            totalPrice: totalPrice.toFixed(2), 
            depositPrice,
            remainingPrice,
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};


// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await BulkOrderFormData.find().populate("userId deliveryDate");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// Get single order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await BulkOrderFormData.findById(id).populate("userId deliveryDate");
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
};

export default {createOrder, getAllOrders, getOrderById}