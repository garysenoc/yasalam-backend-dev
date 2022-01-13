const mongoose = require("mongoose");

const userOutletSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserOutlet = mongoose.model("useroutlet", userOutletSchema);

module.exports = UserOutlet;
