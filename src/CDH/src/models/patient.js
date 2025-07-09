import mongoose from 'mongoose';
const habitStatusEnum = ['Never', 'Rare', 'Occasional', 'Low', 'Medium', 'High', 'Other', 'Unknown'];
const statusEnum = ['active', 'inactive', 'to_be_confirmed'];

const clinicSchema = new mongoose.Schema({
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
}, { timestamps: true })

const treatmentSubSchema = new mongoose.Schema({
    teeth: String,
    treatment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treatment"
    },
    price: String,
    units: Number,
    discountPercentage: Number,
    discountAmount: Number,
    netAmount: Number,
    total: Number,
    gst: {
        type: Number,
        default: 0
    },
    notes: String,
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    treatmentStatus: {
        type: String,
        enum: ['inprogress', 'done'],
        default: 'done'
    }

}, { timestamps: true });

const treatmentSubSchemaInProgress = treatmentSubSchema.clone();
treatmentSubSchemaInProgress.path('treatmentStatus').default('inprogress');

const treatmentOnSchema = new mongoose.Schema({
    title: String,
    overalldiscountpercentage: Number,
    treatments: [treatmentSubSchemaInProgress]
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

const habitDetailSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: statusEnum,
        default: 'to_be_confirmed'
    },
    frequency: {
        type: String,
        enum: habitStatusEnum,
        default: 'Unknown'
    }
}, { _id: false });

const patientSchema = new mongoose.Schema({
    center:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center'
    },
    doctor:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    visitdate:
    {
        type: Date
    },
    appointment:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    patientID:
    {
        type: String,
    },
    salutation:
    {
        type: String,
    },
    profile:
    {
        type: String
    },
    firstName:
    {
        type: String,
    },
    middleNames:
    {
        type: String
    },
    surname:
    {
        type: String
    },
    suffix:
    {
        type: String
    },
    gender:
    {
        type: String,
        enum: ['Male', 'Female', 'Transgender', 'Unknown'],
        default: 'Unknown',
    },
    countryCode1:
    {
        type: String,
    },
    whatsappNumber:
    {
        type: String
    },
    countryCode2:
    {
        type: String,
    },
    phoneNumber:
    {
        type: String,
    },
    personalEmail:
    {
        type: String,
    },
    emailDomain:
    {
        type: String
    },
    workEmail:
    {
        type: String,
    },
    nationality:
    {
        type: String
    },
    nationalID:
    {
        type: String
    },
    idType:
    {
        type: String
    },
    dobType:
    {
        type: String,
        enum: ['dob', 'age'],
        default: 'dob'
    },
    dateOfBirth:
    {
        type: Date
    },
    age:
    {
        type: Number
    },
    anniversaryDate:
    {
        type: Date
    },
    bloodGroup:
    {
        type: String
    },
    group:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientGroup'
    },
    rateCard:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ratecard'
    },
    searchTags:
    {
        type: String
    },
    NewPatient:
    {
        type: Boolean,
        default: true
    },
    Sourcetype:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sourcetype'
    },
    Source:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source'
    },
    refby:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Referral'
    },
    address1:
    {
        type: String
    },
    address2:
    {
        type: String
    },
    locality:
    {
        type: String
    },
    city:
    {
        type: String
    },
    pinCode:
    {
        type: String
    },
    country:
    {
        type: String,
        default: 'India'
    },
    state:
    {
        type: String
    },
    stdCode:
    {
        type: String
    },
    landlineNumber:
    {
        type: String
    },
    generalPractitioner:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeneralPractitioner'
    },
    emergencyContactName:
    {
        type: String
    },
    emergencyContactNumber:
    {
        type: String
    },
    spouseName:
    {
        type: String
    },
    spouseContactNumber:
    {
        type: String
    },
    Company: [
        {
            company:
            {
                type: String
            },
            subCompany:
            {
                type: String
            },
            policy:
            {
                type: String
            },
            insuranceIdNumber:
            {
                type: String
            },
        }
    ],
    maritalStatus:
    {
        type: String
    },
    discProfile:
    {
        type: String
    },
    familyFunctionality: {
        type: String,
        enum: ['no', 'head', 'member'],
        default: 'no'
    },
    familyMember:
    {
        type: Number
    },
    standardAppointmentReminder:
    {
        type: Boolean,
        default: false
    },
    appointmentReminderday:
    {
        type: String
    },
    appointmentRemindertime:
    {
        type: String
    },
    smsDnd:
    {
        type: Boolean,
        default: false
    },
    emailDnd:
    {
        type: Boolean,
        default: false
    },
    excluded:
    {
        type: Boolean,
        default: false
    },
    excludeNote:
    {
        type: String
    },
    notes:
    {
        type: String
    },
    showTreatments:
    {
        type: Boolean,
        default: false
    },
    allowEditProfile:
    {
        type: Boolean,
        default: false
    },
    showTreatmentCharges:
    {
        type: Boolean,
        default: false
    },
    allowEditMedicalConditions:
    {
        type: Boolean,
        default: false
    },
    showFiles:
    {
        type: Boolean,
        default: false
    },
    medicalConditions: { type: String },
    dentalConditions: { type: String },
    currentMedications:
    {
        type: String
    },
    allergicTo:
    {
        type: String
    },
    allergicToDrugs:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Drug'
            }
        ],
    allergic:
        [
            {
                since:
                {
                    type: Date
                },
                type:
                {
                    type: String
                },
                allergen:
                {
                    type: String
                },
                reaction:
                {
                    type: String
                },
                severity:
                {
                    type: String
                },
                notes:
                {
                    type: String
                }
            }
        ],
    selecthabits:
    {
        type: String,
        enum: ['unknown', 'habits', 'have-habits'],
        default: 'unknown'
    },
    habits:
    {
        aeratedDrinks: habitDetailSchema,
        alcohol: habitDetailSchema,
        coffee: habitDetailSchema,
        drugs: habitDetailSchema,
        shishaHookah: habitDetailSchema,
        smoking: habitDetailSchema,
        tea: habitDetailSchema,
        paanBetelNuts: habitDetailSchema,
        tobacco: habitDetailSchema,
        bruxism: habitDetailSchema,
        lipSucking: habitDetailSchema,
        mouthBreathing: habitDetailSchema,
        nailBiting: habitDetailSchema,
        thumbSucking: habitDetailSchema,
        tongueThrusting: habitDetailSchema,
        other: habitDetailSchema,
    },
    language:
    {
        type: String,
    },
    religion:
    {
        type: String,
    },
    occupation:
    {
        type: String,
    },
    ethnicGroup:
    {
        type: String,
    },
    race:
    {
        type: String,
    },
    status:
    {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    statuscheck:
    {
        type: String,
        enum: ['checkin', 'checkout', ''],
        default: ''
    },
    clinic: [clinicSchema],
    treatmentOn: [treatmentOnSchema],
    treatmentdone: [treatmentSubSchema],
    packageName:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CDHPackage"
    },
    prescription: [prescriptionSchema],
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
    totalamount:
    {
        type: Number
    },
    duepayment:
    {
        type: Number
    },
    advpayment:
    {
        type: Number
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
    },
    // invoice:
    //     [
    //         {
    //             receipt:
    //             {
    //                 type: Number
    //             },
    //             center:
    //             {
    //                 type: mongoose.Schema.Types.ObjectId,
    //                 ref: "Center",
    //             },
    //             invoicedate:
    //             {
    //                 type: Date
    //             },
    //             treatments:[treatmentSubSchema]
    //         }
    //     ]
}, { timestamps: true });
export default mongoose.model('Patient', patientSchema);