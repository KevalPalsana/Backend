import mongoose from 'mongoose';

const labBillSchema = new mongoose.Schema({
    center:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        
    },
    billEntryDate:
    {
        type: Date,
        
    },
    lab:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab',
        
    },
    billNo:
    {
        type: String,
        
    },
    billDate:
    {
        type: Date,
        
    },
    note:
    {
        type:String
    },
    image:
    {
        type: String
    }
},{timestamps:true});

export default mongoose.model('LabBill', labBillSchema);

