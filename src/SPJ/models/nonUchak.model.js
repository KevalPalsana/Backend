import { Schema, model } from 'mongoose';

const nonUchakSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: 'Group'},
    metal: { type: Schema.Types.ObjectId, ref: 'Metal'},
    item: { type: Schema.Types.ObjectId, ref: 'NonBarcodeCategory' },
    minWeight: { type: String},
    maxWeight: { type: String},
    rate: { type: String},
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NonUchak = model('NonUchak', nonUchakSchema);
export default NonUchak;
