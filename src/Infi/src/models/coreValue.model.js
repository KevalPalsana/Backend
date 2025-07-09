import { Schema, model } from 'mongoose';

const coreValueSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    mainIcon : String,
    hoverIcon: String,
    active: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const InfiCoreValue = model('InfiCoreValue', coreValueSchema);

export default InfiCoreValue;