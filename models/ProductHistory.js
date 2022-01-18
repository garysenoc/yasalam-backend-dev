//productHistoryHistoryid
//status
//userid

const mongoose = require("mongoose");

const productHistorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  status: {
    type: String,
    default: "not claim",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ProductHistory = mongoose.model("ProductHistory", productHistorySchema);
module.exports = ProductHistory;
