import { Schema, model } from 'mongoose';

const rateSchema = new Schema({
  categoryId: { type: Schema.Types.ObjectId, ref: "Group", required: true},
  price: { type: String, required: true},
});

const MarketRate = model('MarketRate', rateSchema);

export default MarketRate;
    