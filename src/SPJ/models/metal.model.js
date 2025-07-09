import { Schema, model } from 'mongoose';

const metalSchema = new Schema({
  metalName: { type: String, required: true, unique: true },
});

const Metal = model('Metal', metalSchema);

export default Metal;
