import mongoose from 'mongoose';

const purchasePaymentSchema = new mongoose.Schema(
    {
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
        },
        paymentDate: {
            type: Date,
        },
        paymentType: {
            type: String,
            enum: ['Cash', 'Card', 'UPI', 'NEFT', 'RTGS', 'Cheque', 'Other'], // customize as needed
        },
        transactionNo: {
            type: String,
        },
        paymentAmount: {
            type: Number,
        },
        description: {
            type: String,
        },


        purchaseInvoices: [
            {
                piNo: {
                    type: String
                },
                poNo: {
                    type: String
                },
                finalAmount: {
                    type: Number
                },
                openBalance: {
                    type: Number
                },
            },
        ],

        paidAmount: {
            type: Number
        },
        pendingAmount: {
            type: Number
        },
        unsettledAmount: {
            type: Number
        },
    },
    { timestamps: true }
);

export default mongoose.model('PurchasePayment', purchasePaymentSchema);
