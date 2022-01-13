const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "category must have a name"],
    unique: true,
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default: "",
  },
  isYasalam: {
    type: Boolean,
    default: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
