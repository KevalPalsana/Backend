import { Schema, model } from 'mongoose';

const serialNoSchema = new Schema({
  number: { type: Number, required: true, unique: true },
});

const SerialNo = model('SerialNo', serialNoSchema);

export default SerialNo;
