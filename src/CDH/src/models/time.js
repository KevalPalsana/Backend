import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema({
    date:
    {
        type:String,
        required: true,
    },
    time:
    {
        type:String,
        required: true,
    },
    timezone:
    {
        type:String,
        required: true,
    }
});

export default mongoose.model('Time',TimeSchema)