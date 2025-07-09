import { Schema, model } from 'mongoose';

const sizeSchema = new Schema({
//   groupItemId: { 
//     type: Schema.Types.ObjectId, 
//     ref: "GroupItem", 
// },
  sizeName: {
    type: String,
  }
});

const Size = model('Size', sizeSchema);

export default Size;
