import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  name: String,
  invoiceId: String,
  amount: Number,
  status: { type: String, enum: ['paid', 'pending'] },
  date: String,
});

const workingDaySchema = new mongoose.Schema({
  day: { type: String, required: true },
  available: { type: Boolean, default: true },
  startTime: String,
  endTime: String,
});

const settingsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'HYGODoctor', required: true, unique: true },
    language: { type: String, default: 'English' },
    theme: { type: String, enum: ['Light Mode', 'Dark Mode', 'System Default'], default: 'Light Mode' },
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: true },
    appointmentReminders: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false },
    workingHours: [workingDaySchema],
    automaticInvoicing: { type: Boolean, default: true },
    emailInvoices: { type: Boolean, default: true },
    defaultPaymentMethod: { type: String, enum: ['Insurance', 'Credit Card', 'Cash', 'Check'], default: 'Cash' },
    paymentReminderDays: { type: String, enum: ['3 days', '7 days', '14 days', '30 days'], default: '7 days' },
    dataSharing: { type: Boolean, default: false },
    anonymousAnalytics: { type: Boolean, default: true },
    totalEarnings: { type: Number, default: 0 },
    pendingPayments: { type: Number, default: 0 },
    recentInvoices: [invoiceSchema],
  },
  { timestamps: true }
);

// const HYGOSetting = mongoose.model('HYGOSetting', settingsSchema);
export default settingsSchema;
