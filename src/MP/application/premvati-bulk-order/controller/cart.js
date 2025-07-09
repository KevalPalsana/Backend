import Cart from '../models/cart.js';
import mongoose from 'mongoose';

const addToCart = async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const invalidItems = items.filter(item => !mongoose.Types.ObjectId.isValid(item.foodItem));
        if (invalidItems.length > 0) {
            return res.status(400).json({ message: 'Invalid food item IDs', invalidItems });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId: new mongoose.Types.ObjectId(userId),
                items: []
            });
        }

        for (let item of items) {
            const existingItem = cart.items.find(cartItem => cartItem.foodItem.toString() === item.foodItem);
            if (existingItem) {
                existingItem.quantity = parseInt(existingItem.quantity, 10) + parseInt(item.quantity, 10);
            } else {
                cart.items.push({
                    foodItem: new mongoose.Types.ObjectId(item.foodItem),
                    quantity: item.quantity
                });
            }
        }

        await cart.save();

        const populatedCart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) })
            .populate({
                path: 'items.foodItem', 
                select: 'name price'  
            });

        res.status(200).json({
            message: 'Items added to cart successfully',
            cart: populatedCart
        });
    } catch (error) {
        console.error('Error adding to the cart:', error);
        res.status(500).json({ message: 'Error adding to the cart', error: error.message });
    }
};


const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }


        const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) })
            .populate('userId')
            .populate({
                path: 'items.foodItem',  
                select: 'name price foodId photo'     
            });
            console.log("cart",cart)
        if (!cart) {
            console.log('Cart not found for userId:', userId); 
            return res.status(404).json({ message: 'Cart not found' });
        }
        let totalPrice = 0;
        if (cart && cart.items) {
            totalPrice = cart.items.reduce((sum, item) => {
                const itemPrice = parseFloat(item?.foodItem?.price); 
                const itemQuantity = parseInt(item?.quantity); 
                return sum + (itemPrice * itemQuantity); 
            }, 0);
        }
        cart.totalPrice = totalPrice;
        const cartData = {...cart.toObject(),totalPrice}
        console.log("cartwith total",cartData)
        res.status(200).json({
            status: 'success',
            data: cartData,
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};


const removeFromCart = async (req, res) => {
    try {
        const { userId, foodItem} = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.foodItem.toString() !== foodItem);

        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', data: cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
    }
};


const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];

        await cart.save();
        res.status(200).json({ message: 'Cart cleared', data: cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to clear cart', error: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const invalidItems = items.filter(item => !mongoose.Types.ObjectId.isValid(item.foodItem));
        if (invalidItems.length > 0) {
            return res.status(400).json({ message: 'Invalid food item IDs', invalidItems });
        }

        // Combine items with the same foodItem by summing their quantities
        const combinedItems = items.reduce((acc, item) => {
            const existingItem = acc.find(i => i.foodItem === item.foodItem);
            if (existingItem) {
                existingItem.quantity += item.quantity; 
            } else {
                acc.push({ foodItem: item.foodItem, quantity: item.quantity });
            }
            return acc;
        }, []);

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId: new mongoose.Types.ObjectId(userId),
                items: []
            });
        }

        // Replace the items in the cart with the new combined items
        cart.items = combinedItems.map(item => ({
            foodItem: new mongoose.Types.ObjectId(item.foodItem),
            quantity: item.quantity
        }));

        await cart.save();

        const populatedCart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) })
            .populate({
                path: 'items.foodItem', 
                select: 'name price'  
            });

        res.status(200).json({
            message: 'Cart updated successfully',
            cart: populatedCart
        });
    } catch (error) {
        console.error('Error updating the cart:', error);
        res.status(500).json({ message: 'Error updating the cart', error: error.message });
    }
};



const deleteFoodItemFromCart = async (req, res) => {
    try {
        const { cartId, foodItemId } = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { $pull: { items: { foodItem: foodItemId } } },
            { new: true } 
        )
        .populate('items.foodItem'); 

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart or food item not found' });
        }

        return res.status(200).json({
            message: 'Food item removed successfully from the cart',
            cart: updatedCart,
        });
    } catch (error) {
        console.error('Error removing food item from cart:', error);
        return res.status(500).json({ message: 'An error occurred while removing the food item', error });
    }
};

export default {addToCart, getCartByUserId, deleteFoodItemFromCart, clearCart, updateCart, removeFromCart}
