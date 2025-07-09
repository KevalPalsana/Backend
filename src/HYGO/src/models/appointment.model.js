    import mongoose from "mongoose";

    const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HYGOPatient",
        required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    doctor: { type: String, required: true },
    appointmentType: {
        type: String,
        enum: ["Consultation", "Check-up", "Follow-up", "Procedure"],
        required: true,
    },
    reasonForVisit: { type: String, required: true },
    notes: { type: String },
    }, { timestamps: true });

    // const HYGOAppointment = mongoose.model("HYGOAppointment", appointmentSchema);
    export default appointmentSchema;
