import { Schema, model } from 'mongoose';

const gstSchema = new Schema({
  CGST: { type: Number, required: true},
  SGST: { type: Number, required: true},

});

const GST = model('GST', gstSchema);

export default GST;
