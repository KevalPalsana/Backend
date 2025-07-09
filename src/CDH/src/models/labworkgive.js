import mongoose from 'mongoose';

const labWorkGiveSchema = new mongoose.Schema({
  center:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    
  },
  lab:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    
  },
  givenby:
  {
    type: String,
    
  },
  recieveby:
  {
    type: String,
    
  },
},{timestamps:true});

export default mongoose.model('LabWorkGive', labWorkGiveSchema);

