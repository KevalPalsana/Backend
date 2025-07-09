import { Schema, model } from "mongoose";


const themeSchema = new Schema({
    name: { type: String, required: true },
    packages: { type: String },
    image: { type: String },
});

const CuckooTheme = model("CuckooTheme", themeSchema);
export default CuckooTheme;
