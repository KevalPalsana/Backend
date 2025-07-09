import { Schema, model } from 'mongoose';

const designSchema = new Schema({
  designName: { type: String, required: true, unique: true },
  // groupItemId: { type: Schema.Types.ObjectId, ref: "GroupItem"},
});

const Design = model('Design', designSchema);

export default Design;
