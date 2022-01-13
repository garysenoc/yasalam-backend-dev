const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  outlet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
  },
  address: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  havePromo: {
    type: Boolean,
    default: false,
  },
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
