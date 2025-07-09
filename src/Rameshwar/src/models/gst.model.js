import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const gstSchema = new Schema({
  pollQuantity: { type: Number, required: true },
  gst: { type: Number, required: true },
}, { timestamps: true });


const RameshwarGST = model('RameshwarGST', gstSchema);
export default RameshwarGST;
