import mongoose from "mongoose";

const termSchema = new mongoose.Schema({
    condition:{
        type: String
    }
})

export default mongoose.model('Term&conditions', termSchema);