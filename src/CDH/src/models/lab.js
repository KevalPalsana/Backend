import mongoose from 'mongoose';

const labSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique: true
    },
    location:
    {
        type: String
    },
    phone:
    {
        type: String
    }
},{timestamps:true});

export default mongoose.model('Lab', labSchema);

