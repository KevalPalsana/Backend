import mongoose from "mongoose";

const aboutusSchema = new mongoose.Schema({
    text:{
        type: String
    }
})

export default mongoose.model('Aboutus', aboutusSchema);