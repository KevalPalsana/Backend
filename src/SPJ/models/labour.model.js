import { Schema, model } from 'mongoose';

const rangeSchema = new Schema({
    from: { type: Number, required: true },
    to: { type: Number, required: true },
    value: { type: Number, required: true } 
});

const labourSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: "GroupItem"
    },
    uchak: [rangeSchema], 
    percentage: [rangeSchema],
    perGram: [rangeSchema], 
    active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});



export const Labour = model("Labour", labourSchema);