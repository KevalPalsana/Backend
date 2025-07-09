import mongoose from "mongoose";

const centerSchema = new mongoose.Schema({
  centerName: { type: String},
  shortName: { type: String},
  address1: { type: String},
  address2: { type: String},
  city: { type: String},
  state: { type: String},
  zipCode: { type: Number},
  areaCode: { type: String },
  topColor: { type: String},
  gstIn: { type: String },
  landline: { type: String},
  ratecard: { type: String},
  registration: { type: String},
  emailId: {
    type: String,
    required: true,
  },
  mobile: { type: Number},
  centerColor: { type: String},
  ForEmailandMessage: {
    countycode: { type: String },
    contactNo: { type: Number},
    emailId: {
      type: String,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    ccEmailid: {
      type: String,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    emailSendName: { type: String }
  },
  Workinghours: {
    tex1: { type: String },
    tex2: { type: String },
    tex3: { type: String }
  },
  googleMapLink: { type: String },
  includeMapLink: { type: Boolean, default: false },
  instamojoPrivatekey: { type: String },
  instamojoAuthtoken: { type: String },
  instamojoMobile: { type: String },
  cashfreePaymentLink: { type: String },
  geolocationLongitude: { type: String },
  geolocationLatitude: { type: String },
  notes: { type: String },
  active: { type: Boolean, default: true },
  status:
  {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

export default mongoose.model("Center", centerSchema);
