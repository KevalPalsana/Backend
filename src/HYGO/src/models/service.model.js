import mongoose from 'mongoose';

const durationSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  unit: { type: String, enum: ['days', 'months', 'years'], required: true }
});

const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  serviceDescription: { type: String },
  servicePrice: { type: Number, required: true },
  serviceDuration: durationSchema,
  serviceFrequency: { type: String },
  serviceStatus: { type: String, enum: ['active', 'inactive'], default: 'active' },
  discount: { type: Number, default: 0 },
  availableForCards: [{ type: String }],
  linkedCards: [{ type: String }]
}, { timestamps: true });

// const HYGOService = mongoose.model('HYGOService', serviceSchema);
export default serviceSchema;
