import Payment from '../models/payment.js'; 
import OrderReciept from '../models/orderReciept.js'; 


const createPayment = async (req, res) => {
    try {
        const { orderId, cashierName, recieptNo } = req.body;


        const order = await OrderReciept.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const paymentData = new Payment({
            orderId,
            cashierName,
            recieptNo
        });
        if (req.file) {
            paymentData.recieptImage = req.file.path; 
        }

        const newPayment = new Payment(paymentData);


        const savedPayment = await newPayment.save();

        return res.status(201).json({
            message: 'Payment created successfully',
            payment: savedPayment
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


const getPaymentById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const payment = await Payment.findOne({orderId}).populate('orderId');

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        return res.status(200).json({
            message: 'Payment retrieved successfully',
            payment
        });
    } catch (error) {
        console.error('Error fetching payment:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { cashierName, recieptNo } = req.body;

        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.cashierName = cashierName || payment.cashierName;
        payment.recieptNo = recieptNo || payment.recieptNo;

        const updatedPayment = await payment.save();

        return res.status(200).json({
            message: 'Payment updated successfully',
            payment: updatedPayment
        });
    } catch (error) {
        console.error('Error updating payment:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        await Payment.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Payment deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting payment:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export default {createPayment, getPaymentById, updatePayment, deletePayment}