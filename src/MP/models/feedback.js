import mongoose from 'mongoose';


const FeedbackSchema = new mongoose.Schema({
  kalawadPremvatiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KalawadPremvati"
  },
  dholakiyaPremvatiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DholakiyaPremvati"
  },
  mavdiPremvatiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MavdiPremvati"
  },
  pramukhVatikaPremvatiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PramukhVatikaPremvati"
  },
  shraddhaParkPremvatiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShradhdhaParkPremvati"
  },
  sorathiyaVadiPremvatiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SorathiyaVadiPremvati"
  },
  tirupatiPremvatiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TirupatiPremvati"
  },
  locationName: {
    type: String
  },
}, { timestamps: true });



const MPFeedback = mongoose.model('MPFeedback', FeedbackSchema);


export default MPFeedback;
