import mongoose from 'mongoose';

const otherSchema = new mongoose.Schema({
    otherName: {
        type: String,
        required: true
    },
    searchWords:
    {
        type: String
    },
    active:
    {
        type: Boolean,
        default: false,
    },
    default:
    {
        type: Boolean,
        default: false,
    },
    notes: {
        type: String,
        default: ''
    },
    status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
},{timestamps:true});

export default mongoose.model('Other', otherSchema);
