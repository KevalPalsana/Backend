import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pravruti: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Pravruti",
    },
    kshetra: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Kshetra",
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Designation",  
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
}, {timestamps : true});

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;