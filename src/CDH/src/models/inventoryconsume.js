import mongoose from 'mongoose';

const inventoryConsumeSchema = new mongoose.Schema({
    center:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        required: true
    },
    billConsumptionDate:
    {
        type: Date,
        required: true
    },
    items:
        [
            {
                item:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'InventoryItem',
                    required: true
                },
                quantity:
                {
                    type: Number,
                    required: true
                },
                note:
                {
                    type: String,
                }
            }
        ],
    generalNote:
    {
        type: String,
    }
},{timestamps:true});

export default mongoose.model('InventoryConsume', inventoryConsumeSchema);

