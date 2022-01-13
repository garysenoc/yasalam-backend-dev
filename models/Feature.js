const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Feature must have a name"],
    unique: true,
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  icon: {
    type: String,
    default: "",
  },
});

const Feature = mongoose.model("Feature", featureSchema);
module.exports = Feature;
