import mongoose from 'mongoose';

const prePackagingRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

const PrePackagingRole = mongoose.model('PrePackagingRole', prePackagingRoleSchema);

export default PrePackagingRole;
