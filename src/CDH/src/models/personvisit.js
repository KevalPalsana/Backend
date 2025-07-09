import mongoose from "mongoose";

const treatmentSubSchema = new mongoose.Schema({
    tooth: String,
    treatment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treatment"
    },
    price: String,
    units: String,
    discountPercentage: Number,
    discountAmount: Number,
    netAmount: Number,
    total: Number,
    notes: String,
}, { timestamps: true });

const treatmentOnSchema = new mongoose.Schema({
    title: String,
    overalldiscountpercentage: Number,
    treatments: [treatmentSubSchema]
}, { timestamps: true }, { _id: false });

const prescriptionSchema = new mongoose.Schema({
    medicines:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drug'
    },

    notes:
    {
        type: String,
    },
    active:
    {
        type: Boolean,
        default: true
    }
}, { timestamps: true }, { _id: false })

const personvisitSchema = new mongoose.Schema({
    patientid:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    clinic:
        [
            {
                doctor:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Doctor'
                },
                teeth:
                {
                    type: String
                },
                surface:
                {
                    type: String
                },
                painonpalpation:
                {
                    type: String
                },
                top:
                {
                    type: String
                },
                pulpsensitivity:
                {
                    type: String
                },
                conclusion:
                {
                    type: String
                },
                respiratoryrate:
                {
                    type: String
                },
                heartrate:
                {
                    type: String
                },
                o2oximetry:
                {
                    type: String
                },
                bodytemp:
                {
                    type: String
                },
                bpsystolic:
                {
                    type: String
                },
                bpdiastolic:
                {
                    type: String
                },
                sugarfasting:
                {
                    type: String
                },
                sugarpost:
                {
                    type: String
                },
                height:
                {
                    type: String
                },
                heightlying:
                {
                    type: String
                },
                weight:
                {
                    type: String
                },
                headcircum:
                {
                    type: String
                },
                complaint:
                {
                    type: String
                },
                finding:
                {
                    type: String
                },
                investigation:
                {
                    type: String
                },
                diagnosis:
                {
                    type: String
                },
                Complaints:
                {
                    type: String
                },
                notes:
                {
                    type: String,
                },
            }
        ],
    treatmentOn: [treatmentOnSchema],
    treatmentdone: [treatmentSubSchema],
    packageName:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CDHPackage"
    },
    prescription:[prescriptionSchema],
    instruction:
        [
            {
                name:
                {
                    type: String,
                },
                text:
                {
                    type: String,
                },
                notes:
                {
                    type: String,
                }
            }
        ],
    duepayment:
    {
        type: String
    },
    socialnoteDate:
    {
        type: Date
    },
    socialnote:
    {
        type: String
    },
    internalnoteDate:
    {
        type: Date
    },
    internalnote:
    {
        type: String
    }

}, { timestamps: true })


export default mongoose.model('Personvisit', personvisitSchema)