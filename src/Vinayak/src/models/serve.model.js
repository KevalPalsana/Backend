import { Schema, model } from 'mongoose';

const ServeSchema = new Schema({
  title: { type: String, required: true },
  icon: { type: String },
  description: { type: String },
});

const IndustriesServe = model('IndustriesServe', ServeSchema);

export default IndustriesServe;
