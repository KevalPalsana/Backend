import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  icon: { type: String}, 
  title: { type: String},
  description: { type: String},
}, { timestamps: true });

const ChappiaService = mongoose.model('ChappiaService', serviceSchema);
export default ChappiaService;
