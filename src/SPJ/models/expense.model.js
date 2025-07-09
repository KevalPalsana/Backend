import { Schema, model } from 'mongoose';

const ExpenseSchema = new Schema({
    category: {
      type: Schema.Types.ObjectId,
      ref: "ExpenseCategory", 
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }, { timestemps : true});
  
export const Expense = model("Expense", ExpenseSchema);