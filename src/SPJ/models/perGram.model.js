import { Schema, model } from 'mongoose';

const perGramSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: 'Group'},
    metal: { type: Schema.Types.ObjectId, ref: 'Metal'},
    item: { type: Schema.Types.ObjectId, ref: 'GroupItem'},
    minWeight: { type: String},
    maxWeight: { type: String},
    rate: { type: String},
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PerGram = model('PerGram', perGramSchema);
export default PerGram;
