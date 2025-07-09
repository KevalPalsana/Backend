import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'RameshwarRole', required: true },
  companyId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RameshwarInfo', required: true}],
  loginEnabled: { type: Boolean, default: true },
  avatar: { type: String },
}, { timestamps: true });

const RameshwarRoleUser = mongoose.model('RameshwarRoleUser', userSchema);

export default RameshwarRoleUser;
