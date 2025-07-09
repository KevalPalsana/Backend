import { Schema, model } from 'mongoose';

const IncludedSchema = new Schema(
  {
    // icon: String,
    name: String,
  },
  { timestamps: true }
);

const Included = model('Included', IncludedSchema);

export default Included;
