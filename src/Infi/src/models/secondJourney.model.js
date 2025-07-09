import { Schema, model } from 'mongoose';

const secondJourneySchema = new Schema({
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

export const InfiSecondYearJourney = model("InfiSecondYearJourney", secondJourneySchema);
