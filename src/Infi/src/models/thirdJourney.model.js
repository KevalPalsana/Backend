import { Schema, model } from 'mongoose';

const thirdJourneySchema = new Schema({
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

export const InfiThirdYearJourney = model("InfiThirdYearJourney", thirdJourneySchema);
