import { Schema, model } from 'mongoose';

const forthJourneySchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    year : String,
    image: String,
    active: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const InfiForthYearJourney = model("InfiForthYearJourney", forthJourneySchema);
