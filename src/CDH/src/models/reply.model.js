import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  from: String,
  subject: String,
  message: String,
  receivedAt: { type: Date, default: Date.now },
});

export const EmailReply = mongoose.model("EmailReply", replySchema);
