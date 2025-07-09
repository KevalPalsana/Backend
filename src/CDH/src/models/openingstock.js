import mongoose from 'mongoose';

const stockItemSchema = new mongoose.Schema({
  item: {
    type: String,
  },
  batchNo: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
  quantity: {
    type: Number,
    min: 1
  }
});

const openingStockSchema = new mongoose.Schema({
  inwardType: {
    type: String,
    enum: ['Purchase', 'Transfer', 'Adjustment', 'Return'] // Add valid types based on your app logic
  },
  items: {
    type: [stockItemSchema],
  },
});

export default mongoose.model('OpeningStock', openingStockSchema);


