const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: [true, "Child must have birthDate"],
  },
  gender: {
    type: String,
    trim: true,
  },
});

const Children = mongoose.model("Children", childSchema);
module.exports = { Children, childSchema };
