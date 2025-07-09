import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
    policy:{
        type: String
    }
})

export default mongoose.model('Policy', policySchema);