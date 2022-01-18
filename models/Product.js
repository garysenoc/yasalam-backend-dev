//name
//description
//points
//image
//quantity

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: Date,
    default: Date.now(),
    trim: true,
  },
  points: {
    type: Number,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
