import mongoose from 'mongoose';

const inventoryTransferSchema = new mongoose.Schema({
    fromcenter:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        
    },
    tocenter:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        
    },
    transferDate:
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
                quantity:
                {
                    type: Number,
                    
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

export default mongoose.model('InventoryTransfer', inventoryTransferSchema);

