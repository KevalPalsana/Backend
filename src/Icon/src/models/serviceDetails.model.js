import { Schema, model } from 'mongoose';

const serviceDetailSchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service"
  },
  title: { 
    type: String, 
    required: true, 
    unique: true 
},
  description: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  subDescription: {
    type: String,
    required: true,
  },
});

const IconServiceDetail = model('IconServiceDetail', serviceDetailSchema);

export default IconServiceDetail;
