import mongoose, { Schema, model } from 'mongoose';

const expenseCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const ExpenseCategory = model('ExpenseCategory', expenseCategorySchema);

export default ExpenseCategory;
