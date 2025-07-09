import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  addressLine: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  }
});

const clinicSchema = new mongoose.Schema({
  clinicName: { type: String, required: true },
  clinicPhone: { type: String },
  clinicEmail: { type: String },
  clinicStatus: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  clinicType: { type: String, enum: ['Private', 'Government'] },
  clinicDescription: { type: String },
  Department: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  OPD: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OPD' }],
  clinicAddress: addressSchema,
}, { timestamps: true });

clinicSchema.index({ location: '2dsphere' });

// const HYGOClinic = mongoose.model('HYGOClinic', clinicSchema);
export default clinicSchema;
