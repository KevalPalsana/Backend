import { Schema, model } from 'mongoose';
      
const nonPercentageSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: 'Group'},
    metal: { type: Schema.Types.ObjectId, ref: 'Metal'},
    item: { type: Schema.Types.ObjectId, ref: 'NonBarcodeCategory'},
    minWeight: { type: String},
    maxWeight: { type: String},
    rate: { type: String},
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NonPercentage = model('NonPercentage', nonPercentageSchema);
export default NonPercentage;
