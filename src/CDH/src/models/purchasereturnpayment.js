import mongoose from 'mongoose';

const purchaseReturnPaymentSchema = new mongoose.Schema(
    {
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
        },
        returnPaymentDate: {
            type: Date,
        },
        returnPaymentType: {
            type: String,
            enum: ['Cash', 'Card', 'UPI', 'NEFT', 'RTGS', 'Cheque', 'Other'],
        },
        transactionNo: {
            type: String,
        },
        returnPaymentAmount: {
            type: Number,
        },
        description: {
            type: String,
        },

        purchaseReturnInvoices: [
            {
                priNo: {
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

export default mongoose.model('PurchaseReturnPayment', purchaseReturnPaymentSchema);
