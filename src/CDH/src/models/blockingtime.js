import mongoose from "mongoose";

const blockingtimeSchema = new mongoose.Schema({
    starttime:
    {
        type: String,
        required: true
    },
    endtime:
    {
        type: String,
        required: true
    }
});

export default mongoose.model('Blockingtime', blockingtimeSchema);