import { Schema, model } from "mongoose";


const gatewaySchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["visa-free", "visa-arrival"]},
    image: { type: String },
});

const CuckooGateway = model("CuckooGateway", gatewaySchema);
export default CuckooGateway;
