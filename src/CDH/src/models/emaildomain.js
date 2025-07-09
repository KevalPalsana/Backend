import mongoose from 'mongoose';

const emaildomainSchema = new mongoose.Schema({
    emaildomain: {
    type: String,
    required: true
  }
});

export default mongoose.model('Emaildomain', emaildomainSchema);
