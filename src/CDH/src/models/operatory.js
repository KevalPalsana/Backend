import mongoose from "mongoose";

const operatorySchema = new mongoose.Schema({
    operatoryName:
    {
        type: String,
    },
    default:
    {
        type: Boolean,
        default: false,
    },
    active:
    {
        type: Boolean,
        default: false,
    },
    notes:
    {
        type: String
    },
    status:
    {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
    
})

export default mongoose.model('Operatory', operatorySchema);