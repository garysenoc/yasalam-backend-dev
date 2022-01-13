const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  outlet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
  },
  isBranch: {
    type: Boolean,
    default: false,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  saveMoney: {
    type: Number,
    default: 0,
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
  time: {
    type: Date,
    default: Date.now(),
  },
  paymentDesciption: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
