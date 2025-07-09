import { Schema, model } from 'mongoose';

const bannerSchema = new Schema(
  {
    image: { type: String},
  },
  { timestamps: true }
);

const CuckooBanner = model('CuckooBanner', bannerSchema);

export default CuckooBanner;
