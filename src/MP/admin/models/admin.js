import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   password: {
    type: String,
    required: true,
   }
}, {timestamps : true});

const MPAdmin = mongoose.model("MPAdmin", adminSchema);

export default MPAdmin;