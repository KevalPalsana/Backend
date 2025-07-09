import mongoose from 'mongoose';

const inventoryPurchaseSchema = new mongoose.Schema({
    center:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',

    },
    billEntryDate:
    {
        type: Date,

    },
    vendor:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',

    },
    billNo:
    {
        type: String,

    },
    billDate:
    {
        type: Date,

    },
    items:
        [
            {
                item:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'InventoryItem',

                },
                lastPrice:
                {
                    type: Number,

                },
                price:
                {
                    type: Number,

                },
                qty:
                {
                    type: Number,

                },
                disc:
                {
                    type: Number,
                    default: 0
                },
                net:
                {
                    type: Number,

                },
                tax:
                {
                    type: Number,
                    default: 0
                },
                total:
                {
                    type: Number,

                },
                notes:
                {
                    type: String,
                },
            }
        ],
    others:
    {
        type: Number,
        default: 0
    },
    particulars:
    {
        type: String,
    },
    notes:
    {
        type: String,
    },
    image:
    {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('InventoryPurchase', inventoryPurchaseSchema);

