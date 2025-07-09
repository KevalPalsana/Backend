import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'RameshwarInfo', required: true },
    poNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'PONumber' },
    billNo: { type: Number, unique: true }, // internal use
    invoiceNo: { type: String, unique: true }, // shown on invoice
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'RameshwarCustomer' },
    date: { type: String },
    shipTo: { type: String },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'RameshwarProduct' },
        productName: { type: String },
        hsnCode: { type: Number },
        quantity: { type: Number },
        adpQuantity: { type: Number },
        rate: { type: Number },
        gstRate: { type: Number },
        totalAmount: { type: Number },
      },
    ],
    paymentStatus: { type: String, enum: ['paid', 'remaining'], default: 'remaining' },
    cgstAmount: { type: Number, default: 0 },
    sgstAmount: { type: Number, default: 0 },
    totalTaxAmount: { type: Number, default: 0 },
    roundOff: { type: Number, default: 0 },
    finalTotal: { type: Number, required: true },
    truckNo: { type: String},
    otherCharges: { type: String },
    pollNumbers: [{ type: String }],
    paidAmount: { type: Number },
    remainingAmount: { type: Number },
    billType: { type: String, enum: ['received', 'remaining']},
    note: { type: String},
  },
  { timestamps: true }
);

// ✅ Auto-generate billNo and invoiceNo
billSchema.pre("save", async function (next) {
  try {
    if (!this.billNo && this.companyId) {
      const Company = mongoose.model("RameshwarInfo");
      const company = await Company.findById(this.companyId);

      if (!company) return next(new Error("Company not found for invoice generation."));

      const startingNumber = parseInt(company.invoiceNumber || "1001"); 
      const prefix = company.invoicePrefix || ""; 

      const lastInvoice = await mongoose
        .model("SaleInvoice")
        .findOne({ companyId: this.companyId })
        .sort({ billNo: -1 });

      const nextBillNo = lastInvoice?.billNo ? lastInvoice.billNo + 1 : startingNumber;

      this.billNo = nextBillNo;
      this.invoiceNo = `${prefix}${nextBillNo}`;
    }

    next();
  } catch (err) {
    next(err);
  }
});

const SaleInvoice = mongoose.model('SaleInvoice', billSchema);
export default SaleInvoice;
