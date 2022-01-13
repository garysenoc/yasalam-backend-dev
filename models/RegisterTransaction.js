const mongoose = require("mongoose");

const registerTransactionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  accountType: {
    type: String,
    default: "",
  },
  amountPaid: {
    type: Number,
  },
  day: {
    type: String,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
});

const RegisterTransaction = mongoose.model(
  "RegisterTransaction",
  registerTransactionSchema,
);
module.exports = RegisterTransaction;
