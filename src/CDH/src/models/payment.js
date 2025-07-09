import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
timeid: 
{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Time', 
    required: true 
},
userid: 
{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
},
bookingid: 
{ 
    type: String 
},
amount:
{
    type:Number,
    required: true
},
paymentStatus: 
{
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'pending'
},
currency:
{
    type: String
},
receipt:
{
    type: String
}
});

export default mongoose.model('CDHPayment', paymentSchema);
