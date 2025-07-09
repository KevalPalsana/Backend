import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  percentage: { type: String},
  // rangeStart : { type: Number},
  // rangeEnd: { type: Number},
});

// categorySchema.pre('save', async function (next) {
//   if(!this.rangeStart || !this.rangeEnd) {
//     const Group = model('Group');
//     const lastGroup = await Group.findOne().sort({ rangeEnd: -1 });

//     this.rangeStart = lastGroup? lastGroup.rangeEnd + 1 : 1;
//     this.rangeEnd = this.rangeStart + 99;
//   }

//   next();
// })

const Group = model('Group', categorySchema);

export default Group;
