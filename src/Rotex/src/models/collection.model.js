import { Schema, model } from 'mongoose';

const problemSchema = new Schema({
  problem: { type: String, required: true, unique: true },
});

const Problem = model('Problem', problemSchema);

export default Problem;
