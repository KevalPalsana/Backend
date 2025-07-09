import { Schema, model } from 'mongoose';

const privacyPolicySchema = new Schema({
  text: { type: String, required: true, unique: true },
  title: { type: String},
});

const PrivacyPolicy = model('PrivacyPolicy', privacyPolicySchema);

export default PrivacyPolicy;
