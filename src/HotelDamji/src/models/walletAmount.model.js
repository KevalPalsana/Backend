import { Schema, SchemaTypes, model } from 'mongoose';

const walletAmountSchema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'HotelUser',
      required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true,
  },
);
const HotelWalletAmount = model('HotelWalletAmount', walletAmountSchema);

export default HotelWalletAmount;
